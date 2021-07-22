const booketlist_navIcon = document.getElementById("booketlist_navIcon");
booketlist_navIcon.addEventListener("click", getAddedBooks);
// display booket list with added books

function getAddedBooks(e) {
  // use fetch to make get call to our api
  const URL = "https://booketlist.herokuapp.com/books";

  fetch(URL)
    .then((response) => response.json())
    .then((addedBooks) => {
      console.log(addedBooks);
      showAddedBooks(addedBooks); // pass addedBooks to delegate display of added books
    })
    .catch((err) => console.log(err));
}

function showAddedBooks(addedBooks) {
  for (const book of addedBooks) {
    // extract values from addedBooks
    const { _id, title, author, isbn, categories, image_url } = book;

    const cardDiv = document.createElement("div");
    cardDiv.classList.add("col-sm-3");

    cardDiv.innerHTML = `
        <div class="card">
            <img src=${image_url} class="card-img-top" height="400" width="250" alt=${title}>
            <div db_id=${_id} class="card-body">   
                <h5 class="card-title">${title}</h5>
                <h6 class="sub-title text-muted">${author}</h6>
                <h6 class="sub-title text-muted">${isbn}</h6>
                <p class="card-text">${categories}</p>
                <div class="buttons_container">
                    <button name="edit_Button strong" class="btn btn-warning">EDIT ET</button>  
                    <button name="remove_Button strong" class="btn btn-danger">REMOVE ET</button>
                </div>
            </div>
        </div>
        `;
    // append card to results container to display results
    document.getElementById("booklist_container").appendChild(cardDiv);

    const editBtn =
      cardDiv.firstElementChild.children[1].lastElementChild.firstElementChild;
    editBtn.addEventListener("click", editCard);

    const removeBtn =
      cardDiv.firstElementChild.children[1].lastElementChild.lastElementChild;
    removeBtn.addEventListener("click", removeCard);
  }
}

// edit button
function editCard() {
  console.log("edit clicked");
}

// remove button
function removeCard(e) {
  // extract _id from the card to use it for db record deletion
  const db_id = e.target.parentElement.parentElement.getAttribute("db_id");
  const title = e.target.parentElement.parentElement.children[0].innerHTML;
  const URL = "https://booketlist.herokuapp.com/books";

  // delete request to api and mongodb
  fetch(URL + `?_id=${db_id}`, {
    method: "DELETE",
  })
    .then((res) => {
      if (res.ok) return res.json();
    })
    .then((response) => {
      console.log(response);
      alert(`Great! ${title} has been removed from your booketlist.`);
    });

  // removing card from DOM
  const cardToRemove =
    e.target.parentElement.parentElement.parentElement.parentElement;
  cardToRemove.parentElement.removeChild(cardToRemove);
}
