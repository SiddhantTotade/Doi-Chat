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
  - Install backend dependencies
    ```shell
      make install-backend
    ```
  - Install frontend dependencies
    ```shell
      make install-frontend
    ```
  - Run frontend server
    ```shell
      make run-frontend
    ```
  - Run backend server
    ```shell
      make run-backend
    ```
  - Run redis server
    ```shell
      make run-redis
    ```
+ When the frontend starts, It automatically install the application in the connected android device. Make sure that the android is connected with USB and USB Debugging is turned on.

## Configure the application
#### Configure Django
+ Create a `venv` in the cloned directory. `python -m venv venv`
+ Run `make install-backend` from the root folder.
+ Create a new directory `mkdir backend`.
+ Change the directory to backend. `cd backend`
+ Create a new Django project. `djago-admin startproject core .`
+ Create an Django app. `python manage.py startapp <name_of_the_application>`.
+ Add the adroid device Ipv4 address in allowed hosts.
+ Make sure to change the `<IPv4 PORT>` in `Makefile`

#### Configure React Native
  + Create a new project. `npx react-native@latest init frontend`
  + Run command `make install-frontend`
  + Run frontend `make run-android`

### Project Images
<div align="center" gap="10px" display="flex">
  <img src="https://github.com/SiddhantTotade/Doi-Chat/blob/main/App%20Images/Screenshot_2024-03-18-12-18-19-257_com.frontend.jpg" width="100px" />
  <img src="https://github.com/SiddhantTotade/Doi-Chat/blob/main/App%20Images/Screenshot_2024-03-18-12-18-24-679_com.frontend.jpg" width="100px" />
  <img src="https://github.com/SiddhantTotade/Doi-Chat/blob/main/App%20Images/Screenshot_2024-03-18-12-20-55-315_com.frontend.jpg" width="100px" />
  <img src="https://github.com/SiddhantTotade/Doi-Chat/blob/main/App%20Images/Screenshot_2024-03-18-14-13-09-764_com.frontend.jpg" width="100px" />
  <img src="https://github.com/SiddhantTotade/Doi-Chat/blob/main/App%20Images/Screenshot_2024-03-18-15-56-11-095_com.frontend.jpg" width="100px" />
  <img src="https://github.com/SiddhantTotade/Doi-Chat/blob/main/App%20Images/Screenshot_2024-03-18-15-57-08-126_com.frontend.jpg" width="100px" />
<div/>
