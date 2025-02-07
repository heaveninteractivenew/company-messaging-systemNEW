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

# Install Composer by copying it from the official Composer image
COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer

# Set the working directory to /var/www/html (Apache's default directory)
WORKDIR /var/www/html

# Copy the project files into the container
COPY . .

# Create required directories if they do not exist
RUN mkdir -p storage bootstrap/cache

# Set appropriate permissions for storage and bootstrap/cache directories
RUN chown -R www-data:www-data storage bootstrap/cache

# Expose port 80 for the web server
EXPOSE 80

# Start Apache in the foreground (this command runs when the container starts)
CMD ["apache2-foreground"]
