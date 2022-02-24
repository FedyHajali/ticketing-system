# UniDesk
Project of university ticketing system for Application Distribuited and Mobile course.

Clone Project from repo access to the directory
```bash
git clone https://github.com/FedyHajali/Ticketing-System.git
```
```bash
cd /.../path-to-project/Ticketing-System
```

Build Docker containers 
```bash
docker-compose build
```
Start containers in detached mode
```bash
docker-compose up -d
```

Make PostgreSQL migrations and create you first user as administrator of the system 
```bash
docker-compose exec api python3 manage.py makemigrations
```
```bash
docker-compose exec api python3 manage.py migrate
```
```bash
docker exec -it django-rest-api python3 manage.py createsuperuser
```