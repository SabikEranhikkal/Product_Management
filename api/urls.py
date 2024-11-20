from django.urls import path
from .views import ProductCreateView, ProductListView, AddStockView, RemoveStockView
from . import views

urlpatterns = [
    path('', views.api_root, name='api-root'),  # Root path for /api/
    path('products/', ProductListView.as_view(), name='product-list'),
    path('products/create/', ProductCreateView.as_view(), name='product-create'),
    path('products/add-stock/', AddStockView.as_view(), name='add-stock'),
    path('products/remove-stock/', RemoveStockView.as_view(), name='remove-stock'),
]
