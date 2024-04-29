let homeData = document.getElementById("home-data");
let mealOverlay = document.querySelector(".mealOverlay");
let meal = document.querySelector(".meal");
let search = document.getElementById("search");
let submitBtn;
// !loading
function loadingfade() {
  $(".loading-screen").fadeOut(800);
}
function innerfade() {
  $(".loading-screen").fadeOut(800);
}

// ~side nav
function listDown() {
  $("#leftMenu").animate({ top: "100px" }, 400);
}
function listup() {
  $("#leftMenu").animate({ top: "0px" }, 400);
}

function logoReplace() {
  $(".icon").removeClass("fa-bars");
  $(".icon").addClass("fa-xmark");
}
function logoReplaceTwo() {
  $(".icon").addClass("fa-bars");
  $(".icon").removeClass("fa-xmark");
}
const sideNavWidth = $("#sideNav").outerWidth();
$("#home-content").css({ left: `0px` }, 400);
$("#sideNav").css({ left: `-200px` }, 400);
let isShown = false;
$(".icon").on("click", function () {
  if (isShown == false) {
    $("#sideNav").animate({ left: `0px` }, 400);
    $("#home-content").animate({ left: `${sideNavWidth}px` }, 400);
    $("#leftMenu").addClass("topInWillOpen");
    listup();
    logoReplace();
    isShown = true;
  } else {
    $("#sideNav").animate({ left: `-${sideNavWidth}px` }, 400);
    $("#home-content").animate({ left: `0px` }, 400);
    logoReplaceTwo();
    listDown();
    isShown = false;
  }
});
function closeNav() {
  $("#sideNav").animate({ left: `-${sideNavWidth}px` }, 400);
  $("#home-content").animate({ left: `0px` }, 400);
  logoReplaceTwo();
  isShown = false;
}
// !homemeals------------------------------------>

