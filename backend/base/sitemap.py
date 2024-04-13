from django.contrib.sitemaps import Sitemap


class StaticViewSitemap(Sitemap):
    changefreq = "daily"
    priority = 1
    protocol = "https"

    def items(self):
        return ["/", "/privacy-policy"]

    def location(self, item):
        return item
