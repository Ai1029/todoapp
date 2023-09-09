FROM node:latest as builder

WORKDIR /usr/src/client

COPY package*.json .
RUN npm install
COPY . .
RUN npm run build


FROM nginx

RUN rm -rf /etc/nginx/conf.d

EXPOSE 80
COPY --from=builder /usr/src/client/conf /etc/nginx
COPY --from=builder /usr/src/client/build /usr/share/nginx/html
# CMD ["nginx", "-g", "daemon off;"]