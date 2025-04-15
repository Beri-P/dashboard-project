document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const submitBtn = document.getElementById("submitBtn");
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");

  //functiion to validate email format
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  //function to validate form and update state of button
  function validateForm() {
    let isValid = true;

    //Validate Email
    if (!emailInput.value) {
      emailError.textContent = "Email is Reqquired";
      isValid = false;
    } else if (!isValidEmail(emailInput.value)) {
      emailError.textContent = "Please input valid Email";
      isValid = false;
    } else {
      emailError.textContent = "";
    }

    //Validate Password
    if (!passwordInput.value) {
      passwordError.textContent = "Password is Required";
      isValid = false;
    } else if (passwordInput.value.length < 8) {
      passwordError.textContent = "Password must atleast be 8 characters long!";
      isValid = false;
    } else {
      passwordError.textContent = "";
    }

    //Enabling/Disabling of "Submit" button
    submitBtn.disabled = !isValid;
  }

  //Adding event listeners
  emailInput.addEventListener("input", validateForm);
  passwordInput.addEventListener("input", validateForm);

  //Initial Validation
  validateForm();
});
