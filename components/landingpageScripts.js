//Capture book search bar information
const bookSearch = document.getElementById("form-id");

bookSearch.addEventListener("submit", handleSearch);

function handleSearch(e) {
  e.preventDefault();
  // get user text input for search and store in
  const searchInput = e.target.query.value;
  // resetting the form
  e.target.query.value = "";

  // searchBooks(searchInput);
  // document.getElementById("results_header").innerHTML = `Your Search Results for ${searchInput}`

  let createdCard = searchBooks(searchInput);
}

function searchBooks(userInput) {
  // google books api link
  const URL = `https://www.googleapis.com/books/v1/volumes?q=${userInput}&maxResults=16`;

  // fetch data form the api, parse into json and store as books
  fetch(URL)
    .then((response) => response.json())
    .then((res) => {
      const books = res.items;
      document.getElementById("results_container").innerHTML = ""; // resetting container so it will load the content in slow networks
      displayBookResults(books); // delegating to display books in results container
    })
    .catch((err) => console.log(err));
}

function displayBookResults(books) {
  console.log(books);
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
    document.getElementById("results_container").appendChild(cardDiv);

    const addBtn = cardDiv.firstElementChild.children[1].lastElementChild;
    //console.log(addBtn);
    addBtn.addEventListener("click", addCard);
  }
}

//First book display fetch
window.onload = getFirstDisplay();

function getFirstDisplay() {
  // google books api link
  const URL = `https://www.googleapis.com/books/v1/volumes?q=harry+potter&limit=12`;

  // fetch data form the api, parse into json and store as books
  fetch(URL)
    .then((response) => response.json())
    .then((res) => {
      const books = res.items;
      document.getElementById("first-display").innerHTML = ""; // resetting container so it will load the content in slow networks
      firstDisplay(books); // delegating to display books in results container
    })
    .catch((err) => console.log(err));
}
//First book display container
function firstDisplay(books) {
  console.log("firstDisplayFunc:", books);
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
      <img src=${image_url} class="card-img-top height="300" width="250" alt=${title}>
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
    document.getElementById("first-display").appendChild(cardDiv);

    const addBtn = cardDiv.firstElementChild.children[1].lastElementChild;
    addBtn.addEventListener("click", addCard);
  }
}

//Second book display fetch
window.onload = getSecondDisplay();

function getSecondDisplay() {
  // google books api link
  const URL = `https://www.googleapis.com/books/v1/volumes?q=dr.+suess&limit=12`;

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

function addCard(e) {
  // extract the data from the elements using target element values
  console.log(e.target.parentElement);

  const title = e.target.parentElement.children[0].innerHTML; //Title: "Book title"
  const author = e.target.parentElement.children[1].innerHTML;
  const isbn = e.target.parentElement.children[2].innerHTML;
  const categories = e.target.parentElement.children[3].innerHTML;
  const image_url =
    e.target.parentElement.parentElement.children[0].getAttribute("src"); //link only

  // use fetch to make post call to our api
  const herokuApiUrl = "https://booketlist.herokuapp.com/books";
  // const localApiUrl = "https://localhost:3000/books"

  let URL = herokuApiUrl;

  // for testing local and
  // if (location.href.includes("github.io")) {
  //   URL = herokuApiUrl;
  // } else {
  //   URL = localApiUrl;
  // }

  fetch(URL, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      title,
      author,
      isbn,
      categories,
      image_url,
    }),
  })
    .then((res) => {
      if (res.ok) return res.json();
    })
    .then((response) => {
      console.log(response); // console logging success
    });
}
