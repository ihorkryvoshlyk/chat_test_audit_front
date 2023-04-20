# pull official base image
FROM node:16-alpine AS builder

# set working directory
WORKDIR /app


# install app dependencies
#copies package.json and package-lock.json to Docker environment
COPY package.json .

# Installs all node packages
RUN yarn install


# Copies everything over to Docker environment
COPY . .
RUN yarn run build

#Stage 2
#######################################
#pull the official nginx:1.19.0 base image
FROM nginx:1.12-alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]