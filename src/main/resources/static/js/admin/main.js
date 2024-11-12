const memberList = document.querySelector("#memberList");

const listUp = (cp) => {
  const url = `${location.pathname}?cp=${page}&sort=${sort}`;
  fetch(url)
  .then(response => {
    if(response.ok) return response.json();
    throw new Error("조회 실패");
  })
  .then(map => {
    console.log(map);
  })
}