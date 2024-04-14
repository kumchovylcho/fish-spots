from django.contrib.sitemaps import Sitemap
from fish_regions.settings import regions as region_settings


class StaticViewSitemap(Sitemap):
    changefreq = "daily"
    priority = 1
    protocol = "https"

    def items(self):
        return ["/", "/privacy-policy"]

    def location(self, item):
        return item


class DynamicPagesSitemap(Sitemap):
    changefreq = "daily"
    priority = 1
    protocol = "https"

    def items(self):
        items = []

        for region, data in region_settings.items():
            items.append(f"/city/fish-spots?search={region}")
            items.append(f"/city/suggested-spots?search={region}")
            for place in data["places"]:
                items.append(f"/city/weather?search={region}&place={place.lower()}")

        return items

    def location(self, item):
        return item
