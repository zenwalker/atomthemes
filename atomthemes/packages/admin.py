from django.contrib import admin
from .models import Theme


@admin.register(Theme)
class ThemeAdmin(admin.ModelAdmin):
    list_display = ['name', 'theme', 'version', 'downloads', 'stars', 'have_screenshot']
    search_fields = ['name']
    list_filter = ['theme']

    def have_screenshot(self, obj):
        return bool(obj.screenshot)

    have_screenshot.boolean = True
