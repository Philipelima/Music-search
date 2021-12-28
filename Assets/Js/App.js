const body = document.querySelector('body');
const form = document.querySelector('.form');
const inputSearch = document.querySelector('.input');


inputSearch.addEventListener('keypress',  e => {

   if(e.key == "Enter"){

       e.preventDefault(); 
       const searchValue = inputSearch.value.trim();

       if(!searchValue) errorUser("Please, Type a Valid word...");

       
   }
    
});

function errorUser(message) {
   
    body.insertAdjacentHTML('beforeend', `
        <div class = "alert-User error">
            ${message}
        </div>
    `)
}