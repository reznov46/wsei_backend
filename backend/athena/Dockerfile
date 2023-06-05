FROM wsei_backend
WORKDIR /usr/src/app/athena

COPY . .
RUN npm i
run npm run build

CMD [ "npm", "run", "watch" ]

EXPOSE 3000