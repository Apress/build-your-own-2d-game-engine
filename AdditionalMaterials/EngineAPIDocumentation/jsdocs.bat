@Echo OFF

:: JSDOC batch for generating JSDOC 
:: files in a better order than JSDOCS provides
:: By Brandan Haertel 12/2015

cls

ECHO JSDOC Generation for UWB
ECHO Assumes you have node.js installed &echo.and jsdocs installed globally with the NPM&echo.&echo.
ECHO Running Script...
jsdoc -c conf.json --readme README.me