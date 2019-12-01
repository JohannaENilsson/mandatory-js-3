const BASE_URL = "https://dog.ceo/api/"; // Bas url


// ******** TEXTEN *******

// 1. Skapar alla hundar i li
// 2. Lägger in texten. Första bokstav Versal
function createDogs(dogBreed) { // skapar alla
  // console.log(`All LI ${dogBreed}`);
  let li = document.createElement("li");
  li.textContent = dogBreed.replace(/^./, dogBreed[0].toUpperCase());
  return li;
}

// 1. Skapar alla Sub-breeds
// 2. Lägger in texten. Första bokstav Versal
function createSubDogs(subBreeds) {
  console.log(`SUBBRED ${subBreeds}`);
  let liSub = document.createElement("li");
  liSub.textContent = subBreeds.replace(/^./, subBreeds[0].toUpperCase());
  return liSub;
}


// Render all dog TEXT
// 1. Hämtar och Tömmer ul
// 2. Loopar efter raser
// 3. startar createDogs funktion
// 4.  Appendar
// 5 . Eventlyssnare på LI
function renderAllDogs(allDogs) {
  let dogsInUl = document.querySelector(".dogsInUl");
  dogsInUl.innerHTML = "";

  for (let dogBreed in allDogs) {
    // console.log(dogBreed);
    let dogLi = createDogs(dogBreed);
    dogsInUl.appendChild(dogLi);

    // Lyssnar på alla hundar
    // Får bilder på ras
    // Renderar sub-breed
    // Sätter h1
    function onClick(e) {
      // console.log(this.textContent);
      window.location.hash = dogBreed; // # BREEDEN
      // getBreedImg(dogBreed);
      renderSubBreeds(allDogs, dogBreed, e); //*****  -> KAN INTE SKICKA IN ALLT!
      createHeadline(dogBreed); // 
    }
    dogLi.addEventListener("click", onClick);
  }
}

// sätter h1
function createHeadline(dog){
  let h1 = document.querySelector("main h1");
  h1.innerHTML = '';
  h1.textContent = dog.replace(/^./, dog[0].toUpperCase());
}

// 1. Hämtar och Tömmer ul
// 2. 
// renderar sub-breeds
function renderSubBreeds(allDogs, dogBreed, e) {
  let ulBreed = document.querySelector('.SubDogsInUl');
  ulBreed.innerHTML = "";
  let li = e.target; 
  console.log('E-taget' + e.target);
  
  // ger underlista
  if (allDogs.hasOwnProperty(dogBreed)) {
    let subBreeds = allDogs[dogBreed];
    
    if (subBreeds.length > 1) { // händer bara om det finns
      console.log('SUB-BREEDS' + subBreeds);
      for (let subBreed of subBreeds) {
        let liBreed = createSubDogs(subBreed);
        li.appendChild(ulBreed);
        ulBreed.appendChild(liBreed);
        // console.log('SUBBREED ' + subBreed);
      }
    }
  }
}

// Tillbaka till startsidan
let startPage = document.querySelector('button'); 
startPage.addEventListener('click', function(){ // kommer tillbaka till första sidan
  window.location.href = './'; // går till startsidan
  getAllDogs();
  // getAllDogsImg();
});

// GET TEXT
function getAllDogs() {
  axios.get(`${BASE_URL}breeds/list/all`).then(response => {
    let allDogs = response.data.message;
    // console.log(allDogs);
    renderAllDogs(allDogs);
  });
}


// // ********** BILDER *******
// // // Create IMG
// function createDogsIMG(img) {
//   let div = document.createElement("div");
//   let p = document.createElement("p");
//   let breedText = img.toUpperCase().split("/");
//   // console.log(breedText);
//   p.textContent = breedText[4];

//   //   console.log(img);
//   let imgDom = document.createElement("img");
//   imgDom.setAttribute("src", img);
//   div.appendChild(imgDom);
//   div.appendChild(p);

//   return div;
// }

// // // Render all dog IMG
// function renderAllDogsIMG(allIMGS) {
//   let containerImg = document.querySelector(".imgContainer");
//   containerImg.innerHTML = "";

//   let newDogs = document.createElement("button");
//   newDogs.textContent = "Get new dogs";
//   newDogs.addEventListener("click", function() {
//     getAllDogsImg();
//   });
//   containerImg.appendChild(newDogs);

//   // console.log(allIMGS);
//   for (let img of allIMGS) {
//     if (img) {
//       // console.log(img);
//       let imgDog = createDogsIMG(img);
//       // console.log(imgDog);
//       containerImg.appendChild(imgDog);
//     }
//   }
// }

// // // Render breeds dog IMG
// function renderBreedsDogsIMG(allIMGS) {
//   let containerImg = document.querySelector(".imgContainer");
//   containerImg.innerHTML = "";
//   let newDogs = document.createElement("button");
//   newDogs.textContent = "Get new dogs";
//   containerImg.appendChild(newDogs);

//   // console.log(allIMGS);
//   for (let img of allIMGS) {

//     // slica ut img
//     let breed = img.split('/'); // tar ut breeeden från img strängen
//     //console.log(breed[4]);
//     newDogs.addEventListener("click", function() { // random breeds bilder
//       getBreedImg(breed[4]);
//     });
//     if (img) {
//       // console.log('LOOP ' + img);
//       let imgDog = createDogsIMG(img);
//       // console.log(imgDog);
//       containerImg.appendChild(imgDog);
//     }
//   }
// }

// // Render breed

// // // GET Random IMG
// function getAllDogsImg() {
//   axios.get(`${BASE_URL}breeds/image/random/3`)
//   .then(response => {
//     let allIMGS = response.data.message;
//     // console.log(allIMGS);
//     renderAllDogsIMG(allIMGS);
//   });
// }
// // https://dog.ceo/api/breed/hound/images/random/3
// // // GET BREED IMG
// function getBreedImg(breed) {
//   // console.log('Input GET breed' + breed);
//   axios.get(`${BASE_URL}breed/${breed}/images/random/3`)
//   .then(response => {
//     let allIMGS = response.data.message;
//     // console.log('IMG breeds ' + allIMGS);
//     renderBreedsDogsIMG(allIMGS);
//   });
// }


let dogId = window.location.hash;
if (dogId) {
  dogId = dogId.substring(1);
  getAllDogs(dogId);
  // getAllDogsImg(dogId);
} else {
  getAllDogs();
  // getAllDogsImg();
}
