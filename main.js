window.addEventListener("DOMContentLoaded", init);

function init() {
    getSearchData();
}

function getSearchData() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id")
    fetch("http://liam-edwards.dk/wordpress/wp-json/wp/v2/bands?_embed&search=" + search)
        .then(res => res.json())
        .then(handleData)


    if (search) {
        console.log("this is a search result")
        getSearchData();
    } else if (id) {
        getSingleBand();
    } else {
        //console.log("NOT searching")
        getFrontpageData();
    }
}

function getSearchData() {
    const urlParams = new URLSearchParams(window.location.search);
    const search = urlParams.get("search");
    //console.log("getData")

    fetch("https://liam-edwards.dk/wordpress/wp-json/wp/v2/bands?_embed&search=" + search)
        .then(res => res.json())
        .then(handleData)
}

function getFrontpageData() {
    //console.log("getData")

    fetch("https://liam-edwards.dk/wordpress/wp-json/wp/v2/bands?_embed")
        .then(res => res.json())
        .then(handleData)
}

function getSingleBand() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    console.log(id)


    fetch("https://liam-edwards.dk/wordpress/wp-json/wp/v2/bands/" + id)
        .then(res => res.json())
        .then(showBand)


    function showBand(band) {
        console.log(band)
        document.querySelector("article h1").textContent = band.title.rendered
    }
}


function handleData(myData) {
    //Loop it
    myData.forEach(showPost)
}

function showPost(post) {
    console.log(post)
    const imgPath = post._embedded["wp:featuredmedia"][0].media_details.sizes.thumbnail.source_url;
    //Clone it
    const template = document.querySelector(".bandTemplate").content;
    const postCopy = template.cloneNode(true);
    const h1 = postCopy.querySelector("h1");
    h1.textContent = post.bandname;
    const img = postCopy.querySelector("img.cover");

    img.setAttribute("src", imgPath)
    img.setAttribute("alt", "Cover of the album " + post.bandname.rendered)
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
