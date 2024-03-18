<div align="center" >
  <img src="https://github.com/SiddhantTotade/Doi---A-Django-Chat-Application/blob/main/App%20Images/Doi%20Chat.png" width="300px" height="200px" />
</div>

# About the project

Doi is a android chat application. This application uses Django in the backend and React Native in the frontend. With the help of this application an indiviual can be able to chat with his/her friends. The backend uses Django-Channels for making connection with the help of websockets. 

### Features of the project
+ Authentication
+ Search friends
+ Add friends
+ Chat with individuals
+ Connection building and showing bubble while typing

### Technologies used
![Django](https://img.shields.io/badge/django-%23092E20.svg?style=for-the-badge&logo=django&logoColor=white) &nbsp; ![React Native](https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) &nbsp; ![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white)

# Getting Started
+ Clone the repo in your PC or Laptop.
```shell
git@github.com:SiddhantTotade/Doi-Chat.git
```
+ Inside the directory `Doi-Chat`, type the following commands
  - Setup backend
    ```shell
      make setup-backend
    ```
  - Install backend dependencies
    ```shell
      make install-backend
    ```
  - Setup frontend
    ```shell
      make setup-frontend
    ```
  - Install frontend dependencies
    ```shell
      make install-frontend
    ```
  - Run frontend server
    ```shell
      make run-android
    ```
  - Run backend server
    ```shell
      make run-django
    ```
  - Run redis server
    ```shell
      make run-redis
    ```
+ When the frontend starts, It automatically install the application in the connected android device. Make sure that the android is connected with USB and USB Debugging is turned on.

## Configure the application (Remember before start)
#### Configure Django
+ Add the adroid device Ipv4 address in `Allowed_Hosts` in `settings.py`.
+ Make sure to change the `<IPv4 PORT>` in `Makefile` for running the server. If you are using Android Studio then use the default one `localhost:8000`.

### Project Images
<div align="center" gap="10px" display="flex">
  <img src="https://github.com/SiddhantTotade/Doi-Chat/blob/main/App%20Images/Screenshot_2024-03-18-12-18-19-257_com.frontend.jpg" width="100px" />
  <img src="https://github.com/SiddhantTotade/Doi-Chat/blob/main/App%20Images/Screenshot_2024-03-18-12-18-24-679_com.frontend.jpg" width="100px" />
  <img src="https://github.com/SiddhantTotade/Doi-Chat/blob/main/App%20Images/Screenshot_2024-03-18-12-20-55-315_com.frontend.jpg" width="100px" />
  <img src="https://github.com/SiddhantTotade/Doi-Chat/blob/main/App%20Images/Screenshot_2024-03-18-14-13-09-764_com.frontend.jpg" width="100px" />
  <img src="https://github.com/SiddhantTotade/Doi-Chat/blob/main/App%20Images/Screenshot_2024-03-18-15-56-11-095_com.frontend.jpg" width="100px" />
  <img src="https://github.com/SiddhantTotade/Doi-Chat/blob/main/App%20Images/Screenshot_2024-03-18-15-57-08-126_com.frontend.jpg" width="100px" />
<div/>
