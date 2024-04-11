def set_token_in_cookie(
    response,
    key: str,
    value: str,
    max_age: int,
    secure=True,
    httponly=True,
    samesite="None",
):
    response.set_cookie(
        key, value, max_age=max_age, secure=secure, httponly=httponly, samesite=samesite
    )

    return response
