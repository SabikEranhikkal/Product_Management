from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.db import transaction
from .models import Products, Variants, SubVariants, Stock
from .serializers import ProductSerializer, VariantSerializer, SubVariantSerializer, StockSerializer
from rest_framework.generics import ListAPIView
from rest_framework.pagination import PageNumberPagination

# 1. Create Product API
class CreateProductView(APIView):
    def post(self, request):
        data = request.data
        
        # Ensure variants and subvariants are provided if they exist
        if 'variants' not in data or not isinstance(data['variants'], list):
            return Response({"error": "Variants field is required and should be a list."}, status=status.HTTP_400_BAD_REQUEST)

        # Start a transaction to ensure atomicity
        with transaction.atomic():
            product_serializer = ProductSerializer(data=data)
            if product_serializer.is_valid():
                product = product_serializer.save()

                variants_data = data.get("variants", [])
                for variant_data in variants_data:
                    if 'name' not in variant_data or 'options' not in variant_data:
                        return Response({"error": "Variant 'name' and 'options' are required."}, status=status.HTTP_400_BAD_REQUEST)

                    variant_serializer = VariantSerializer(data=variant_data)
                    if variant_serializer.is_valid():
                        variant = variant_serializer.save(product=product)

                        subvariants_data = variant_data.get("subvariants", [])
                        for subvariant_data in subvariants_data:
                            if 'name' not in subvariant_data or 'options' not in subvariant_data:
                                return Response({"error": "Subvariant 'name' and 'options' are required."}, status=status.HTTP_400_BAD_REQUEST)
                                
                            subvariant_serializer = SubVariantSerializer(data=subvariant_data)
                            if subvariant_serializer.is_valid():
                                subvariant_serializer.save(variant=variant)
                            else:
                                return Response({"error": "Invalid subvariant data", "details": subvariant_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
                    else:
                        return Response({"error": "Invalid variant data", "details": variant_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

                return Response({"message": "Product created successfully", "product_id": product.id}, status=status.HTTP_201_CREATED)
            else:
                return Response({"error": "Invalid product data", "details": product_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


# 2. List Product API


class ProductPagination(PageNumberPagination):
    page_size = 10  # You can adjust this as per your requirements
    page_size_query_param = 'page_size'
    max_page_size = 100

class ProductListView(ListAPIView):
    queryset = Products.objects.all()
    serializer_class = ProductSerializer
    pagination_class = ProductPagination


# 3. Add Stock (Purchase) API
class AddStockView(APIView):
    def post(self, request):
        data = request.data
        variant_id = data.get("variant_id")
        quantity = data.get("quantity")

        if not variant_id or not quantity:
            return Response({"error": "Variant ID and Quantity are required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            variant = Variants.objects.get(id=variant_id)
        except Variants.DoesNotExist:
            return Response({"error": "Variant not found."}, status=status.HTTP_404_NOT_FOUND)

        # Add stock
        stock, created = Stock.objects.get_or_create(product_variant=variant)
        stock.quantity += quantity
        stock.save()

        return Response({"message": "Stock added successfully", "current_stock": stock.quantity}, status=status.HTTP_200_OK)


# 4. Remove Stock (Sale) API
class RemoveStockView(APIView):
    def post(self, request):
        data = request.data
        variant_id = data.get("variant_id")
        quantity = data.get("quantity")

        if not variant_id or not quantity:
            return Response({"error": "Variant ID and Quantity are required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            variant = Variants.objects.get(id=variant_id)
        except Variants.DoesNotExist:
            return Response({"error": "Variant not found."}, status=status.HTTP_404_NOT_FOUND)

        stock = Stock.objects.get(product_variant=variant)
        if stock.quantity < quantity:
            return Response({"error": "Insufficient stock."}, status=status.HTTP_400_BAD_REQUEST)

        stock.quantity -= quantity
        stock.save()

        return Response({"message": "Stock removed successfully", "current_stock": stock.quantity}, status=status.HTTP_200_OK)