async function getHomeMeals() {
  var response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=`
  );
  var data = await response.json();
  displayMeals(data.meals);
  console.log(data);
  getMealDetails(data.meals[0]);
}
getHomeMeals();

function displayMeals(arr) {
  loadingfade();

  let contain = "";
  for (let i = 0; i < arr.length; i++) {
    contain += `
      <div class="col-md-3 meal" >
              <div onclick="getMealDetails(${arr[i].idMeal})" class=" meal position-relative overflow-hidden rounded-2 cursor-pointer">
              <img class="w-100" src="${arr[i].strMealThumb}" alt="" srcset="">
                  <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                      <h3>${arr[i].strMeal}</h3>
                  </div>
                  </div>
                  </div>
                  `;
  }

  homeData.innerHTML = contain;
}

async function getMealDetails(mealId) {
  console.log("hello from getmealdetails");

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
  );
  let data = await response.json();
  displayMealDetails(data.meals[0]);
  console.log(data.meals[0]);
}

async function displayMealDetails(meal) {
  let ingredients = ``;

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients += `<li class="alert alert-info m-1 p-2">${
        meal[`strMeasure${i}`]
      } ${meal[`strIngredient${i}`]}</li>`;
    }
  }
  let tags = meal.strTags;
  if (!tags) tags = [];
  let tagsStr = "";
  tagsStr = `
      <h4 class=" m-2 p-1">${tags}</h4>`;

  let contain = `
  <div
                class="loading-screen z-3 vh-100 w-100 position-fixed bg-black justify-content-center align-items-center">
                <span class="loader two"></span></div>

    <div class="col-md-4 text-white">
                <img class="w-100 rounded-3 " src="${meal.strMealThumb}"
                    alt="">
                    <h2 >${meal.strMeal}</h2>
            </div>
            <div class="col-md-8 text-white">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredients}
                </ul>

                <h3>Tags :</h3>
                <h4 class="tags">${tags}</h4>
                
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    
                </ul>

                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`;

  homeData.innerHTML = contain;
  innerfade();
  console.log("hello from display");
}
// !loading
function loading() {
  homeData.innerHTML = `
  <div
  class="loading-screen z-3 vh-100 w-100 position-fixed bg-black justify-content-center align-items-center">
  <span class="loader two"></span></div>`;
  innerfade();
}
// ** search ------------------------->
$("#Search").on("click", function searchPage() {
  homeData.innerHTML = " ";
  closeNav();
  console.log("hi from search");

  search.innerHTML = `   <div
  class="loading-screen z-3 vh-100 w-100 position-fixed bg-black justify-content-center align-items-center">
  <span class="loader two"></span></div>

        <div class="col-md-6 ">
            <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input onkeyup="searchByLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
        </div>
  `;

  innerfade();
});

async function searchByName(name) {
  loading();
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
  );
  let data = await response.json();
  if (data.meals) {
    displayMeals(data.meals);
  } else {
    displayMeals([]);
  }
}
async function searchByLetter(letter) {
  loading();
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
  );
  console.log("fromletter");
  if (letter == "") {
    let letter = "a";
  } else {
    let letter = "";
  }
  let data = await response.json();
  if (data.meals) {
    displayMeals(data.meals);
  } else {
    displayMeals([]);
  }
}

// ^^categories----------------------------->

$("#Categories").on("click", async function getCategories() {
  let search = document.getElementById("search");
  search.innerHTML = "";
  closeNav();
  console.log("helllo im in get categ");
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  let data = await response.json();
  displayCategories(data.categories);
});

function displayCategories(arr) {
  let contain = "";

  for (let i = 0; i < arr.length; i++) {
    contain += `
    <div
                class="loading-screen z-3 vh-100 w-100 position-fixed bg-black justify-content-center align-items-center">
                <span class="loader two"></span></div>
      <div class="col-md-3">
              <div onclick="getCategoryMeals('${arr[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                  <img class="w-100" src="${arr[i].strCategoryThumb}" alt="" srcset="">
                  <div class="meal-layer position-absolute text-center text-black p-2">
                      <h3>${arr[i].strCategory}</h3>
                      <p>${arr[i].strCategoryDescription}</p>
                  </div>
              </div>
      </div>
      `;
  }
  homeData.innerHTML = contain;
  innerfade();
}

async function getCategoryMeals(category) {
  console.log("im here");
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );
  let data = await response.json();
  displayCategoryMeal(data.meals);
}
function displayCategoryMeal(arr) {
  let search = document.getElementById("search");
  search.innerHTML = "";
  let contain = "";
  for (let i = 0; i < arr.length; i++) {
    contain += `
    <div
                class="loading-screen z-3 vh-100 w-100 position-fixed bg-black justify-content-center align-items-center">
                <span class="loader two"></span></div>
      <div class="col-md-3 meal" >
              <div onclick="getMealDetails(${arr[i].idMeal})" class=" meal position-relative overflow-hidden rounded-2 cursor-pointer">
              <img class="w-100" src="${arr[i].strMealThumb}" alt="" srcset="">
                  <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                      <h3>${arr[i].strMeal}</h3>
                  </div>
                  </div>
                  </div>
                  `;
  }
  console.log(" babyyy");
  homeData.innerHTML = contain;
  innerfade();
}

//& Area ============================================>

$("#Area").on("click", async function getArea() {
  closeNav();
  console.log("helllo im in get area");
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  let data = await response.json();
  displayArea(data.meals);
});

function displayArea(arr) {
  let search = document.getElementById("search");
  search.innerHTML = "";
  let contain = "";

  for (let i = 0; i < arr.length; i++) {
    contain += `
    <div
                class="loading-screen z-3 vh-100 w-100 position-fixed bg-black justify-content-center align-items-center">
                <span class="loader two"></span></div>
    <div class="col-md-3">
    <div onclick="getAreaMeals('${arr[i].strArea}')" class="rounded-2 text-center text-white cursor-pointer">
            <i class="fa-solid fa-house-laptop fa-4x"></i>
            <h3>${arr[i].strArea}</h3>
    </div>
</div>
      `;
  }
  homeData.innerHTML = contain;
  innerfade();
}

async function getAreaMeals(Area) {
  console.log("im here");
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${Area}`
  );
  let data = await response.json();
  displayAreaMeal(data.meals);
}
function displayAreaMeal(arr) {
  let search = document.getElementById("search");
  search.innerHTML = "";
  let contain = "";
  for (let i = 0; i < arr.length; i++) {
    contain += `
    <div
                class="loading-screen z-3 vh-100 w-100 position-fixed bg-black justify-content-center align-items-center">
                <span class="loader two"></span></div>
      <div class="col-md-3 meal" >
              <div onclick="getMealDetails(${arr[i].idMeal})" class=" meal position-relative overflow-hidden rounded-2 cursor-pointer">
              <img class="w-100" src="${arr[i].strMealThumb}" alt="" srcset="">
                  <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                      <h3>${arr[i].strMeal}</h3>
                  </div>
                  </div>
                  </div>
                  `;
  }
  console.log(" babyyy");
  homeData.innerHTML = contain;
  innerfade();
}

// ~ ingredients=========================>

$("#Ingredients").on("click", async function getIngredients() {
  closeNav();
  console.log("helllo im in get area");
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  let data = await response.json();
  displayIngredients(data.meals.slice(0, 20));
});

function displayIngredients(arr) {
  let search = document.getElementById("search");
  search.innerHTML = "";
  let contain = "";

  for (let i = 0; i < arr.length; i++) {
    contain += `
    <div
    class="loading-screen z-3 vh-100 w-100 position-fixed bg-black justify-content-center align-items-center">
    <span class="loader two"></span></div>
    <div class="col-md-3 h-25">
                <div onclick="getIngredientsMeals('${
                  arr[i].strIngredient
                }')" class="rounded-2 text-white overflow-hidden h-50 text-center cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${arr[i].strIngredient}</h3>
                        <p>${arr[i].strDescription
                          .split(" ")
                          .slice(0, 20)
                          .join(" ")} </p>
                </div>
        </div>
        `;
  }
  homeData.innerHTML = contain;
  innerfade();
}

