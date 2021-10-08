import {async} from 'regenerator-runtime';

class Searchview{
    #parentElement = document.querySelector('.search');
    getQuery(){
        const query=this.#parentElement.querySelector('.search__field').value;
        this.#clearInput();
        return query;
    }
    #clearInput(){
        this.#parentElement.querySelector('.search__field').value='';
    }

    addHandlerSearch(handler){
        this.#parentElement.addEventListener('submit', function(e){
            e.preventDefault();
            handler();
        })
    }
}

export default new Searchview();

