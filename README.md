<p align="center">
  <a href="https://laravel.com" target="_blank">
    <img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="300" alt="Laravel Logo">
  </a>
  <a href="https://reactjs.org" target="_blank">
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png" width="150" alt="React Logo">
  </a>
  <a href="https://www.phpmyadmin.net/" target="_blank">
    <img src="https://www.phpmyadmin.net/static/images/logo-og.png" width="225" alt="phpMyAdmin Logo">
  </a>
</p>




## INSTALACIÓN

### 1. Descarga el proyecto

Luego debe acceder al proyecto:

    cd shop_project

### 2. Crea el .env en backend y añade la key

Añade el .env en la carpeta de backend

  APP_NAME=ShopApp
  APP_ENV=local
  APP_KEY=
  APP_DEBUG=true
  APP_URL=http://localhost:8080

  LOG_CHANNEL=stack
  LOG_DEPRECATIONS_CHANNEL=null
  LOG_LEVEL=debug

  DB_CONNECTION=mysql
  DB_HOST=db
  DB_PORT=3306
  DB_DATABASE=shop_base
  DB_USERNAME=root
  DB_PASSWORD=root

  BROADCAST_DRIVER=log
  CACHE_DRIVER=file
  FILESYSTEM_DISK=local
  QUEUE_CONNECTION=sync
  SESSION_DRIVER=file
  SESSION_LIFETIME=10080

  REDIS_HOST=127.0.0.1
  REDIS_PASSWORD=null
  REDIS_PORT=6379

  MAIL_MAILER=smtp
  MAIL_HOST=mailpit
  MAIL_PORT=1025
  MAIL_USERNAME=null
  MAIL_PASSWORD=null
  MAIL_ENCRYPTION=null
  MAIL_FROM_ADDRESS="hello@example.com"
  MAIL_FROM_NAME="${APP_NAME}"

  AWS_ACCESS_KEY_ID=
  AWS_SECRET_ACCESS_KEY=
  AWS_DEFAULT_REGION=us-east-1
  AWS_BUCKET=
  AWS_USE_PATH_STYLE_ENDPOINT=false

  PUSHER_APP_ID=
  PUSHER_APP_KEY=
  PUSHER_APP_SECRET=
  PUSHER_HOST=
  PUSHER_PORT=443
  PUSHER_SCHEME=https
  PUSHER_APP_CLUSTER=mt1

  VITE_APP_NAME="${APP_NAME}"
  VITE_PUSHER_APP_KEY="${PUSHER_APP_KEY}"
  VITE_PUSHER_HOST="${PUSHER_HOST}"
  VITE_PUSHER_PORT="${PUSHER_PORT}"
  VITE_PUSHER_SCHEME="${PUSHER_SCHEME}"
  VITE_PUSHER_APP_CLUSTER="${PUSHER_APP_CLUSTER}"

  ADMIN_USER_PASS=1234

A continuación crearemos la key aleatoria con el siguiente comando:

  php artisan key:generate

### 3. Instalar dependencias

El proyecto contiene php, npm y composer. Instale las dependencias dependiendo de su dispositivo (windows, linux, MAC)

Debe habilitar extensiones de php, una vez instalado. Asegurese de habilitar las siguiente extensiones:

- extension=php_zip.dll

- extension=pdo_mysql

- extension=pdo_mysql


### 4. Iniciar el proyecto

El proyecto contiene docker, simplemente ejecute el comando:

    docker-compose up --build

Si desea utilizar la aplicación en segundo plano, puede usar:

    docker-compose up --build -d

### 4. Migrar la base de datos

Ejecute el siguiente comando para ver sus contenedores de docker:

    docker ps

Acceda al contenedor backend usando el siguiente comando:

    docker exec -it nombre_del_contenedor_backend /bin/bash

Ejecuta el comando para obtener la base de datos:

    php artisan migrate:fresh

Si desea obtener datos de prueba ejecute el siguiente comando:

    php artisan migrate:fresh --seed

### 5. Acceso a la app

- Frontend - localhost:3000 (aplicación principal)
- Backend  - localhost:8200
- Database - localhost:8081 (user: root, password: root)
  
