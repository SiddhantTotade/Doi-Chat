run-android:
	cd frontend && npx react-native run-android

server:
	cd venv\Scripts && activate && cd ..\..\backend && python manage.py runserver

install-frontend:
	cd frontend && npm install
