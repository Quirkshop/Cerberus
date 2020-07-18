FROM node:8
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
COPY ./server/package*.json /usr/src/app/

RUN npm install --silent
# Copy app source code
COPY ./server /usr/src/app/

# RUN node -r dotenv/config config.js

#Expose port and start application
EXPOSE 5000
CMD [ "npm", "start", "server.js" ]