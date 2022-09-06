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
</style>

<div class="apps-drawer" id="apps-drawer">
</div>`;

class AppsDashboard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: 'open'
        });
        this.shadowRoot.appendChild(dashboardTemplate.content.cloneNode(true));
    }

    async connectedCallback() {
        const d = await fetch("./assets/data.json").then(response => response.json());

        const drawer = this.shadowRoot.getElementById('apps-drawer');

        d.map(s => {
            const el = document.createElement('app-tile');
            el.setAttribute('title', s.title);
            el.setAttribute('description', s.description);
            drawer.appendChild(el);
        });

    }
}
window.customElements.define('apps-dashboard', AppsDashboard);