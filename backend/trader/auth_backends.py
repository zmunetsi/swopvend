# apps/users/auth_backends.py

from django.contrib.auth.backends import ModelBackend
from django.contrib.auth import get_user_model

UserModel = get_user_model()

class EmailOrUsernameModelBackend(ModelBackend):
    """
    Allow users to authenticate with either their username or their email.
    """
    def authenticate(self, request, username=None, password=None, **kwargs):
        if username is None:
            username = kwargs.get(UserModel.USERNAME_FIELD)
        # Try to fetch by email if it looks like one:
        lookup = {'email__iexact': username} if '@' in username else {'username__iexact': username}
        try:
            user = UserModel.objects.get(**lookup)
        except UserModel.DoesNotExist:
            return None
        # Check password & is_active:
        if user.check_password(password) and self.user_can_authenticate(user):
            return user
        return None
