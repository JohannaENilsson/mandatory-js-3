const BASE_URL = "https://dog.ceo/api/"; // Bas url
let dogId = window.location.hash; // vilken hund vi är på *************************************

// ******** TEXTEN *******

// 1. Skapar alla hundar i li
function createDogs(dog) {
  let li = document.createElement("li");
  li.setAttribute("data-name", dog);
  li.textContent = capitalize(dog);
  return li;
}

function createSubDogs(Breeds) {
  let li = document.createElement("li");
  li.setAttribute("data-name", Breeds);
  li.textContent = capitalize(Breeds);
  return li;
}

function capitalize(dogs) {
  return dogs.charAt(0).toUpperCase() + dogs.slice(1);
}

function renderAllDogsText(allDogs) {
  let dogsInUl = document.querySelector(".dogsInUl");

  for (let dog in allDogs) {
    let li = createDogs(dog);
    dogsInUl.appendChild(li);

    li.addEventListener("click", function(e) {
      console.log("target", e.target);

      if (e.target.parentNode.className.includes("SubDogsInUl")) {
        return;
      }
      window.location.hash = dog; // **************************************************
      getBreedImg(dog);
      createHeadline(dog);
      getHoundList(dog, e);
    });
  }
}

function renderSubBreedsText(houndList, e) {
  let ulBreed = document.querySelector(".SubDogsInUl");
  ulBreed.innerHTML = "";
  let li = e.target;

  for (let hound of houndList) {
    if (hound.length > 0) {
      let liHound = createSubDogs(hound);
      li.appendChild(ulBreed);
      ulBreed.appendChild(liHound);

      liHound.addEventListener("click", function(e) {
        let searchString = combinedDogs(e.target);

        window.location.hash = searchString; // *********************************************
        createHeadline(hound);
        getSubBreedImg(searchString);
      });
    }
  }
}
function reloadPageWithHash(dogId) {
  console.log(dogId);
  if (dogId) {
    dogId = dogId.substring(1);
    getAllDogs(dogId);
    createHeadline(dogId);
  } else {
    getAllDogs();
    getAllDogsImg();
  }
  createDogsBtn();
  randomImg();

}
reloadPageWithHash(dogId);


function combinedDogs(li) {
  let child = getDogName(li);
  let parentElement = li.parentElement.parentElement;
  let parent = getDogName(parentElement);
  let combined = `${parent}/${child}`;

  return combined;
}

function getDogName(li) {
  let dogName = li.getAttribute("data-name");
  return dogName;
}

function createHeadline(dog) {
  let h1 = document.querySelector("main h1");
  h1.innerHTML = "";
  h1.textContent = capitalize(dog);
}

// Tillbaka till startsidan
let startPage = document.querySelector("button");
startPage.addEventListener("click", function() {
  window.location.href = "./";
  getAllDogs();
  getAllDogsImg();
});

// GET TEXT
function getAllDogs() {
  axios.get(`${BASE_URL}breeds/list/all`).then(response => {
    let allDogs = response.data.message;
    renderAllDogsText(allDogs);
  });
}
// GET HOUND TEXT
function getHoundList(dogBreed, e) {
  axios.get(`${BASE_URL}breed/${dogBreed}/list`).then(response => {
    let houndList = response.data.message;
    renderSubBreedsText(houndList, e);
  });
}

// // ********** BILDER *******
function createDogsIMG(img) {
  let div = document.createElement("div");
  let p = document.createElement("p");
  let breedText = img.split("/");
  p.textContent = capitalize(breedText[4]);

  let imgDom = document.createElement("img");
  imgDom.setAttribute("src", img);
  div.appendChild(imgDom);
  div.appendChild(p);

  return div;
}

function randomImg() {
  let containerImg = document.querySelector(".imgContainer");
  containerImg.innerHTML = "";
  let dog = window.location.hash; // ***************************************************
  console.log(dog);

  if (dog === "") {
    getAllDogsImg();
  } else if (dog.includes("/") !== true) {
    dog = dog.substring(1);
    getBreedImg(dog);
  } else {
    dog = dog.substring(1);
    getSubBreedImg(dog);
  }
}

function createDogsBtn() {
  let dogsBtnDiv = document.querySelector("#dogsBtnDiv");
  let containerImg = document.querySelector(".imgContainer");
  containerImg.innerHTML = "";

  let newDogs = document.createElement("button");
  newDogs.textContent = "Get new dogs";
  newDogs.addEventListener("click", randomImg);
  dogsBtnDiv.prepend(newDogs);
  return newDogs;
}

// // // Render all dog IMG
function renderAllDogsTextIMG(allIMGS) {
  let containerImg = document.querySelector(".imgContainer");
  containerImg.innerHTML = "";

  for (let img of allIMGS) {
    if (img) {
      let imgDog = createDogsIMG(img);
      containerImg.appendChild(imgDog);
    }
  }
}

// // GET Random IMG
function getAllDogsImg() {
  axios.get(`${BASE_URL}breeds/image/random/3`).then(response => {
    let allIMGS = response.data.message;
    renderAllDogsTextIMG(allIMGS);
  });
}

// // GET BREED IMG
function getBreedImg(breed) {
  axios.get(`${BASE_URL}breed/${breed}/images/random/3`).then(response => {
    let allIMGS = response.data.message;
    renderAllDogsTextIMG(allIMGS);
  });
}

// GET SUB_BREED IMG
function getSubBreedImg(hound) {
  axios.get(`${BASE_URL}breed/${hound}/images/random/3`).then(response => {
    let allIMGS = response.data.message;
    renderAllDogsTextIMG(allIMGS);
  });
}

