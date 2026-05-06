#!/bin/bash
# deploy_app.sh
# 
# Purpose: Handles the deployment of the ShopSmart application on the EC2 instance.
# This script is called by the GitHub Actions workflow.

echo "========== Starting ShopSmart Deployment =========="

# 1. Ensure PATH is set for non-interactive shell and source profile
export PATH=$PATH:/usr/bin:/usr/local/bin
source ~/.profile 2>/dev/null || true

# 2. Deploy Frontend
echo "2. Deploying frontend build..."
sudo mkdir -p /var/www/shopsmart/client
if [ -d "/tmp/client_dist" ]; then
    sudo rm -rf /var/www/shopsmart/client/*
    sudo cp -r /tmp/client_dist/* /var/www/shopsmart/client/
    sudo rm -rf /tmp/client_dist
    echo "Frontend deployed successfully."
else
    echo "Warning: /tmp/client_dist not found. Skipping frontend deployment."
fi

# 3. Deploy Backend
echo "3. Deploying backend server..."
sudo mkdir -p /var/www/shopsmart/server
if [ -f "/tmp/server.tar.gz" ]; then
    sudo rm -rf /var/www/shopsmart/server/*
    tar -xzf /tmp/server.tar.gz -C /tmp
    sudo cp -r /tmp/server/* /var/www/shopsmart/server/
    sudo rm -rf /tmp/server.tar.gz /tmp/server
    
    # Install server dependencies and restart with PM2
    echo "Installing server dependencies and restarting PM2..."
    cd /var/www/shopsmart/server
    npm install --production
    pm2 delete shopsmart-backend || true
    pm2 start src/index.js --name shopsmart-backend
    echo "Backend deployed and restarted."
else
    echo "Warning: /tmp/server.tar.gz not found. Skipping backend deployment."
fi

# 4. Apply Nginx Configuration
echo "4. Applying Nginx configuration..."
if [ -f "/tmp/nginx.conf" ]; then
    sudo mv /tmp/nginx.conf /etc/nginx/sites-available/shopsmart
    sudo ln -sf /etc/nginx/sites-available/shopsmart /etc/nginx/sites-enabled/default
    sudo systemctl restart nginx
    echo "Nginx configuration applied and service restarted."
else
    echo "Warning: /tmp/nginx.conf not found."
fi

echo "========== Deployment complete! =========="
