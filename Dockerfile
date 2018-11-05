FROM node:alpine
COPY package-lock.json package.json
RUN npm install

#Add your source files
COPY . .
ADD . .
EXPOSE 3002
CMD ["npm", "start"]
