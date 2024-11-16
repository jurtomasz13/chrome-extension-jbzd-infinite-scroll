/**
 * @summary Reloads the extension when JBZD tab is refreshed **DEVELOPMENT ONLY**
 * 
 * @description Reloads the extension after the JBZD tab is refreshed,
 * then refreshes the tab once again to apply the changes.
 */
let isReloading = false;
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (isReloading) return;

  isReloading = true;

  if (tab.url.includes('https://jbzd.com.pl/') && changeInfo.status === 'loading') {
    chrome.runtime.reload();
    chrome.tabs.reload(tabId);
  }

  setTimeout(() => {
    isReloading = false;
  }, 100);
});
