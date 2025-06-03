from django.contrib import admin
from .models import CatchHistory


@admin.register(CatchHistory)
class CatchHistoryAdmin(admin.ModelAdmin):
    list_display = (
        "user",
        "date",
        "city",
        "fish_spot",
        "fish_type",
        "lure_type",
        "quantity",
        "from_hour",
        "to_hour",
        "snaps",
        "good_weather",
    )
