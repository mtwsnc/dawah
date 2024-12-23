document.getElementById("copy-link").addEventListener("click", function () {
  // Create temporary input element
  const tempInput = document.createElement("input");
  tempInput.value = "https://l.mtws.one/dawah";
  document.body.appendChild(tempInput);

  // Select and copy text
  tempInput.select();
  document.execCommand("copy");

  // Remove temporary element
  document.body.removeChild(tempInput);

  // Show success message
  const successMsg = document.getElementById("copy-success");
  successMsg.classList.remove("d-none");

  // Hide success message after 2 seconds
  setTimeout(function () {
    successMsg.classList.add("d-none");
  }, 2000);
});
