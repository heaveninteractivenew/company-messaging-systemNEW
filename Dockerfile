# Use the official PHP 8.1 image with Apache
FROM php:8.1-apache

# Install system dependencies and required PHP extensions for Laravel
RUN apt-get update && apt-get install -y \
    libonig-dev \
    libzip-dev \
    zip \
    unzip \
    && docker-php-ext-install pdo_mysql mbstring zip

# Enable Apache mod_rewrite for Laravel routing
RUN a2enmod rewrite

# (Optional) Set ServerName to suppress warnings
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

# Install Composer by copying it from the official Composer image
COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer

# Set the working directory to /var/www/html
WORKDIR /var/www/html

# Copy composer files first (to leverage Docker cache)
COPY composer.json composer.lock ./

# Run Composer install to generate the vendor folder and autoload.php
RUN composer install --no-dev --optimize-autoloader

# Copy the rest of the project files into the container
COPY . .

# Create required directories if they don't exist
RUN mkdir -p storage bootstrap/cache

# Set appropriate permissions for storage and bootstrap/cache directories
RUN chown -R www-data:www-data storage bootstrap/cache

# Do NOT change DocumentRoot because, with Option 2, index.php and .htaccess are in the repository root
EXPOSE 80

# Start Apache in the foreground
CMD ["apache2-foreground"]
