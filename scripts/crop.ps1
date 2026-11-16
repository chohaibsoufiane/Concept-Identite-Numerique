Add-Type -AssemblyName System.Drawing
$src2 = "C:\Users\lufylon\.gemini\antigravity\brain\e543c56d-14c9-4249-ac29-666551362d41\.system_generated\steps\204\media_0.png"
$dest2 = "c:\Users\lufylon\Documents\antigravity\gallant-galileo\mockup_chat_2.png"

$bmp = [System.Drawing.Bitmap]::FromFile($src2)
$rect = New-Object System.Drawing.Rectangle(648, 44, 376, 840)
$cropped = $bmp.Clone($rect, $bmp.PixelFormat)
$cropped.Save($dest2, [System.Drawing.Imaging.ImageFormat]::Png)
$cropped.Dispose()
$bmp.Dispose()
Write-Output "SUCCESS: Re-saved Mockup 2 with full height"
