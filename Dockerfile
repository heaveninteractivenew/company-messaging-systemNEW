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

# Optionally, set the ServerName to suppress warnings (change to your domain if needed)
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

# Install Composer by copying it from the official Composer image
COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer

# Set the working directory to /var/www/html
WORKDIR /var/www/html

# Copy all project files into the container
COPY . .

# Create required directories (storage and bootstrap/cache) if they don't exist
RUN mkdir -p storage bootstrap/cache

# Set appropriate permissions for these directories
RUN chown -R www-data:www-data storage bootstrap/cache

# **Change the Apache DocumentRoot to the 'public' directory**  
RUN sed -ri 's!/var/www/html!/var/www/html/public!g' /etc/apache2/sites-available/000-default.conf

# Expose port 80 for the web server
EXPOSE 80

# Start Apache in the foreground
CMD ["apache2-foreground"]
