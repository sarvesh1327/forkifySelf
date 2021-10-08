import {async} from 'regenerator-runtime';
import icons from 'url:../../img/icons.svg';
import View from './view.js';

class Searchresult extends View{
    _parentElement = document.querySelector('.results');
    _errorMessage = 'there are no recipes available with name you asked for please look for something else';
    
    _generateMarkup(){
        return this._data.map(recipe=> this._generateMarkupPreview(recipe)).join('');
    }

    _generateMarkupPreview(recipe){
        const id = window.location.hash.slice(1);
        return `
                <li class="preview">
                    <a class="preview__link ${recipe.id===id? 'preview__link--active':''} " href="#${recipe.id}">
                        <figure class="preview__fig">
                            <img src="${recipe.image}" alt="${recipe.title}" />
                        </figure>
                        <div class="preview__data">
                            <h4 class="preview__title">${recipe.title}</h4>
                            <p class="preview__publisher">${recipe.publisher}</p>
                        </div>
                    </a>
                </li>`
    }

    

}

export default new Searchresult();