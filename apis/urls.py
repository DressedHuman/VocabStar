from django.urls import path
from .views import register, login, test_token, logout, get_user_info

urlpatterns = [
    path("user/register/", register, name="register"),
    path("user/login/", login, name="login"),
    path("user/test_token/", test_token, name="test_token"),
    path("user/logout/", logout, name="logout"),
    path("user/get_user_info/", get_user_info, name="get_user_info"),
]