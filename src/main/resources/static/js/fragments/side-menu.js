function toggleDropdown(submenuId) {
  const submenu = document.getElementById(submenuId);

  if (submenu.style.display === "none" || submenu.style.display === "") {
    submenu.style.display = "block";
  } else {
    submenu.style.display = "none";
  }
}