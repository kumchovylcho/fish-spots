## Overview
<span style="font-size: larger;">
Fish-spots is a website where new and old fishermen can check if their fish spot is visitable.
</span>
</br>
<span style="font-size: larger;">
Fishermen can also upload their landscapes of their loved fishing spots and share it with everyone.
</span>
</br>
<span style="font-size: larger;">
You will find the weather information about the current day and the next 4 days. The information shown is [degrees, feels like, wind direction and wind speed].
</span>
</br>
<span style="font-size: larger;">
You can view all the provided fishing spots for the north and south regions.There is google maps link with short text description about the fish spot.
</span>
</br>

## Details
**Frontend**
- **Stack**: React, Tailwind CSS.
- **Description**: The frontend is entirely built with React. It uses Tailwind CSS to efficiently set styles.

**Backend**
- **Stack**: Django-rest
- **Third-Party-Packages**: Celery, Simple JWT
- **Description**: Using celery to create tasks which are executed every 3 hours to update the database with the new weather data and then cache it. Added simple login/register system.

**Databases**
- **Redis**: Redis is used to store the tasks that are going to be executed.
- **Postgre**: Storing the user data and weather data.

# The sweet part:
- **Here are some images of the home page. 50% zoom**
![Alt text](./readMeAssets/image-3.png)

- **Images of city page.**
![Alt text](./readMeAssets/image-4.png)
![Alt text](./readMeAssets/image-5.png)
![Alt text](./readMeAssets/image-6.png)
![Alt text](./readMeAssets/image-7.png)

- **Landscape page.**
![Alt text](./readMeAssets/image-9.png)
![Alt text](./readMeAssets/image-10.png)
![Alt text](./readMeAssets/image-11.png)
![Alt text](./readMeAssets/image-12.png)

- **Form to create a landscape**
![Alt text](./readMeAssets/image-14.png)

- **User profile management**
![Alt text](./readMeAssets/image-15.png)
![Alt text](./readMeAssets/image-16.png)
![Alt text](./readMeAssets/image-17.png)

- **Viewing the same user, but with another account logged in**
![Alt text](./readMeAssets/image-18.png)

- **Login form**
![Alt text](./readMeAssets/image-19.png)

- **Registration form**
![Alt text](./readMeAssets/image-20.png)

- **404 page**
![Alt text](./readMeAssets/image-21.png)