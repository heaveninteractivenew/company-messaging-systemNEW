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

# (Optional) Set ServerName to suppress Apache warnings
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

# Install Composer by copying it from the official Composer image
COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer

# Set the working directory to /var/www/html
WORKDIR /var/www/html

# Copy only the composer files first to leverage Docker cache
COPY composer.json composer.lock ./

# Run Composer install (this creates the vendor folder)
RUN php -d memory_limit=-1 /usr/local/bin/composer install --no-dev --optimize-autoloader --no-interaction --prefer-dist

# Copy the rest of your project files into the container
COPY . .

# Create required directories if they don't exist and fix permissions
RUN mkdir -p storage bootstrap/cache \
    && chown -R www-data:www-data storage bootstrap/cache

# Expose port 80 for Apache
EXPOSE 80

# Start Apache in the foreground
CMD ["apache2-foreground"]
