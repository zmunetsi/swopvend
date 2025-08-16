from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from .models import ContactMessage
from .serializers import ContactMessageSerializer
from utils.recaptcha import validate_recaptcha

class ContactMessageViewSet(viewsets.ModelViewSet):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    http_method_names = ['post']  # Only allow POST (create)

    def create(self, request, *args, **kwargs):
        recaptcha_token = request.data.get("recaptcha_token")
        if not recaptcha_token:
            return Response({"error": "ReCAPTCHA token is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            validate_recaptcha(recaptcha_token)
        except ValueError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Your message has been sent successfully."}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
