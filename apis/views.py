from django.utils import timezone

from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.models import Token

from user.models import CustomUser
from user.serializers import CustomUserSerializer
from vocab.models import Word, Meaning
from vocab.serializers import MeaningSerializer, WordSerializer

""" ------------------------------------------------------------------------------------
                            Auth Related Views
---------------------------------------------------------------------------------------- """
# register view
@api_view(["POST"])
@permission_classes([AllowAny])
def register(req):
    # first check if email is already used or not
    try:
        user = CustomUser.objects.get(email=req.data["email"])
        # email is already used, so sending error message
        return Response({"detail": "email is already used"}, status=status.HTTP_400_BAD_REQUEST)
    except:
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
        # saving the last login time
        user.last_login = timezone.now()

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

# logout view
@api_view(["POST"])
def logout(req):
    req.user.auth_token.delete()
    return Response({"detail": "successfully logged out"}, status=status.HTTP_200_OK)


# get user info with token
@api_view(["GET"])
def get_user_info(req):
    user = req.user
    serializer = CustomUserSerializer(instance=user)
    return Response({"user": serializer.data}, status=status.HTTP_200_OK)


""" -----------------------------------------------------------------------------------------------
                                   Vocab Related Views
----------------------------------------------------------------------------------------------- """
# add vocab view
@api_view(["POST"])
def add_vocab(req):
    data = req.data.copy()
    data["owner"] = req.user.id
    data["word"] = data["word"].strip().lower()

    # if word exists for this user, respond with an error message
    if Word.objects.filter(word=data["word"], owner=data["owner"]).exists():
        return Response({"detail": "This word already exists!"}, status=status.HTTP_400_BAD_REQUEST)
    
    # word doesn't exist. so save it.
    serializer = WordSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response({"details": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


# check vocab view
@api_view(["GET"])
def check_vocab(req):
    try:
        word = Word.objects.get(word=req.query_params.get("word").strip().lower(), owner=req.user)
        meanings = word.meanings.all()
        meanings_list = list(map(lambda x: {"id": x.id, "meaning": x.meaning}, meanings))
        return Response({"word": word.word, "meanings": meanings_list}, status=status.HTTP_200_OK)
    except Exception as e:
        print(e)
        return Response({"detail": f"'{req.query_params.get("word")}' is not added yet!"}, status=status.HTTP_400_BAD_REQUEST)


