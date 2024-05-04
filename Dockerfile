# nginx.conf

env ENVIRONMENT;

http {
    include       mime.types;
    default_type  application/octet-stream;

    server {
        listen       80;
        server_name  localhost;

        location / {
            root   /usr/share/nginx/html;
            index  index.html index.htm;
        }

        location /api/environment {
            add_header X-Environment $ENVIRONMENT;
            return 200 '{"environment": "' + $ENVIRONMENT + '"}';
        }
    }
}

