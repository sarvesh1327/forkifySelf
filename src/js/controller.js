import * as model from './model.js';
import navView from './views/navView.js';
import recipeView from './views/recipeview.js';
import Searchresult from './views/searchresult.js';
import Searchview from './views/searchview.js';
import paginationView from './views/paginationView.js';
import bookmarkView from './views/bookmarkView.js';
import addRecipeView from './views/addRecipeview.js';

// import icons from "../img/icons.svg" //parcel 1
import icons from 'url:../img/icons.svg'; //parcel 2
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import recipeview from './views/recipeview.js';

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

// if(module.hot){
//   module.hot.accept();
// }

const controlRecipe = async function () {
  try {
    const hash = window.location.hash;
    const id = hash.slice(1);
    if (!id) return;
    ///loading recipe
    recipeView.renderSpinner();

    await model.loadrecipe(id);

    Searchresult.update(model.getSearchResultPage());
    bookmarkView.render(model.state.bookmarks);

    ///fetching recipe
    // const res=await fetch('https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bcc40');
    // const {recipe} = model.state;

    ///rendering recipe
    model.recipeOneServe();
    // console.log(model.state.recipe);
    recipeView.render(model.state.recipe);
    recipeView.addHandlerServing(controlServings);
    // model.recipeOneServe();
  } catch (err) {
    // alert(err);
    // console.error(`${err} boom boom`);
    recipeView.renderError();
  }
};

const controlSearchResult = async function () {
  try {
    //getting the query to search for
    const query = Searchview.getQuery();

    if (!query) return;
    Searchresult.renderSpinner();
    ///getting data for the query
    await model.loadSearchResults(query);
    ///displaying it on the view.

    // Searchresult.render(model.state.search.results);
    Searchresult.render(model.getSearchResultPage());

    ////rendering the pagination below search results;
    paginationView.render(model.state.search);
  } catch (err) {
    Searchresult.renderError();
  }
};

const controlPageination = function (goToPage) {
  //// rendering the new search results
  Searchresult.render(model.getSearchResultPage(goToPage));
  ////new page no buttons
  paginationView.render(model.state.search);
};

const controlServings = function (servings) {
  ///guard clause
  if (servings < 1) {
    return;
  }
  ///updating the servings
  model.updateServings(servings);

  ///rendering the new view
  recipeView.update(model.state.recipe);
};

const controlBookmarks = function () {
  /////adding or deleting the bookmarks
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else if (model.state.recipe.bookmarked)
    model.deleteBookmark(model.state.recipe.id);
  ////updating the recipe
  recipeview.update(model.state.recipe);
  /// rendering the bookmarks
  bookmarkView.render(model.state.bookmarks);
  ///storing bookmarks in localStorage
  model.bookmarkStoring(model.state.bookmarks);
};

const controlBookinit = function () {
  bookmarkView.render(model.state.bookmarks);
};

const controladdingRecipe = async function (newRecipe) {
  // console.log(newRecipe);
  try {
    await model.uploadRecipe(newRecipe);
  } catch (err) {
    addRecipeView.renderError(err);
  }
};

// showrecipe();

// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);
// controlSearchResult();
const init = function () {
  navView.renderNavadd();
  navView.renderNavbookmark();
  navView.renderSearchicon();
  model.bookmarkgetting();
  bookmarkView.addHandlerRender(controlBookinit);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerBookmark(controlBookmarks);
  Searchview.addHandlerSearch(controlSearchResult);
  paginationView.addHandlerClick(controlPageination);
  addRecipeView.addHandlerUpload(controladdingRecipe);
};
init();
