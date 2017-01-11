@ECHO OFF

DATE /T & TIME /T
CD .\src
ECHO %cd%
ECHO install of bower
CALL npm install -g bower
CALL bower cache clean
CALL bower install

ECHO GULP me
CD ..\
ECHO %cd%
ECHO install of npm
CALL npm install
CALL npm install gulp --save-dev
ECHO bower-files
CALL npm i gulp-bower-files

@ECHO Building the site
CALL gulp build