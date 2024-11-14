/******/ (() => { // webpackBootstrap
/*!***************************!*\
  !*** ./src/background.js ***!
  \***************************/
// Reload extension when tab is updated
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

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2dyb3VuZC5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2piemR5LWluZmluaXRlLXNjcm9sbC8uL3NyYy9iYWNrZ3JvdW5kLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFJlbG9hZCBleHRlbnNpb24gd2hlbiB0YWIgaXMgdXBkYXRlZFxyXG5sZXQgaXNSZWxvYWRpbmcgPSBmYWxzZTtcclxuY2hyb21lLnRhYnMub25VcGRhdGVkLmFkZExpc3RlbmVyKCh0YWJJZCwgY2hhbmdlSW5mbywgdGFiKSA9PiB7XHJcbiAgaWYgKGlzUmVsb2FkaW5nKSByZXR1cm47XHJcblxyXG4gIGlzUmVsb2FkaW5nID0gdHJ1ZTtcclxuXHJcbiAgaWYgKGNoYW5nZUluZm8uc3RhdHVzID09PSAnbG9hZGluZycpIHtcclxuICAgIGNocm9tZS5ydW50aW1lLnJlbG9hZCgpO1xyXG4gICAgY2hyb21lLnRhYnMucmVsb2FkKHRhYklkKTtcclxuICB9XHJcblxyXG4gIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgaXNSZWxvYWRpbmcgPSBmYWxzZTtcclxuICB9LCAxMDApO1xyXG59KTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9