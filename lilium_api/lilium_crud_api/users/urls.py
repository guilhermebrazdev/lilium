from django.urls import path
from .views import get_users, create_user, delete_user, update_user

urlpatterns = [
	path('', get_users, name='get_users'),
	path('/create', create_user, name='create_user'),
    path('/delete/<uuid:user_id>', delete_user, name='delete_user'),
    path('/update/<uuid:user_id>', update_user, name='update_user'),
]