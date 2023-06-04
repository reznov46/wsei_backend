FROM mysql

# Seed database
COPY ./seed.sql /docker-entrypoint-initdb.d/
COPY ./seed_users.sh /docker-entrypoint-initdb.d/seed_users.sh

RUN chmod +x /docker-entrypoint-initdb.d/seed_users.sh

EXPOSE 3306
