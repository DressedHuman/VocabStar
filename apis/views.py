import random

# django related imports
from django.utils import timezone

# rest framework related imports
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.models import Token

from user.models import CustomUser
from user.serializers import CustomUserSerializer
from vocab.models import Word, Meaning
from vocab.serializers import MeaningSerializer, WordSerializer

# import helper functions
from .helpers import gen_mcq

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
        return Response(
            {"detail": "email is already used"}, status=status.HTTP_400_BAD_REQUEST
        )
    except:
        serializer = CustomUserSerializer(data=req.data)
        if serializer.is_valid():
            serializer.save()
            user = CustomUser.objects.get(email=req.data["email"])
            user.set_password(req.data["password"])
            user.save()
            return Response(
                {"detail": "User Registration Successful"},
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# login view
@api_view(["POST"])
@permission_classes([AllowAny])
def login(req):
    try:
        user = CustomUser.objects.get(email=req.data["email"])
        if not user.check_password(req.data["password"]):
            return Response(
                {"detail": "Wrong Password"}, status=status.HTTP_400_BAD_REQUEST
            )
        token, created = Token.objects.get_or_create(user=user)
        serializer = CustomUserSerializer(instance=user)
        # saving the last login time
        user.last_login = timezone.now()

        return Response(
            {
                "token": token.key,
                "user": serializer.data,
            },
            status=status.HTTP_200_OK,
        )
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
        return Response(
            {"detail": "This word already exists!"}, status=status.HTTP_400_BAD_REQUEST
        )

    # word doesn't exist
    # validate each meaning
    for meaning_data in data["meanings"]:
        if not meaning_data["meaning"]:
            return Response(
                {
                    "detail": "No meaning can be empty",
                },
                status=status.HTTP_400_BAD_REQUEST,
            )
    
    # word doesn't exist and all meanings are okay
    serializer = WordSerializer(data=data)
    if serializer.is_valid():
        word_instance = serializer.save()

        for meaning_data in data["meanings"]:
            meaning_serializer = MeaningSerializer(data=meaning_data)
            if meaning_serializer.is_valid():
                meaning_serializer.save(word=word_instance)
            else:
                return Response({"detials": meaning_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
            
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response({"details": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


# check vocab view
@api_view(["GET"])
def check_vocab(req):
    try:
        word = Word.objects.get(
            word=req.query_params.get("word").strip().lower(), owner=req.user
        )
        meanings = word.meanings.all()
        meanings_list = list(
            map(lambda x: {"id": x.id, "meaning": x.meaning}, meanings)
        )
        return Response(
            {"word": word.word, "meanings": meanings_list}, status=status.HTTP_200_OK
        )
    except Exception as e:
        print(e)
        return Response(
            {"detail": f"'{req.query_params.get("word")}' is not added yet!"},
            status=status.HTTP_400_BAD_REQUEST,
        )


# get an MCQ view
@api_view(["GET"])
def get_an_MCQ(req):
    owner_words = req.user.words.all()

    # validating owner has at least 4 words
    if owner_words.count() < 4:
        return Response(
            {"detail": "You need at least 4 words to create an MCQ."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    word = random.choice(list((owner_words)))

    response = gen_mcq(owner_words.exclude(word=word).order_by("?"), word)
    return Response(response, status=status.HTTP_200_OK)


# get N MCQs view
@api_view(["GET"])
def get_N_MCQs(req):
    N = int(req.query_params.get("N"))
    owner_words = req.user.words.all()

    # validating owner has at least 4 words
    if owner_words.count() < 4:
        return Response(
            {"detail": "You need at least 4 words to take an MCQ test."},
            status=status.HTTP_400_BAD_REQUEST,
        )
    elif owner_words.count() < N:
        return Response(
            {"detail": f"You don't have {N} words saved."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    N_words = random.sample(list(owner_words), N)

    mcq_data = []
    for word in N_words:
        response = gen_mcq(owner_words.exclude(word=word), word)
        mcq_data.append(response)

    return Response(mcq_data, status=status.HTTP_200_OK)
