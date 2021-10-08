import {async} from 'regenerator-runtime';
import icons from 'url:../../img/icons.svg';
import View from './view.js';

class PaginationView extends View{
    _parentElement = document.querySelector('.pagination');
    goToPage=1;

    _generateMarkup(){
        const currPage = this._data.page;
        ////case 1) page 1 and no other pages.
        if(this._data.results.length<=this._data.resultsPerPage){
            return'only one page';
        }
        ///case 2) page 1 and there are other pages.
        if(currPage===1){
            return `
                <button data-goto="${currPage+1}" class="btn--inline pagination__btn--next">
                    <span>Page ${currPage+1}</span>
                    <svg class="search__icon">
                        <use href="${icons}.svg#icon-arrow-right"></use>
                    </svg>
                </button>
            `
            
        }

        ////case 3) last page
        if(this._data.results.length<=this._data.resultsPerPage*currPage){
            return `
                <button data-goto="${currPage-1}" class="btn--inline pagination__btn--prev">
                    <svg class="search__icon">
                        <use href="${icons}.svg#icon-arrow-left"></use>
                    </svg>
                    <span>Page ${currPage-1}</span>
                </button>
                
                `
        }
        




        ////case 4) other pages in between


        return `
            <button data-goto="${currPage-1}" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                    <use href="${icons}.svg#icon-arrow-left"></use>
                </svg>
                <span>Page ${currPage-1}</span>
            </button>
            <button data-goto="${currPage+1}" class="btn--inline pagination__btn--next">
                <span>Page ${currPage+1}</span>
                <svg class="search__icon">
                    <use href="${icons}.svg#icon-arrow-right"></use>
                </svg>
            </button>
        `
    }

    addHandlerClick(handler){
        this._parentElement.addEventListener('click', function(e){
            const btn = e.target.closest('.btn--inline');
            if(!btn) return;
            this.goToPage = +btn.dataset.goto;
            
            handler(this.goToPage);
        })
    }


}  

export default new PaginationView();