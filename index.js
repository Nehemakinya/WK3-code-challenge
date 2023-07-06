let url = 'http://localhost:5000/films'

//Fetching movies

function fetchAllMovies(){
    fetch(url)
    .then(res => res.json())
    .then(data => {
        fetchMovieTitles(data)
    })
}

document.addEventListener('DOMContentLoaded', (event) => {
    
    fetchAllMovies() 
})


//Fetching movie Titles

function fetchMovieTitles(movies){
    
    let films_wrapper = document.getElementById("film_wrapper")

    movies.forEach(movie => {
        let filmDiv = document.createElement("div")
        console.log(movie)
        filmDiv.classList = "film"
        filmDiv.innerText = movie.title
        
        films_wrapper.appendChild(filmDiv)
        filmDiv.addEventListener("click", function(){
            fetchMovieDetails(movie)
        })
    });
}


//Fetching movie details

function fetchMovieDetails(movie){
fetch(`${url}/${movie.id}`)
.then(res => res.json())
.then(data => {
    displayMovieDetails(data)
})
}

//Displaying single items

function displayMovieDetails(movie){
    document.querySelector('#tickets_sold span').innerText = movie.tickets_sold
    document.querySelector(`#description span`).innerText = movie.description
    document.querySelector(".poster img").setAttribute("src", movie.poster)


    //Adding delete functionality

let deleteButton = document.querySelector('button')
deleteButton.addEventListener("click", function(){
deleteItem(movie)
})
}


//Form submission

let form = document.getElementById('form')
form.addEventListener("submit", e => {
    e.preventDefault()

    let formData = {
        title : e.target.title.value,
        runtime : e.target.runtime.value,
        capacity : e.target.capacity.value,
        showtime : e.target.showtime.value,
        tickets_sold : e.target.tickets_sold.value,
        description : e.target.description.value,
        poster :  e.target.poster.value
    }

    postNewFormData(formData)

    form.reset()
})


//Post function

function postNewFormData(formObject){
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
            Accept: "application/json"
        },
        body : JSON.stringify(formObject)
    })
    .then(res => res.json())
    .then(data => console.log(data))
}


//Delete function

function deleteItem(item){
    fetch(`${url}/${item.id}`,{
        method: "DELETE",
        headers: {
            "Content-Type" : "application/json",
            Accept: "application/json"
        }
    })
    .then(res => res.json())
    .then(data => console.log("Item deleted successfully...."))
    .catch(err => err)
}

function editItem(item){
    fetch(`${url}/${item.id}`,{
        method: "PATCH",
        headers: {
            "Content-Type" : "application/json",
            Accept: "application/json"
        },
        body : JSON.stringify(obj)
    })
    .then(res => res.json())
    .then(data => data)
}







