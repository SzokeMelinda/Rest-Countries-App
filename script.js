//https://restcountries.com/v3.1/all
const countriesElem = document.querySelector(".countries");
const dropDown = document.querySelector(".dropDown");
const dropElem = document.querySelector(".drop");
const region = document.querySelectorAll(".region");
const search = document.querySelector(".search");
const toggle = document.querySelector(".toggle");

async function getCountry() {
  const url = await fetch("https://restcountries.com/v3.1/all");
  const res = await url.json();
  console.log(res);
  res.forEach((element) => {
    showCountry(element);
  });
}
getCountry();

function showCountry(data) {
  const country = document.createElement("div");
  country.classList.add("country");
  country.innerHTML = `
    <div class="country-img">
    <img src="${data.flags[Object.keys(data.flags)[0]]}" alt="">
</div>
<div class="country-info">
    <h5 class="countryName">${data.name[Object.keys(data.name)[0]]}</h5>
    <p><strong>Population: </strong>${data.population}</p>
    <p class="regionName"><strong>Region: </strong>${data.region}</p>
    <p class ="capitalName"><strong>Capital: </strong>${data.capital}</p>
</div>
    `;
  countriesElem.appendChild(country);
  country.addEventListener("click", () => {
    showCountryDetail(data);
  });
}

dropDown.addEventListener("click", () => {
  dropElem.classList.toggle("showDropDown");
});

const regionName = document.getElementsByClassName("regionName");
const countryName = document.getElementsByClassName("countryName");
const capitalName = document.getElementsByClassName("capitalName");

region.forEach((element) => {
  element.addEventListener("click", () => {
    Array.from(regionName).forEach((elem) => {
      if (
        elem.innerText.includes(element.innerText) ||
        element.innerText == "All"
      ) {
        elem.parentElement.parentElement.style.display = "grid";
      } else {
        elem.parentElement.parentElement.style.display = "none";
      }
    });
  });
});

search.addEventListener("input", () => {
  console.log(search.value.toLowerCase());
  Array.from(countryName).forEach((elem) => {
    if (elem.innerText.toLowerCase().includes(search.value.toLowerCase())) {
      elem.parentElement.parentElement.style.display = "grid";
    } else {
      elem.parentElement.parentElement.style.display = "none";
    }
  });
});

const countryModal = document.querySelector(".countryModal");

function showCountryDetail(data) {
  countryModal.classList.toggle("show");

  countryModal.innerHTML = `
    <button class="back">Back</button>
        <div class="modal">
            <div class="leftModal">
                <img src="${data.flags[Object.keys(data.flags)[0]]}" alt="">
            </div>
            <div class="rightModal">
                <h1>${data.name[Object.keys(data.name)[0]]}</h1>
               <div class="modalInfo">
                <div class="innerLeft inner">
                    <p class="codeName"><strong>Alpha 2 Code: </strong>${
                      data.cca2
                    }</p>
                    <p class ="capitalName"><strong>Capital: </strong>${
                      data.capital
                    }</p>   
                    <p><strong>Region: </strong>${data.region}</p>
                    <p><strong>Population: </strong>${(
                      +data.population / 1000000
                    ).toFixed(1)} M</p>
                    <p><strong>LatLng: </strong>${data.latlng}</p>
                    
            </div>
            <div class="innerRight inner">
                <p><strong>Area: </strong>${data.area}</p>
                <p><strong>Time Zone(s): </strong>${data.timezones}</p>
                <p><strong>Neighbour(s): </strong>${data.borders}</p>
                <p ><strong>Currencies: </strong>${
                  Object.entries(Object.entries(data.currencies)[0][1])[0][1]
                }</p>
                <p><strong>Official Languages: </strong>${
                  Object.entries(data.languages)[0][1]
                }</p>
                
            </div>
               </div>
            </div>
        </div>
        `;

  const back = countryModal.querySelector(".back");

  back.addEventListener("click", () => {
    countryModal.classList.toggle("show");
  });
}
