const body = document.querySelector('body');
const form = document.querySelector('.form');
const inputSearch = document.querySelector('.input');

const fetchUrl = `https://www.youtube.com/results?search_query=`;

inputSearch.addEventListener('keypress', async e => {

   if(e.key == "Enter"){

       e.preventDefault(); 

       const searchValue = inputSearch.value.trim();

       if(!searchValue) errorUser("Please, Type a Valid word...");
       if(searchValue)  await searchMusic(searchValue);
    
   }
    
});


function errorUser(message) {
   
    body.insertAdjacentHTML('beforeend', `
        <div class = "alert-User error">
            ${message}
        </div>
    `)

    const removeAlert = () => {
            let alertError = document.querySelector('.alert-User');
            alertError.remove();
    }

    setTimeout(() => removeAlert(), 3000)
}



async function searchMusic(search) {

    let searchFormated = search.replaceAll(' ', '+');
    const urlFormated = `${fetchUrl}${searchFormated}`
    
    const query = await fetch(urlFormated, {  
          mode: 'no-cors',
    });
    
    const response = await query.text();

    console.log(response)
}





