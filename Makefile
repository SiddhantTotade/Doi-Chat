# Setting up Backend and Frontend
setup-backend:
	pip -m venv venv && mkdir -p backend

setup-frontend:
	npx react-native@latest init frontend


# Installing Dependencies
install-backend:
	cd venv/Scripts && activate && cd ../../ && pip install -r requirements.txt

install-frontend:
	cd frontend && yarn install


# Running applications
run-android:
	cd frontend && npx react-native run-android

run-django:
# Suppose the IPv4 is 123.123.123.123 and Django Port is 8000 
# then, replace <IPv4:PORT> with 123.123.123.123:8000
	cd venv/Scripts && activate && cd ../../backend && python manage.py runserver <IPv4:PORT>

run-redis:
	redis-server