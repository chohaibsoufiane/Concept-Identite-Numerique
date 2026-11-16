import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix updateSnake4 logic
# We need to target updateSnake4 specifically
def fix_s4(match):
    s = match.group(0)
    s = s.replace('const p1x = w * 0.62;', 'const p1x = w * 0.49;')
    s = s.replace('const p1y = h * 0.50;', 'const p1y = h * 0.50;')
    return s

content = re.sub(r'function updateSnake4\(\).*?}', fix_s4, content, flags=re.DOTALL)

# And make sure the dot is also at 49vw
content = re.sub(r'(<div id="s4-overlay".*?)left: 50vw; top: 50vh;', r'\1left: 49vw; top: 50vh;', content, flags=re.DOTALL)


with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)
