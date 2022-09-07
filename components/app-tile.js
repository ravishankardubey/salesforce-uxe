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
        padding: 15px;
        box-sizing: border-box;
        user-select: none;
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
        font-size: 12px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }

    

    .drag-holder {
        display: flex;
        align-items: center;
        padding-right: 20px;
        font-size: 25px;
        color: #858484;
        cursor: pointer;
        user-select: none;
    }
</style>
<div class="app-card">
    <div class="app-icon" id="app-icon"></div>
    <div class="app-details">
        <div class="title" id="title">XYZ</div>
        <div class="desc" id="desc">Lorem Ipsum</div>
    </div>
    <div class="drag-holder">&#8286;&#8286;</div>
</div>`;

const iconImageTemplate = document.createElement('template');
iconImageTemplate.innerHTML = `
<style>
    img {
        max-height: 100%;
        max-width: 100%;
    }
</style>
<img/>
`;

const iconTextTemplate = document.createElement('template');
iconTextTemplate.innerHTML = `
<style>
    .icon-text {
        height: 100%;
        width: 100%;
        color: #ffffff;
        font-size: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 3px;
        padding: 5px;
        box-sizing: border-box;
    }
</style>
<div class="icon-text"></div>`;

class AppTile extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: 'open'
        });
        this.shadowRoot.appendChild(tileTemplate.content.cloneNode(true));
    }

    async connectedCallback() {
        const titleText = this.getAttribute('title');

        this.shadowRoot.getElementById('title').innerText = titleText;
        this.shadowRoot.getElementById('desc').innerText = this.getAttribute('description');

        const icon = this.getAttribute('icon');

        if (icon) {
            const node = iconImageTemplate.content.cloneNode(true);
            node.querySelector('img').src = icon;
            node.querySelector('img').alt = titleText;
            this.shadowRoot.getElementById('app-icon').appendChild(node);
        } else {
            const node = iconTextTemplate.content.cloneNode(true);
            const div = node.querySelector('div');

            const index = titleText.indexOf(" ");
            div.innerText = index > 1 ? titleText[0] + '' + titleText[index + 1] : titleText.slice(0, 2);

            div.style.backgroundColor = this.getAttribute('background') || '#2b71cb';;
            this.shadowRoot.getElementById('app-icon').appendChild(node);
        }
    }

}
window.customElements.define('app-tile', AppTile);