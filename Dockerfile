FROM adorsys/ci-build AS BUILD

USER root
WORKDIR /tmp

COPY . .
RUN npm install
RUN npx ng build

FROM nginx:1.17.3

COPY --from=BUILD /tmp/dist/test-app /usr/share/nginx/html
EXPOSE 80
