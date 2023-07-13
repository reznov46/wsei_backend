#!/bin/bash
set -e

mysql --protocol=socket -uroot -p$MYSQL_ROOT_PASSWORD <<EOSQL

EOSQL
