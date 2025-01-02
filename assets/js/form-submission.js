// document.addEventListener("DOMContentLoaded", function () {
//   const form = document.getElementById("contact-form");
//   let formObject = {};

//   if (form) {
//     form.addEventListener("submit", function (event) {
//       event.preventDefault();
//       const formData = new FormData(event.target);
//       formObject = Object.fromEntries(formData);
//       console.log(formObject);
//     });

//     document
//       .getElementById("submit-q-form")
//       .addEventListener("click", function () {
//         setTimeout(function () {
//           const messageContent = `Name: ${formObject.name}\nEmail: ${formObject.email}\nMessage: ${formObject.question}`;
//           console.log("submitting");
//           console.log(messageContent);

//           axios
//             .post("https://submit-form.com/Vi0B46vQ4", {
//               message: messageContent,
//               "g-recaptcha-response": grecaptcha.getResponse(),
//             })
//             .then(function (response) {
//               console.log(response);
//             })
//             .catch(function (error) {
//               if (error.response) {
//                 // The request was made and the server responded with a status code
//                 // that falls out of the range of 2xx
//                 console.error("Response error:", error.response.data);
//               } else if (error.request) {
//                 // The request was made but no response was received
//                 console.error("Request error:", error.request);
//               } else {
//                 // Something happened in setting up the request that triggered an Error
//                 console.error("Error", error.message);
//               }
//               console.error("Config:", error.config);
//             });
//         }, 300); // Set timeout to 1 second (1000 milliseconds)
//       });
//   } else {
//     console.error("Form with ID 'contact-form' not found.");
//   }
// });

"new";
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const formObject = Object.fromEntries(formData);

      const messagePayload = {
        name: formObject.name,
        email: formObject.email,
        message: formObject.question,
      };

      axios
        .post(
          "https://submit-form.com/Vi0B46vQ4",
          {
            message: JSON.stringify(messagePayload),
            "g-recaptcha-response": grecaptcha.getResponse(),
          },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        )
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    });
  } else {
    console.error("Form with ID 'contact-form' not found.");
  }
});
