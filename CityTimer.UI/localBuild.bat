@ECHO OFF

DATE /T & TIME /T
CD .\src
ECHO %cd%
ECHO install of bower
CALL bower cache clean
CALL bower install

ECHO GULP me
CD ..\
ECHO %cd%
ECHO install of npm
CALL npm install

@ECHO Building the site
CALL gulp build