cd ..
del QueueCalc.exe
del QueueCalc_Linux_MacOS.zip
call neu.cmd build --release
cd desktop-app
"C:\Program Files (x86)\NSIS\makensis.exe" Launcher.nsi
move QueueCalc.exe ..
cd ..
move .\dist\QueueCalc-release.zip QueueCalc_Linux_MacOS.zip
rmdir /S /Q dist
cd desktop-app