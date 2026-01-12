from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('api/metrics/', views.get_model_metrics, name='get_metrics'),
]
