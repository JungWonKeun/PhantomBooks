/* 사이드바 열고 닫기 */
document.querySelectorAll('.menu').forEach(menu => {
  menu.addEventListener('click', function () {
    const openMenu = document.querySelector('.menu.active');

    this.classList.toggle('active');
  });
});

// 모두 열고 닫기 버튼
document.getElementById("openBtn").addEventListener("click", () => {
  document.getElementById("openBtn").style.display = "none";
  document.getElementById("closeBtn").style.display = "inline-block";
  document.querySelectorAll(".menu").forEach(menu => {
    menu.classList.add("active");
  });
});

document.getElementById("closeBtn").addEventListener("click", () => {
  document.getElementById("openBtn").style.display = "inline-block";
  document.getElementById("closeBtn").style.display = "none";
  document.querySelectorAll(".menu").forEach(menu => {
    menu.classList.remove("active");
  });
});


document.querySelectorAll(".category").forEach(button => {
  button.addEventListener("click", function () {
      this.classList.toggle("fa-solid fa-check")
  });
});

