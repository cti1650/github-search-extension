const tailwindcssExtension = chrome.contextMenus.create({
  id: 'github-search-extension',
  title: 'GitHub',
  type: 'normal',
  contexts: ['all'],
  onclick: (info, tab) => {
    window.open('https://github.com/search', '_blank');
  },
});
