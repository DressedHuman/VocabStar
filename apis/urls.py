from django.urls import path
from .views import register, login, test_token

urlpatterns = [
    path("user/register/", register, name="register"),
    path("user/login/", login, name="login"),
    path("user/test_token/", test_token, name="test_token"),
]