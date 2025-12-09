#!/usr/bin/env python3
# apply_site_unify.py
# Run from repo root: python3 apply_site_unify.py
# This script BACKS UP files before editing them.

import shutil, os, sys, re

# Paths (as you provided)
INDEX = "index.html"
PRIV = "public/privacy-policy.html"
TERMS = "public/terms.html"
STYLES = "public/styles.css"

files = [INDEX, PRIV, TERMS, STYLES]

# Ensure files exist
for f in files:
    if not os.path.isfile(f):
        print(f"Error: required file not found: {f}")
        sys.exit(1)

# Backup
for f in files:
    bak = f + ".bak"
    if not os.path.exists(bak):
        shutil.copyfile(f, bak)
        print(f"Backed up {f} -> {bak}")
    else:
        print(f"Backup already exists for {f} -> {bak}")

# CSS to append (marker used to avoid duplicates)
css_marker_start = "/* HS-UNIFY-STYLES START */"
css_marker_end = "/* HS-UNIFY-STYLES END */"
css_block = f"""
{css_marker_start}
.site-header {{
  position: sticky;
  top: 0;
  width: 100%;
  background: var(--bg, #ffffff);
  border-bottom: 1px solid rgba(0,0,0,0.06);
  z-index: 200;
  backdrop-filter: blur(4px);
}}
.header-inner {{ padding: 0.8rem 1rem; max-width:1200px; margin:0 auto; display:flex; align-items:center; justify-content:space-between; gap:1rem; }}
.site-brand {{ font-weight:700; font-size:1.05rem; color:var(--brand, #0b5cff); text-decoration:none; }}
.site-nav {{ display:flex; align-items:center; gap:0.75rem; }}
.site-nav .nav-link {{ text-decoration:none; color:var(--text, #222); padding:0.45rem 0.6rem; border-radius:6px; }}
.site-nav .nav-link:hover {{ background: rgba(0,0,0,0.03); }}
.nav-cta {{ margin-left:0.5rem; padding:0.45rem 0.9rem; border-radius:8px; text-decoration:none; display:inline-block; }}
.btn {{ background:var(--brand, #0b5cff); color:#fff; padding:0.45rem 0.9rem; border-radius:7px; text-decoration:none; display:inline-block; }}

.page-content {{ background: linear-gradient(90deg, rgba(11,92,255,0.03), rgba(7,160,129,0.02)); padding: 2rem 1rem; min-height: 60vh; }}
.container {{ max-width: 1100px; margin: 0 auto; padding: 0 1rem; box-sizing: border-box; }}

.hs-form-field label {{
  display: block !important;
  color: #222 !important;
  font-weight: 600 !important;
  margin-bottom: 6px !important;
}}
.hs-form-field input, .hs-form-field textarea, .hs-input {{
  width: 100% !important;
  padding: 10px !important;
  border-radius: 6px !important;
  border: 1px solid #e6e6e6 !important;
  box-sizing: border-box !important;
}}

.hg-modal-backdrop {{
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.45);
  display: none;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 1rem;
}}
.hg-modal {{
  width: 100%;
  max-width: 720px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 12px 40px rgba(0,0,0,0.15);
  overflow: auto;
  max-height: 90vh;
  padding: 1.25rem;
}}
.hg-modal .hg-close {{
  float: right;
  background: transparent;
  border: none;
  font-size: 1.1rem;
  cursor: pointer;
}}
.hg-modal h2 {{ margin-top: 0; }}
.hg-modal.show {{ animation: hgFadeIn 180ms ease-out; }}
@keyframes hgFadeIn {{ from {{ opacity: 0; transform: translateY(6px) }} to {{ opacity:1; transform: translateY(0) }} }}

.floating-menu, .floating-nav {{ display: none !important; }}
{css_marker_end}
"""

# Append CSS if marker not present
with open(STYLES, "r+", encoding="utf-8") as fh:
    content = fh.read()
    if css_marker_start in content:
        print("CSS marker already present in styles.css — skipping append.")
    else:
        fh.write("\n\n" + css_block)
        print("Appended unify CSS to styles.css")

