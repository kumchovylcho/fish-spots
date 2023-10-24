# import json
# import asyncio
# from channels.generic.websocket import AsyncWebsocketConsumer
# from channels.layers import get_channel_layer


# class DatabaseChangesConsumer(AsyncWebsocketConsumer):
#     async def connect(self):
#         await self.accept()

#         # self.channel_layer.add_group("group_name", self.channel_name)

#         # await self.send_message_to_group("465456546546", self.channel_name)


#     async def disconnect(self, close_code):
#         # Cancel the periodic task when the connection is closed
#         if hasattr(self, 'periodic_task'):
#             self.periodic_task.cancel()

#     async def receive(self, text_data):
#         message = json.loads(text_data)
#         await self.send(text_data=json.dumps({
#             'message': message
#         }))

#     async def send_messages_periodically(self):
#         while True:
#             # Send a message to the connected clients
#             await self.send_message("This is a message sent every 5 seconds.")
#             await asyncio.sleep(5)  # Wait for 5 seconds before sending the next message

#     async def send_message(self, message):
#         await self.send(text_data=json.dumps({"msg": message}))

#     async def send_message_to_group(self, group_name, message):
#         channel_layer = get_channel_layer()
#         await channel_layer.group_add(group_name, self.channel_name)

#         await channel_layer.group_send(
#             group_name,
#             {
#                 "type": "chat.message",
#                 "message": message
#             }
#         )

#     async def chat_message(self, event):
#         message = event['message']

#         # Send the message to the WebSocket clients
#         await self.send(text_data=json.dumps({
#             'message': message
#         }))



























# import json
# import asyncio
# from channels.generic.websocket import AsyncWebsocketConsumer
# from channels.layers import get_channel_layer



import json
import asyncio
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.layers import get_channel_layer


class DatabaseChangesConsumer(AsyncWebsocketConsumer):
    async def connect(self):

        await self.accept()
        await self.channel_layer.group_add("my_group", self.channel_name)
        # await self.channel_layer.group_add(self.channel_name, "my_group")


    async def disconnect(self, close_code):
        # Cancel the periodic task when the connection is closed
        if hasattr(self, 'periodic_task'):
            self.periodic_task.cancel()

        # await self.channel_layer.group_discard(self.channel_name, 'my_group')
        await self.channel_layer.group_discard("my_group", self.channel_name)

    async def receive(self, text_data):
        message = json.loads(text_data)
        await self.send(text_data=json.dumps({
            'message': message
        }))

    async def send_messages_periodically(self):
        while True:
            # Send a message to the connected clients
            await self.send_message("This is a message sent every 5 seconds.")
            await asyncio.sleep(5)  # Wait for 5 seconds before sending the next message

    async def send_message(self, message):
        await self.send(text_data=json.dumps({"msg": message}))

    async def send_message_to_group(self, group_name, message):
        channel_layer = get_channel_layer()
        await channel_layer.group_add(group_name, self.channel_name)

        await channel_layer.group_send(
            group_name,
            {
                "type": "chat.message",
                "message": message
            }
        )

    async def chat_message(self, event):
        message = event['message']

        # Send the message to the WebSocket clients
        await self.send(text_data=json.dumps({
            'message': message
        }))