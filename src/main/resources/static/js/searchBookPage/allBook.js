// 전체 선택 또는 선택 해제 기능을 구현하는 함수
document.addEventListener("DOMContentLoaded",  () => {
  const selectAllButton = document.getElementById("selectAllButton");

  // 전체 선택 또는 선택 해제 기능을 구현하는 함수
  function ifChecked(action) {
    const checkboxes = document.querySelectorAll('.book-checkbox');
    
    if (action === 'all') {
      const totalCheckboxes = checkboxes.length;
      const checkedCount = Array.from(checkboxes).filter(checkbox => checkbox.checked).length;

      if (checkedCount === 0) {
        // 모든 체크박스가 선택되지 않은 경우 전체를 체크
        checkboxes.forEach(checkbox => checkbox.checked = true);
      } else if (checkedCount === totalCheckboxes) {
        // 모든 체크박스가 선택된 경우 전체 선택 해제
        checkboxes.forEach(checkbox => checkbox.checked = false);
      } else {
        // 일부만 선택된 경우, 나머지 체크박스만 선택
        checkboxes.forEach(checkbox => {
          if (!checkbox.checked) {
            checkbox.checked = true;
          }
        });
      }
    }
  }

  // 전체 선택 버튼 클릭 시 ifChecked 함수를 호출
  selectAllButton.addEventListener("click", () => ifChecked('all'));
});

/* 장바구니 시작  */

/* allBook에서 선택된 책 장바구니로 보내기  */

function ifChecked(action) {
  if (action === 'cart') {
      // 여기서만 실제로 addToCart 기능을 수행하도록 구현
      const selectedBookNo = [];
      document.querySelectorAll('.book-checkbox:checked').forEach(checkbox => {
          selectedBookNo.push(checkbox.value);  // value 값을 사용하여 수집
      });

      // 선택된 책이 없으면 경고 메시지 출력
      if (selectedBookNo.length === 0) {
          alert("책을 선택해 주세요.");
          return;
      }

      // Fetch API를 사용하여 선택된 책을 서버로 전송
      fetch("/searchBookPage/addCart", {
          method: "PUT",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({ bookNo: selectedBookNo })
      })
      .then(response => {
          if (response.ok) {
              // 성공 시 확인 창 띄우기
              let userResponse = confirm("장바구니로 이동하시겠습니까?");
              if (userResponse) {
                  window.location.href = "/cart";  // 장바구니 페이지로 이동
              }
              // "아니오"를 누르면 아무 작업도 하지 않음 (현재 페이지 유지)
          } else {
              // 오류 발생 시 경고 메시지 출력
              throw new Error("장바구니 추가에 실패했습니다.");
          }
      })
      .catch(error => {
          alert(error.message);
      });
  }
}
/* 체크박스 장바구니 끝 */

/* 조회 페이지 책 장바구니 */

function singleCartBtn(button) {
    // 클릭된 버튼의 상위 요소에서 book-item 클래스를 가진 요소를 찾습니다.
    const bookItem = button.closest('.book-item');

    if (!bookItem) {
        console.error("bookItem 요소를 찾을 수 없습니다.");
        return;
    }

    // bookNo 가져오기 - 책 번호는 체크박스의 value 속성에 저장되어 있으므로 이를 사용합니다.
    const bookCheckbox = bookItem.querySelector('.book-checkbox'); // 체크박스를 찾음
    const bookNo = bookCheckbox ? parseInt(bookCheckbox.value, 10) : null; // 체크박스에서 value (bookNo)를 가져온 후 정수로 변환

    if (!bookNo) {
        console.error("bookNo를 찾을 수 없습니다.");
        return;
    }

    // 책 제목을 알림에 표시
    const bookTitleElement = bookItem.querySelector('.book-title');
    const bookTitle = bookTitleElement ? bookTitleElement.textContent.trim() : '';
    alert(`"${bookTitle}"을(를) 장바구니에 추가했습니다.`);

    // 서버에 bookNo를 전송
    fetch(`/searchBookPage/singleCart`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ bookNo: bookNo }) // PUT 요청 본문에 bookNo를 JSON 형식으로 전송합니다.
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('장바구니 추가에 실패했습니다.');
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            alert('장바구니에 성공적으로 추가되었습니다.');
        } else {
            alert('장바구니 추가에 실패했습니다.');
        }
    })
    .catch(error => console.error('에러:', error));
}

/* 조회 페이지 책 장바구니 끝 */

/* 상세페이지 장바구니 */

