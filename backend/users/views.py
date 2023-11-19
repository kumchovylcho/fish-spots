from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import RetrieveUpdateAPIView
from .serializers import (UserExistsData,
                          EditUserSerializer
                         )
from django.contrib.auth.hashers import check_password


UserModel = get_user_model()


class UserExistsView(APIView):
    def post(self, request):
        username = request.data.get('username', '')
        old_username = request.data.get('old_username', '')
        password = request.data.get('password', '')
        use_password = request.data.get('check_password', False)

        try:
            user = UserModel.objects.get(username=username)
            
            serializer = UserExistsData(user, many=False)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except UserModel.DoesNotExist:
            if not use_password:
                return Response({"msg": "not found"}, status=status.HTTP_404_NOT_FOUND)
            
            user = UserModel.objects.get(username=old_username)
            if not check_password(password, user.password):
                return Response({"msg": "wrong password"}, status=status.HTTP_401_UNAUTHORIZED)
            
            return Response({"msg": "correct password"}, status=status.HTTP_202_ACCEPTED)
            
            


class EditUserView(RetrieveUpdateAPIView):
    queryset = UserModel.objects.all()
    serializer_class = EditUserSerializer
    lookup_field = "username"
