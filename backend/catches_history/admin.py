from django.contrib import admin
from .models import CatchHistory


@admin.register(CatchHistory)
class CatchHistoryAdmin(admin.ModelAdmin):
    pass
