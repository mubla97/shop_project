FROM php:8.1-apache

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    libzip-dev \
    net-tools \
    nano \
    build-essential \
    python3 \
    libkrb5-dev \
    sudo \
    unzip \
    bash \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip

# Enable Apache mod_rewrite
RUN a2enmod rewrite

# Get latest Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www

# Install Node.js via NVM
ENV NODE_VERSION=16
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash \
    && . ~/.nvm/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default \
    && npm config set python $(which python3)

# Copy the application code
COPY . /var/www

# Copy Apache configuration
COPY apache2.conf /etc/apache2/sites-available/000-default.conf

# Install Laravel dependencies
RUN composer install \
    && chown -R www-data:www-data /var/www \
    && chmod -R 755 /var/www/storage

# Expose port 80 and start Apache server
EXPOSE 80
CMD ["apache2-foreground"]
