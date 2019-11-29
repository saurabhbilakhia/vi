APP_NAME=vi
APP_HOME=$PWD

echo /////////////////////////////
echo /// Starting application ///
echo /////////////////////////////

cd $APP_HOME

NODE_ENV=production node src/server/app.js