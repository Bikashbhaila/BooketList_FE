// const booketlist_navIcon = document.getElementById("booketlist_navIcon");
// booketlist_navIcon.addEventListener("click", getAddedBooks);
// display booket list with added books
window.onload = getAddedBooks();

function getAddedBooks() {
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
    const { _id, title, author, isbn, categories, image_url, notes } = book;

    const cardDiv = document.createElement("div");
    cardDiv.classList.add("col-sm-3");

    cardDiv.innerHTML = `
        <div class="card">
            <img src=${image_url} class="card-img-top" height="400" width="250" alt=${title}>
            <div db_id=${_id} class="card-body">   
                <h5 class="card-title">${title}</h5>
                <h6 class="sub-title text-muted">by ${author}</h6>
                <h6 class="sub-title text-muted">ISBN: ${isbn}</h6>
                <p class="card-text">Categories: <em>${categories}</em></p>
                <p class="card-text text-muted"><strong>Note:</strong> ${notes}</p>
                <div class="buttons_container">
                    <button name="edit_Button strong" class="btn btn-warning">NOTE ET</button>  
                    <button name="remove_Button strong" class="btn btn-danger">REMOVE ET</button>
                </div>
            </div>
        </div>
        `;
    // append card to results container to display results
    document.getElementById("booklist_container").appendChild(cardDiv);
    // console.log(cardDiv);

    const addNoteBtn =
      cardDiv.firstElementChild.children[1].lastElementChild.firstElementChild;
    addNoteBtn.addEventListener("click", addNote);

    const removeBtn =
      cardDiv.firstElementChild.children[1].lastElementChild.lastElementChild;
    removeBtn.addEventListener("click", removeCard);
  }
}

// edit button
function addNote(e) {
  // extract _id from the card to use it for db record update
  const db_id = e.target.parentElement.parentElement.getAttribute("db_id");

  const notes = prompt("Please add your note!");

  const URL = "https://booketlist.herokuapp.com/books";

  fetch(URL + `?_id=${db_id}`, {
    method: "PUT",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      notes,
    }),
  })
    .then((res) => {
      if (res.ok) return res.json();
    })
    .then((response) => {
      console.log(response);
      document.getElementById("booklist_container").innerHTML = "";
      window.onload = getAddedBooks();
    });
}

// remove button
function removeCard(e) {
  // extract _id from the card to use it for db record deletion
  const db_id = e.target.parentElement.parentElement.getAttribute("db_id");
  const title = e.target.parentElement.parentElement.children[0].innerHTML;
  const URL = "https://booketlist.herokuapp.com/books";

  // confirm removal
  const removeConfirm = confirm(
    `Are you sure you want to remove ${title} from your Booket List?`
  );
  if (!removeConfirm) {
    return;
  }

  // delete request to api and mongodb
  fetch(URL + `?_id=${db_id}`, {
    method: "DELETE",
  })
    .then((res) => {
      if (res.ok) return res.json();
    })
    .then((response) => {
      document.getElementById("booklist_container").innerHTML = "";
      window.onload = getAddedBooks();
    });
}
