
from django.db import models
from django.contrib.auth.models import User
from versatileimagefield.fields import VersatileImageField
import uuid

class Products(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    ProductID = models.BigIntegerField(unique=True)
    ProductCode = models.CharField(max_length=255, unique=True)
    ProductName = models.CharField(max_length=255)
    ProductImage = VersatileImageField(upload_to="uploads/", blank=True, null=True)   
    CreatedDate = models.DateTimeField(auto_now_add=True)
    UpdatedDate = models.DateTimeField(blank=True, null=True)
    CreatedUser = models.ForeignKey(User, related_name="user%(class)s_objects", on_delete=models.CASCADE)
    IsFavourite = models.BooleanField(default=False)
    Active = models.BooleanField(default=True)
    HSNCode = models.CharField(max_length=255, blank=True, null=True)
    TotalStock = models.DecimalField(default=0.00, max_digits=20, decimal_places=8, blank=True, null=True)
    def __str__(self):
        return self. ProductName

    class Meta:
        verbose_name = ("product")
        verbose_name_plural = ("products")
        unique_together = (("ProductCode", "ProductID"),)
        ordering = ("-CreatedDate", "ProductID")

class Variants(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    product = models.ForeignKey(Products, related_name="variants", on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    options = models.TextField() 

    class Meta:
        db_table = "products_variant"

    def __str__(self):
        return self.  name    
         

class SubVariants(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    variant = models.ForeignKey(Variants, related_name="subvariants", on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    options = models.TextField()  

    class Meta:
        db_table = "products_subvariant"
    def __str__(self):
        return self.  name

class Stock(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    product_variant = models.ForeignKey(Variants, related_name="stock", on_delete=models.CASCADE)
    quantity = models.DecimalField(default=0.00, max_digits=20, decimal_places=8)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "products_stock"
    