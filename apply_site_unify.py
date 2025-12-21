#!/usr/bin/env python3
# apply_site_unify.py
# Run from repo root: python3 apply_site_unify.py
# This script BACKS UP files before editing them.

import shutil, os, sys, re

# Paths
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

# Backup files (once)
for f in files:
    bak = f + ".bak"
    if not os.path.exists(bak):
        shutil.copyfile(f, bak)
        print(f"Backed up {f} -> {bak}")
    else:
        print(f"Backup already exists for {f}")

# -------------------------------------------------------------------
# CSS UNIFY BLOCK (no HubSpot, no modal remnants)
# -------------------------------------------------------------------

css_marker_start = "/* SITE-UNIFY-STYLES START */"
css_marker_end = "/* SITE-UNIFY-STYLES END */"

css_block = f"""
{css_marker_start}
.site-header {{
  position: sticky;
  top: 0;
  width: 100%;
  background: var(--bg, #ffffff);
  border-bottom: 1px solid rgba(0,0,0,0.06);
  z-index: 200;
}}

.header-inner {{
  padding: 0.8rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}}

.site-brand {{
  font-weight: 700;
  font-size: 1.05rem;
  color: var(--brand, #0b5cff);
  text-decoration: none;
}}

.site-nav {{
  display: flex;
  align-items: center;
  gap: 0.75rem;
}}

.site-nav .nav-link {{
  text-decoration: none;
  color: var(--text, #222);
  padding: 0.45rem 0.6rem;
  border-radius: 6px;
}}

.site-nav .nav-link:hover {{
  background: rgba(0,0,0,0.03);
}}

.btn {{
  background: var(--brand, #0b5cff);
  color: #fff;
  padding: 0.45rem 0.9rem;
  border-radius: 7px;
  text-decoration: none;
  display: inline-block;
}}

.page-content {{
  background: linear-gradient(
    90deg,
    rgba(11,92,255,0.03),
    rgba(7,160,129,0.02)
  );
  padding: 2rem 1rem;
  min-height: 60vh;
}}

.container {{
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1rem;
  box-sizing: border-box;
}}

.site-footer {{
  border-top: 1px solid rgba(0,0,0,0.06);
  padding: 1rem 0;
  background: #fff;
}}
{css_marker_end}
"""

with open(STYLES, "r+", encoding="utf-8") as fh:
    content = fh.read()
    if css_marker_start in content:
        print("CSS unify block already present — skipping styles.css.")
    else:
        fh.write("\n\n" + css_block)
        print("Appended site unify CSS to styles.css.")

# -------------------------------------------------------------------
# HEADER & FOOTER (Subscribe → /subscribe.html)
# -------------------------------------------------------------------

header_html = """
<header class="site-header" role="banner">
  <div class="container header-inner">
    <a class="site-brand" href="/index.html" aria-label="Home - CoreGuard Mobility">
      CoreGuard Mobility
    </a>
    <nav class="site-nav" role="navigation" aria-label="Main navigation">
      <a class="nav-link" href="/index.html#home">HOME</a>
      <a class="nav-link" href="/index.html#our-story">OUR STORY</a>
      <a class="nav-link" href="/index.html#customization">CUSTOMIZATION</a>
      <a class="nav-link" href="/index.html#our-partners">OUR PARTNERS</a>
      <a class="nav-link" href="/index.html#contact-us">CONTACT US</a>
      <a class="btn nav-cta" href="/subscribe.html">Subscribe</a>
    </nav>
  </div>
</header>
"""

footer_html = """
<footer class="site-footer" role="contentinfo">
  <div class="container" style="display:flex;justify-content:space-between;align-items:center;gap:1rem;">
    <div>
      <small>&copy; <span class="site-year"></span> CoreGuard Mobility</small>
    </div>
    <div>
      <a href="/privacy-policy.html">Privacy Policy</a> ·
      <a href="/terms.html">Terms</a> ·
      <a href="mailto:info@coreguardmobility.com">Email Us</a>
    </div>
  </div>
</footer>
<script>
  (function(){
    var el = document.querySelector('.site-year');
    if(el) el.textContent = new Date().getFullYear();
  })();
</script>
"""

# -------------------------------------------------------------------
# UNIFY FUNCTION (legal + static pages)
# -------------------------------------------------------------------

def unify_page(path):
    with open(path, "r+", encoding="utf-8") as fh:
        content = fh.read()
        modified = content

        # Ensure body has page-static class
        if not re.search(r'<body[^>]*class="[^"]*page-static', modified, re.I):
            modified, n = re.subn(
                r'<body([^>]*)>',
                r'<body\1 class="page-static">',
                modified,
                count=1,
                flags=re.I
            )
            if n == 0:
                modified = re.sub(
                    r'<body\s*>',
                    '<body class="page-static">',
                    modified,
                    count=1,
                    flags=re.I
                )

        # Ins
