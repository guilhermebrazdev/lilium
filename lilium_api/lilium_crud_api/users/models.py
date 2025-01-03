from django.db import models
import uuid

class User(models.Model):
	id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
	username = models.CharField(max_length=100)
	password = models.CharField(max_length=100)
	email = models.EmailField()

	class Meta:
		db_table = "user"

	def __str__(self):
		return self.username