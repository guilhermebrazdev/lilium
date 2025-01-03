from typing import TypedDict

class IUser(TypedDict):
	username: str
	email: str
	password: str