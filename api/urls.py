from django.urls import path
from .views import CreateProductView, ProductListView, AddStockView, RemoveStockView

urlpatterns = [
    path("api/v1/products/create/", CreateProductView.as_view(), name="create-product"),
    path("api/v1/products/", ProductListView.as_view(), name="list-products"),
    path("api/v1/products/add-stock/", AddStockView.as_view(), name="add-stock"),
    path("api/v1/products/remove-stock/", RemoveStockView.as_view(), name="remove-stock"),
]
