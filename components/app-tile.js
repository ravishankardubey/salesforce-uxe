const tileTemplate = document.createElement('template');
tileTemplate.innerHTML = `
<style>
    .app-card {
        width: 100%;
        display: flex;
        flex-wrap: nowrap;
        border: 2px solid #dddbda;
        box-sizing: border-box;
        border-radius: 5px;
        background-color: #f3f2f2;
    }

    .app-icon {
        height: 80px;
        aspect-ratio: 1;
        background-color: #ffffff;
    }

    .app-details {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 20px;
        gap: 5px;
        flex-grow: 1;
    }

    .app-details > .title {
        color: #2e77cc;
        font-size: 16px;
    }

    .app-details > .desc {
        // color: #2e77cc;
        font-size: 12px;
    }

    

    .drag-holder {
        display: flex;
        align-items: center;
        padding-right: 20px;
        font-size: 25px;
        color: #858484;
        cursor: pointer;
    }
</style>
<div class="app-card">
    <div class="app-icon"></div>
    <div class="app-details">
        <div class="title" id="title">XYZ</div>
        <div class="desc" id="desc">Lorem Ipsum</div>
    </div>
    <div class="drag-holder">&#8286;&#8286;</div>
</div>`;

class AppTile extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: 'open'
        });
        this.shadowRoot.appendChild(tileTemplate.content.cloneNode(true));
    }

    async connectedCallback() {
        this.shadowRoot.getElementById('title').innerText = this.getAttribute('title');
        this.shadowRoot.getElementById('desc').innerText = this.getAttribute('description');
    }

}
window.customElements.define('app-tile', AppTile);