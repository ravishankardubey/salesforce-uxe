const dashboardTemplate = document.createElement('template');
dashboardTemplate.innerHTML = `
<style>
    .apps-drawer {
        display: flex;
        flex-wrap: wrap;
        padding: 10px 30px;
        box-sizing: border-box;
        gap: 10px 20px;
    }

    app-tile {
        flex: 0 0 calc(33% - 10px);
    }

    @media screen and (max-width: 600px) {
        app-tile {
            flex: 0 0 100%;
        }

        .apps-drawer {
            padding: 10px;
        }
    }

    @media screen and (min-width: 600px) and (max-width: 1024px) {
        app-tile {
            flex: 0 0 calc(50% - 10px);
        }
    }
</style>

<div class="apps-drawer" id="apps-drawer">
</div>`;

const dasboardNoAppFound = document.createElement('template');
dasboardNoAppFound.innerHTML = `
<style>
    .noresult {
        width: 100%;
        height: 80vh;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
<div class="noresult">
    There are no matching apps found, please search again!
</div>
`;

class AppsDashboard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: 'open'
        });
        this.shadowRoot.appendChild(dashboardTemplate.content.cloneNode(true));
    }


    #appsList = [];
    #filteredApps = [];
    #searchText = "";
    
    async connectedCallback() {
        this.#appsList = await fetch("./assets/data.json").then(response => response.json());
        this.#filteredApps = Object.assign([], this.#appsList);
        this.#renderTiles(this.#filteredApps)
    }

    #renderTiles(appList) {
        const drawer = this.shadowRoot.getElementById('apps-drawer');
        drawer.innerHTML = "";
        
        if (appList.length) {
            appList.map(appData => drawer.appendChild(this.#createAppTile(appData)));
        } else {
            drawer.appendChild(dasboardNoAppFound.content.cloneNode(true));
        }
    }

    #createAppTile(appData) {
        const appTile = document.createElement('app-tile');
        appTile.setAttribute('title', appData.title);
        appTile.setAttribute('description', appData.description);
        appData.icon && appTile.setAttribute('icon', appData.icon);
        appData.background && appTile.setAttribute('background', appData.background);
        return appTile;
    }

    #filterApps() {
        if (this.#searchText) {
            this.#filteredApps = this.#appsList.filter(appData => this.#isMatchingApp(appData));
        } else {
            this.#filteredApps = this.#appsList
        }
        
        this.#renderTiles(this.#filteredApps);
    }

    #isMatchingApp = (appData) => {
        return appData.title.includes(this.#searchText) || appData.description.includes(this.#searchText);
    }

    addNewApp(appData) {
        this.#appsList.push(appData);
        if (this.#searchText && this.#isMatchingApp(appData)) {
            const drawer = this.shadowRoot.getElementById('apps-drawer');
            drawer.appendChild(this.#createAppTile(appData));
        } else if(!this.#searchText) {
            const drawer = this.shadowRoot.getElementById('apps-drawer');
            drawer.appendChild(this.#createAppTile(appData));
        }
    }

    searchApp(searchText) {
        this.#searchText = searchText;
        this.#filterApps();
    }
}
window.customElements.define('apps-dashboard', AppsDashboard);