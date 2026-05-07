Dim strDir
strDir = Left(WScript.ScriptFullName, InStrRev(WScript.ScriptFullName, "\"))

Set WshShell = CreateObject("WScript.Shell")
WshShell.Run """" & strDir & "start.bat""", 0, False
Set WshShell = Nothing