FROM nginx:stable-alpine
RUN apk add jq curl
COPY default.conf /etc/nginx/conf.d/default.conf.template

COPY build /usr/share/nginx/html

CMD ["/bin/sh",  "-c",  "envsubst < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"]
