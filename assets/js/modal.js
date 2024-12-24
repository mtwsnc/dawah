document.addEventListener("DOMContentLoaded", function () {
  function openModal(modal) {
    modal.classList.add("show");
  }

  function closeModal(modal) {
    modal.classList.remove("show");
  }

  document.querySelectorAll("[data-toggle='modal']").forEach(function (button) {
    button.addEventListener("click", function () {
      const target = document.querySelector(button.getAttribute("data-target"));
      openModal(target);
    });
  });

  document.querySelectorAll(".modal").forEach(function (modal) {
    modal.addEventListener("click", function (event) {
      if (event.target === modal) {
        closeModal(modal);
      }
    });
  });
});
