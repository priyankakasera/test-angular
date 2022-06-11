#Build stage
# base image(node:latest) taken from docker hub - version of node image should be same as ur development node version to avoid error
FROM node:14-alpine3.14 AS node
ARG ENV
 # set working directory inside image    
WORKDIR /app   
# first dot specifies the current directory where DockerFile is present. i.e. copy all code from this directory to docker working directory i.e. /app
COPY . .   
RUN echo $ENV                 
RUN npm install
RUN npm run build --prod


#Run Stage (The build stage is enough for creating the image. But since it contains all modules and code so the size of the image will be very large and hence we use another stage called run stage where we only copy the build from the build stage)

FROM nginx:alpine
COPY --from=node /app/dist/TestWebApp /usr/share/nginx/html


