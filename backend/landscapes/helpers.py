from django.contrib.auth import get_user_model
from django.utils import timezone

UserModel = get_user_model()


def get_user_by_id(user_id):
    try:
        return UserModel.objects.get(id=user_id)
    except UserModel.DoesNotExist as e:
        print(e)
        return


def format_datetime():
    current_datetime = timezone.now()

    input_datetime = current_datetime.strptime(str(current_datetime), "%Y-%m-%d %H:%M:%S.%f%z")

    formatted_date = input_datetime.strftime("%d %m %Y")
    
    return formatted_date
