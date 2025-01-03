from typing import TypedDict

class ICreateUserPayload(TypedDict):
	username: str
	email: str
	password: str
	confirmPassword: str