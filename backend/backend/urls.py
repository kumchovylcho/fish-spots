from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.sitemaps.views import sitemap

from fish_places.sitemap import PlaceSitemap
from base.sitemap import StaticViewSitemap

sitemaps = {"articles": PlaceSitemap, "static": StaticViewSitemap}

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("base.urls")),
    path("regions/", include("fish_regions.urls")),
    path("places/", include("fish_places.urls")),
    path("profile/", include("users.urls")),
    path(
        "sitemap.xml/",
        sitemap,
        {"sitemaps": sitemaps},
        name="django.contrib.sitemaps.views.sitemap",
    ),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
