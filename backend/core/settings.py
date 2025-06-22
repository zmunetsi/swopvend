from pathlib import Path
import os
from datetime import timedelta
import environ  # new
import dj_database_url

env = environ.Env(
    DEBUG=(bool, False) # you can set defaults
)

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

environ.Env.read_env(os.path.join(BASE_DIR, '.env'), overwrite=True)  # new, this needs to be after the BASE_DIR variable

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-b*$$+0-38k#h5z9uwoi^8^@u0su&385lf6b=ivk(p6ht0a=4n='

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = env.list("ALLOWED_HOSTS", default=["localhost", "127.0.0.1"])


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'cloudinary',
    'cloudinary_storage',
    'anymail',  
    'drf_spectacular',
    'corsheaders',
    'rest_framework_simplejwt.token_blacklist',
    'item',
    'trader',
    'swap',
]

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema',
}

SPECTACULAR_SETTINGS = {
    'TITLE': 'SwopVend API',
    'DESCRIPTION': 'API docs for the SwopVend swap marketplace',
    'VERSION': '1.0.0',
    # add request body to all endpoints
    
    # any other spectacular settings…
}

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',        # <<— must come *first*
    'django.middleware.common.CommonMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'core.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        "DIRS": [os.path.join(BASE_DIR, "templates"), ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'core.wsgi.application'


# Database
# https://docs.djangoproject.com/en/5.1/ref/settings/#databases

# DATABASES = {
#     # 'default': {
#     #     'ENGINE': 'django.db.backends.sqlite3',
#     #     'NAME': BASE_DIR / 'db.sqlite3',
#     # # }
#     #     "default": {
#     #     "ENGINE": "django.db.backends.postgresql",
#     #     "NAME": "swopvend",
#     #     "USER": "postgres",
#     #     "PASSWORD": "Akanakashe@1",
#     #     "HOST": "localhost",
#     #     "PORT": "5433",
#     # }
# }

DATABASES = {
    "default": dj_database_url.config(
        default=env("DATABASE_URL", default="sqlite:///db.sqlite3"),
        conn_max_age=600,
        ssl_require=True
    )
}

# Password validation
# https://docs.djangoproject.com/en/5.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.1/howto/static-files/

STATIC_URL = '/static/'
STATICFILES_DIRS = [os.path.join(BASE_DIR, 'static')]
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

# Default primary key field type
# https://docs.djangoproject.com/en/5.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

AUTH_USER_MODEL = 'trader.Trader'
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3001",
    "https://your-production-domain.com",
]
# If you use environment variables, e.g.:
# CORS_ALLOWED_ORIGINS = [ os.environ['NEXT_PUBLIC_FRONTEND_URL'] ]

AUTHENTICATION_BACKENDS = [
    'trader.auth_backends.EmailOrUsernameModelBackend',  # first
    'django.contrib.auth.backends.ModelBackend',            # fallback
]

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=30),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': True,
    # …
}

EMAIL_BACKEND = 'anymail.backends.mailgun.EmailBackend'
ANYMAIL = {
    'MAILGUN_API_KEY': env('MAILGUN_API_KEY'),  # or os.environ['MAILGUN_API_KEY']
    'MAILGUN_SENDER_DOMAIN': env('MAILGUN_DOMAIN'),
}
DEFAULT_FROM_EMAIL = env('DEFAULT_FROM_EMAIL', default='no-reply@yourdomain.com')

# Celery configuration (example)
CELERY_BROKER_URL = env('CELERY_BROKER_URL')            # e.g. redis://:<password>@<hostname>:<port>/0
CELERY_RESULT_BACKEND = env('CELERY_BROKER_URL')
# .env.example entries for Redis Cloud
# CELERY_BROKER_URL=redis://:<REDIS_CLOUD_PASSWORD>@<REDIS_CLOUD_HOST>:<REDIS_CLOUD_PORT>/0
# REMINDER: Use the same URL for CELERY_RESULT_BACKEND unless you have a separate DB for results

# 7. Testing Celery-Redis Integration:
# ------------------------------------
# 1. Ensure your Redis Cloud instance is running and CELERY_BROKER_URL in .env is set to
#    redis://:<REDIS_CLOUD_PASSWORD>@<REDIS_CLOUD_HOST>:<REDIS_CLOUD_PORT>/0
#    (same URL can be used for CELERY_RESULT_BACKEND).
# 2. Start the Celery worker in your project directory:
#      celery -A project worker --loglevel=info
# 3. In another terminal, enter the Django shell:
#      python manage.py shell
# 4. Run the test task:
#      from swap.tasks import ping
#      result = ping.delay()
#      print(result.get(timeout=10))  # Expected output: 'pong'
# ------------------------------------
# If you see 'pong' in the shell and the worker logs show task received and succeeded,
# your Celery setup with Redis Cloud is working correctly!

# Configure default file storage to Cloudinary
DEFAULT_FILE_STORAGE = 'cloudinary_storage.storage.MediaCloudinaryStorage'

# Cloudinary credentials (use env vars)
CLOUDINARY = {
    'cloud_name': env('CLOUDINARY_CLOUD_NAME'),
    'api_key':    env('CLOUDINARY_API_KEY'),
    'api_secret': env('CLOUDINARY_API_SECRET'),
    'FOLDER':           'swopvend',
    'SECURE':           True,
    'POPULATE_METADATA': True,
    'USE_FILENAME':     True,
    'UNIQUE_FILENAME':  False,
}
