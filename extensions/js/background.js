chrome.contextMenus.create({
  id: 'github-search-extension',
  title: 'GitHub Code Search',
  contexts: ['page', 'frame', 'selection'],
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'github-search-extension') {
    const searchText = encodeURIComponent(info.selectionText);
    const searchUrl = `https://github.com/search?type=code&q=${searchText}`;
    chrome.tabs.create({ url: searchUrl });
  }
});