const numNewsDisplay = 6

let dropdownBtn = document.querySelector('.dropdown-btn')
let dropdownMenu = document.querySelector('.dropdown-menu')

let searchIcon = document.querySelector('.search-icon-desktop')
let searchOverlay = document.querySelector('.overlay-container')
let searchOverlayCloseBtn = document.querySelector('.overlay-close-btn')

let viewAllNewsBtn = document.querySelector('.view-all-news-btn')
let hideNewsBtn = document.querySelector('.hide-news-btn')

let menuOverlay = document.querySelector('.nav-overlay')
let hamburgerBtn = document.querySelector('.hamburger-icon')
let menuCloseBtn = document.querySelector('.menu-close-icon');

(async () => {
    try {
        let response = await fetch("https://raw.githubusercontent.com/younginnovations/internship-challenges/master/front-end/news_list.json")
        let data = await response.json()
        populateNewsContainer(data['news'])
    } catch (error) {
        console.log(`Error while getting news data: ${error}`)
    }
})();


// create a news card 
function createNewsCard({ id, title, content, imgSrc }) {
    let newsCard = document.createElement('div')
    let image = document.createElement('img')
    let newsHeading = document.createElement('h4')
    let newsContent = document.createElement('p')
    let learnMoreBtn = document.createElement('a')

    newsCard.id = id
    newsCard.classList.add('news-card')
    if (id > 5) {
        newsCard.classList.add('hide')
    }

    image.src = imgSrc
    image.classList.add('news-card-image')

    newsHeading.classList.add('news-card-heading')
    newsHeading.appendChild(document.createTextNode(title))

    newsContent.classList.add('news-card-content')
    newsContent.appendChild(document.createTextNode(content))

    learnMoreBtn.href = "#"
    learnMoreBtn.classList.add('more-btn')
    learnMoreBtn.appendChild(document.createTextNode('Learn more'))

    newsCard.appendChild(image)
    newsCard.appendChild(newsHeading)
    newsCard.appendChild(newsContent)
    newsCard.appendChild(learnMoreBtn)

    document.querySelector('.news-container').appendChild(newsCard)
}

function populateNewsContainer(newsList) {
    newsList.forEach((news, idx) => {
        createNewsCard({
            id: idx,
            title: news['title'],
            content: news['content'],
            imgSrc: news['image'],
        })
    })
}

// handle form submit 
function submitHandler(e) {
    e.preventDefault()
}

// toggle search overlay container for laptops, desktops
function toggleSearchOverlay() {
    searchOverlay.classList.toggle('hide')
    document.body.classList.toggle('overflow-hidden')
    menuOverlay.classList.toggle('z-10')
    dropdownMenu.classList.add('hide')
}

//toggle dropdown menu on click event
dropdownBtn.addEventListener('click', () => {
    dropdownMenu.classList.toggle('hide')
})


// hide search overlay on click event
searchOverlay.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
        toggleSearchOverlay()
    }
})


searchOverlayCloseBtn.addEventListener("click", () => {
    toggleSearchOverlay()
})


// show search overlay on click event
searchIcon.addEventListener("click", () => {
    toggleSearchOverlay()
})


// show menu overlay on click event
hamburgerBtn.addEventListener('click', () => {
    menuOverlay.classList.add('slide-in-animation')
    menuOverlay.classList.remove('slide-out-animation')
})

// hide menu overlay on click event
menuCloseBtn.addEventListener('click', () => {
    menuOverlay.classList.add('slide-out-animation')
    menuOverlay.classList.remove('slide-in-animation')
})


// show all news card
viewAllNewsBtn.addEventListener('click', (e) => {
    document.querySelectorAll(`.news-card.hide`).forEach((newsCard) => {
        newsCard.classList.remove('hide', 'slide-up-animate')
        newsCard.classList.add('slide-down-animate')
    })
    e.currentTarget.classList.add('hide')
    hideNewsBtn.classList.remove('hide')

    document.documentElement.style.setProperty('--news-card-height', document.querySelector('.news-card').offsetHeight + 'px')
})


// show only six news card and hide others
hideNewsBtn.addEventListener('click', (e) => {
    document.querySelectorAll(`.news-card:nth-child(n+${numNewsDisplay + 1})`).forEach((newsCard) => {
        newsCard.classList.add('slide-up-animate')
        newsCard.classList.remove('slide-down-animate')
        setTimeout(() => {
            newsCard.classList.add('hide')
        }, 250)
    })

    e.currentTarget.classList.add('hide')
    viewAllNewsBtn.classList.remove('hide')
})



//for responsive carousel slider of company logos
function responsiveLogoSlider() {
    let index = 0
    let logoSlides = document.querySelectorAll('.logo-slide')
    let totalLogoSlides = logoSlides.length

    const mqlMobile = window.matchMedia("(min-width: 320px) and (max-width: 480px");
    const mqlTablet = window.matchMedia("(min-width: 481px) and (max-width: 768px");
    const mqlLaptop = window.matchMedia("(min-width: 769px) and (max-width: 1024px");
    const mqlDesktop = window.matchMedia("(min-width: 1025px) and (max-width: 1400px");
    const mqlLargeScreen = window.matchMedia("(min-width: 1401px)");

    // show logo slides according to breakpoints 
    function showLogoSlides(val) {
        if ((index + val) > totalLogoSlides) {
            index = totalLogoSlides - val
        }

        if (index < 0) index = 0

        for (let i = 0; i < totalLogoSlides; i++) {
            const element = logoSlides[i];

            if (i >= index && i < (index + val)) {
                element.style.display = 'inline-block'
            } else {
                element.style.display = 'none'
            }
        }
    }

    // increase or decrease index value and show logo slides 
    function toggleLogoSlides(update) {
        index += update

        if (mqlMobile.matches) showLogoSlides(1)

        if (mqlTablet.matches) showLogoSlides(2)

        if (mqlLaptop.matches) showLogoSlides(3)

        if (mqlDesktop.matches) showLogoSlides(4)
    }

    function mobileScreenTest(e) {
        if (e.matches) showLogoSlides(1)

    }

    function tabletScreenTest(e) {
        if (e.matches) showLogoSlides(2)

    }

    function laptopScreenTest(e) {
        if (e.matches) showLogoSlides(3)

    }

    function desktopScreenTest(e) {
        if (e.matches) showLogoSlides(4)
    }

    function largeScreenTest(e) {
        if (e.matches) showLogoSlides(5)

    }

    // listen breakpoints change 
    mqlMobile.addEventListener("change", mobileScreenTest);
    mqlTablet.addEventListener("change", tabletScreenTest);
    mqlLaptop.addEventListener("change", laptopScreenTest);
    mqlDesktop.addEventListener("change", desktopScreenTest);
    mqlLargeScreen.addEventListener("change", largeScreenTest);

    // initial breakpoint check 
    mobileScreenTest(mqlMobile)
    tabletScreenTest(mqlTablet)
    laptopScreenTest(mqlLaptop)
    desktopScreenTest(mqlDesktop)
    largeScreenTest(mqlLargeScreen)

    document.querySelector("#nextBtn").addEventListener('click', () => {
        toggleLogoSlides(1)
    })

    document.querySelector("#prevBtn").addEventListener("click", () => {
        toggleLogoSlides(-1)
    })
}

responsiveLogoSlider()