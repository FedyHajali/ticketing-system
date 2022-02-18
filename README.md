# UniDesk
Project of university ticketing system for Application Distribuited and Mobile course.


git clone https://github.com/FedyHajali/Ticketing-System.git

cd /path-to-project/Ticketing-System

docker-compose build

docker-compose up -d

docker-compose exec api python3 manage.py makemigrations

docker-compose exec api python3 manage.py migrate

docker exec -it django-rest-api python3 manage.py createsuperuser