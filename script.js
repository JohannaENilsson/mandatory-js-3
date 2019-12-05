const BASE_URL = "https://dog.ceo/api/"; // Bas url
let dogId = window.location.hash; // vilken hund vi är på

// ******** TEXTEN *******

// 1. Skapar alla hundar i li
// 2. Lägger in texten. Första bokstav Versal
function createDogs(dogBreed) {
  // skapar alla
  // console.log(`All LI ${dogBreed}`);
  let li = document.createElement("li");
  li.textContent = capitalize(dogBreed);
  return li;
}

// 1. Skapar alla Sub-breeds
// 2. Lägger in texten. Första bokstav Versal
function createSubDogs(subBreeds) {
  // console.log(`SUBBRED ${subBreeds}`);
  let liSub = document.createElement("li");
  liSub.textContent = capitalize(subBreeds);
  return liSub;
}
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

      console.log(dogLi);
      // console.log(this.textContent);
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
        window.location.hash = hound; // # BREEDEN
        console.log("Hej");
        let CloseParent = this.closest('.SubDogsInUl').parentElement.innerText; //**************************** få parenten att också lägga sig i
        console.log(CloseParent);
        // console.log(this.closest('.SubDogsInUl').parentElement);
        // ulBreed.innerHTML = "";
        // 3 olika hund bilder
        createHeadline(hound); //
        getSubBreedImg(hound); // + Breeden (parent)
      });
    }
  }
}

// sätter h1
function createHeadline(dog) {
  let h1 = document.querySelector("main h1");
  h1.innerHTML = "";
  h1.textContent = dog.replace(/^./, dog[0].toUpperCase());
}

// Tillbaka till startsidan
let startPage = document.querySelector("button");
startPage.addEventListener("click", function() {
  // kommer tillbaka till första sidan
  window.location.href = "./"; // går till startsidan
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
    // console.log(houndList);
    renderSubBreeds(houndList, e);
  });
}

// // ********** BILDER *******
// // // Create IMG
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

function randomImg(dogId){
  let containerImg = document.querySelector(".imgContainer");
  containerImg.innerHTML = "";
  

  newDogs.addEventListener("click", function() {
    getAllDogsImg();
  });
  containerImg.appendChild(newDogs);
}

// // // Render all dog IMG
function renderAllDogsIMG(allIMGS) {
  let containerImg = document.querySelector(".imgContainer");
  containerImg.innerHTML = "";

  let newDogs = document.createElement("button");
  newDogs.textContent = "Get new dogs";
  // newDogs.addEventListener("click", function() {
  //   getAllDogsImg();
  // });
  containerImg.appendChild(newDogs);

  // console.log(allIMGS);
  for (let img of allIMGS) {
    if (img) {
      // console.log(img);
      let imgDog = createDogsIMG(img);
      // console.log(imgDog);
      containerImg.appendChild(imgDog);
    }
  }
  return newDogs;
}

// // // Render breeds dog IMG
function renderBreedsDogsIMG(allIMGS) {
  let containerImg = document.querySelector(".imgContainer");
  containerImg.innerHTML = "";
  // let newDogs = document.createElement("button");
  // newDogs.textContent = "Get new dogs";
  // containerImg.appendChild(newDogs);

  // console.log(allIMGS);
  for (let img of allIMGS) {
    //     // slica ut img
    let breed = img.split("/"); // tar ut breeden från img strängen
    console.log(breed[4]);
    newDogs.addEventListener("click", function() {
      // random breeds bilder
      getBreedImg(breed[4]);
    });
    if (img) {
      // console.log('LOOP ' + img);
      let imgDog = createDogsIMG(img);
      // console.log(imgDog);
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
// https://dog.ceo/api/breed/hound/images/random/3
// // GET BREED IMG
function getBreedImg(breed) {
  // console.log('Input GET breed' + breed);
  axios.get(`${BASE_URL}breed/${breed}/images/random/3`).then(response => {
    let allIMGS = response.data.message;
    // console.log('IMG breeds ' + allIMGS);
    renderBreedsDogsIMG(allIMGS);
  });
}

// GET SUB_BREED IMG
//https://dog.ceo/api/breed/hound/afghan/images
function getSubBreedImg(breed, hound) {
  console.log('Input GET breed' + breed);
  axios.get(`${BASE_URL}breed/${breed}-${hound} /images/random/3`).then(response => {
    let allIMGS = response.data.message;
    // console.log('IMG breeds ' + allIMGS);
    renderBreedsDogsIMG(allIMGS);
  });
}

// Funktion för att
// function reLoadPageWithHash(dogId) {
//   window.location.href = `./${dogId}`;
// }

// Om dogId finns i houndlist rendera den.
if (dogId) {
  dogId = dogId.substring(1);
  getAllDogs(dogId);
  createHeadline(dogId);
  getAllDogsImg(dogId);
} else {
  getAllDogs();
  getAllDogsImg();
}
