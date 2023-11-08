from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.pagination import PageNumberPagination
from rest_framework import status
from rest_framework.response import Response
from django.conf import settings
from discord_webhook import DiscordWebhook
from .helpers import get_user_by_id, format_datetime
from .models import Landscape
from .serializers import LandscapeListSerializer

DISCORD_HOOK = settings.CONFIG['DISCORD_WEB_HOOK']


class CreateLandscape(APIView):
    http_method_names = ["post"]

    def post(self, request, *args, **kwargs):
        image_data = request.data.get('image')
        title = request.data.get('title')
        description = request.data.get('description')
        user_id = request.data.get('user_id')

        user = get_user_by_id(user_id)
        if not user:
            return Response({"message": "Влезте в профила си."}, status=status.HTTP_400_BAD_REQUEST)

        if not title or not description:
            return Response({"message": "Попълнете всички полета."}, status=status.HTTP_400_BAD_REQUEST)

        max_ten_mb = 1024 * 1024 * 10
        if image_data.size > max_ten_mb:
            return Response({"message": "Макс. размер 10мб!"}, status=status.HTTP_400_BAD_REQUEST)

        webhook = DiscordWebhook(url=DISCORD_HOOK)
        webhook.add_file(image_data, str(image_data))

        try:
            response = webhook.execute()
            data = response.json()
        except Exception as e:
            print(e)
            return Response({"message": "Грешка при качване."}, status=status.HTTP_400_BAD_REQUEST)

        attachments = data.get('attachments')
        if not attachments:
            return Response({"message": "Грешка. Пробвайте пак."}, status=status.HTTP_400_BAD_REQUEST)
        
        if not [x in attachments[0]['content_type'] for x in ("jpg", "jpeg", "png")]:
            return Response({"message": "Невалидна снимка."}, status=status.HTTP_400_BAD_REQUEST)

        img_url = attachments[0]['url']
        img_width = attachments[0]['width']
        img_height = attachments[0]['height']
        
        if img_width < 200 or img_height < 200:
            return Response({"message": "Прекалено малка снимка."}, status=status.HTTP_400_BAD_REQUEST)


        landscape = Landscape(
            title=title,
            description=description,
            image_url=img_url,
            author=user,
            created_at=format_datetime()
        )
        landscape.save()

        created_data = {
            "id": landscape.id,
            "title": landscape.title,
            "description": landscape.description,
            "image_url": landscape.image_url,
            "author": landscape.author.username,
            "created_at": landscape.created_at
        }

        return Response(created_data, status=status.HTTP_201_CREATED)


class ListLandscapes(ListAPIView):
    queryset = Landscape.objects.all()
    serializer_class = LandscapeListSerializer
    pagination_class = PageNumberPagination
