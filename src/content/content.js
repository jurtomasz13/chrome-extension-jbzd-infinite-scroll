import axios from 'axios';
import * as cheerio from 'cheerio';

let currentPage = 1;
let previousPage = null;
let nextPage = currentPage + 1;

/**
 * @summary Main function.
 */
async function main() {
  // Initialize variables
  const isPaginable = await isPagePaginable();

  if (!isPaginable) {
    return;
  };

  updatePageNumbers();

  // Logic
  let preMemes;
  if (previousPage) {
    preMemes = await getPageMemes(previousPage);
  }

  removeAdsInsideContainer();
  removeContentPagination();

  // Rename the current container to the current page number
  renameCurrentPageContainer();

  const afterMemes = await getPageMemes(nextPage);

  // Insert previous and next page memes for the first time
  if (previousPage) {
    insertBeforeCurrentPageContainer(preMemes);
  }

  insertAfterCurrentPageContainer(afterMemes);

  // Handle inserting new and previous memes when scrolling
  window.addEventListener('scroll', handleScroll);
}

/**
 * @summary Run main function.
 */
main().catch(er => console.error(er));

/**
 * @summary Handles the scroll event.
 */
async function handleScroll() {
  const { scrollTop } = document.documentElement;

  if (previousPage) {
    const previousPageLastElDistanceFromBottom = getElementDistanceFromBorder(`#content-container-${previousPage} article:last-child`, 'bottom');

    if (scrollTop < previousPageLastElDistanceFromBottom && currentPage !== previousPage) {
      const newPagePathname = getNewPagePathname(previousPage);
      history.pushState({}, '', location.origin + newPagePathname);
      removeNextPageContainer();
      updatePageNumbers();
      await insertNewPreviousPageContainer();
    }
  }

  const nextPageFirstElDistanceFromTop = getElementDistanceFromBorder(`#content-container-${nextPage} article:first-child`);

  if (nextPageFirstElDistanceFromTop && scrollTop >= nextPageFirstElDistanceFromTop) {
    const newPagePathname = getNewPagePathname(nextPage);
    history.replaceState({}, '', location.origin + newPagePathname);
    removePreviousPageContainer();
    updatePageNumbers();
    await insertNewNextPageContainer();
  }
}

/**
 * @summary Updates the page numbers from global variables.
 */
function updatePageNumbers() {
  currentPage = Math.floor(getCurrentPage());

  if (currentPage === 1 && !hasPagePathname()) {
    if (location.href === 'https://jbzd.com.pl/') {
      history.replaceState({}, '', location.href + 'str/1');
    } else {
      history.replaceState({}, '', location.href + '/1');
    }
  }

  previousPage = currentPage === 1 ? null : currentPage - 1;
  nextPage = currentPage + 1;
}

/**
 * @summary Gets the distance of an element from the specified border. 
 * By the default, it's the top border.
 */
function getElementDistanceFromBorder(selector, border = 'top') {
  const element = document.querySelector(selector);

  if (!element) return null;

  const rect = element.getBoundingClientRect();
  const scrollTop = document.documentElement.scrollTop;
  return rect[border] + scrollTop;
}

/**
 * @summary Gets the current page number from the URL.
 */
function getCurrentPage() {
  const currentPath = location.pathname;
  const pathParts = currentPath.split('/');
  const pageNum = parseInt(pathParts[pathParts.length - 1]);

  if (!pageNum) {
    return 1;
  }

  return pageNum;
}

const pageCache = new Map();

/**
 * @summary Fetches memes from the given page.
 */
async function getPageMemes(pageNum) {
  const oldContainerId = 'content-container';
  const newContainerId = 'content-container-' + pageNum;
  const newPagePathname = getNewPagePathname(pageNum);

  if (pageCache.has(newPagePathname)) {
    return pageCache.get(newPagePathname);
  }

  const response = await axios.get(newPagePathname);
  const html = await response.data;
  const $ = cheerio.load(html);
  $(`#${oldContainerId}`).attr('id', newContainerId);
  $(`#${newContainerId} .jad-rectangle`).remove();
  const memes = $(`#${newContainerId}`);

  pageCache.set(newPagePathname, memes);

  return memes;
}

/**
 * @summary Checks if the current page is paginable.
 */
async function isPagePaginable() {
  if (location.href === 'https://jbzd.com.pl/') {
    return true;
  }

  const currentPath = location.pathname;
  const pathParts = currentPath.split('/');
  const currentPage = parseInt(pathParts[pathParts.length - 1]);

  if (isNaN(currentPage)) {
    const nextPageUrl = '/2';

    try {
      await axios.get(location.href + nextPageUrl);
      return true;
    } catch (err) {
      return false;
    }
  } else {
    return true;
  }
}

/**
 * @summary Checks if the current page has a page number in the URL.
 */
function hasPagePathname() {
  const currentPath = location.pathname;
  const pathParts = currentPath.split('/');
  const lastPart = parseInt(pathParts[pathParts.length - 1]);
  return !isNaN(lastPart);
}

/**
 * @summary Returns the new page pathname.
 */
function getNewPagePathname(newPage) {
  const currentPath = location.pathname;
  const pathParts = currentPath.split('/');
  pathParts[pathParts.length - 1] = newPage;
  return pathParts.join('/');
}

// Elements manipulation functions

function removeContentPagination() {
  const pagination = document.querySelector('#content-pagination');
  pagination?.remove();
}

function removeAdsInsideContainer() {
  const ads = document.querySelectorAll('.jad-rectangle');
  ads?.forEach(ad => ad.remove());
}

async function insertNewPreviousPageContainer() {
  const memes = await getPageMemes(previousPage);
  insertBeforeCurrentPageContainer(memes);
}

async function insertNewNextPageContainer() {
  const memes = await getPageMemes(nextPage);
  insertAfterCurrentPageContainer(memes);
}

function removePreviousPageContainer() {
  document.querySelector(`#content-container-${previousPage}`)?.remove();
}

function removeNextPageContainer() {
  document.querySelector(`#content-container-${nextPage}`)?.remove();
}

function renameCurrentPageContainer() {
  document.querySelector('#content-container')?.setAttribute('id', `content-container-${currentPage}`);
}

function insertBeforeCurrentPageContainer(element) {
  const container = document.querySelector(`#content-container-${currentPage}`);
  container?.insertAdjacentHTML('beforebegin', element);
}

function insertAfterCurrentPageContainer(element) {
  const container = document.querySelector(`#content-container-${currentPage}`);
  container?.insertAdjacentHTML('afterend', element);
}