function detailCart(button) {
    // 클릭된 버튼의 상위 요소에서 book-item 클래스를 가진 요소를 찾습니다.
    const bookItem = button.closest('.book-item');

    if (!bookItem) {
        console.error("bookItem 요소를 찾을 수 없습니다.");
        return;
    }

    // book-item 요소에 있는 data-book-no 속성에서 bookNo를 가져옵니다.
    const bookNo = parseInt(bookItem.getAttribute('data-book-no'), 10);
    
    if (!bookNo) {
        console.error("bookNo를 찾을 수 없습니다.");
        return;
    }

    // 책 제목을 알림에 표시
    const bookTitleElement = bookItem.querySelector('.book-detail-header-name');
    const bookTitle = bookTitleElement ? bookTitleElement.textContent.trim() : '';
    alert(`"${bookTitle}"을(를) 장바구니에 추가했습니다.`);

    // 서버에 bookNo를 전송
    fetch(`/searchBookPage/detailCart`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ bookNo: bookNo }) // PUT 요청 본문에 bookNo를 JSON 형식으로 전송합니다.
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('장바구니 추가에 실패했습니다.');
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            alert('장바구니에 성공적으로 추가되었습니다.');
        } else {
            alert('장바구니 추가에 실패했습니다.');
        }
    })
    .catch(error => console.error('에러:', error));
}

/* 상세페이지 장바구니 끝 */

/* 장바구니 끝 */


/* 옵션 박스  */
/* 카테고리 박스  */
document.addEventListener("DOMContentLoaded", function () {
    const categoryButton = document.getElementById("categoryButton");
    const checkboxCategory = document.getElementById("checkboxCategory");
    const selectedCategoryValuesDiv = document.getElementById("selectedCategoryValues");
  
    const preferenceButton = document.getElementById("preferenceButton");
    const checkboxPreference = document.getElementById("checkboxPreference");
    const selectedPreferenceValuesDiv = document.getElementById("selectedPreferenceValues");
  
    // 카테고리 버튼 클릭 시 모달 창 표시/숨기기 및 위치 설정
    categoryButton.onclick = function (event) {
        event.stopPropagation();
        toggleModal(checkboxCategory, categoryButton);
    };
  
    // Preference 버튼 클릭 시 모달 창 표시/숨기기 및 위치 설정
    preferenceButton.onclick = function (event) {
        event.stopPropagation();
        toggleModal(checkboxPreference, preferenceButton);
    };
  
    // 체크박스 클릭 시 선택된 값 업데이트
    checkboxCategory.addEventListener("change", function () {
        updateSelectedValues(checkboxCategory, selectedCategoryValuesDiv);
    });
  
    checkboxPreference.addEventListener("change", function () {
        updateSelectedValues(checkboxPreference, selectedPreferenceValuesDiv);
    });
  
    // 모달 외부 클릭 시 모든 모달 숨기기
    window.onclick = function (event) {
        if (event.target !== categoryButton && !checkboxCategory.contains(event.target)) {
            checkboxCategory.classList.remove("visible");
        }
        if (event.target !== preferenceButton && !checkboxPreference.contains(event.target)) {
            checkboxPreference.classList.remove("visible");
        }
    };
  
    // 모달 창 표시/숨기기 함수
    function toggleModal(modal, button) {
        if (modal.classList.contains("visible")) {
            modal.classList.remove("visible");
        } else {
            const buttonRect = button.getBoundingClientRect();
            modal.style.top = buttonRect.bottom + window.scrollY + "px";
            modal.style.left = buttonRect.left + "px";
            modal.classList.add("visible");
        }
    }
  
    // 선택된 값 업데이트 함수
    function updateSelectedValues(modal, displayDiv) {
        displayDiv.innerHTML = "선택한 항목: ";
        const selectedCheckboxes = modal.querySelectorAll("input[type='checkbox']:checked");
  
        selectedCheckboxes.forEach((checkbox) => {
            const value = checkbox.value;
            const itemDiv = document.createElement("div");
            itemDiv.classList.add("selected-value-item");
            itemDiv.textContent = value;
  
            // 선택된 항목 클릭 시 해제
            itemDiv.onclick = function () {
                checkbox.checked = false;
                updateSelectedValues(modal, displayDiv);
            };
  
            displayDiv.appendChild(itemDiv);
        });
  
        if (selectedCheckboxes.length === 0) {
            displayDiv.innerHTML += "없음";
        }
    }
  });
  

/* 옵션 박스 끝 */
