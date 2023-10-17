from django.contrib import admin

from .models import VarnaRegion, BurgasRegion

@admin.register(VarnaRegion)
class CustomUserAdmin(admin.ModelAdmin):
    pass


@admin.register(BurgasRegion)
class CustomUserAdmin(admin.ModelAdmin):
    pass

