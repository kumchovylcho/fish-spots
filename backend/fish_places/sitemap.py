from django.contrib.sitemaps import Sitemap

from urllib.parse import quote

from .models import Place


class PlaceSitemap(Sitemap):
    changefreq = "monthly"
    priority = 1
    protocol = "https"

    def items(self):
        return Place.objects.all()

    def lastmod(self, obj):
        return obj.last_modified

    def location(self, item):
        x = super().location(item)
        encoded_url = quote(x)
        return f"/place/{encoded_url}"
