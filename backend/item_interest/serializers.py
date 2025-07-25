from rest_framework import serializers
from .models import ItemInterest
from item.models import Item  # Ensure this points to your actual Item model


class ItemSummarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = [
            'id',
            'title',
            'status',
            'featured_image'
        ]


class ItemInterestSerializer(serializers.ModelSerializer):
    item = ItemSummarySerializer(read_only=True)  # for GET
    item_id = serializers.PrimaryKeyRelatedField(
        queryset=Item.objects.all(),
        source='item',
        write_only=True
    )

    class Meta:
        model = ItemInterest
        fields = [
            'id',
            'item',         # Nested item summary
            'item_id',      # For posting item
            'interest_type',
            'note',         # ✅ Optional user message
            'created_at'
        ]
        read_only_fields = ['id', 'created_at', 'item']

    def validate(self, data):
        user = self.context['request'].user
        item = data['item']
        interest_type = data['interest_type']

        if ItemInterest.objects.filter(
            user=user,
            item=item,
            interest_type=interest_type
        ).exists():
            raise serializers.ValidationError("You have already shown interest in this item.")
        return data

    def create(self, validated_data):
        user = self.context['request'].user
        return ItemInterest.objects.create(user=user, **validated_data)