# Modal + loader to inject into index.html (marker)
modal_marker = "<!-- HS-MODAL-INJECT -->"
# NOTE: this is a regular triple-quoted string (not an f-string) to avoid f-string brace interpretation.
modal_html = """
<!-- HS-MODAL-INJECT -->
<!-- HubSpot modal (injected by script) -->
<div id="hs-modal-backdrop" class="hg-modal-backdrop" aria-hidden="true" role="dialog" aria-modal="true" style="display:none;">
  <div class="hg-modal" id="hs-modal" role="document">
    <button class="hg-close" id="hs-modal-close" aria-label="Close subscription form">✕</button>
    <div id="hs-form-target-modal">
      <h2>Subscribe to our newsletter</h2>
      <p style="color:#555;">Enter your email below and confirm via the email you receive (double opt-in).</p>
      <!-- HubSpot form will render here -->
    </div>
  </div>
</div>

<script charset="utf-8" type="text/javascript" src="//js.hsforms.net/forms/v2.js"></script>
<script>
(function(){
  // Replace PORTAL_ID and FORM_ID with your HubSpot values (strings).
  var portalId = "PORTAL_ID";
  var formId = "FORM_ID";
  var loaded = false;
  var backdrop = document.getElementById('hs-modal-backdrop');
  var openButtons = Array.prototype.slice.call(document.querySelectorAll('a, button'));
  // find subscribe-like elements (text contains "subscribe" case-insensitive) and add click handler
  openButtons.forEach(function(el){
    try {
      if(el.textContent && /subscribe/i.test(el.textContent.trim())){
        el.addEventListener('click', function(e){
          // Prevent default navigation if it's a link
          if(el.tagName.toLowerCase() === 'a'){ e.preventDefault(); }
          openModal();
        });
      }
    } catch(err){ /* ignore */ }
  });

  var closeBtn = document.getElementById('hs-modal-close');

  function openModal(){
    backdrop.style.display = 'flex';
    backdrop.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
    if(!loaded){
      var tries = 0;
      var interval = setInterval(function(){
        tries++;
        if(window.hbspt && hbspt.forms && typeof hbspt.forms.create === 'function'){
          try {
            hbspt.forms.create({ portalId: portalId, formId: formId, target: '#hs-form-target-modal' });
            loaded = true;
            clearInterval(interval);
          } catch(e){ console.error(e); }
        } else if(tries > 30){
          clearInterval(interval);
        }
      }, 200);
    }
  }

  function closeModal(){
    backdrop.style.display = 'none';
    backdrop.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
  }

  if(closeBtn) closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', function(e){ if(e.target === backdrop) closeModal(); });
  document.addEventListener('keydown', function(e){ if(e.key === 'Escape') closeModal(); });
})();
</script>
"""

# Inject modal script before </body> in index.html if marker not present
with open(INDEX, "r+", encoding="utf-8") as fh:
    content = fh.read()
    if modal_marker in content:
        print("Modal already injected into index.html — skipping.")
    else:
        new_content = re.sub(r'</body\s*>', modal_html + '\n</body>', content, flags=re.IGNORECASE)
        if new_content == content:
            print("Warning: could not find </body> in index.html; appending modal to EOF.")
            new_content = content + "\n" + modal_html
        fh.seek(0)
        fh.truncate(0)
        fh.write(new_content)
        print("Injected HubSpot modal + loader into index.html (be sure to set PORTAL_ID and FORM_ID).")

