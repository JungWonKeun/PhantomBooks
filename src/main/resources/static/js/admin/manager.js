const bookList = document.querySelector("#bookList")



const listUp = (cp, sort, text) => {

  fetch("/admin/manager/bookList?cp="+cp +"&sort="+sort +"&text="+text)
  .then(response => {
    if(response.ok) return response.json();
    throw new Error("조회 실패");
  })
  .then(map => {
    console.log(map);
  })
}

/**
 * 정렬 기준 변경 이벤트
 */
const sortSelect = document.querySelector('#sortSelect');
const searchText = document.querySelector("#searchText");
let text = '';

searchText.hidden = true;

sortSelect.addEventListener('change', () => {
  if(sortSelect.value == 'all'){
    listUp(1, sortSelect.value);
  }else if(sortSelect.value == 'company'){
    searchText.hidden = false;

    searchText.addEventListener("input", () => {
      text = searchText.value.trim();

      listUp(1, sortSelect.value, text)
    })
  }else{
    listName.innerHTML = "로그인 6개월 이상";
  }

});

const paginationAddEvent = () => {
  const pagination = document.querySelectorAll('.pagination a');

  pagination.forEach(a => {
    a.addEventListener('click', (e) => {

      if(a.classList.contains('current')) return;
      
      const cp = e.target.dataset.page;
      listUp(cp, sortSelect.value);
    });
  });
}

document.addEventListener("DOMContentLoaded",()=>{
  listUp(1, sortSelect.value, text);
})

