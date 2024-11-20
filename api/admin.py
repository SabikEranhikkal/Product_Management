from django.contrib import admin
from .models import Products, Variant, SubVariant

# Register the Products model with basic configuration
@admin.register(Products)
class ProductsAdmin(admin.ModelAdmin):
    list_display = ('ProductName', 'ProductCode', 'TotalStock', 'Active', 'CreatedDate')
    search_fields = ('ProductName', 'ProductCode')
    list_filter = ('Active', 'CreatedDate')
    ordering = ('-CreatedDate',)

# Register the Variant model with inline sub-variants to show options for each variant
class SubVariantInline(admin.TabularInline):
    model = SubVariant
    extra = 1

@admin.register(Variant)
class VariantAdmin(admin.ModelAdmin):
    list_display = ('name', 'product')
    search_fields = ('name', 'product__ProductName')
    inlines = [SubVariantInline]

# Register SubVariant model (optional, if you want it as a standalone entry)
@admin.register(SubVariant)
class SubVariantAdmin(admin.ModelAdmin):
    list_display = ('option', 'variant')
    search_fields = ('option',)
