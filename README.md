# Company Messaging System

This project is a dual messaging system offering company-branded messaging and personal one-to-one chats. It includes live notifications and theme switching (light/dark mode).

## Deployment to Render.com
1. Create a new Web Service from this GitHub repository.
2. Add the required environment variables (see below).
3. Set the build command to: `composer install --no-dev && php artisan migrate --force && php artisan optimize`
4. Enable auto-deploy on Git push.

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)

## Local Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/heaveninteractivenew/company-messaging-system.git
   cd company-messaging-system
