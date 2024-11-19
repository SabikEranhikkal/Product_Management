from rest_framework import serializers
from .models import Products, Variants, SubVariants, Stock

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Products
        fields = "__all__"

class VariantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Variants
        fields = "__all__"

class SubVariantSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubVariants
        fields = "__all__"

class StockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stock
        fields = "__all__"