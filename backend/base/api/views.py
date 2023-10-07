from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.views import APIView

from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import MyTokenObtainPairSerializer, RegistrationSerializer


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(["GET", ])
def get_routes(request):
    routes = [
        'token/',
        'token/refresh',
    ]

    return Response(routes)


class RegistrationView(APIView):
    def post(self, request):
        serializer = RegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()

            response = {"message": "Успешна регистрация!",
                        "username": user.username,
                        }

            return Response(response, status=status.HTTP_201_CREATED)
        
        return Response({"errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    


    """
    {
    "username": "pesho",
    "email": "wrong@mail.bg",
    "password": "123456",
    "rePassword": "123456"
    }
    """