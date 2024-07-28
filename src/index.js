import SlimSelect from 'slim-select';
import { getBreeds, getCat } from './cat-api';

const breedSelector = document.querySelector('.breed-select');
const catArticle = document.querySelector('.cat-info');
const loaderEl = document.querySelector('.loader');

async function populateSelect() {
  const breeds = await getBreeds();
  let options = '';

  for (let i = 0; i < breeds.length; i++) {
    options += `<option value="${breeds[i].id}">${breeds[i].name}</option>`;
  }
  breedSelector.innerHTML = options;
  selectElem.setData(
    breeds.map(breed => {
      return { text: breed.name, value: breed.id };
    })
  );
}

populateSelect();

const showCatArticle = () => {
  loaderEl.classList.toggle('invisible');
  catArticle.classList.toggle('invisible'); 
};

const populateCat = selectedCat => {
  const markup = `
        <img src="${selectedCat[0].url}" class="cat-image"/>
        <div class="cat-description">
            <h2>${selectedCat[0].breeds[0].name}</h2>
            <p>${selectedCat[0].breeds[0].description}</p>
            <span>Temperament: </span>
            <p>${selectedCat[0].breeds[0].temperament}</p>
        </div>`;
  catArticle.innerHTML = markup;

  const catImage = document.querySelector('.cat-image');

  try {
    catImage.removeEventListener('load', showCatArticle);
    catImage.addEventListener('load', showCatArticle);
  } catch (error) {
    console.log(error);
    
  }
};

const onSelect = async event => {
  catArticle.classList.toggle('invisible');
  loaderEl.classList.toggle('invisible');
  const selectedItem = event.target.value;
  const selectedCat = await getCat(selectedItem);
  populateCat(selectedCat);
};

breedSelector.addEventListener('change', onSelect);

const selectElem = new SlimSelect({
  select: '.breed-select',
});
