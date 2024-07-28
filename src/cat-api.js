import Notiflix from 'notiflix';

const API_KEY =
  'live_ri52yL7wBUGYLXJ60NZGYRCK5pjdOfJbrzQ2h5ttERJw1byE3nIEbUqiiT747wJq';

async function getBreeds() {
  try {
    const breeds = await fetch(
        `https://api.thecatapi.com/v1/breeds?api_key=${API_KEY}`
      );
      return await breeds.json();
  } catch (error) {
    console.log(error);
    Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
  }
  
}

async function getCat(id) {
  try {
    const breeds = await fetch(
      `https://api.thecatapi.com/v1/images/search?api_key=${API_KEY}&breed_ids=${id}`
    );
    return await breeds.json();
  } catch (error) {
    console.log(error);
    Notiflix.Notify.failure(
      'Oops! Something went wrong! Try reloading the page!'
    );
  }
}

export {getBreeds, getCat};