// In this file, you must perform all client-side validation for every single form input (and the role dropdown) on your pages. The constraints for those fields are the same as they are for the data functions and routes. Using client-side JS, you will intercept the form's submit event when the form is submitted and If there is an error in the user's input or they are missing fields, you will not allow the form to submit to the server and will display an error on the page to the user informing them of what was incorrect or missing.  You must do this for ALL fields for the register form as well as the login form. If the form being submitted has all valid data, then you will allow it to submit to the server for processing. Don't forget to check that password and confirm password match on the registration form!

let route = window.location.pathname;

if (route == "/register") {
  let form;
  document.addEventListener(
    "DOMContentLoaded",
    function () {
      form = document.getElementById("registration-form");
      if (form) {
        form.addEventListener("submit", (event) => {
          event.preventDefault();
          let firstName = document.getElementById("firstNameInput").value;
          let lastName = document.getElementById("lastNameInput").value;
          let emailAddress = document.getElementById("emailAddressInput").value;
          let password = document.getElementById("passwordInput").value;
          let confirmPassword = document.getElementById(
            "confirmPasswordInput"
          ).value;
          let role = document.getElementById("roleInput").value;
          let errorP = document.getElementById("errorClient");
          try {
            checkName(firstName, "first name");
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
            errorP.hidden = false;
          }
        });
      }
    },
    false
  );
}

if (route == "/login") {
  let form;
  document.addEventListener("DOMContentLoaded", function () {
    form = document.getElementById("login-form");
    if (form) {
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        let emailAddress = document.getElementById("emailAddressInput").value;
        let password = document.getElementById("passwordInput").value;
        let errorP = document.getElementById("errorClient");
        try {
          checkEmail(emailAddress);
          checkPassword(password);
          form.submit();
        } catch (e) {
          errorP.innerHTML = `${e}`;
          errorP.hidden = false;
        }
      });
    }
  });
}

// helpers
function checkName(data, type) {
  if (typeof data == "undefined") {
    throw new Error(`please provide a ${type} string`);
  } else if (typeof data != "string") {
    throw new Error(`please provide a ${type} string`);
  }

  data = data.trim();

  if (data.replaceAll(" ", "").length == 0) {
    throw new Error(`${type} string must contain text and not only spaces`);
  }

  if (data.length < 2) {
    throw new Error(`${type} must be atleast 2 characters long`);
  } else if (data.length > 25) {
    throw new Error(`${type} must be no longer than 25 characters`);
  }

  if (/\d/.test(data)) {
    throw new Error(`${type} can not contain numbers`);
  }

  return data;
}

const checkRole = (role) => {
  if (typeof role == "undefined") {
    throw new Error("please supply a role string");
  } else if (typeof role != "string") {
    throw new Error("please supply a role string");
  }

  role = role.trim().toLowerCase();

  if (role != "user" && role != "admin") {
    throw new Error("role string must be either user or admin");
  }

  return role;
};

// cant use node modules in the browser gotta do it by hand
const checkEmail = (emailAddress) => {
  if (typeof emailAddress == "undefined") {
    throw new Error("please provide an email string");
  } else if (typeof emailAddress != "string") {
    throw new Error("please provide an email string");
  }

  emailAddress = emailAddress.trim().toLowerCase();

  if (emailAddress.replaceAll(" ", "").length == 0) {
    throw new Error("email string must contain text and not only spaces");
  }

  // found regex function online https://melvingeorge.me/blog/check-if-string-is-valid-email-address-javascript
  function checkIfEmail(str) {
    const regexExp =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;
    return regexExp.test(str);
  }

  if (checkIfEmail(emailAddress) == false) {
    throw new Error("please enter a valid email address");
  }

  return emailAddress;
};

const checkPassword = (password) => {
  if (typeof password == "undefined") {
    throw new Error("please provide a password string");
  } else if (typeof password != "string") {
    throw new Error("please provide a password string");
  }

  password = password.trim();

  if (password.replaceAll(" ", "").length == 0) {
    throw new Error("password string must contain text and not only spaces");
  }

  if (password.length < 8) {
    throw new Error("password must be atleast 8 characters long");
  }

  // The constraints for password will be: There needs to be at least one uppercase character, there has to be at least one number and there has to be at least one special character:  for example:  Not valid: test123, test123$, foobar, tS12$ Valid: Test123$, FooBar123*, HorsePull748*%

  if (/[A-Z]/.test(password) == false) {
    // check if there is an uppercase character
    throw new Error(
      "your passwords must conatin at least one uppercase character, there has to be at least one number and there has to be at least one special character"
    );
  }

  if (/\d/.test(password) == false) {
    // check if there is a number
    throw new Error(
      "your passwords must conatin at least one uppercase character, there has to be at least one number and there has to be at least one special character"
    );
  }

  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password) == false) {
    // check if there is a special character
    throw new Error(
      "your passwords must conatin at least one uppercase character, there has to be at least one number and there has to be at least one special character"
    );
  }

  return password;
};
