def generate_errors_messages(field, null=None, blank=None, required=None, invalid=None):
    error_messages = {}

    if null:
        error_messages["null"] = f"The {field} field cannot be null."

    if blank:
        error_messages["blank"] = f"The {field} field cannot be blank."

    if required:
        error_messages["required"] = f"The {field} field is required."

    if invalid:
        error_messages["invalid"] = f"The {field} field is invalid."

    return {"error_messages": error_messages}
