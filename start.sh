APP_NAME=vi
APP_HOME=/home/saurabhbilakhia_developer

echo /////////////////////////////
echo /// Starting application ///
echo /////////////////////////////

cd $APP_HOME/$APP_NAME

NODE_ENV=production node src/server/app.js