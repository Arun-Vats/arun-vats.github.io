 <script>
    function openModal(imageSrc) {
      const modal = document.getElementById("modal");
      const modalImage = document.getElementById("modalImage");

      modalImage.src = imageSrc;
      modal.style.display = "block";
    }

    function closeModal() {
      const modal = document.getElementById("modal");
      modal.style.display = "none";
    }
document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('nav a');

  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      target.scrollIntoView({ behavior: 'smooth' });
    });
  });
});

  </script>
