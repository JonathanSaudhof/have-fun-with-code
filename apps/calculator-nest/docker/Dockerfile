# Base image
FROM node:18 as base

# Create app directory
WORKDIR /home

FROM base as deps

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

FROM deps as build
# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN npx nx run calculator-nest:build:production

FROM base as run

EXPOSE 3000

COPY --from=deps /home/node_modules ./node_modules
COPY --from=build /home/dist/apps/calculator-nest ./dist/apps/calculator-nest

CMD [ "node", "dist/apps/calculator-nest/main.js" ]
