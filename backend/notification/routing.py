from django.urls import re_path
from channels.routing import ProtocolTypeRouter, URLRouter
from . import consumers


websocket_urlpatterns = [
    re_path(r'ws/notification/$', consumers.DatabaseChangesConsumer.as_asgi()),
]

application = ProtocolTypeRouter({
    "websocket": URLRouter(
        websocket_urlpatterns
    ),
})