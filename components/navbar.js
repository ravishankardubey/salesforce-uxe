const navbarTemplate = document.createElement('template');
navbarTemplate.innerHTML = `

<style>
    .launcher-navbar {
        width: 100%;
        height: 70px;
        padding: 10px 30px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0 2px #dddbda;
        gap: 10px;
    }

    .app-name {
        font-size: 1.2rem;
        cursor: pointer;
    }

    .add-btn {
        height: 40px;
        background-color: transparent;
        color: #3999d5;
        border: 1px solid #3999d5;
        border-radius: 3px;
        padding: 10px 10px;
        box-sizing: border-box;
        cursor: pointer;
    }

    .search-wrapper {
        flex-grow: 1;
        height: 40px;
        display: flex;
        align-items: center;
        max-width: 400px;
        min-width: 80px;
        gap: 10px;
        border: 1px solid #3999d5;
        border-radius: 5px;
        padding: 5px;
        box-sizing: border-box;
    }

    .search-wrapper > .icon {
        font-size: 15px;
    }

    .search-wrapper > .search {
        border: none;
        outline: none;
        flex-grow: 1;
        font-size: 15px;
        min-width: 40px;
    }

    @media screen and (max-width: 600px) {
        .search-wrapper{
            max-width: 150px;
        }

        .launcher-navbar {
            padding: 10px;
        }
    }
</style>

<div class="launcher-navbar">
  <div class="app-name">App Launcher</div>
  <div class="search-wrapper">
    <span class="icon">&#128269;</span>
    <input type="text" name="search" id="search" class="search" placeholder="Search apps or items..." autocomplete="off"/>
  </div>
  <button class="add-btn" id="add-app-btn">Add New</button>
</div>`;

class LauncherNavbar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: 'open'
        });
        this.shadowRoot.appendChild(navbarTemplate.content.cloneNode(true));
    }

    connectedCallback() {
        this.shadowRoot.getElementById('add-app-btn').onclick = () => {
            this.dispatchEvent(new CustomEvent('addApp', {
                detail: {
                    title: 'Added from new button',
                    description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
                    background: '#a134eb'
                }
            }));
        }

        this.shadowRoot.getElementById('search').oninput = (e) => {
            this.dispatchEvent(new CustomEvent('searchApp', {
                detail: {
                    searchText: e.target.value
                }
            }));
        }
    }


}
window.customElements.define('launcher-navbar', LauncherNavbar);