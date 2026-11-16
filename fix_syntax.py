with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix double brackets
content = content.replace('}\n                        } else if (s2Step === 3) {', '}\n                         else if (s2Step === 3) {')
content = content.replace('}\n                        } else if (s2Step === 4) {', '}\n                         else if (s2Step === 4) {')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)
