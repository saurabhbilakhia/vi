APP_NAME=ValueInvesting
APP_HOME=C:/dev/vi

# if [ $# -ne 1 ]; then
#     echo usage: build.sh [environment-name:sit\|uat\|prod]
#     echo $1 example: build.sh uat
#     exit 1
# fi

echo /////////////////////////////
echo /// Starting build script ///
echo /////////////////////////////

# environment=$1
# echo '/// Building app for' $environment 'environment ///'

# if [ "$environment" = "sit" ]; then
#   echo /// Updating patch version ///
#   npm version patch -m "Jenkins build for $environment environment"
# elif [ "$environment" = "uat" ]; then
#   echo /// Updating minor version ///
#   npm version minor -m "Jenkins build for $environment environment"
# elif [ "$environment" = "prod" ]; then
#   echo /// Updating major version ///
#   npm version major -m "Jenkins build for $environment environment"
# fi

# version=$(node -e "console.log(require('./package.json').version)")

# # git tag $version
# git push -v --tags origin HEAD:master

# echo /////////////////////////////////
# echo /// Building version $version ///
# echo /////////////////////////////////

# targetdir=$DEPLOY_HOME/$APP_NAME/$version/
# echo /// Target directory: $targetdir ///
# mkdir -p $targetdir

# echo /// Copying node.js/Angular files ///
# cp package.json $targetdir
# cp bower.json $targetdir
# cp gulpfile.js $targetdir
# cp start.sh $targetdir
# cp *.config.sh $targetdir
# cp -R src/server $targetdir
# cp -R build $targetdir
# cp -R nginx_config $targetdir

cd $APP_HOME

# npm install && bower install
npm run build

# echo //////////////////////////////
# echo ///// Generating tarball /////
# echo //////////////////////////////

# cd ..
# tar -zcf $APP_NAME-$version.tar.gz $version
# cd ..

# echo
# echo WARNING: Build will only be compatible with the following node.js version and O/S version:
# echo Node version:
# node --version
# echo Operating system type: $OSTYPE
# echo note: o/s type of msys refers to Windows
# echo If deploying to a different system please remove node_modules directory on the target server and run 'npm install --only=prod --no-optional' on that server
