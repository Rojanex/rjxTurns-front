# pull official base image
FROM node:alpine
# create working directory
RUN mkdir -p /app
# set working directory. All command below will be executed on this folder
WORKDIR /app
# copy dependencies reference file i.e. package.json to app folder
COPY package.json ./
# install app dependencies and ignore package-lock.json if in case its present
RUN npm install --no-package-lock
EXPOSE 3000
ENV WATCHPACK_POLLING=true
# add all code to app folder
ADD . ./
# start app
CMD ["npm", "start"]