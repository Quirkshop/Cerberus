FROM tiangolo/node-frontend:10 as build-stage
WORKDIR /usr/src/app/
ENV NODE_ENV production
COPY ./client/package*.json /usr/src/app/
RUN npm install
COPY ./client /usr/src/app/

RUN npm run build
#Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.15
COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html
# Copy the default nginx.conf provided by tiangolo/node-frontend
COPY --from=build-stage /usr/src/app/nginx-cust.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]