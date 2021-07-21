//Get user input from form
const formData = document.getElementById('register-form');

formData.addEventListener('submit', (e) =>{
    e.preventDefault();

    const name = document.getElementById("floatingName").value
    const email = document.getElementById("floatingInput").value 
    const password = document.getElementById("floatingPassword").value
    const confPass = document.getElementById("confirmPassword").value

    if(password == confPass){
        console.log("Same pass");
        registerInfo(name, email, password, confPass)
    } else {
        //Alert if passwords don't match
        console.log("Wrong pass");
    }
 })

function registerInfo(name, email, pass, confPass){
    console.log("registerInfo:", name, email, pass, confPass)
}