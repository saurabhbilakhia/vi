APP_NAME=vi
APP_HOME=C:/dev/

echo /////////////////////////////
echo /// Starting application ///
echo /////////////////////////////

cd $APP_HOME/$APP_NAME

if [ $# -ne 1 ]; then
    echo $0: usage: start.sh [environment-name:dev\|prod]
    echo $1: example: start.sh dev
    exit 1
fi

environment=$1

if [ "$environment" = "dev" ]; then
        NODE_ENV=development
        echo $0: Running $environment configuration
elif [ "$environment" = "prod" ]; then
        NODE_ENV=production
        echo $0: Running $environment configuration
fi

node src/server/app.js