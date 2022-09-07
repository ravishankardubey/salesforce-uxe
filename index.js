document.getElementById('navbar').addEventListener('addApp', e => {
    document.getElementById('apps-dashboard').addNewApp(e.detail);
});

document.getElementById('navbar').addEventListener('searchApp', e => {
    document.getElementById('apps-dashboard').searchApp(e.detail.searchText);
});