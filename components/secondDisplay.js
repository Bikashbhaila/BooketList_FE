//Second book display fetch
window.onload = getSecondDisplay();

function getSecondDisplay() {
  // google books api link
  const URL = `https://www.googleapis.com/books/v1/volumes?q=dr.seuss&limit=12`;

  // fetch data form the api, parse into json and store as books
  fetch(URL)
    .then((response) => response.json())
    .then((res) => {
      const books = res.items;
      document.getElementById("first-display").innerHTML = ""; // resetting container so it will load the content in slow networks
      secondDisplay(books); // delegating to display books in results container
    })
    .catch((err) => console.log(err));
}
//Second book display container
function secondDisplay(books) {
  console.log("secondDisplayFunc:", books);
  for (const book of books) {
    const title = book.volumeInfo.title;
    const author = book.volumeInfo.authors;
    const isbn =
      book.volumeInfo.industryIdentifiers[0].identifier +
      " , " +
      book.volumeInfo.industryIdentifiers[1].identifier;
    const image_url = book.volumeInfo.imageLinks.thumbnail.replace(
      "http",
      "https"
    );
    let categories = book.volumeInfo.categories;
    if (categories === undefined) {
      categories = "Young Adult Fiction";
    } else {
      categories = book.volumeInfo.categories[0];
    }

    // create card components
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("col-sm-3");

    cardDiv.innerHTML = `
    <div class="card">
      <img src=${image_url} class="card-img-top" height="300" width="250" alt=${title}>
      <div class="card-body">
        <h5 class="card-title">${title}</h5>
        <h6 class="sub-title text-muted">${author}</h6>
        <h6 class="sub-title text-muted">${isbn}</h6>
        <p class="card-text">${categories}</p>  
        <button name="add_Button strong" class="btn btn-primary">BOOK ET</button>
      </div>
    </div>
    `;
    // append card to results container to display results
    document.getElementById("second-display").appendChild(cardDiv);

    const addBtn = cardDiv.firstElementChild.children[1].lastElementChild;
    addBtn.addEventListener("click", addCard);
  }
}
