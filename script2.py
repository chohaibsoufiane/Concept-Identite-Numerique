import re

with open('script.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Replace the camera target
js = re.sub(
    r's2Viewer\.cameraTarget = "0\.3694.*?m";',
    's2Viewer.cameraTarget = "0.77271593980757m 0.5462645244482018m 0.016798734138134607m";',
    js
)

# Replace the camera orbit
js = re.sub(
    r's2Viewer\.cameraOrbit = "-4\.426.*?m";',
    's2Viewer.cameraOrbit = "-4.651505401826784rad 1.5220894639485403rad 2.846136024189334m";',
    js
)

with open('script.js', 'w', encoding='utf-8') as f:
    f.write(js)
