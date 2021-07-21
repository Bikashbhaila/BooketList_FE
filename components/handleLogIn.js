const loggedOutNav = `
<li class="nav-item">
    <a class="nav-link" href="/view/signin.html">Sign in</a>
</li>
<li class="nav-item">
    <a class="nav-link" href="/view/register.html">Register</a>
</li>`;

const loggedInNav = `
<li class="nav-item">
    <a class="nav-link" href="/components/index.html">Log out</a>
</li>
`;

function setRightNav() {
  //Figure out how to store wether user is logged in or not

  //Depending on whether user is logged in, toggle #right-nav with correct links
  if (localStorage.getItem("isLoggedIn") === "true") {
    document.getElementById("right-nav").innerHTML = loggedInNav;
  } else {
    document.getElementById("right-nav").innerHTML = loggedOutNav;
  }
}

//Sets navigation bar
setRightNav();
// const url = "localhost:3000/sign-in";

// fetch(url)
//   .then((response) => response.json())
//   .then((data) => {
//     if (data.error === undefined) {
//       //When sign in/register is successful set "isLoggedIn" to "true" and then call setRightNav(). localStorage.setItem("","")
//     }
//   });

//Same as log in but for log out.
//Add event listener to log out buttons and set isLoggedIn to "false", then call setRightNav()
