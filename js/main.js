// Tells the browser to run the JavaScript in strict mode, catches common mistakes
'use strict';

// ....Notification....
// Displays a welcome banner at the top of the page when it first loads. Dismissed by clicking the X.


function showWelcomeNotification() {
    // Create the banner element
    var banner = document.createElement('div');
    banner.id = 'welcome-banner';
    banner.style.cssText = [
        'background-color: #FCB514',
        'color: #000000',
        'text-align: center',
        'padding: 10px 40px 10px 10px',
        'font-family: Arial, sans-serif',
        'font-size: 14px',
        'font-weight: bold',
        'position: relative',
        'z-index: 1000'
    ].join(';');

    banner.innerHTML = '&#127947; Welcome to Hunter Sim\'s official player profile page!'
        + ' &nbsp;|&nbsp; Ottawa Valley Titans #7'
        + ' <span id="close-banner" style="position:absolute; right: 14px; top:50%;'
        + ' transform:translateY(-50%); cursor:pointer; font-size:18px; font-weight:bold;">'
        + '&times;</span>'

    // Insert at the very top of the body
    document.body.insertBefore(banner, document.body.firstChild);

    // Event handler on the X button to dismiss the banner
    document.getElementById('close-banner').addEventListener('click', function () {
        banner.style.display = 'none';
    });
}

// ....Auto Calculator....
/* 
   Reads every seaosn row in the stats table on stats.html and sums GP, G, A, and PTS.
   Skips rows where the value is "N/A"
   Updates the totals rows at the bottom of the table.
*/

function calculateCareerTotals() {
    var table = document.getElementById('stats-table');
    // Conditional: only run on pages that have the stats table
    if (!table) {
        return;
    }

    var rows = table.querySelectorAll('tr.stat-row');
    var totalGP   = 0;
    var totalG    = 0;
    var totalA    = 0;
    var totalPTS  = 0;

    rows.forEach(function (row) {
        var cells = row.querySelectorAll('td');

        //Conditional: Skip the row if GP is N/A
        if (cells[3].textContent.trim() === 'N/A') {
            return;
        }

        totalGP += parseInt(cells[3].textContent) || 0;
        totalG += parseInt(cells[4].textContent) || 0;
        totalA += parseInt(cells[5].textContent) || 0;
        totalPTS += parseInt(cells[6].textContent) || 0;
    });

    // Build and append the totals row

    var totalsRow = document.createElement('tr');
    totalsRow.style.backgroundColor = '#FCB514';
    totalsRow.innerHTML = '<td colspan="3" align="center"><b>Career Totals</b></td>'
        + '<td align="center"><b>' + totalGP + '</b></td>'
        + '<td align="center"><b>' + totalG + '</b></td>'
        + '<td align="center"><b>' + totalA + '</b></td>'
        + '<td align="center"><b>' + totalPTS + '</b></td>';

    table.appendChild(totalsRow);
}

// Color Changer

/*
    3 Buttons let the user switch between color shemes for the navigation bar and page accents.
    The chosen scheme is saved to localStorage so it persists when navigating between pages.
*/

var colorSchemes = {
    black: {
        navBg:   '#000000',
        navText: '#FFFFFF',
        accent:  '#FCB514',
        label:   'Default (Black & Gold)'
    },

    blue: {
        navBg:   '#002D72',
        navText: '#FFFFFF',
        accent:  '#A8C8FF',
        label:   'Blue & White'
    },

    dark: {
        navBg:   '#1a1a1a',
        navText: '#FCB514',
        accent:  '#FFD966',
        label:   'Dark Gold'
    }

};

function applyColorScheme(schemeName) {
    var scheme = colorSchemes[schemeName];

    // Conditional: do nothing if scheme name is invalid
    if (!scheme) {
        return;
    }

    // Apply to all font elements that use the gold accent color
    var navEl = document.querySelector('nav');
    if (navEl) {
        navEl.style.backgroundColor = scheme.navBg;
    }
    document.querySelectorAll('nav > a.active').forEach(function (el) {
        el.style.color = scheme.accent;
    });
    document.querySelectorAll('.section h3').forEach(function (el) {
        el.style.borderLeftColor = scheme.accent;
    });

    // Persist choice across page navigation
    localStorage.setItem('colorScheme', schemeName);

    // Update active button styling
    document.querySelectorAll('.color-btn').forEach(function (btn) {
        btn.style.outline = btn.dataset.scheme === schemeName
            ? '3px solid ' + scheme.accent
            : 'none';
    });
}

function injectColorButtons() {
    // Create the color switcher container
    var switcher = document.createElement('div');
    switcher.id = 'color-switcher';
    switcher.style.cssText = [
        'background-color: #111111',
        'padding: 6px 12px',
        'display: flex',
        'align-items: center',
        'gap: 10px',
        'font-family: Arial, sans-serif',
        'font-size: 12px',
        'color: #FFFFFF'
    ].join(';');

    switcher.innerHTML = '<span>Color Scheme: </span>';

    // Create one button per scheme

    Object.keys(colorSchemes).forEach(function (key) {
        var btn = document.createElement('button');
        btn.className = 'color-btn';
        btn.dataset.scheme = key;
        btn.textContent = colorSchemes[key].label;
        btn.style.cssText = [
            'padding: 4px 10px',
            'cursor: pointer',
            'border: 1px solid #444',
            'background: #222',
            'color: #fff',
            'font-size: 12px',
            'border-radius: 4px'
        ].join(';');

        //Event handler: change scheme on click
        btn.addEventListener('click', function () {
            applyColorScheme(key);
        });

        switcher.appendChild(btn);
    });

    // Insert below the nav bar (after the first table)
    var nav = document.querySelector('nav');
    if (nav && nav.parentNode) {
        nav.parentNode.insertBefore(switcher, nav.nextSibling);
    }
}

// Loads the saved color scheme
function loadSavedColorScheme() {
    var saved = localStorage.getItem('colorScheme');

    // Conditional: apply saved shceme, otherwise use default
    if (saved && colorSchemes[saved]) {
        applyColorScheme(saved);
    } else {
        applyColorScheme('black');
    }
}

// Nav Active State
/*
    Detect the current page filename and highlights the matching nav link in gold.
    All other nav links are set to white.
*/

function highlightActiveNav() {
    // Get just the filename from the full path (e.g. "stats.html")
    var currentPage = window.location.pathname.split('/').pop();

    // Conditional: treat empty string as index.html (root URL) precaution for error
    if (currentPage === '') {
        currentPage = 'index.html';
    }

    var navLinks = document.querySelectorAll('nav > a');

    navLinks.forEach(function (link) {
        var href = link.getAttribute('href');

        // Conditional: highlight if this link matches the current page
        if (href === currentPage) {
            link.style.color = '#FCB514';
            link.style.fontWeight = 'bold';
        } else {
            // Only reset links that point to internal pages
            if (href === 'index.html' || href === 'stats.html' || href === 'media.html') {
                link.style.color = '#FFFFFF';
                link.style.fontWeight = 'normal';
            }
        }
    });
}

// Boot - Run everyhting on DOMContentLoaded

document.addEventListener('DOMContentLoaded', function () {
    showWelcomeNotification();   //1. Notification
    calculateCareerTotals();     //2. Conditional
    injectColorButtons()         //3. Color Changer (inject buttons first)
    loadSavedColorScheme();      //.  then apply saved/default scheme
    highlightActiveNav();        //4. Event handler
});

