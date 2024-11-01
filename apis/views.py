from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.models import Token

from user.models import CustomUser
from user.serializers import CustomUserSerializer


# register view
@api_view(["POST"])
@permission_classes([AllowAny])
def register(req):
    serializer = CustomUserSerializer(data=req.data)
    if serializer.is_valid():
        serializer.save()
        user = CustomUser.objects.get(email=req.data["email"])
        user.set_password(req.data["password"])
        user.save()
        return Response({"detail": "User Registration Successful"}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# login view
@api_view(['POST'])
@permission_classes([AllowAny])
def login(req):
    try:
        user = CustomUser.objects.get(email=req.data["email"])
        if not user.check_password(req.data["password"]):
            return Response({"detail": "Wrong Password"}, status=status.HTTP_400_BAD_REQUEST)
        token, created = Token.objects.get_or_create(user=user)
        serializer = CustomUserSerializer(instance=user)
        return Response({
            "token": token.key,
            "user": serializer.data,
        }, status=status.HTTP_200_OK)
    except:
        return Response({"detail": "Wrong Email"}, status=status.HTTP_400_BAD_REQUEST)


# test token view
@api_view(["GET"])
def test_token(req):
    return Response({"detail": "passed"}, status=status.HTTP_200_OK)
