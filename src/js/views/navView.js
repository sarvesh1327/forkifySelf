import icons from 'url:../../img/icons.svg';

class navView{
    renderNavadd(){
        const addrecipe = document.querySelector('.nav__btn--add-recipe');
        addrecipe.innerHTML='';
        const markupadd = `
                  <svg class="nav__icon">
                    <use href="${icons}#icon-edit"></use>
                  </svg>
                  <span>Add recipe</span>
        
                `
        addrecipe.insertAdjacentHTML('afterbegin', markupadd);
    }

    renderNavbookmark(){
        const bookmark = document.querySelector('.nav__btn--bookmarks')
        const markupbook=`
                <svg class="nav__icon">
                  <use href="${icons}#icon-bookmark"></use>
                </svg>
                <span>Bookmarks</span>
                `;
        bookmark.innerHTML='';
        bookmark.insertAdjacentHTML('afterbegin', markupbook);
    }
    renderSearchicon(){
        const searchicon = document.querySelector('.search__btn');
        const searchiconmarkup =`
        <svg class="search__icon">
            <use href="${icons}#icon-search"></use>
        </svg>
        <span>Search</span>
        `
        searchicon.innerHTML='';
        searchicon.insertAdjacentHTML('afterbegin', searchiconmarkup);

    }
}

export default new navView();