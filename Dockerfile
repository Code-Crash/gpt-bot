# FROM node:18.4.0-alpine

# Check out https://hub.docker.com/_/node to select a new base image
FROM node:16.16.0

# Set to a non-root built-in user `node`
USER node

# Bind to all network interfaces so that it can be mapped to the host OS
ENV PORT=4000 _WORKDIR_=/home/node/app
# Create app directory (with user `node`)
RUN mkdir -p $_WORKDIR_
WORKDIR $_WORKDIR_
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY --chown=node package*.json ./

RUN npm install

# Bundle app source code
COPY --chown=node . .

EXPOSE ${PORT}

CMD [ "node", "." ]
