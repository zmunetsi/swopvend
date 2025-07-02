from django.db import models

class ContactMessage(models.Model):
    REASON_CHOICES = [
        ('general', 'General Inquiry'),
        ('support', 'Support'),
        ('feedback', 'Feedback'),
        ('partnership', 'Partnership'),
        ('other', 'Other'),
    ]

    name = models.CharField(max_length=255)
    email = models.EmailField()
    reason = models.CharField(max_length=50, choices=REASON_CHOICES)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.email}) - {self.reason}"
