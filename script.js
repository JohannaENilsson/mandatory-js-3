const BASE_URL = "https://dog.ceo/api/";
let dogId = window.location.hash; 

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

      if (e.target.parentNode.className.includes("SubDogsInUl")) {
        return;
      }
      window.location.hash = dog; 
      getBreedImg(dog);
      createHeadline(dog);
      getSubList(dog, e.target);
    });
  }
}

function renderSubText(houndList, li) {
  let ulBreed = document.querySelector(".SubDogsInUl");
  ulBreed.innerHTML = "";

  for (let hound of houndList) {
    if (hound.length > 0) {
      let liHound = createSubDogs(hound);
      li.appendChild(ulBreed); 
      ulBreed.appendChild(liHound);

      liHound.addEventListener("click", function(e) {
        let searchString = combinedDogs(e.target);

        window.location.hash = searchString; 
        createHeadline(hound);
        getSubBreedImg(searchString);
      });
    }
  }
}

function reloadSubLi(dogBreed) {
  let li = document.querySelector(`li[data-name="${dogBreed}"]`);
  getSubList(dogBreed, li);
}

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

let startPage = document.querySelector("button");
startPage.addEventListener("click", function() {
  window.location.href = "./";
  getAllDogs();
  getAllDogsImg();
});

function getAllDogs() {
  return axios.get(`${BASE_URL}breeds/list/all`).then(response => {
    let allDogs = response.data.message;
    renderAllDogsText(allDogs);
  });
}

function getSubList(dogBreed, li) {
  axios.get(`${BASE_URL}breed/${dogBreed}/list`).then(response => {
    let houndList = response.data.message;
    renderSubText(houndList, li);
  });
}

function createIMG(img) {
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
  let dog = window.location.hash; 

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

function renderAllDogsTextIMG(allIMGS) {
  let containerImg = document.querySelector(".imgContainer");
  containerImg.innerHTML = "";

  for (let img of allIMGS) {
    if (img) {
      let imgDog = createIMG(img);
      containerImg.appendChild(imgDog);
    }
  }
}

function getAllDogsImg() {
  axios.get(`${BASE_URL}breeds/image/random/3`).then(response => {
    let allIMGS = response.data.message;
    renderAllDogsTextIMG(allIMGS);
  });
}

function getBreedImg(breed) {
  axios.get(`${BASE_URL}breed/${breed}/images/random/3`).then(response => {
    let allIMGS = response.data.message;
    renderAllDogsTextIMG(allIMGS);
  });
}

function getSubBreedImg(hound) {
  axios.get(`${BASE_URL}breed/${hound}/images/random/3`).then(response => {
    let allIMGS = response.data.message;
    renderAllDogsTextIMG(allIMGS);
  });
}

function reloadPageWithHash(dogId) { 
  if (dogId.includes("/")) {
    dogId = dogId.substring(1);
    let dogE = dogId.split('/');
    getAllDogs(dogId)
    .then(function() {
      reloadSubLi(dogE[0], dogE[1]); 
    });
    createHeadline(dogE[1]);
  } else if (dogId) {
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