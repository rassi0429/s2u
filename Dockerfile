FROM node:20-alpine
WORKDIR /app
COPY package.json .
COPY package-lock.json .
COPY unchi.mjs .
RUN npm i
CMD ["node","unchi.mjs"]