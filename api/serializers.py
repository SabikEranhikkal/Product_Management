from rest_framework import serializers
from .models import Products, Variant, SubVariant

class SubVariantSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubVariant
        fields = ['id', 'option']

class VariantSerializer(serializers.ModelSerializer):
    subvariants = SubVariantSerializer(many=True)

    class Meta:
        model = Variant
        fields = ['id', 'name', 'subvariants']

class ProductSerializer(serializers.ModelSerializer):
    variants = VariantSerializer(many=True)

    class Meta:
        model = Products
        fields = '__all__'

    def create(self, validated_data):
        variants_data = validated_data.pop('variants')
        product = Products.objects.create(**validated_data)
        for variant_data in variants_data:
            subvariants_data = variant_data.pop('subvariants')
            variant = Variant.objects.create(product=product, **variant_data)
            for subvariant_data in subvariants_data:
                SubVariant.objects.create(variant=variant, **subvariant_data)
        return product
