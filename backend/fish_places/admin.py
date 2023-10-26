from django.contrib import admin
from fish_places.models import Place


@admin.register(Place)
class CustomUserAdmin(admin.ModelAdmin):
    pass