import requests
from django.conf import settings

def validate_recaptcha(recaptcha_token):
    """
    Validate the ReCAPTCHA token with Google's API.

    Args:
        recaptcha_token (str): The token received from the frontend.

    Returns:
        dict: The response from Google's ReCAPTCHA API.

    Raises:
        ValueError: If the token is invalid or the validation fails.
    """
    recaptcha_secret = settings.RECAPTCHA_SECRET_KEY
    if not recaptcha_secret:
        raise ValueError("RECAPTCHA_SECRET_KEY is not set in settings.")

    url = "https://www.google.com/recaptcha/api/siteverify"
    data = {
        "secret": recaptcha_secret,
        "response": recaptcha_token,
    }
    response = requests.post(url, data=data)
    result = response.json()

    if not result.get("success"):
        raise ValueError("Invalid ReCAPTCHA token.")
    return result