const baseUrl = "http://127.0.0.1:8000/api/"


const register = async (data) => {
    const options = {
        method: "POST",
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(data)
}

    return await fetch(`${baseUrl}register/`, options);
}


export {register};