window.addEventListener("DOMContentLoaded", init);

function init() {
    getData();
}

function getData() {
    const urlParams = new URLSearchParams(window.location.search);
    const search = urlParams.get("search")
    fetch("http://liam-edwards.dk/wordpress/wp-json/wp/v2/bands?_embed&search=" + search)
        .then(res => res.json())
        .then(handleData)
}

function handleData(myData) {
    //Loop it
    myData.forEach(showPost)
}

function showPost(post) {
    console.log(post)
    //Clone it
    const template = document.querySelector(".bandTemplate").content;
    const postCopy = template.cloneNode(true);
    const h1 = postCopy.querySelector("h1");
    h1.textContent = post.bandname;
    const p = postCopy.querySelector("p");
    p.innerHTML = post.band_members
    const p1 = postCopy.querySelector("p1");
    p1.innerHTML = post.albums
    const p2 = postCopy.querySelector("p2");
    p2.innerHTML = post.top_5_hits
    const p3 = postCopy.querySelector("p3");
    p3.innerHTML = post.different_concerts
    //Append it
    document.querySelector("#bands").appendChild(postCopy)
}
