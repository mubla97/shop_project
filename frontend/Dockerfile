# Etapa de construcción
FROM node:14-alpine AS builder

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos necesarios
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del proyecto
COPY . .

# Construir el proyecto
RUN npm run build

# Etapa de producción
FROM nginx:1.15-alpine

# Copiar la construcción del proyecto desde la etapa de construcción
COPY --from=builder /app/build /usr/share/nginx/html

# Copiar la configuración de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto 80
EXPOSE 80

# Comando por defecto para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
