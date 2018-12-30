#!/bin/bash

if [ $# -ne 1 ]; then
    echo $0: usage: start.sh [environment-name:dev\|prod]
    echo $1: example: start.sh dev
    exit 1
fi

environment=$1

if [ "$environment" = "dev" ]; then
        source dev.config.sh
        echo $0: Running $environment configuration
elif [ "$environment" = "prod" ]; then
        source prod.config.sh
        echo $0: Running $environment configuration
fi

APP_HOME=/local/apps/ValueInvesting/src

if [ "$SALESDESKTOP_ENV" = "" ] ; then
        SALESDESKTOP_ENV=uat
fi

# AutoSys may run this script out of a different directory
# --- CHANGE LINE BELOW ACCORDING TO CURRENT MACHINE ---
cd $SALESDESKTOP_HOME

pm2 stop salesdesktop01
pm2 stop salesdesktop02
sleep 3

# If redis is already started the below is OK:
$REDIS_HOME/redis-server --daemonize yes
sleep 3
$REDIS_HOME/redis-cli INFO server | grep redis_version
$REDIS_HOME/redis-cli FLUSHALL


# Start sales desktop instances using pm2.  You can't start using a pm2 config file or it just restarts the same app again and again, so we directly start the main node.js script.
PORT=8201 SAVETODB=true  pm2 start src/server/app.js -f --name "salesdesktop01"
#PORT=8202 SAVETODB=false pm2 start src/server/app.js -f --name "salesdesktop02"

cd /local/apps/shared/nginx/current/sbin
# Start nginx (reload if it is already running)
./nginx -s reload || ./nginx -c /local/apps/shared/nginx/current/conf/nginx-master.conf