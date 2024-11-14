import axios from 'axios';

async function main() {
  const pageNum = getCurrentPage();

  if (!pageNum) {
    console.error('No page number found');
    return;
  }

  const preMemes = await getPageMemes(pageNum - 1);
  // const afterMemes = await getPageMemes(pageNum + 1);
}

main().catch(er => console.error(er));

function getCurrentPage() {
  const url = window.location.href;
  const pageNum = url.match(/\/str\/(\d+)/)?.[1];

  return pageNum;
}

async function getPageMemes(pageNum) {
  const response = await axios.get(`https://jbzd.com.pl/str/${pageNum}`);
  const data = await response.data;
  console.log(data);
  return data;
}

