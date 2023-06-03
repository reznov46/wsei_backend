FROM backend
WORKDIR /usr/src/app/athena

COPY . .
RUN npm i
run npm run build

CMD [ "npm", "start" ]

EXPOSE 3000