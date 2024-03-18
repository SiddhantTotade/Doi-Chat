run-android:
	cd frontend && npx react-native run-android

run-django:
# Suppose the IPv4 is 123.123.123.123 and Django Port is 8000 
# then, replace <IP:PORT> with 123.123.123.123:8000
	cd venv/Scripts && activate && cd ../../backend && python manage.py runserver <IP:PORT>

install-frontend:
	cd frontend && yarn install

install-backend:
	cd venv/Scripts && activate && cd ../../ && pip install -r requirements.txt