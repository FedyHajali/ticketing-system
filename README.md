# ticketing-system
This is an example of Ticketing Management System realized for the "Application Distribuited and Mobile course" course at the University of Modena and Reggio Emilia. 

## Ticket Lifecycle

![tk-lifecycle](./imgs/tk-lifecycle.png)

## Ticket Management

![tk-management](./imgs/tk-management.png)


## Installation

Clone Project from repo access to directory
```bash
git clone https://github.com/FedyHajali/ticketing-system.git
```
```bash
cd /.../path-to/ticketing-system
```

## Build and run with Docker 

Build Docker containers 
```bash
docker-compose build
```
Start containers in detached mode
```bash
docker-compose up -d
```

## First setup

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

## Authors

Fedy Haj Ali, Giacomo Capitani
