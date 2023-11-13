from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.pagination import PageNumberPagination
from rest_framework import status
from rest_framework.response import Response
from django.conf import settings
from .helpers import get_user_by_id, format_datetime
from .models import Landscape
from .serializers import LandscapeListSerializer
import requests
import base64

IMGBB_API_KEY = settings.CONFIG['IMGBB_API_KEY']
IMGBB_API_URL = settings.CONFIG['IMGBB_API_URL']


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

        if not [x in image_data.content_type for x in ("jpg", "jpeg", "png")]:
            return Response({"message": "Невалидна снимка."}, status=status.HTTP_400_BAD_REQUEST)     

        try:
            payload = {
                "key": IMGBB_API_KEY,
                "image": base64.b64encode(image_data.read())
            }

            response = requests.post(IMGBB_API_URL, payload)
            data = response.json()
            print(data)
        except Exception as e:
            print(e)
            return Response({"message": "Грешка при качване."}, status=status.HTTP_400_BAD_REQUEST)

        if response.status_code != 200:
            return Response({"message": "Грешка. Пробвайте пак."}, status=status.HTTP_400_BAD_REQUEST)
        
        image_data = data.get('data')

        img_url = image_data.get('url')
        img_width = image_data.get('width')
        img_height = image_data.get('height')
        
        if img_width < 200 or img_height < 200:
            return Response({"message": "Мин. размер 200х200"}, status=status.HTTP_400_BAD_REQUEST)


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


class DeleteLandscape(APIView):
    
    def delete(self, request, pk):
        try:
            landscape = Landscape.objects.get(pk=pk)
        except Landscape.DoesNotExist:
            return Response({"message": "Грешка при изтриване."}, status=status.HTTP_400_BAD_REQUEST)
        
        landscape.delete()
        return Response({"message": "Успешно изтриване."}, status=status.HTTP_204_NO_CONTENT)
