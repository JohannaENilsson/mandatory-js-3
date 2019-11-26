const BASE_URL = "https://dog.ceo/api/";

// Create li
function createDogs(dogBreed) {
  let li = document.createElement("li");
  li.textContent = dogBreed;
  return li;
}

// Create IMG
function createDogsIMG(img) {
let div = document.createElement('div');
let p = document.createElement('p');
let breedText = img.toUpperCase().split('/');
console.log(breedText);
p.textContent = breedText[4];

    //   console.log(img);
  let imgDom = document.createElement("img");
  imgDom.setAttribute("src", img);
  div.appendChild(imgDom);
  div.appendChild(p);

  return div;
}

// Render all dog TEXT
function renderAllDogs(allDogs) {
  let dogsInUl = document.querySelector(".dogsInUl");
  dogsInUl.innerHTML = "";

  if (allDogs) {
    for (let dogBreed in allDogs) {
      // console.log(dogBreed);
      let dogLi = createDogs(dogBreed);
      dogsInUl.appendChild(dogLi);

      // if (allDogs.hasOwnProperty(dogBreed)) {
      //   let subBreeds = allDogs[dogBreed];
      //   console.log(subBreeds);
      //   for (let subBreed of subBreeds) {
      //     //   console.log(subBreed);
      //     // let subBreedUl = document.createElement("ul");
      //     // dogLi.appendChild(subBreedUl);
      //     //   let subBreedLi = createDogs(subBreed);
      //     //   subBreedUl.appendChild(subBreedLi);
      //   }
      // }
    }
  }
}

// Render all dog IMG
function renderAllDogsIMG(allIMGS) {
  let mainImg = document.querySelector("main");
  mainImg.innerHTML = "";

  console.log(allIMGS);
  for (let dogImg in allIMGS) {
    if (allIMGS.hasOwnProperty(dogImg)) {
      let img = allIMGS[dogImg];
    //   console.log(img);
      let imgDog = createDogsIMG(img);
      console.log(imgDog);
      mainImg.appendChild(imgDog);
    }
  }
}

// GET TEXT
function getAllDogs() {
  axios.get(`${BASE_URL}breeds/list/all`).then(response => {
    let allDogs = response.data.message;
    console.log(allDogs);
    renderAllDogs(allDogs);
  });
}

// GET Random IMG
function getAllDogsImg() {
  axios.get(`${BASE_URL}breeds/image/random/3`).then(response => {
    let allIMGS = response.data.message;
    // console.log(allIMGS);
    renderAllDogsIMG(allIMGS);
  });
}

getAllDogsImg();
getAllDogs();
