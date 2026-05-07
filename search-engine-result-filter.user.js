// ==UserScript==
// @name         Search Engine Result Filter
// @namespace    U2VhcmNoIEVuZ2luZSBSZXN1bHQgRmlsdGVy
// @version      2.0
// @description  Filters out specified domains from multiple search engines
// @author       smed79
// @license      GPLv3
// @icon         https://raw.githubusercontent.com/smed79/search-engine-result-filter/refs/heads/main/icon.png
// @match        *://*.google.com/search*
// @match        *://*.bing.com/search*
// @match        *://*.yandex.com/search*
// @match        *://*.baidu.com/s?*
// @match        *://*.startpage.com/*/search*
// @match        *://duckduckgo.com/?*
// @match        *://priv.au/search*
// @grant        none
// ==/UserScript==

// How to Use?
// https://github.com/smed79/search-engine-result-filter#how-to-use

(function() {
    'use strict';

    // Configuration: List of domains to block with wildcard support
    const BLOCKED_DOMAINS = [
        '*.example.com',
        'www.example.org',
        'example.net'
        // Add more domains here
    ];

    // Search engine-specific result container selectors
    // You can use comma-separated selectors to target multiple containers
    const SEARCH_ENGINES = {
        google: '.xpd, .A6K0A',
        bing: '.b_algo',
        yandex: '.serp-item',
        baidu: '.result',
        duckduckgo: 'article, [data-testid="result"]',
        startpage: '.result, .css-z73qjy',
        priv: 'article, .result'
        // Add more search engines here
    };

    // Pre-compile blocked domains for fast checking
    const compiledBlocklist = BLOCKED_DOMAINS.map(pattern => {
        if (pattern.startsWith('*.')) {
            const root = pattern.replace('*.', '');
            return (hostname) => hostname === root || hostname.endsWith('.' + root);
        }
        return (hostname) => hostname === pattern || hostname === 'www.' + pattern;
    });

    // Function to detect current search engine
    function detectSearchEngine() {
        const hostname = window.location.hostname;
        if (hostname.includes('google.')) return 'google';
        if (hostname.includes('bing.')) return 'bing';
        if (hostname.includes('yandex.')) return 'yandex';
        if (hostname.includes('baidu.')) return 'baidu';
        if (hostname.includes('duckduckgo.')) return 'duckduckgo';
        if (hostname.includes('startpage.')) return 'startpage';
        if (hostname.includes('priv.')) return 'priv';
        return null;
    }

    const currentEngine = detectSearchEngine();
    if (!currentEngine) return; // Exit immediately if no engine detected

    const selector = SEARCH_ENGINES[currentEngine];

    // Fast check against compiled blocklist
    function isBlockedDomain(href) {
        try {
            const hostname = new URL(href).hostname;
            return compiledBlocklist.some(checkFn => checkFn(hostname));
        } catch {
            return false;
        }
    }

    // Highly Optimized Result Hiding
    function hideBlockedResults() {
        // Only select containers we haven't checked yet
        const containers = document.querySelectorAll(`${selector}:not([data-filtered="true"])`);
        
        containers.forEach(container => {
            // Mark as checked so we never waste CPU processing this element again
            container.dataset.filtered = 'true';

            // Find the main links inside the container
            const links = container.querySelectorAll('a[href]');
            
            for (const link of links) {
                if (isBlockedDomain(link.href)) {
                    container.style.display = 'none';
                    break; // Stop checking links once we know the container should be hidden
                }
            }
        });
    }

    // Run on initial load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', hideBlockedResults);
    } else {
        hideBlockedResults();
    }

    // Debounced Observer for dynamic/infinite scrolling content
    let timeout;
    const observer = new MutationObserver(() => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            requestAnimationFrame(hideBlockedResults);
        }, 150); // 150ms debounce is perfectly smooth for human eyes
    });

    // Attach to documentElement to avoid crashes
    if (document.documentElement) {
        observer.observe(document.documentElement, { childList: true, subtree: true });
    }
})();
