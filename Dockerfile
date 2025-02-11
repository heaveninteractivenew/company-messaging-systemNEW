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

# Copy all project files into the container
COPY . .

# Create required directories if they don't exist
RUN mkdir -p storage bootstrap/cache

# Set appropriate permissions for storage and bootstrap/cache directories
RUN chown -R www-data:www-data storage bootstrap/cache

# -----------------------------------------------------------------
# Change Made #1: Update Apache DocumentRoot to the public folder.
# This ensures Apache serves public/index.php.
RUN sed -ri 's!DocumentRoot /var/www/html!DocumentRoot /var/www/html/public!g' /etc/apache2/sites-available/000-default.conf
# -----------------------------------------------------------------

# -----------------------------------------------------------------
# Change Made #2: Run Composer install to generate the vendor folder.
# This step installs dependencies and creates vendor/autoload.php.
RUN composer install --no-dev --optimize-autoloader
# -----------------------------------------------------------------

# Expose port 80 for the web server
EXPOSE 80

# Start Apache in the foreground
CMD ["apache2-foreground"]
