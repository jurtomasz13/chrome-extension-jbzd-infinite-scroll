/**
 * @summary Reloads the extension when tab is updated
 * 
 * @description Reloads the extension after the tab is updated,
 * then refreshes the tab to apply the changes.
 */
let isReloading = false;
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (isReloading) return;

  isReloading = true;

  if (changeInfo.status === 'loading') {
    chrome.runtime.reload();
    chrome.tabs.reload(tabId);
  }

  setTimeout(() => {
    isReloading = false;
  }, 100);
});
