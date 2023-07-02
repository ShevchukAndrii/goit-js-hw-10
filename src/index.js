
import { fetchBreeds, fetchCatByBreed } from "./cat-api.js";
import SlimSelect from 'slim-select'
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const selectEl = document.querySelector(".breed-select");
const loaderEl = document.querySelector(".loader");
const errorEl = document.querySelector(".error");
const catInfoEl = document.querySelector(".cat-info");
const createOptionItem = (url, breeds ) => {
    return `<div class="img-box">
<img src="${url}" alt="${breeds[0].name}" width="400"/>
</div>
<div class="box">
<h1>${breeds[0].name}</h1>
<p>${breeds[0].description}</p>
<p><b>Temperament:</b> ${breeds[0].temperament}</p>
</div>`}

loaderEl.classList.replace("loader", "is-hidden");
errorEl.classList.add("is-hidden");
catInfoEl.classList.add("is-hidden");

let arrayOptionsToSelectEl = [];
fetchBreeds()
    .then(data => {
    data.forEach(element => {
        arrayOptionsToSelectEl.push({text: element.name, value: element.id});
    });
    new SlimSelect({
        select: selectEl,
        data: arrayOptionsToSelectEl,

  
    });
    })
    .catch(onFetchError);

selectEl.addEventListener('change', onSelectedOption)

function onSelectedOption(event) {
    event.preventDefault();
    loaderEl.classList.replace("is-hidden", "loader");
    selectEl.classList.add("is-hidden");
    catInfoEl.classList.add("is-hidden");
    const values = event.currentTarget.value

    fetchCatByBreed(values).then(data => {
            loaderEl.classList.replace("loader", "is-hidden");
            selectEl.classList.remove("is-hidden");  
            const { url, breeds } = data[0];
            console.log(data)
            catInfoEl.innerHTML = createOptionItem(url, breeds);
            catInfoEl.classList.remove("is-hidden");
        })
        .catch(onFetchError);
}



function onFetchError(error) {
    selectEl.classList.remove('is-hidden');
    loaderEl.classList.replace('loader', 'is-hidden');

    Notify.failure('Oops! Something went wrong! Try reloading the page!', {
        position: 'center-center',
        timeout: 3000,
        width: '600px',
        fontSize: '24px',
    });
};