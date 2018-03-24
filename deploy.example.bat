echo "Starting Tizen deployment"
@echo off

set TIZEN_HOME=C:\tizen-studio\

set security_profile=YOUR-SECURITY-PROFILE
set build_path=%~dp0\dist
set file_name=SalzTransport.wgt

set target=emulator-26101
set target=XXX.XXX.XXX.XXX:26101

set package_id=sRVkFYgzLa.SalzTransport

set TIZEN_CLI=%TIZEN_HOME%tools\ide\bin\tizen.bat
set SDB_CLI=%TIZEN_HOME%tools\sdb.exe

if "%1"=="devices" (
    %SDB_CLI% devices
) else (
	
	echo.
	echo **********************************************************************
	echo ***************Connect************************************************
	echo **********************************************************************
    echo %SDB_CLI% connect %target%
    %SDB_CLI% connect %target%

	echo.
	echo **********************************************************************
	echo ***************Package************************************************
	echo **********************************************************************
    echo %TIZEN_CLI% package -t wgt -s %security_profile% -- %build_path%
    %TIZEN_CLI% package -t wgt -s %security_profile% -- %build_path%

	echo.
	echo **********************************************************************
	echo ***************Install************************************************
	echo **********************************************************************
    echo %TIZEN_CLI% install -n %file_name% -s %target% -- %build_path%
    %TIZEN_CLI% install -n %file_name% -s %target% -- %build_path%

	echo.
	echo **********************************************************************
	echo ***************Run****************************************************
	echo **********************************************************************
    echo %TIZEN_CLI% run -p %package_id% -s %target%
    %TIZEN_CLI% run -p %package_id% -s %target%
)