from typing import TypedDict

class IUpdateUserPayload(TypedDict):
	username: str
	email: str
	password: str
	newPassword: str