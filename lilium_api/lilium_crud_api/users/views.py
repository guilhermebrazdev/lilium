from rest_framework.exceptions import ValidationError
from rest_framework.decorators import api_view
from rest_framework.response import Response
import uuid

from .utils.validators import create_user_validator, update_user_validator
from .serializers import UserSerializer
from .Interface import ICreateUserPayload, IUser, IUpdateUserPayload
from .models import User

@api_view(['GET'])
def get_users(request):
    search_query = request.query_params.get('search_query', None)

    if search_query:
        try:
            uuid_value = uuid.UUID(search_query)
            users = User.objects.filter(id=uuid_value)
        except ValueError:
            users = User.objects.filter(username__icontains=search_query)
    else:
        users = User.objects.all()

    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def create_user(request):
	try:
		payload: ICreateUserPayload = request.data
		new_user_data: IUser = create_user_validator(payload)
		user = User.objects.create(**new_user_data)

		return Response(UserSerializer(user).data, status=201)
	except ValidationError as e:
		return Response({"error": e.detail}, status=400)
	
@api_view(['DELETE'])
def delete_user(request, user_id):
	try:
		user = User.objects.get(id=user_id)
	except User.DoesNotExist:
		return Response({"error": "User not found."}, status=400)
	
	user.delete()
	return Response(status=204)

@api_view(['PUT'])
def update_user(request, user_id):
	try:
		updated_data: IUpdateUserPayload = request.data
		user = User.objects.get(id=user_id)

		updated_user: User = update_user_validator(updated_data, user)

		print(f'updated user: {updated_user}')

		updated_user.save()

	except User.DoesNotExist:
		return Response({"error": "User not found."}, status=400)
	except ValidationError as e:
		return Response({"error": e.detail}, status=400)
	
	return Response({"message": "User updated successfully."}, status=200)