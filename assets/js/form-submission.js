// get form data and prevent default behavior
document
  .getElementById("questions-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formObject = Object.fromEntries(formData);
    console.log(formObject);
  });

document.getElementById("submit-q-form").addEventListener("click", function () {
  axios
    .post("https://submit-form.com/your-form-id", {
      name: formObject.name,
      email: formObject.email,
      message: formObject.message,
      "g-recaptcha-response": grecaptcha.getResponse(),
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (response) {
      console.error(response);
    });
});
