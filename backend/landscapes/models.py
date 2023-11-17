from django.db import models
from django.contrib.auth import get_user_model

UserModel = get_user_model()

class Landscape(models.Model):

    title = models.CharField(max_length=50)
    description = models.TextField()
    image_url = models.TextField()
    author = models.ForeignKey(UserModel, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('-created_at', )

    def __str__(self):
        return self.title