# Nodejs Server

## Introduction
Contain two ExpressJs servers managed by one node module with independent webpack configurations on each server.

## Initial Installation
========================

1. Install Nodejs v6.3.1. With Nodejs it will install npm v3.10.3
2. Install Required node modules
    ```
    npm install
    ```

## Admin Server
===============
1. Configuring Admin Server
  - edit admin/config/config.js and change IP address to reflect with Nginx admin server   Configurations.
2. Run server in dev mode
  ```
  npm run start-admin
  ```
3. Run server in production mode
  ```
  npm run start-admin-prod
  ```
4. Update admin server on schema change
  ```
  npm run update-schema-admin
  ```


## Client Server

1. Configuring Traveler Server
  - edit traveler/config/config.js and change IP address to reflect with Nginx admin server   Configurations.
2. Run server in dev mode
    ```
    npm run start-client
    ```
3. Run server in production mode
    ```
    npm run start-client-prod
    ```
4. Update client server on schema change
    ```
    npm run update-schema-client
    ```

# Connecting all servers

## Introduction
  - We use nginx to connect 3 servers together. 2 node servers and 1 python server (GraphQl)



## Nginx conf - Common

### Goes inside server conf
```
  # Media: images, icons, video, audio, HTC
  location ~* \.(?:jpg|jpeg|gif|png|ico|cur|gz|svg|svgz|mp4|ogg|ogv|webm|htc)$ {
    expires 7d;
    access_log off;
    add_header Cache-Control "public";
    proxy_pass http://127.0.0.1:[node-server-port]; # proxy_pass http://127.0.0.1:3000;
  }

  # CSS and Javascript
  location ~* \.(?:css|js)$ {
    expires 7d;
    access_log off;
    add_header Cache-Control "public";
    proxy_pass http://127.0.0.1:[node-server-port]; # proxy_pass http://127.0.0.1:3000;
  }
```
## Nginx Conf - admin
```
listen 8080;
set $graphQL  http://127.0.0.1:5000;

location / {
    expires -1;
    proxy_pass http://127.0.0.1:[node-admin-server-port]; # proxy_pass http://127.0.0.1:3000;
}

location /graphql-admin {
    expires -1;
    proxy_pass http://127.0.0.1:5000/graphql-admin;
}

location /s3-images {
     proxy_pass http://s3.amazonaws.com/[S3-bucket-name];
     # proxy_pass http://s3.amazonaws.com/images-dev.tripnino.com;
}

# Used to download CSV files and etc..

location /downloads {
     proxy_pass http://192.168.10.90:5000/downloads;
}

```

## Nginx Conf - Traveler
```
listen 80;

location / {
    proxy_pass http://127.0.0.1:[node-admin-server-port]; # proxy_pass http://127.0.0.1:3001;
}

location /graphql-traveler {
    proxy_pass http://127.0.0.1:5000/graphql-traveler;
}

location /s3-images {
     proxy_pass http://s3.amazonaws.com/[S3-bucket-name];
     # proxy_pass http://s3.amazonaws.com/images-dev.tripnino.com;
}

```
