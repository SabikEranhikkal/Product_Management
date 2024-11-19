from django.contrib import admin
from .models import Products, Variants, SubVariants, Stock

# Register your models here.
admin.site.register(Products)
admin.site.register(Variants)
admin.site.register(SubVariants)
admin.site.register(Stock)