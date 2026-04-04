================================================================================
Hunter Sim Fan Website
A3 - HTML, JS, & CSS Assignment
***Code reused and built upon from A1 and A2***
Ryder Sim - B01059936
================================================================================

Live Link (GitHub Pages):
https://rydersim.github.io/Assignment-1

--------------------------------------------------------------------------------
OVERVIEW
--------------------------------------------------------------------------------
A 3-page fan and stats website dedicated to Hunter Sim (#7, Ottawa Valley Titans).
The site is modelled after hockey scouting and stats platforms like
EliteProspects.com. It includes a player profile, full career statistics, and a
media and highlights page. Users can change the colour scheme and the setting is
saved across pages. Assignment 3 adds a full external CSS stylesheet (style.css),
responsive layouts for desktop, tablet, and mobile, a contact form, CSS Grid and
Flexbox layouts, and all required CSS selectors.

--------------------------------------------------------------------------------
FILE STRUCTURE AND RELATIVE PATHS
--------------------------------------------------------------------------------

index.html          -> Page 1: Player Profile (home page)
stats.html          -> Page 2: Career statistics + contact form
media.html          -> Page 3: Media and highlights
style.css           -> External stylesheet shared by all 3 pages
README.txt          -> This file
planning.pdf        -> Part 1: Planning writeup
research.pdf        -> Part 2: Research and examples
prototype.pdf       -> Part 3: Wireframe prototype
CodeReview.pdf      -> Code review document
Wireframe.png       -> Wireframe image

js/
    main.js         -> JavaScript for all pages (banner, totals, colour scheme, nav)

assets/
    images/
        logo.png            -> Ottawa Valley Titans logo
        hunter_sim1.jpg     -> Main player photo (hero image, index.html)
        hunter_sim2.jpeg    -> Player photo (media.html gallery)
        hunter_sim3.png     -> Player photo (media.html gallery)
        hunter_sim4.jpeg    -> Player photo / stat card (media.html gallery)

    video/
        hunter_sim_hit.mp4  -> Local video (media.html)

    audio/
        HunterDrafted.mp3   -> Local audio clip (media.html)

--------------------------------------------------------------------------------
PART 2 — CSS SELECTOR LOCATIONS (style.css)
--------------------------------------------------------------------------------

All selectors are in style.css. Line numbers are approximate.

1. Universal Selector  (*)
   Location : style.css, "UNIVERSAL SELECTOR" section (~line 28)
   Usage    : Resets margin, padding, and box-sizing on every element.
   Example  : * { margin: 0; padding: 0; box-sizing: border-box; }

2. Multiple Selector  (h1, h2, h3)
   Location : style.css, "MULTIPLE SELECTOR" section (~line 34)
   Usage    : Applies shared font-family, weight, and colour to all headings
              at once instead of writing three separate rules.
   Example  : h1, h2, h3 { font-family: Arial, sans-serif; font-weight: bold; }

3. Child Selector  (nav > a)
   Location : style.css, "CHILD SELECTOR" section (~line 111)
   Usage    : Targets only direct <a> children of <nav>, so nested links
              inside .nav-logo are not affected.
   Example  : nav > a { color: #FFFFFF; text-decoration: none; }

4. Sibling Selector  (h3 ~ p)
   Location : style.css, "SIBLING SELECTOR" section (~line 251)
   Usage    : Styles any <p> that is a general sibling of an <h3>, used in
              the biography and section areas on index.html.
   Example  : h3 ~ p { font-size: 0.95em; color: #333333; }

5. Adjacent Sibling Selector  (label + input)
   Location : style.css, "ADJACENT SIBLING" section (~line 344)
   Usage    : Styles form inputs, selects, and textareas that appear
              immediately after a <label> in the contact form on stats.html.
   Example  : label + input { border: 1px solid #cccccc; border-radius: 4px; }

6. Attribute Selector  (a[target="_blank"])
   Location : style.css, "ATTRIBUTE SELECTOR" section (~line 136)
   Usage    : Targets only external links that open in a new tab, giving them
              italic styling to visually distinguish them from internal links.
   Example  : a[target="_blank"] { font-style: italic; }

7. Pseudo-element Selector  (a[target="_blank"]::after)
   Location : style.css, "PSEUDO-ELEMENT" section (~line 139)
   Usage    : Appends a small gold arrow (↗) after every external link so
              users know the link opens a new tab, without changing the HTML.
   Example  : a[target="_blank"]::after { content: " ↗"; color: #FCB514; }

--------------------------------------------------------------------------------
JAVASCRIPT FUNCTIONS  (js/main.js)
--------------------------------------------------------------------------------

1. showWelcomeNotification()
   Purpose : Creates and inserts a dismissible gold welcome banner at the very
             top of the page body when the page first loads.
   Input   : None
   Output  : None (inserts a <div id="welcome-banner"> into the DOM)
   Example : On page load, banner reads:
             "Welcome to Hunter Sim's official player profile page! | Ottawa Valley Titans #7"
             Clicking the × button hides the banner.

2. calculateCareerTotals()
   Purpose : Reads every row with class "stat-row" in the element with
             id="stats-table", sums the GP, G, A, and PTS columns, and
             appends a styled Career Totals row to the bottom of the table.
             Skips any row where the GP cell contains "N/A" (e.g. COVID year).
   Input   : None (reads from DOM element id="stats-table")
   Output  : None (appends a <tr> to the stats table)
   Example : 11 seasons of data totals 260 GP, 99 G, 145 A, 244 PTS.
             A gold row labelled "Career Totals" with those values is added.
   Dependent: Requires id="stats-table" and class="stat-row" on data rows.
              Only runs on stats.html; exits silently on other pages.

3. applyColorScheme(schemeName)
   Purpose : Applies a named colour scheme across all styled elements on the
             page. Updates the nav background, all nav link colours, section
             heading borders, hr dividers, achievement card borders and text,
             hero image border, player position text, summary table header,
             stats table header, stats table caption, and the form submit
             button. Saves the chosen scheme to localStorage so it persists
             when navigating between pages.
   Input   : schemeName (string) — one of: 'black', 'blue', 'dark'
   Output  : None (modifies DOM styles and writes to localStorage)
   Example : applyColorScheme('blue') sets:
               - nav background   -> #002D72
               - nav link text    -> #FFFFFF
               - accent elements  -> #A8C8FF
             applyColorScheme('dark') sets:
               - nav background   -> #1a1a1a
               - nav link text    -> #FCB514
               - accent elements  -> #FFD966
   Dependent: Requires .color-btn elements created by injectColorButtons().

   Elements updated by this function:
     - nav                        background colour
     - nav > a                    text colour (all links)
     - nav > a.active             accent colour
     - .section h3                border-left colour
     - hr                         border-top colour
     - .achievement-card          border-left colour
     - .achievement-card h4       text colour
     - .hero-img                  border colour
     - .hero-info .position       text colour
     - .summary-table caption     background + text colour
     - .summary-table thead tr    background colour
     - #stats-table thead th      background + text colour
     - #stats-table caption       background + text colour
     - .form-submit               background + text colour
     - .color-btn                 active button outline

4. injectColorButtons()
   Purpose : Creates a colour scheme switcher bar with one button per scheme
             and inserts it directly below the navigation bar on every page.
   Input   : None
   Output  : None (inserts a <div id="color-switcher"> into the DOM)
   Example : Renders three buttons labelled "Default (Black & Gold)",
             "Blue & White", and "Dark Gold" beneath the nav.
   Dependent: colorSchemes object must be defined before this is called.

5. loadSavedColorScheme()
   Purpose : Reads the colour scheme saved in localStorage from a previous
             visit and applies it. Falls back to 'black' if nothing is saved
             or the saved value is not a valid scheme name.
   Input   : None (reads localStorage key 'colorScheme')
   Output  : None (calls applyColorScheme internally)
   Example : If the user chose 'dark' on a previous page, that scheme is
             re-applied automatically when the new page loads.
   Dependent: applyColorScheme() and colorSchemes object.

6. highlightActiveNav()
   Purpose : Detects the current page filename from window.location.pathname
             and highlights the matching navigation link in gold (#FCB514).
             All other internal nav links are reset to white.
   Input   : None (reads window.location.pathname)
   Output  : None (modifies link colour styles in the DOM)
   Example : When the user is on stats.html, the "Career Stats" nav link
             turns gold and bold; Profile and Media links remain white.

--------------------------------------------------------------------------------
CSS FEATURES SUMMARY (style.css)
--------------------------------------------------------------------------------

Flexbox layouts:
  - .hero          : Player profile hero section (index.html)
  - .video-grid    : Side-by-side video embeds (media.html)
  - .links-section : Links + back-to-profile image (media.html)
  - .contact-form  : Stacked form layout (stats.html)

Grid layouts:
  - .achievements-grid : 4-card career highlights grid (index.html)
  - .photo-gallery     : 3-column photo gallery grid (media.html)

Styled images (border + padding + margin):
  - .hero-img           : Hero player photo (index.html)
  - .photo-gallery img  : Gallery photos (media.html)
  - .back-to-profile img: Profile thumbnail link (media.html)

Responsive breakpoints (media queries):
  - max-width: 768px  -> Tablet layout
  - max-width: 480px  -> Mobile layout

Form:
  - stats.html : "Submit a Stats Correction or Question" form
    Fields: Name, Email, Season (dropdown), Message (textarea), Submit button

--------------------------------------------------------------------------------
ACCESSIBILITY NOTES (Part 4)
--------------------------------------------------------------------------------

- All images have descriptive alt attributes
- Colour contrast: gold (#FCB514) on black (#000000) meets WCAG AA
- Navigation links are descriptive (no "click here")
- Video and audio elements include fallback text for unsupported browsers
- Viewport meta tag set for correct mobile scaling
- Semantic HTML elements used throughout (nav, footer, h1-h3, etc.)
- Form inputs all have associated <label> elements with matching for/id pairs
- aria-label on nav, video, and audio elements
- aria-current="page" on active nav link
- aria-hidden="true" on all decorative emoji
- aria-required="true" on required form inputs
- Table caption and scope="col" on all th elements

--------------------------------------------------------------------------------
REFERENCES
--------------------------------------------------------------------------------

Images:
  - hunter_sim1.jpg   Downloaded from web / personal use
  - hunter_sim2.jpeg  Downloaded from web / personal use
  - hunter_sim3.png   Downloaded from web / personal use
  - hunter_sim4.jpeg  Downloaded from web / personal use
  - logo.png          Downloaded from web / personal use

External Resources:
  - EliteProspects.com  (linked, not copied)
  - HockeyCanada.ca     (linked, not copied)
  - YouTube embed       https://www.youtube.com/embed/D6EB5-CWK4w

Hosting:
  - GitHub Pages: https://rydersim.github.io/Assignment-1

================================================================================
END OF README
================================================================================