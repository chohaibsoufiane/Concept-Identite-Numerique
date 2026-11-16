
import re

with open("index.html", "r", encoding="utf-8") as f:
    html = f.read()

html = html.replace(
    "const pos = camera-orbit=\"rad rad m\" camera-target=\"m m m\";",
    "const pos = `camera-orbit=\"${orbit.theta}rad ${orbit.phi}rad ${orbit.radius}m\" camera-target=\"${target.x}m ${target.y}m ${target.z}m\"`;"
)
html = html.replace(
    "const pos = camera-orbit=\"\" camera-target=\"\";",
    "const pos = `camera-orbit=\"${viewer.cameraOrbit}\" camera-target=\"${viewer.cameraTarget}\"`;"
)

html = re.sub(r"alert\(\"Copied to clipboard: \s+\" \+ pos\);", "alert(\"Copied to clipboard: \\\\n\" + pos);", html)
html = re.sub(r"alert\(\"Fallback copied: \s+\" \+ pos\);", "alert(\"Fallback copied: \\\\n\" + pos);", html)

with open("index.html", "w", encoding="utf-8") as f:
    f.write(html)

