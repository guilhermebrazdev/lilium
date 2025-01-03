from django.core.validators import validate_email 
from rest_framework.exceptions import ValidationError
from bcrypt import hashpw, gensalt, checkpw
from ..Interface import ICreateUserPayload, IUpdateUserPayload
from ..models import User

def create_user_validator(payload: ICreateUserPayload):
    required_fields = list(ICreateUserPayload.__annotations__.keys())
    
    for field in required_fields:
        if not payload.get(field):
            raise ValidationError(f"{field} is required")
        
    for field in required_fields:
        if not isinstance(payload.get(field), str):
            raise ValidationError(f"{field} must be string")
    
    if payload["password"] != payload["confirmPassword"]:
        raise ValidationError("Passwords do not match")
    
    try:
        validate_email(payload["email"])
    except:
        raise ValidationError("Invalid email")
    
    payload['username'] = payload['username'].title()
    payload['password'] = gen_hashed_password(payload['password'])

    payload.pop('confirmPassword')

    return payload

def update_user_validator(payload: IUpdateUserPayload, user: User):
    field_list = payload.keys()

    if not payload.get("password"):
        raise ValidationError("Current password is required")

    for field in field_list:
        if not isinstance(payload.get(field), str):
            raise ValidationError(f"{field} must be string")

    match_pw = checkpw(payload.get("password").encode('utf-8'), user.password.encode('utf-8'))

    if not match_pw:
        raise ValidationError("Wrong password.")

    if payload.get("email"):
        user.email = payload.get("email")
    if payload.get("newPassword"):
        user.password = gen_hashed_password(payload.get('newPassword'))
    if payload.get("username"):
        user.username = payload.get("username")

    return user

def gen_hashed_password(password: str):
    encoded_password = password.encode('utf-8')
    salt = gensalt()
    hashed_password = hashpw(encoded_password, salt).decode('utf-8') 

    return hashed_password