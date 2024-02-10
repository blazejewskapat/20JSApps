const count = 5;
const apiKey = "TMNR42uwVqpLhujyg5f12cmUIQGza7nkqbRzNv7ImEo";
const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let photosArray = [];
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let images = document.getElementsByTagName("img");
let isInitialLoad = true;

async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
    for (let i = 0; i < images.length; i++) {
      images[i].addEventListener("load", imageLoaded);
    }
    if (isInitialLoad) {
      updateAPIwithNewCount(30);
      isInitialLoad = false;
    }
  } catch (error) {
    console.log(error);
  }
}

function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    imagesLoaded = 0;
    ready = true;
    loader.hidden = true;
  }
}

function displayPhotos() {
  totalImages = photosArray.length;
  photosArray.forEach((photo) => {
    imageContainer.innerHTML += `
    <a href="${photo.links.html}" target="_blank">
        <img
          src="${photo.urls.regular}"
          alt="${photo.alt_description}"
          title="${photo.alt_description}"
        />
      </a>`;
  });
}

function updateAPIwithNewCount(picCount) {
  apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${picCount}`;
}

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

getPhotos();
