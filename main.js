const form = document.querySelector('.form');
const formInput = document.querySelector('.form-input');
const list = document.querySelector('.app-list');
const clearBtn = document.querySelector('.clear-btn');
const filter = document.querySelector('.filter-input');

const addItem = (e)=>{
  e.preventDefault();

   const listItemValue = formInput.value ;
   const warning =document.querySelector('.warning'); 

   if(listItemValue.trim() === ''){
     warning.style.display = 'inline';
   }else{
    warning.style.display = 'none'
   }


  const createElement = (clasess)=>{
     const listItem = document.createElement('li');
     listItem.appendChild(document.createTextNode(listItemValue));
     listItem.className = clasess;

     const button = createButton('app-btn bx bx-x');
     listItem.appendChild(button);
     list.appendChild(listItem)
      
     clearUI();
    
    formInput.value = '';
     
  } 
 createElement('app-item');
}


const createButton = (clasess)=>{
  const button = document.createElement('i');
  button.className = clasess;
  return button;

}

const deleteItem = (e)=>{
if(e.target.parentElement.classList.contains('app-item')){
  e.target.parentElement.remove();
}
clearUI();
}


const clearAll = ()=>{
  while(list.firstChild){
     list.removeChild(list.firstChild);
  }
  clearUI();
}

const filterItems = (e)=>{
    const text = e.target.value.toLowerCase();
    const items = document.querySelectorAll('.app-item');
     
   items.forEach(item =>{
     
       const getName = item.firstChild.textContent.toLocaleLowerCase(); 

       if(getName.indexOf(text) !== -1){
          item.style.display = 'flex';
       }else{
         item.style.display = 'none'
       }
     
   }) 
   
}



const clearUI = ()=>{
  const items = document.querySelectorAll('.app-item');

   if(items.length === 0){
     filter.style.display = 'none';
     clearBtn.style.display = 'none'
    
   }else{
    filter.style.display = 'block';
     clearBtn.style.display = 'block'
   }
}

form.addEventListener('submit', addItem);
list.addEventListener('click', deleteItem);
clearBtn.addEventListener('click', clearAll);
filter.addEventListener('input', filterItems);

clearUI();