const form = document.querySelector('.form');
const formInput = document.querySelector('.form-input');
const list = document.querySelector('.app-list');
const clearBtn = document.querySelector('.clear-btn');
const filter = document.querySelector('.filter-input');


const displayItems = ()=>{
  let itemFromStorage = getItemsFromStorage();

   itemFromStorage.forEach(item => addItemToDom(item));
   clearUI();
}

const addItem = (e)=>{
  e.preventDefault();

   const listItemValue = formInput.value ;
   const warning =document.querySelector('.warning'); 

   if(listItemValue.trim() === ''){
     warning.style.display = 'inline';
   }
   else{
    warning.style.display = 'none'
    addItemToDom(listItemValue);      
   }
     
    addItemsToStorage(listItemValue);

     clearUI();
    
    formInput.value = '';

}


 const addItemToDom = (item)=>{
  const listItem = document.createElement('li');
  listItem.appendChild(document.createTextNode(item));
  listItem.className = 'app-item';

  const button = createButton('app-btn bx bx-x');
  listItem.appendChild(button);
  list.appendChild(listItem)
 }


 const createButton = (clasess)=>{
  const button = document.createElement('i');
  button.className = clasess;
  return button;

}



 const addItemsToStorage = (item)=>{
   const  itemFromStorage = getItemsFromStorage();

    itemFromStorage.push(item);
    localStorage.setItem('items', JSON.stringify(itemFromStorage)); 

 } 
        

 const getItemsFromStorage = ()=>{
  let  itemFromStorage;
 
  if(localStorage.getItem('items') === null){
    itemFromStorage = [];
  }else{
     itemFromStorage = JSON.parse(localStorage.getItem('items')); 
  }
  return itemFromStorage;
  
 }
 


const deleteItem = (e)=>{
  if(e.target.parentElement.classList.contains('app-item')){
    e.target.parentElement.remove();
  
  
    removeItemFromStorage(e.target.parentElement.textContent);
    clearUI();
  }

  }
  

  const removeItemFromStorage = (item)=>{
    let itemFromStorage = getItemsFromStorage();
  
    itemFromStorage = itemFromStorage.filter(i => i !== item );
  
    localStorage.setItem('items', JSON.stringify(itemFromStorage));
  }

const clearAll = ()=>{
  while(list.firstChild){
     list.removeChild(list.firstChild);
  }
  localStorage.clear();
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
     filter.parentElement.style.display = 'none';
     clearBtn.style.display = 'none'
    
   }else{
    filter.parentElement.style.display = 'block';
     clearBtn.style.display = 'block'
   }
}

form.addEventListener('submit', addItem);
list.addEventListener('click', deleteItem);
clearBtn.addEventListener('click', clearAll);
filter.addEventListener('input', filterItems);
document.addEventListener('DOMContentLoaded', displayItems);

clearUI();

