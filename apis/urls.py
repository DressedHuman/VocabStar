from django.urls import path
from .views import register, login, test_token, logout, get_user_info, add_vocab, check_vocab

urlpatterns = [
    # auth related paths
    path("user/register/", register, name="register"),
    path("user/login/", login, name="login"),
    path("user/test_token/", test_token, name="test_token"),
    path("user/logout/", logout, name="logout"),
    path("user/get_user_info/", get_user_info, name="get_user_info"),

    # vocab related paths
    path("vocab/add_vocab/", add_vocab, name="add_vocab"),
    path("vocab/check_vocab/", check_vocab, name="check_vocab"),
]