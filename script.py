import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. REMOVE all the old step-3 CSS logic and replace it with the new radial logic
old_css_pattern = r'(\.s3-text-content \{.*?)(\</style>)'
new_css = '''/* --- RADIAL BURST CSS (STEP 3) --- */
                #slide-2.step-3 .s2-text { opacity: 0; pointer-events: none; }
                
                #s3-radial-overlay {
                    position: absolute;
                    top: 0; left: 0; width: 100vw; height: 100vh;
                    z-index: 2; /* Behind the 3D model! */
                    pointer-events: none;
                }
                
                .radial-center {
                    position: absolute;
                    bottom: 25vh; /* Anchor near the bottom center iceberg peak */
                    left: 50vw;
                    width: 0; height: 0;
                }

                .radial-node {
                    position: absolute;
                    top: 0; left: 0;
                }

                /* Distribution Angles */
                .node-1 { --angle: -75deg; --delay-icon: 1.5s; --delay-text: 2.3s; }
                .node-2 { --angle: -25deg; --delay-icon: 1.7s; --delay-text: 2.5s; }
                .node-3 { --angle: 25deg;  --delay-icon: 1.9s; --delay-text: 2.7s; }
                .node-4 { --angle: 75deg;  --delay-icon: 2.1s; --delay-text: 2.9s; }

                .r-icon {
                    position: absolute;
                    width: 80px; height: 80px;
                    margin-top: -40px; margin-left: -40px;
                    border-radius: 50%;
                    background: #00A8FF;
                    display: flex; justify-content: center; align-items: center;
                    color: white;
                    box-shadow: 0 10px 30px rgba(0, 168, 255, 0.4);
                    
                    /* Hidden at center */
                    transform: scale(0) rotate(0) translateY(0) rotate(0);
                    transition: transform 1s cubic-bezier(0.34, 1.56, 0.64, 1);
                }

                .r-icon svg {
                    width: 36px; height: 36px; stroke-width: 2px;
                }

                .r-text-container {
                    position: absolute;
                    margin-top: -40px; margin-left: -40px;
                    width: 80px; height: 80px;
                    display: flex; justify-content: center;
                }

                .r-text {
                    position: absolute;
                    top: -15px; /* Adjust to sit right above the icon */
                    white-space: nowrap;
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(10px);
                    padding: 1rem 2rem;
                    border-radius: 100px;
                    font-size: 1.4rem;
                    font-weight: 800;
                    color: #000;
                    box-shadow: 0 15px 35px rgba(0,0,0,0.1);
                    text-align: center;
                    
                    /* Hidden directly over the icon */
                    opacity: 0;
                    transform: scale(0.5);
                    transition: opacity 0.6s ease, transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
                }

                .r-sub {
                    font-size: 1.1rem;
                    opacity: 0.6;
                    font-weight: 500;
                    display: block;
                    margin-top: 0.2rem;
                }

                /* Step 3 Triggers */
                #slide-2.step-3 .r-icon {
                    /* Shoot out 380px radially and stay upright! */
                    transform: rotate(var(--angle)) translateY(-380px) rotate(calc(var(--angle) * -1)) scale(1);
                    transition-delay: var(--delay-icon);
                }

                #slide-2.step-3 .r-text-container {
                    /* Travel with the icon */
                    transform: rotate(var(--angle)) translateY(-380px) rotate(calc(var(--angle) * -1)) scale(1);
                    transition-delay: var(--delay-icon);
                }

                #slide-2.step-3 .r-text {
                    /* Pop further out along the SAME radial line! */
                    opacity: 1;
                    transform: rotate(var(--angle)) translateY(-90px) rotate(calc(var(--angle) * -1)) scale(1);
                    transition-delay: var(--delay-text);
                }
            </style>'''

html = re.sub(old_css_pattern, new_css, html, flags=re.DOTALL)

# 2. REMOVE old HTML content and add the radial burst
old_html_pattern = r'<!-- Perfect circle dot at the tip -->.*?</div>\s*</div>\s*</div>\s*</div>'

new_html = '''<!-- Radial Burst (Step 3) -->
            <div id="s3-radial-overlay">
                <div class="radial-center">
                    <!-- Icon 1: User -->
                    <div class="radial-node node-1">
                        <div class="r-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                        </div>
                        <div class="r-text-container">
                            <div class="r-text">Avatar Public<span class="r-sub">(Profils sociaux)</span></div>
                        </div>
                    </div>
                    
                    <!-- Icon 2: Pen/Edit -->
                    <div class="radial-node node-2">
                        <div class="r-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                        </div>
                        <div class="r-text-container">
                            <div class="r-text">Traces Actives<span class="r-sub">(Publications)</span></div>
                        </div>
                    </div>
                    
                    <!-- Icon 3: Invisible/Eye Off -->
                    <div class="radial-node node-3">
                        <div class="r-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                        </div>
                        <div class="r-text-container">
                            <div class="r-text">Traces Passives<span class="r-sub">(Invisibles - IP)</span></div>
                        </div>
                    </div>
                    
                    <!-- Icon 4: Like/Heart -->
                    <div class="radial-node node-4">
                        <div class="r-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                        </div>
                        <div class="r-text-container">
                            <div class="r-text">Generation Mecanique<span class="r-sub">(Likes)</span></div>
                        </div>
                    </div>
                </div>
            </div>'''

html = re.sub(old_html_pattern, new_html, html, flags=re.DOTALL)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
