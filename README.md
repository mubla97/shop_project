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

### 2. Instalar dependencias

El proyecto contiene php, npm y composer. Instale las dependencias dependiendo de su dispositivo (windows, linux, MAC)

Debe habilitar extensiones de php, una vez instalado. Asegurese de habilitar las siguiente extensiones:

- extension=php_zip.dll

- extension=pdo_mysql

- extension=pdo_mysql


### 3. Iniciar el proyecto

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
  
