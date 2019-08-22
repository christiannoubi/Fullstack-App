FROM nginx:1.17.3

COPY ./dist/test-app /usr/share/nginx/html
EXPOSE 80
