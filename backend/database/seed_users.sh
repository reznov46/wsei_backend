#!/bin/bash
set -e

mysql --protocol=socket -uroot -p$MYSQL_ROOT_PASSWORD <<EOSQL

CREATE USER 'cerber'@'10.0.0.4' IDENTIFIED WITH caching_sha2_password BY '$CERBER_PASSWORD';
GRANT SELECT ON cerber.* TO 'cerber'@'10.0.0.4';
ALTER USER 'cerber'@'10.0.0.4' REQUIRE NONE WITH MAX_QUERIES_PER_HOUR 0 MAX_CONNECTIONS_PER_HOUR 0 MAX_UPDATES_PER_HOUR 0 MAX_USER_CONNECTIONS 0;

CREATE USER 'athena'@'10.0.0.5' IDENTIFIED WITH caching_sha2_password BY '$ATHENA_PASSWORD';
GRANT SELECT ON athena.* TO 'athena'@'10.0.0.5';
ALTER USER 'athena'@'10.0.0.5' REQUIRE NONE WITH MAX_QUERIES_PER_HOUR 0 MAX_CONNECTIONS_PER_HOUR 0 MAX_UPDATES_PER_HOUR 0 MAX_USER_CONNECTIONS 0;

EOSQL
