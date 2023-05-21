docker build . -t backend-mysql

docker run -d -p 3306:3306 --env-file docker.env --name backend-mysql backend-mysql
docker run -d -p 8080:80 --env-file pma.env --name pma phpmyadmin