import icons from 'url:../../img/icons.svg';
import View from './view.js';

class addRecipeView extends View{
    _parentElement = document.querySelector('.upload');


    _window = document.querySelector('.add-recipe-window');
    _overlay = document.querySelector('.overlay');
    _btnOpen = document.querySelector('.nav__btn--add-recipe');
    _btnClose = document.querySelector('.btn--close-modal');

    constructor(){
        super();
        this._openNewRecipewindowhandler();
        this._addHandlerCloseNewRecipeView();
    }

    _openNewRecipewindowhandler(){
        this._btnOpen.addEventListener('click', this._toggleWindow.bind(this))
    }

    _toggleWindow(){
        this._overlay.classList.toggle('hidden');
        this._window.classList.toggle('hidden');
    }

    _addHandlerCloseNewRecipeView(){
        this._btnClose.addEventListener('click', this._toggleWindow.bind(this));
        this._overlay.addEventListener('click', this._toggleWindow.bind(this) );
    }

    addHandlerUpload(handler){
        this._parentElement.addEventListener('submit', function(e){
            e.preventDefault();
            const dataArr = [...new FormData(this)];
            const data = Object.fromEntries(dataArr);
            handler(data);
        })
    }

    _generateMarkup(){}


    
}

export default new addRecipeView();