# Header HTML for legal pages (links to index anchors)
header_html = """
<header class="site-header" role="banner">
  <div class="container header-inner">
    <a class="site-brand" href="/index.html" aria-label="Home - CoreGuard Mobility">CoreGuard Mobility</a>
    <nav class="site-nav" role="navigation" aria-label="Main navigation">
      <a class="nav-link" href="/index.html#home">HOME</a>
      <a class="nav-link" href="/index.html#our-story">OUR STORY</a>
      <a class="nav-link" href="/index.html#customization">CUSTOMIZATION</a>
      <a class="nav-link" href="/index.html#our-partners">OUR PARTNERS</a>
      <a class="nav-link" href="/index.html#contact-us">CONTACT US</a>
      <button class="btn nav-cta" type="button" aria-haspopup="dialog" aria-controls="hs-modal">Subscribe</button>
    </nav>
  </div>
</header>
"""

footer_html = """
<footer class="site-footer" role="contentinfo">
  <div class="container" style="display:flex;justify-content:space-between;align-items:center;gap:1rem;">
    <div><small>&copy; <span class="site-year"></span> CoreGuard Mobility</small></div>
    <div><a href="/privacy-policy.html">Privacy Policy</a> · <a href="/terms.html">Terms</a> · <a href="mailto:info@coreguardmobility.com">Email Us</a></div>
  </div>
</footer>
<script>
  (function(){ var el = document.querySelector('.site-year'); if(el) el.textContent = new Date().getFullYear(); })();
</script>
"""

# Function to add header/footer to a file if not present
def unify_legal_page(path):
    with open(path, "r+", encoding="utf-8") as fh:
        content = fh.read()
        modified = content
        # add body class if not present
        if re.search(r'<body[^>]*class=[\'"][^\'"]*page-static', content, flags=re.IGNORECASE):
            pass
        else:
            # add class page-static to existing <body ...> tag
            modified, n = re.subn(r'<body([^>]*)>', r'<body\1 class="page-static">', modified, count=1, flags=re.IGNORECASE)
            if n == 0:
                # try alternative: <body> exact match
                modified, n2 = re.subn(r'<body\s*>', '<body class="page-static">', modified, count=1, flags=re.IGNORECASE)

        # insert header after opening <body ...> if site-header not present
        if 'class="site-header"' not in modified and 'class=site-header' not in modified:
            modified = re.sub(r'(<body[^>]*>)', r'\1\n' + header_html, modified, count=1, flags=re.IGNORECASE)
            print(f"Inserted header into {path}")
        else:
            print(f"Header already present in {path}; skipping insert.")

        # insert footer before </body> if not present
        if 'class="site-footer"' not in modified and 'class=site-footer' not in modified:
            if re.search(r'</body\s*>', modified, flags=re.IGNORECASE):
                modified = re.sub(r'(</body\s*>)', footer_html + r'\n\1', modified, count=1, flags=re.IGNORECASE)
                print(f"Inserted footer into {path}")
            else:
                # append at end
                modified = modified + "\n" + footer_html
                print(f"Appended footer to EOF of {path}")
        else:
            print(f"Footer already present in {path}; skipping insert.")

        # add wrapper main.page-content if not present: attempt to wrap existing main content
        if '<main' not in modified:
            # wrap body inner content (after header) with <main class="page-content"><div class="container"> ... </div></main>
            # find position after header
            m = re.search(re.escape(header_html), modified)
            if m:
                pos = m.end()
                # find closing body (we'll wrap until closing body)
                endpos = modified.rfind('</body>')
                if endpos != -1 and endpos > pos:
                    inner = modified[pos:endpos]
                    wrapped = '\n<main class="page-content"><div class="container">\n' + inner.strip() + '\n</div></main>\n'
                    modified = modified[:pos] + wrapped + modified[endpos:]
                    print(f"Wrapped content in <main> for {path}")
        else:
            print(f"Main tag present in {path}; not wrapping.")

        fh.seek(0)
        fh.truncate(0)
        fh.write(modified)

# Apply to privacy and terms
unify_legal_page(PRIV)
unify_legal_page(TERMS)

print("\nDone. Please:\n - Open public/styles.css and confirm CSS appended.\n - Open index.html and set your HubSpot PORTAL_ID and FORM_ID in the modal script.\n - Open public/privacy-policy.html and public/terms.html to confirm content sits inside the new container (if not, manually move content inside <main class=\"page-content\">).")
