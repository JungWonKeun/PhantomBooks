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

document.getElementById("addToCart").addEventListener("click", () => {

  const bookNo = book.bookNo;

  fetch("/searchBookPage/singleCart", {
      method: "PUT",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({ bookNo: bookNo })
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


});



/* 조회 페이지 책 장바구니 끝 */


/* 장바구니 끝 */









/* 카테고리 박스  */
document.addEventListener("DOMContentLoaded",  () => {
  const categoryButton = document.getElementById("categoryButton");
  const checkboxCategory = document.getElementById("checkboxCategory");
  const selectedCategoryValuesDiv = document.getElementById("selectedCategoryValues");

  // 카테고리 버튼 클릭 시 모달 창 표시/숨기기 및 위치 설정
  categoryButton.onclick = function (event) {
      event.stopPropagation();  // 이벤트 전파 방지

      if (checkboxCategory.classList.contains("visible")) {
          checkboxCategory.classList.remove("visible");
      } else {
          const buttonRect = categoryButton.getBoundingClientRect();
          checkboxCategory.style.top = buttonRect.bottom + window.scrollY + "px";
          checkboxCategory.style.left = buttonRect.left + "px";
          checkboxCategory.classList.add("visible");
      }
  };

  // 체크박스 클릭 시 선택된 값 업데이트
  checkboxCategory.addEventListener("change", function () {
      updateSelectedValues();
  });

  // 선택된 값 업데이트 함수
  function updateSelectedValues() {
      selectedCategoryValuesDiv.innerHTML = "선택한 항목: ";
      const selectedCheckboxes = checkboxCategory.querySelectorAll("input[type='checkbox']:checked");

      selectedCheckboxes.forEach((checkbox) => {
          const value = checkbox.value;
          const div = document.createElement("div");
          div.classList.add("selected-value-item");
          div.textContent = value;

          // X 버튼 생성
          const removeBtn = document.createElement("span");
          removeBtn.classList.add("remove-btn");
          removeBtn.textContent = "x";
          removeBtn.onclick = function () {
              checkbox.checked = false;
              updateSelectedValues();
          };

          div.appendChild(removeBtn);
          selectedCategoryValuesDiv.appendChild(div);
      });

      if (selectedCheckboxes.length === 0) {
          selectedCategoryValuesDiv.innerHTML += "없음";
      }
  }

  // 모달 외부 클릭 시 모달 숨기기
  window.onclick = function (event) {
      if (event.target !== categoryButton && !checkboxCategory.contains(event.target)) {
          checkboxCategory.classList.remove("visible");
      }
  };
});


/* 카테고리 박스 끝 */

/* 프리퍼런스 체크 박스   */

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

          // X 버튼 생성
          const removeBtn = document.createElement("span");
          removeBtn.classList.add("remove-btn");
          removeBtn.textContent = "x";
          removeBtn.onclick = function () {
              checkbox.checked = false;
              updateSelectedValues(modal, displayDiv);
          };

          itemDiv.appendChild(removeBtn);
          displayDiv.appendChild(itemDiv);
      });

      if (selectedCheckboxes.length === 0) {
          displayDiv.innerHTML += "없음";
      }
  }
});


/* 프리퍼런스 체크 박스 끝 */


