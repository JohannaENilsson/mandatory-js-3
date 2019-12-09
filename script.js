const BASE_URL = "https://dog.ceo/api/"; // Bas url
let dogId = window.location.hash; // vilken hund vi är på

// ******** TEXTEN *******

// 1. Skapar alla hundar i li
function createDogs(dogBreed) {
  // skapar alla
  // console.log(`All LI ${dogBreed}`);
  let li = document.createElement("li");
  li.setAttribute('data-name', dogBreed);
  li.textContent = capitalize(dogBreed);
  return li;
}

// 1. Skapar alla Sub-breeds
function createSubDogs(subBreeds) {
  // console.log(`SUBBRED ${subBreeds}`);
  let liSub = document.createElement("li");
  liSub.setAttribute("data-name", subBreeds);
  liSub.textContent = capitalize(subBreeds);
  return liSub;
}

// Versal
function capitalize(subBreeds) {
  return subBreeds.charAt(0).toUpperCase() + subBreeds.slice(1);
  }

// Render all dog TEXT
// 1. Hämtar och Tömmer ul
// 2. Loopar efter raser
// 3. startar createDogs funktion
// 4.  Appendar
// 5 . Eventlyssnare på LI
function renderAllDogs(allDogs) {
  let dogsInUl = document.querySelector(".dogsInUl");

  for (let dogBreed in allDogs) {
    // console.log(dogBreed);
    let dogLi = createDogs(dogBreed);
    dogsInUl.appendChild(dogLi);

    dogLi.addEventListener("click", function(e) {
      console.log("target", e.target);

      if (e.target.parentNode.className.includes("SubDogsInUl")) {
        return;
      }
      window.location.hash = dogBreed; // # BREEDEN
      getBreedImg(dogBreed);
      createHeadline(dogBreed); //
      getHoundList(dogBreed, e); // skickar in vilken breed som ska hämtas hem
    });
  }
}

// 1. Hämtar och Tömmer ul
// 2.
// renderar sub-breeds
function renderSubBreeds(houndList, e) {
  let ulBreed = document.querySelector(".SubDogsInUl");
  ulBreed.innerHTML = "";
  let li = e.target;
  
  // console.log(houndList);

  for (let hound of houndList) {
    // console.log(hound);
    if (hound.length > 0) {
      // console.log(hound);
      let liHound = createSubDogs(hound);
      li.appendChild(ulBreed);
      ulBreed.appendChild(liHound);
      // console.log(liHound);

      liHound.addEventListener("click", function(e) {
        let searchString = combinedDogs(e.target);
        // let searchString = combinedV2(e.target);
        
        window.location.hash = searchString; 
        createHeadline(hound);
        getSubBreedImg(searchString); 
      });
    }
  }
}

function combinedDogs(li) {
  let child = getDogName(li);
  let parentElement = li.parentElement.parentElement;
  let parent = getDogName(parentElement);
  let combined = `${parent}/${child}`;

  return combined;  
}

// function combinedV2(li) { // Binkes variant.
//   let dogName = getDogName(li);
//   let dogArr = [];
//   while (dogName) { // Det som står i Whilen måste förändras varje gång. // if(dogName !== null)
//     dogArr.push(dogName);

//     li = li.parentElement.parentElement; 
//     dogName = getDogName(li);
//   }
//   return dogArr.reverse().join('/');
// }

function getDogName(li) {
  let dogName = li.getAttribute('data-name');
  console.log(dogName);
  return dogName;
  
}

// sätter h1
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
    console.log(allDogs);
    renderAllDogs(allDogs);
  });
}
// GET HOUND TEXT
function getHoundList(dogBreed, e) {
  axios.get(`${BASE_URL}breed/${dogBreed}/list`).then(response => {
    let houndList = response.data.message;
    renderSubBreeds(houndList, e);
  });
}

// // ********** BILDER *******
// // // Create IMG
function createDogsIMG(img) {
  let div = document.createElement("div");
  let p = document.createElement("p");
  let breedText = img.split("/");
  // console.log(breedText);
  p.textContent = capitalize(breedText[4]);

  //   console.log(img);
  let imgDom = document.createElement("img");
  imgDom.setAttribute("src", img);
  div.appendChild(imgDom);
  div.appendChild(p);

  return div;
}

function randomImg(){
  let containerImg = document.querySelector(".imgContainer");
  containerImg.innerHTML = "";
  let hound = window.location.hash
  console.log(hound);
 

  if( hound === '') {
    getAllDogsImg();
    
  } else if (hound.includes('/') !== true) {
    hound = hound.substring(1);
    getBreedImg(hound); 
    
  } else  {
    hound = hound.substring(1);
    getSubBreedImg(hound);
  }
}

function createDogsBtn() {
  let dogsBtnDiv = document.querySelector('#dogsBtnDiv');
  let containerImg = document.querySelector(".imgContainer");
  containerImg.innerHTML = "";

  let newDogs = document.createElement("button");
  newDogs.textContent = "Get new dogs";
  newDogs.addEventListener("click", randomImg);
  dogsBtnDiv.prepend(newDogs);
  return newDogs;
}


// // // Render all dog IMG
function renderAllDogsIMG(allIMGS) {
  let containerImg = document.querySelector(".imgContainer");
  containerImg.innerHTML = '';

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
    // console.log(allIMGS);
    renderAllDogsIMG(allIMGS);
  });
}

// // GET BREED IMG
function getBreedImg(breed) {
  // console.log('Input GET breed' + breed);
  axios.get(`${BASE_URL}breed/${breed}/images/random/3`).then(response => {
    let allIMGS = response.data.message;
    renderAllDogsIMG(allIMGS);
  });
}

// GET SUB_BREED IMG
function getSubBreedImg(hound) {
  // console.log('Input GET breed' + breed);
  axios.get(`${BASE_URL}breed/${hound}/images/random/3`).then(response => {
    let allIMGS = response.data.message;
    renderAllDogsIMG(allIMGS);
  });
}


if (dogId) {
  dogId = dogId.substring(1);
  getAllDogs(dogId);
  createHeadline(dogId);
  getAllDogsImg(dogId);
} else {
  getAllDogs();
  getAllDogsImg();
}
createDogsBtn();
