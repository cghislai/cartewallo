class RegionHoverOption {
    id; //string
    hoverIds; // string[]
    menu; // MenuItem[]

    constructor(id, hoverIds, menu) {
        this.id = id;
        this.hoverIds = hoverIds;
        this.menu = menu;
    }
}

class MenuItem {
    title; // String
    href; // string| null

    constructor(title, href) {
        this.title = title;
        this.href = href;
    }
}

const regionHoverListOptions = [
    new RegionHoverOption('plaine-scaldisiennes', [
        'label_plaine-scaldisiennes',
        'region_plaines_scaldisiennes',
        'city_mons',
    ], [
        new MenuItem('Test 1', 'https://google.com?q=scaldisiennes'),
        new MenuItem('Test 2', 'https://google.com?q=wallonie_scaldisiennes'),
    ]),

    new RegionHoverOption('hesbino-brabancon', [
        'label_hesbino-brabancon',
        'region_hesbino-brabancon',
        'city_nivelles'
    ], []),

    new RegionHoverOption('sambre-meuse', [
        'label_sambre-meuse',
        'region_sambre-meuse',
        'city_thuin', 'city_namur', 'city_philippeville', 'city_dinant',
        'city_liege', 'city_vervier', 'city_aywaille'
    ], []),

    new RegionHoverOption('fagne-famenne', [
        'label_fagne-famenne',
        'region_fagne-famenne',
        'city_chimay', 'city_virvoinval', 'city_donation', 'city_marche',
        'city_rochefort', 'city_beauraing', 'city_couvin',
    ], []),

    new RegionHoverOption('basse-ardenne', [
        'label_basse-ardenne',
        'region_basse-ardenne',
        'city_eupen', 'city_spa', 'city_nassogne', 'city_libin',
        'city_bievre', 'city_neufchateau', 'city_bouillon', 'city_habay',
    ], []),

    new RegionHoverOption('ardenne-centrale', [
        'label_ardenne-centrale',
        'region_ardenne-centrale',
        'city_saint-hubert', 'city_la-roche', 'city_vielsalm', 'city_saint-vith',
        'city_malmedy',
    ], []),


    new RegionHoverOption('haute-ardenne', [
        'label_haute-ardenne',
        'region_haute-ardenne',
        'city_elsenborn', 'city_bulange',
    ], []),

    new RegionHoverOption('haute-lorraine', [
        'label_haute-lorraine',
        'region_haute-lorraine',
        'city_florenville', 'city_arlon',
    ], []),


    new RegionHoverOption('basse-lorraine', [
        'label_basse-lorraine',
        'region_basse-lorraine',
        'city_virton', 'city_battincourt',
    ], []),

];

const registerRegionHoverClicks = function () {
    const menuElement = document.getElementById("region-hover-menu");

    function showElementMenu(regionId, event) {
        menuElement.setAttribute("hidden", 'true');

        // Clear menu
        while (menuElement.firstChild) {
            menuElement.removeChild(menuElement.lastChild);
        }

        // Fill menu
        const regionData = regionHoverListOptions.find(o => o.id === regionId);
        if (!regionData) {
            console.warn('Region data not found: ' + regionId);
        }

        if (regionData) {
            const menuData = regionData.menu;
            menuData.forEach(menuItem => {
                if (menuItem.href) {
                    const menuLink = document.createElement("a");
                    menuLink.setAttribute('href', menuItem.href);
                    menuLink.textContent = menuItem.title;
                    menuElement.appendChild(menuLink);
                } else {
                    const menuTitleNode = document.createElement("h2");
                    menuTitleNode.textContent = menuItem.title;
                    menuElement.appendChild(menuTitleNode);
                }
            });
        }

        menuElement.setAttribute("style", "top: " + event.layerY + "px; left: " + event.layerX + "px;");
        menuElement.removeAttribute("hidden");
        event.stopPropagation();
    }

    regionHoverListOptions.forEach(regionOptions => {
        regionOptions.hoverIds.forEach(hoverId => {
            const element = document.getElementById(hoverId);
            if (!element) {
                console.warn('Element not found: ' + hoverId);
            }
            element.classList.add("map-hover");
            element.onclick = e => showElementMenu(regionOptions.id, e);
        })
    });

    document.body.addEventListener('click', e => {
        menuElement.setAttribute("hidden", 'true');
        // Clear menu
        while (menuElement.firstChild) {
            menuElement.removeChild(menuElement.lastChild);
        }
    });
}

document.addEventListener('DOMContentLoaded', (e) => {
    registerRegionHoverClicks();
});

