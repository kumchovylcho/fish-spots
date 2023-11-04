from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from django.conf import settings
from discord_webhook import DiscordWebhook

DISCORD_HOOK = settings.CONFIG['DISCORD_WEB_HOOK']


class CreateLandscape(APIView):
    http_method_names = ["post"]

    def post(self, request, *args, **kwargs):
        image_data = request.data.get('image')


        webhook = DiscordWebhook(url=DISCORD_HOOK)
        webhook.add_file(image_data, str(image_data))

        response = webhook.execute()
        data = response.json()

        img_url = data.get('attachments')[0]['url']
        img_width = data.get('attachments')[0]['width']
        img_height = data.get('attachments')[0]['height']

        print(img_url)
        print(img_width)
        print(img_height)

        return Response({"message": "created!"}, status=status.HTTP_201_CREATED)
