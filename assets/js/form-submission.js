document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("questions-form");
  let formObject = {};

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const formData = new FormData(event.target);
      formObject = Object.fromEntries(formData);
      console.log(formObject);
    });
  }

  document
    .getElementById("submit-q-form")
    .addEventListener("click", function () {
      axios
        .post("https://submit-form.com/ZTsgXXLZ4", {
          name: formObject.name,
          email: formObject.email,
          message: formObject.question,
          "g-recaptcha-response": grecaptcha.getResponse(),
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error("Response error:", error.response.data);
          } else if (error.request) {
            // The request was made but no response was received
            console.error("Request error:", error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.error("Error", error.message);
          }
          console.error("Config:", error.config);
        });
    });
});
