from django.db.models.signals import pre_delete
from django.dispatch import receiver

from .models import ChepareImages

import os


@receiver(pre_delete, sender=ChepareImages)
def delete_image_file(sender, instance, **kwargs):
    if instance.image and os.path.exists(instance.image.path):
        os.remove(instance.image.path)
