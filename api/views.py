from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Products, Variant, SubVariant
from .serializers import ProductSerializer
from django.http import JsonResponse
from rest_framework.permissions import AllowAny

def api_root(request):
    return JsonResponse({"message": "Welcome to the Product Management API!"})

class ProductCreateView(generics.CreateAPIView):
    serializer_class = ProductSerializer

class ProductListView(generics.ListAPIView):
    queryset = Products.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]

class AddStockView(APIView):
    def put(self, request, *args, **kwargs):
        product_id = request.data.get('product_id')
        stock_amount = request.data.get('stock_amount', 0)

        try:
            product = Products.objects.get(id=product_id)
            product.TotalStock += stock_amount
            product.save()
            return Response({"message": "Stock added successfully."}, status=status.HTTP_200_OK)
        except Products.DoesNotExist:
            return Response({"error": "Product not found."}, status=status.HTTP_404_NOT_FOUND)

class RemoveStockView(APIView):
    def put(self, request, *args, **kwargs):
        product_id = request.data.get('product_id')
        stock_amount = request.data.get('stock_amount', 0)

        try:
            product = Products.objects.get(id=product_id)
            if product.TotalStock >= stock_amount:
                product.TotalStock -= stock_amount
                product.save()
                return Response({"message": "Stock removed successfully."}, status=status.HTTP_200_OK)
            else:
                return Response({"error": "Insufficient stock."}, status=status.HTTP_400_BAD_REQUEST)
        except Products.DoesNotExist:
            return Response({"error": "Product not found."}, status=status.HTTP_404_NOT_FOUND)
