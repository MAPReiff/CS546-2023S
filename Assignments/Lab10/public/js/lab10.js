// In this file, you must perform all client-side validation for every single form input (and the role dropdown) on your pages. The constraints for those fields are the same as they are for the data functions and routes. Using client-side JS, you will intercept the form's submit event when the form is submitted and If there is an error in the user's input or they are missing fields, you will not allow the form to submit to the server and will display an error on the page to the user informing them of what was incorrect or missing.  You must do this for ALL fields for the register form as well as the login form. If the form being submitted has all valid data, then you will allow it to submit to the server for processing. Don't forget to check that password and confirm password match on the registration form!

// import { checkName, checkEmail, checkPassword, checkRole } from "../helpers.js";

let route = window.location.pathname;

if (route == "/register") {

  let form = document.getElementById("registration-form");
  form.addEventListener("submit", (event) => {
    console.log(1); // not firing?
    event.preventDefault();
    let firstName = document.getElementById("firstNameInput").value;
    let lastName = document.getElementById("lastNameInput").value;
    let emailAddress = document.getElementById("emailAddressInput").value;
    let password = document.getElementById("passwordInput").value;
    let confirmPassword = document.getElementById("confirmPasswordInput").value;
    let role = document.getElementById("roleInput").value;
    let errorP = document.getElementById("errorC");
    try {
      console.log(checkName(firstName, "first name"));
      checkName(lastName, "last name");
      checkEmail(emailAddress);
      checkPassword(password);
      if (password != confirmPassword) {
        throw new Error("your passwords do not match");
      }
      checkRole(role);
      form.submit();
    } catch (e) {
      errorP.innerHTML = `${e}`;
    }
  });
}