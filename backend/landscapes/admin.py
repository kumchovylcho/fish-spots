from django.contrib import admin

from .models import Landscape

@admin.register(Landscape)
class LandscapeAdmin(admin.ModelAdmin):
    list_display = ['title', 'description', 'created_at', 'author']
