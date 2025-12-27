cd ..
del QueueCalc.exe

call neu.cmd build --release --embed-resources

move .\dist\QueueCalc\QueueCalc-win_x64.exe QueueCalc.exe
rmdir /S /Q dist
cd desktop-app