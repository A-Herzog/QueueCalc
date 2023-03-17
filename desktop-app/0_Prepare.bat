cd ..
call neu.cmd create myapp
mkdir bin
move myapp\bin\*.* bin
rmdir /S /Q myapp