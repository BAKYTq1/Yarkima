from django.urls import path, include
from rest_framework.routers import DefaultRouter
from api import views
from django.conf import settings
from django.conf.urls.static import static

router = DefaultRouter()
router.register('answer', views.AnswerViewSet)

urlpatterns = [
    path('', include(router.urls)),  
]
