//Second book display fetch
window.onload = getThirdDisplay();

function getThirdDisplay() {
  // google books api link
  const URL = `https://www.googleapis.com/books/v1/volumes?q=kindergarten`;

  // fetch data form the api, parse into json and store as books
  fetch(URL)
    .then((response) => response.json())
    .then((res) => {
      const books = res.items;
      document.getElementById("third-display").innerHTML = ""; // resetting container so it will load the content in slow networks
      thirdDisplay(books); // delegating to display books in results container
    })
    .catch((err) => console.log(err));
}
//Second book display container
function thirdDisplay(books) {
  console.log("thirdDisplayFunc:", books);
  for (const book of books) {
    let title = book.volumeInfo.title;
    let author = book.volumeInfo.authors;
    let isbn = book.volumeInfo.industryIdentifiers;
    let image_url = book.volumeInfo.imageLinks;
    let categories = book.volumeInfo.categories;

    if (
      title === undefined ||
      author === undefined ||
      isbn === undefined ||
      image_url === undefined ||
      categories === undefined
    ) {
      title = "Not found";
      author = "Not found";
      isbn = "Not found";
      categories = "Not found";
      image_url =
        "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.temple.edu%2Fprovost%2Fimages%2Ffaculty%2Fnot-pictured.jpg&f=1&nofb=1";
    } else {
      isbn =
        book.volumeInfo.industryIdentifiers[0].identifier +
        " , " +
        book.volumeInfo.industryIdentifiers[1].identifier;
      categories = book.volumeInfo.categories[0];
      image_url = book.volumeInfo.imageLinks.thumbnail.replace("http", "https");
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
    document.getElementById("third-display").appendChild(cardDiv);

    const addBtn = cardDiv.firstElementChild.children[1].lastElementChild;
    addBtn.addEventListener("click", addCard);
  }
}
