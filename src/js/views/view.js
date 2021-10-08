
import icons from 'url:../../img/icons.svg';

export default class View{
    _data;

    render(data){
        if(!data||Array.isArray(data)&&data.length===0) return this.renderError();
        
         this._data=data;   
            
        const markup =this._generateMarkup();
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
        
    }
    update(data){
      this._data=data;
      const newMarkup = this._generateMarkup();
      const newDOM = document.createRange().createContextualFragment(newMarkup);
      const newElelement = Array.from(newDOM.querySelectorAll('*'));
      const currentElement = Array.from(this._parentElement.querySelectorAll('*'));
      // console.log(newEl);
      // console.log(currentElement);
      newElelement.forEach((newEl, i)=>{
        const currEl=currentElement[i];
        // console.log(currEl, newEl.isEqualNode(currEl));
        //to update the textElements
        if(!newEl.isEqualNode(currEl)&& newEl.firstChild?.nodeValue.trim()!==''){
          currEl.textContent=newEl.textContent;
        }
        ///updating the attributes
        if(!newEl.isEqualNode(currEl)){
          Array.from(newEl.attributes).forEach(attr=> currEl.setAttribute(attr.name, attr.value));
        }
      })
    }

    _clear(){
        this._parentElement.innerHTML = '';
    }


    renderSpinner(){
        const markup = `
          <div class="spinner">
            <svg>
              <use href="${icons}#icon-loader"></use>
            </svg>
          </div>
        `
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }
    renderError(message=this._errorMessage){
        const markup = `
        <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
        </div>
        
        
        `
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
        

    }

    
}
