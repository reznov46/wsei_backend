FROM wsei_backend
WORKDIR /usr/src/app/cerber

COPY . .
RUN npm i
run npm run build

CMD [ "npm", "start" ]

EXPOSE 3000