async function getIngredientsMeals(ingredient) {
  console.log("im here");
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
  );
  let data = await response.json();
  displayIngredientsMeals(data.meals);
}
function displayIngredientsMeals(arr) {
  let search = document.getElementById("search");
  search.innerHTML = "";
  let contain = "";
  for (let i = 0; i < arr.length; i++) {
    contain += `
    <div
                class="loading-screen z-3 vh-100 w-100 position-fixed bg-black justify-content-center align-items-center">
                <span class="loader two"></span></div>
      <div class="col-md-3 meal" >
              <div onclick="getMealDetails(${arr[i].idMeal})" class=" meal position-relative overflow-hidden rounded-2 cursor-pointer">
              <img class="w-100" src="${arr[i].strMealThumb}" alt="" srcset="">
                  <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                      <h3>${arr[i].strMeal}</h3>
                  </div>
                  </div>
                  </div>
                  `;
  }
  console.log(" babyyy");
  homeData.innerHTML = contain;
  innerfade();
}

// ? CONTACT

function showContacts() {
  closeNav();
  let search = document.getElementById("search");
  search.innerHTML = "";
  homeData.innerHTML = `
  <div
                class="loading-screen z-3 vh-100 w-100 position-fixed bg-black justify-content-center align-items-center">
                <span class="loader two"></span></div>
  <div class="contact min-vh-100 d-flex justify-content-center align-items-center">
  <div class="container w-75 text-center">
      <div class="row g-4">
          <div class="col-md-6">
              <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
              <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Special characters and numbers not allowed
              </div>
          </div>
          <div class="col-md-6">
              <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
              <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Email not valid *exemple@yyy.zzz
              </div>
          </div>
          <div class="col-md-6">
              <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
              <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Enter valid Phone Number
              </div>
          </div>
          <div class="col-md-6">
              <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
              <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Enter valid age
              </div>
          </div>
          <div class="col-md-6">
              <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
              <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Enter valid password *Minimum eight characters, at least one letter and one number:*
              </div>
          </div>
          <div class="col-md-6">
              <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
              <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Enter valid repassword 
              </div>
          </div>
      </div>
      <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
  </div>
</div> `;
  innerfade();
  submitBtn = document.getElementById("submitBtn");

  document.getElementById("nameInput").addEventListener("focus", () => {
    nameInputTouched = true;
  });

  document.getElementById("emailInput").addEventListener("focus", () => {
    emailInputTouched = true;
  });

  document.getElementById("phoneInput").addEventListener("focus", () => {
    phoneInputTouched = true;
  });

  document.getElementById("ageInput").addEventListener("focus", () => {
    ageInputTouched = true;
  });

  document.getElementById("passwordInput").addEventListener("focus", () => {
    passwordInputTouched = true;
  });

  document.getElementById("repasswordInput").addEventListener("focus", () => {
    repasswordInputTouched = true;
  });
}

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;

function inputsValidation() {
  if (nameInputTouched) {
    if (nameValidation()) {
      document
        .getElementById("nameAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("nameAlert")
        .classList.replace("d-none", "d-block");
    }
  }
  if (emailInputTouched) {
    if (emailValidation()) {
      document
        .getElementById("emailAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("emailAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (phoneInputTouched) {
    if (phoneValidation()) {
      document
        .getElementById("phoneAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("phoneAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (ageInputTouched) {
    if (ageValidation()) {
      document
        .getElementById("ageAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("ageAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (passwordInputTouched) {
    if (passwordValidation()) {
      document
        .getElementById("passwordAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("passwordAlert")
        .classList.replace("d-none", "d-block");
    }
  }
  if (repasswordInputTouched) {
    if (repasswordValidation()) {
      document
        .getElementById("repasswordAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("repasswordAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (
    nameValidation() &&
    emailValidation() &&
    phoneValidation() &&
    ageValidation() &&
    passwordValidation() &&
    repasswordValidation()
  ) {
    submitBtn.removeAttribute("disabled");
  } else {
    submitBtn.setAttribute("disabled", true);
  }
}

function nameValidation() {
  return /^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value);
}

function emailValidation() {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    document.getElementById("emailInput").value
  );
}

function phoneValidation() {
  return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
    document.getElementById("phoneInput").value
  );
}

function ageValidation() {
  return /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(
    document.getElementById("ageInput").value
  );
}

function passwordValidation() {
  return /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(
    document.getElementById("passwordInput").value
  );
}

function repasswordValidation() {
  return (
    document.getElementById("repasswordInput").value ==
    document.getElementById("passwordInput").value
  );
}
