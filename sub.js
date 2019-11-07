const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
console.log(id)


fetch("http://liam-edwards.dk/wordpress/wp-json/wp/v2/bands/"+id)
  .then(res=>res.json())
.then(showBook)


function showBook(book){
  console.log(book)
  document.querySelector("article h1").textContent=book.title.rendered
}
