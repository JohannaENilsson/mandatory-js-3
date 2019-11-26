// GET
function getAllDogs() {
  let req = new XMLHttpRequest();
  req.addEventListener("load", reqListener);
  req.open("GET", "https://dog.ceo/api/breeds/list/all");
  req.send();
}

function reqListener() {
  if (this.status === 200) {
    console.log(this.responseText);
    let allDogs = JSON.parse(this.responseText).message;
    console.log(allDogs);
  } else {
    console.log("Can´t find dogs");
  }
}

getAllDogs();
