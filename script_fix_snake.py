import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Enhance updateSnake
old_script = '''const length = path.getTotalLength();
                        path.style.setProperty('--path-len', length);'''

new_script = '''try {
                            const length = path.getTotalLength();
                            path.style.setProperty('--path-len', length > 0 ? length : 2000);
                        } catch(e) {
                            path.style.setProperty('--path-len', 2000);
                        }'''

html = html.replace(old_script, new_script)

# Trigger updateSnake on transition
old_step_logic = '''s2Step = 2;
                            slide2.classList.remove('step-2');
                            slide2.classList.add('step-3');'''

new_step_logic = '''s2Step = 2;
                            if (typeof updateSnake === 'function') updateSnake();
                            slide2.classList.remove('step-2');
                            slide2.classList.add('step-3');'''

html = html.replace(old_step_logic, new_step_logic)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
