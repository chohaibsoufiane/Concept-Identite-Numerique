import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Replace the camera target for step 3
html = re.sub(
    r's2Viewer\.cameraTarget = "0\.36945186932407825m 0\.2798089986348628m 0\.7487632920539601m";',
    's2Viewer.cameraTarget = "0.77271593980757m 0.5462645244482018m 0.016798734138134607m";',
    html
)

# Replace the camera orbit for step 3
html = re.sub(
    r's2Viewer\.cameraOrbit = "-4\.426236161162396rad 1\.4672942432463922rad 3\.3600154377893885m";',
    's2Viewer.cameraOrbit = "-4.651505401826784rad 1.5220894639485403rad 2.846136024189334m";',
    html
)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
