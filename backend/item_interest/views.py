from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import ItemInterest
from .serializers import ItemInterestSerializer
from item.models import Item  # ✅ Updated import to match `item` app
from .tasks import notify_item_owner_interest
from item_interest.tasks import notify_admin_new_interest


class ItemInterestCreateView(generics.GenericAPIView):
    serializer_class = ItemInterestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        item_id = request.data.get("item")
        interest_type = request.data.get("interest_type")
        note = request.data.get("note", "")

        if not item_id or not interest_type:
            return Response({"error": "Item and interest_type are required."}, status=400)

        try:
            item = Item.objects.get(pk=item_id)
        except Item.DoesNotExist:
            return Response({"error": "Item not found."}, status=404)

        existing = ItemInterest.objects.filter(
            user=request.user,
            item=item,
            interest_type=interest_type
        ).first()

        if existing:
            return Response({"error": "You have already shown interest in this item."}, status=400)

        interest = ItemInterest.objects.create(
            user=request.user,
            item=item,
            interest_type=interest_type
        )

        serializer = self.get_serializer(interest)
        # Call Celery task to notify owner
        if interest_type == "free":
            notify_item_owner_interest.delay(item_id, request.user.id, note)

        owner = item.trader
        interested_user = request.user

        # Notify admins
        notify_admin_new_interest.delay(
            item.title,
            owner.get_full_name() or owner.username,
            owner.email,
            interested_user.get_full_name() or interested_user.username,
            interested_user.email,
            interest_type,
            note,
            f"https://swopvend.com/items/{item.id}/"
        )

        return Response(serializer.data, status=status.HTTP_201_CREATED)


class MyItemInterestListView(generics.ListAPIView):
    serializer_class = ItemInterestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return ItemInterest.objects.filter(user=self.request.user)


class ItemInterestDeleteView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request):
        item_id = request.data.get("item")
        interest_type = request.data.get("interest_type")

        if not item_id or not interest_type:
            return Response({"error": "Item and interest_type are required."}, status=400)

        interest = ItemInterest.objects.filter(
            user=request.user,
            item_id=item_id,
            interest_type=interest_type
        ).first()

        if not interest:
            return Response({"error": "Interest not found."}, status=404)

        interest.delete()
        return Response({"message": "Interest removed."}, status=204)
