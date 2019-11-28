const BASE_URL = "https://dog.ceo/api/";

// Create li
function createDogs(dogBreed) {
  let li = document.createElement("li");
  li.textContent = dogBreed.replace(/^./, dogBreed[0].toUpperCase());
  return li;
}

// // skapar alla sub-breeds
function createSubDogs(subBreeds) {
  console.log(subBreeds);
  let liSub = document.createElement("li");
  liSub.textContent = subBreeds.replace(/^./, subBreeds[0].toUpperCase());
  return liSub;
}

// Create IMG
function createDogsIMG(img) {
  let div = document.createElement("div");
  let p = document.createElement("p");
  let breedText = img.toUpperCase().split("/");
  // console.log(breedText);
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
      console.log(dogBreed);
      let dogLi = createDogs(dogBreed);
      dogsInUl.appendChild(dogLi);

      function onClick(e) { // får klicka en gång
        console.log("hej");
        getBreedImg(dogBreed);
        renderSubBreeds(allDogs, dogBreed, e);
        dogLi.removeEventListener('click', onClick);
      }

      dogLi.addEventListener("click", onClick);

    }
  }
}

// renderar sub-breeds
function renderSubBreeds(allDogs, dogBreed, e){
  let li = e.target;
  let ulBreed = document.createElement('ul');
  ulBreed.innerHTML = '';


  if(dogBreed){
    if(allDogs.hasOwnProperty(dogBreed)){
       let subBreeds = allDogs[dogBreed];
      if(subBreeds.length > 1) {
        for(let subBreed of subBreeds){
          
 
    let liBreed = createSubDogs(subBreed);
    li.appendChild(ulBreed);
    ulBreed.appendChild(liBreed);
    console.log(subBreed);
      }
    }
  }
  }
  

}

// Render all dog IMG
function renderAllDogsIMG(allIMGS) {
  let mainImg = document.querySelector("main");
  mainImg.innerHTML = "";

  let newDogs = document.createElement("button");
  newDogs.textContent = "Get new dogs";
  newDogs.addEventListener("click", function() {
    getAllDogsImg();
  });
  mainImg.appendChild(newDogs);

  // console.log(allIMGS);
  for (let img of allIMGS) {
    if (img) {
      // console.log(img);
      let imgDog = createDogsIMG(img);
      // console.log(imgDog);
      mainImg.appendChild(imgDog);
    }
  }
}

// GET TEXT
function getAllDogs() {
  axios.get(`${BASE_URL}breeds/list/all`).then(response => {
    let allDogs = response.data.message;
    // console.log(allDogs);
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

// GET BREED IMG
function getBreedImg(breed) {
  axios.get(`${BASE_URL}${breed}/image/random/3`).then(response => {
    let allIMGS = response.data.message;
    // console.log(allIMGS);
    renderAllDogsIMG(allIMGS);
  });
}

getAllDogsImg();
getAllDogs();
