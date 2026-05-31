#### Search Engine Result Filter

A lightweight userscript to filter out search results from specified domains across multiple search engines. The script allows users to blacklist specific domains and ensures they do not appear in search results, providing a cleaner and more focused search experience.

#### Description

This script dynamically hides search results from user-defined domains. It is designed to work seamlessly with popular search engines like Google, Bing, Yandex, DuckDuckGo, and Startpage. The blocked domains can be easily customized, offering flexibility to tailor the script to individual needs.

#### Purpose

Search results often include content from unwanted or low-quality websites. This script ensures such websites are automatically filtered out, allowing users to focus on only the most relevant and high-quality sources. Whether it's for personal productivity or tailored research, this script simplifies your search experience.

#### Features

- **Multi-Search Engine Support**: Google, Bing, Yandex, DuckDuckGo, and Startpage (easily extensible).
- **Custom Blacklist**: Define domains or subdomains to hide using an editable list with wildcard support.
- **Dynamic Page Updates**: Uses `MutationObserver` to dynamically filter new results as they appear.
- **Optimized Performance**: Efficient code execution with `requestAnimationFrame` and optimized DOM handling.

#### How to Use

1. **Install a UserScript Manager**  
   To use this script, you need a userscript manager installed in your browser:
   - [ScriptCat](https://github.com/scriptscat/scriptcat)
   - [Tampermonkey](https://www.tampermonkey.net/)
   - [Greasemonkey](https://www.greasespot.net/)
   - [Violentmonkey](https://violentmonkey.github.io/)

   Alternatively, you can use a web browser with built-in UserScript support like:
   - [Cromite Browser](https://github.com/uazo/cromite) (Chromium-based fork)
   - [Via Browser](https://viayoo.com/en/) (WebView-based mobile browser)

2. **Create the Script**  
   - Open your userscript manager.
   - Create a new script, and paste the contents of the [Search Engine Result Filter](https://github.com/smed79/search-engine-result-filter/blob/main/search-engine-result-filter.user.js) script into the editor.
   - Alternatively, you can install the script by clicking [here](https://github.com/smed79/search-engine-result-filter/raw/refs/heads/main/search-engine-result-filter.user.js).

3. **Configure the Blacklist**  
   - Modify the `BLOCKED_DOMAINS` array in the script to include the domains you'd like to filter out.  
     Example:
     ```javascript
     const BLOCKED_DOMAINS = [
         '*.example.com',
         'www.blocksite.org',
         'lowqualitysite.net'
     ];
     ```

4. **Save and Enable the Script**  
   - Save the script and ensure it is enabled in your userscript manager.
   - Navigate to any of the supported search engines, perform a search, and enjoy a cleaner result set.

#### How to Add New Domains to the Blacklist

If you encounter new domains you'd like to filter, follow these steps:

1. **Locate the `BLOCKED_DOMAINS` Array**:  
   Open the script and find the `BLOCKED_DOMAINS` variable at the beginning of the script.

2. **Add the Domain(s)**:  
   Add the domain to the array, using the following syntax:
   - ##### Exact Domain Matches:
     ```javascript
     'example.com'
     ```
   - ##### Wildcard Subdomains:
     ```javascript
     '*.example.com'
     ```
   - ##### Specific Subdomains:
     ```javascript
     'sub.example.com'
     ```

3. **Save the Changes**:  
   Save your edits to the script and refresh your browser tab for the changes to take effect.

#### Extending the Script for New Search Engines

If you'd like to add support for other search engines:

1. **Locate the `SEARCH_ENGINES` Object**:  
   Inside the script, find the `SEARCH_ENGINES` object.

2. **Add a New Entry**:  
   Add a new key-value pair for the search engine:
   - **Key**: A unique identifier for the search engine.
   - **Value**: The CSS selector for the result containers on that search engine.  
     Example:  
     ```javascript
     const SEARCH_ENGINES = {
         google: '.xpd',
         bing: '.b_algo',
         newengine: '.result-class' // Add this
     };
     ```

3. **Update the `detectSearchEngine` Function**:  
   Add a condition to detect the new search engine's hostname:  
   ```javascript
   function detectSearchEngine() {
       const hostname = window.location.hostname;
       if (hostname.includes('newengine.com')) return 'newengine'; // Add this
       return null;
   }
   ```

4. **Save and Test**:  
   Save the script, navigate to the search engine, and verify that results are being filtered.

#### Supported Search Engines

- Google
- Bing
- Yandex
- DuckDuckGo
- Startpage
- Priv.au (_SearXNG_)
- Baidu

Feel free to expand the script to include more search engines or additional features!

#### Support this Project

Star ★ this repo, and we're square :nerd_face:

#### License

 * http://creativecommons.org/licenses/by-nc-sa/3.0/

[⇈ Back to Top](https://github.com/smed79/search-engine-result-filter#search-engine-result-filter)
