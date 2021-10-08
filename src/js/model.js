import {async} from "regenerator-runtime";
import {API_URL, RES_PER_PAGE, KEY} from './config.js';
import {getJSON, sendJSON} from './helpers.js';

export const state = {
    recipe : {},
    search : {
        query: '',
        page:1,
        results: [],
        resultsPerPage:RES_PER_PAGE
    },
    bookmarks: [],
}

export const loadrecipe = async function(id){
    try{

        const data = await getJSON(`${API_URL}/${id}`);
        // const res=await fetch(`${API_URL}/${id}`);

        // const data = await res.json();

        // if(!res.ok){
        // throw new Error(`${data.message} (${res.status})`)
        // }
        // console.log(res, data);
        let {recipe} = data.data;
        state.recipe = {
        id: recipe.id,
        publisher: recipe.publisher,
        cookingTime: recipe.cooking_time,
        sourceUrl : recipe.source_url,
        title : recipe.title,
        servings: recipe.servings,
        image: recipe.image_url,
        ingredients: recipe.ingredients
        }
        if(state.bookmarks.some(b=> b.id===id)){
            state.recipe.bookmarked=true;
        }else{
            state.recipe.bookmarked=false;
        }
        // console.log(state.recipe);
    }catch(err){
        // alert(err);
        // console.error(`${err} boom boom`);
        throw err;
    }
    
}



export const loadSearchResults = async function(query){
    try{
        state.search.query=query;
        const data = await getJSON(`${API_URL}?search=${state.search.query}`)
        // console.log(data);
        const {recipes} = data.data;
        // console.log(recipes);
        if(recipes.length==0){
            throw new Error('no recipe available');
            return;
        }
        state.search.results = recipes.map(recipe=> {
            return {
                id: recipe.id,
                publisher: recipe.publisher,
                title: recipe.title,
                image: recipe.image_url,
            }
        })
        

        state.search.page=1;
        
    }catch(err){
        throw err;
    }
    
}

export const getSearchResultPage = function(page=state.search.page){
    state.search.page=page;
    const start = (page-1)*state.search.resultsPerPage;//0
    const end = page*state.search.resultsPerPage;//10
    // console.log(state.search.results);
    return state.search.results.slice(start, end);
}

export const recipeOneServe = function(){
    const ingredients = state.recipe.ingredients;
    const ingredients2 = ingredients.map(ing=>ing.quantity= isFinite(ing.quantity)? ing.quantity/4:NULL)
    // state.recipe.ingredients = ingredients2;
    // console.log(state.recipe.ingredients);

    // ingredients = ingredients.map(ing=> isNumber(ing.quantity)? ing.quantity/=4: NULL)
    
}
export const updateServings = function(servings){
    state.recipe.servings=servings;
    return;
}

//// bookmark
export const addBookmark = function(recipe){
    
    state.bookmarks.push(recipe);
    ///if current recipe is the same as the recipe in the argument 
    if(state.recipe.id===recipe.id){
        state.recipe.bookmarked=true;
    }
    // console.log(state.bookmarks);
    // console.log(state.recipe);
}

export const deleteBookmark = function(id){
    const index = state.bookmarks.findIndex(el=> el.id===id);
    state.bookmarks.splice(index, 1);
    if(state.recipe.id===id){
        state.recipe.bookmarked=false;
    }
    
}

export const bookmarkStoring = function(bookmarks){
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    
    
}

export const bookmarkgetting = function(){
    const storage= localStorage.getItem('bookmarks');
    // console.log(storage);
    
    if(storage){
        state.bookmarks= JSON.parse(storage);
    }
    
    
    // console.log(state.bookmarks);
    // console.log(JSON.parse(localStorage.getItem('bookmarks')));
}

export const uploadRecipe= async function(newRecipe){
    try{
        const ingredients = Object.entries(newRecipe).filter(entry=> entry[0].startsWith('ingredient')&& entry[1]!=="").map(ing=> {
        const [quantity, unit, description]= ing[1].replaceAll(' ', '').split(',');
        return {quantity, unit, description};
        });
        ingredients.forEach(ing=> ing.quantity= ing.quantity===""? null: +ing.quantity);
        // console.log(newRecipe);
        const recipe = {
            cooking_time: +newRecipe.cookingTime,
            servings: +newRecipe.servings,
            image_url: newRecipe.image,
            source_url: newRecipe.sourceUrl,
            publisher: newRecipe.publisher,
            title: newRecipe.title,
            ingredients,
        };
        console.log(recipe);
        const data = await sendJSON(`${API_URL}?key=${KEY}`, recipe);
        console.log(data);
    }catch(err){
        throw(err);
    }
}



const clearBookmarks = function(){
    localStorage.clear('bookmarks');
}





