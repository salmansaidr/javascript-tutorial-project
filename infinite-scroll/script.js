const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

// Unsplash API
const count = 30;
const accessKey = '62Fpi4OixecAZhqV3cZOBYUWvfgMGuGig8fs7NKapbs';
const apiUrl = `https://api.unsplash.com/photos/?client_id=${accessKey}&count=${count}`;

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

function imageLoaded() {
    imagesLoaded++;
    if(imagesLoaded === totalImages) {
        loader.hidden = true;
        ready = true;
        console.log('ready = ', ready);
    }
}

function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

function displayPhotos() {
    totalImages = photosArray.length;
    photosArray.forEach((photo) => {
        const item = document.createElement('a');

        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        });

        const img = document.createElement('img');

        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });

        img.addEventListener('load', imageLoaded);

        item.appendChild(img);

        imageContainer.appendChild(item);

    })
}

// Get Photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch(error) {
        // Catch Error Here
    }
}

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        imagesLoaded = 0;
        getPhotos();
    }
});

getPhotos();