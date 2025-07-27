from rest_framework.routers import DefaultRouter
from .views import CountryViewSet, CityViewSet

router = DefaultRouter()
router.register(r'countries', CountryViewSet)
router.register(r'cities', CityViewSet)

urlpatterns = router.urls