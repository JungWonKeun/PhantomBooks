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
                alert(selectedBookNo.length + "개의 책을 장바구니에 책을 추가하었습니다.");
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
document.getElementById("categoryButton").addEventListener("click", function () {
    const checkboxCategory = document.getElementById("checkboxCategory");
    const selectedCategoryValuesDiv = document.getElementById("selectedCategoryValues");

    toggleModal(checkboxCategory, this); // 모달 표시/숨기기
    document.getElementById("checkboxPreference").classList.remove("visible"); // 다른 모달 닫기

    // 기본 값 "없음" 출력
    if (!selectedCategoryValuesDiv.hasChildNodes()) {
        selectedCategoryValuesDiv.innerHTML = "선택한 항목: 없음";
    }

    // 체크박스 변경 이벤트 등록
    checkboxCategory.addEventListener("change", function () {
        updateSelectedValues(checkboxCategory, selectedCategoryValuesDiv);
    });
});

document.getElementById("preferenceButton").addEventListener("click", function () {
    const checkboxPreference = document.getElementById("checkboxPreference");
    const selectedPreferenceValuesDiv = document.getElementById("selectedPreferenceValues");

    toggleModal(checkboxPreference, this); // 모달 표시/숨기기
    document.getElementById("checkboxCategory").classList.remove("visible"); // 다른 모달 닫기

    // 기본 값 "없음" 출력
    if (!selectedPreferenceValuesDiv.hasChildNodes()) {
        selectedPreferenceValuesDiv.innerHTML = "선택한 항목: 없음";
    }

    // 체크박스 변경 이벤트 등록
    checkboxPreference.addEventListener("change", function () {
        updateSelectedValues(checkboxPreference, selectedPreferenceValuesDiv);
    });
});

// 모달 외부 클릭 시 모든 모달 숨기기
window.onclick = function (event) {
    if (!event.target.closest("#categoryButton") && !event.target.closest("#checkboxCategory")) {
        document.getElementById("checkboxCategory").classList.remove("visible");
    }
    if (!event.target.closest("#preferenceButton") && !event.target.closest("#checkboxPreference")) {
        document.getElementById("checkboxPreference").classList.remove("visible");
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
    const selectedCheckboxes = modal.querySelectorAll("input[type='checkbox']:checked");

    // 선택된 항목이 없을 경우 "없음" 표시
    if (selectedCheckboxes.length === 0) {
        displayDiv.innerHTML = "선택한 항목: 없음";
        return;
    }

    // 선택된 항목이 있을 경우 업데이트
    displayDiv.innerHTML = "선택한 항목: "; // 기존 내용을 초기화
    selectedCheckboxes.forEach((checkbox) => {
        const labelText = checkbox.parentElement.textContent.trim(); // label 텍스트 가져오기
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("selected-value-item");
        itemDiv.textContent = labelText;

        // 선택된 항목 클릭 시 해제
        itemDiv.onclick = function () {
            checkbox.checked = false;
            updateSelectedValues(modal, displayDiv); // 업데이트 함수 재호출
        };

        displayDiv.appendChild(itemDiv);
    });
}


  

/* 옵션 박스 끝 */


/**
 * 옵션/쿼리/cp 용JS
 */

// 페이지 이동을 위한 버튼 모두 얻어오기
// 페이지 이동 버튼 처리
document.addEventListener("DOMContentLoaded", () => {

    // Pagination 클릭 이벤트 처리
    document.querySelectorAll(".pagination a").forEach((item) => {
        item.addEventListener("click", handlePaginationClick);
    });
});

document.addEventListener("DOMContentLoaded", () => {

    // Pagination 클릭 이벤트 처리
    document.querySelectorAll(".pagination a").forEach((item) => {
        item.addEventListener("click", handlePaginationClick);
    });
});

document.addEventListener("DOMContentLoaded", () => {

    document.querySelectorAll(".pagination a").forEach((item) => {
        item.addEventListener("click", handlePaginationClick);
    });
});

document.addEventListener("DOMContentLoaded", () => {

    document.querySelectorAll(".pagination a").forEach((item) => {
        item.addEventListener("click", handlePaginationClick);
    });
});

function handlePaginationClick(event) {
    event.preventDefault();

    const item = event.target;
    if (item.classList.contains("current")) return;

    const url = new URL(location.href);

    const pageAction = item.innerText.trim();
    if (pageAction === "<<") url.searchParams.set("cp", "1");
    else if (pageAction === "<") url.searchParams.set("cp", pagination?.prevPage || "1");
    else if (pageAction === ">") url.searchParams.set("cp", pagination?.nextPage || "1");
    else if (pageAction === ">>") url.searchParams.set("cp", pagination?.maxPage || "1");
    else if (!isNaN(pageAction)) url.searchParams.set("cp", pageAction);

    // 선택된 카테고리 추가
    const selectedCategories = Array.from(
        document.querySelectorAll("#checkboxCategory input:checked")
    ).map((checkbox) => checkbox.value);

    selectedCategories.forEach((category) => url.searchParams.append("category", category));
    console.log("Selected Categories:", selectedCategories);

    // 선택된 프리퍼런스 추가
    const selectedPreferences = Array.from(
        document.querySelectorAll("#checkboxPreference input:checked")
    ).map((checkbox) => checkbox.value);

    selectedPreferences.forEach((preference) => url.searchParams.append("preference", preference));
    console.log("Selected Preferences:", selectedPreferences);

    // 확인용 최종 URL 출력
    console.log("Generated URL:", url.toString());
    location.href = url.toString();
}

document.addEventListener("DOMContentLoaded", () => {
    // 체크박스 변경 시 선택된 항목 업데이트
    document.querySelectorAll("#checkboxCategory input").forEach(checkbox => {
        checkbox.addEventListener("change", updateHiddenValues);
    });

    document.querySelectorAll("#checkboxPreference input").forEach(checkbox => {
        checkbox.addEventListener("change", updateHiddenValues);
    });

    // 검색 실행 시 값 저장
    const searchForm = document.querySelector('form');
    if (searchForm) {
        searchForm.addEventListener('submit', (event) => {
            event.preventDefault(); // 기본 폼 제출을 막기

            // 검색어 저장
            const searchInput = document.querySelector('input[name="searchTitle"]');
            const searchValue = searchInput.value;
            localStorage.setItem('searchTitle', searchValue); // 검색어를 로컬 스토리지에 저장

            // 선택된 카테고리 저장 (히든 필드의 value 설정)
            const selectedCategories = Array.from(
                document.querySelectorAll('#checkboxCategory input:checked')
            ).map(checkbox => parseInt(checkbox.value, 10)); // `parseInt`로 값 변환하여 넘김
            document.getElementById('hiddenCategories').value = selectedCategories.join(","); // 카테고리 히든 필드에 값 저장

            // 선택된 Preference 저장 (히든 필드의 value 설정)
            const selectedPreferences = Array.from(
                document.querySelectorAll('#checkboxPreference input:checked')
            ).map(checkbox => parseInt(checkbox.value, 10)); // `parseInt`로 값 변환하여 넘김
            document.getElementById('hiddenPreferences').value = selectedPreferences.join(","); // 프리퍼런스 히든 필드에 값 저장

            // 콘솔로 값 확인
            console.log("Search submitted with values:");
            console.log("Search Title:", searchValue);
            console.log("Categories:", selectedCategories);
            console.log("Preferences:", selectedPreferences);

            // 폼을 수동으로 제출
            searchForm.submit(); // 실제로 폼 제출
        });
    }
});

// 히든 필드 업데이트 함수
function updateHiddenValues() {
    // 선택된 카테고리 저장 (히든 필드에 값 설정)
    const selectedCategories = Array.from(
        document.querySelectorAll('#checkboxCategory input:checked')
    ).map(checkbox => parseInt(checkbox.value, 10)); // `parseInt`로 값 변환하여 넘김
    document.getElementById('hiddenCategories').value = selectedCategories.join(",");

    // 선택된 프리퍼런스 저장 (히든 필드에 값 설정)
    const selectedPreferences = Array.from(
        document.querySelectorAll('#checkboxPreference input:checked')
    ).map(checkbox => parseInt(checkbox.value, 10)); // `parseInt`로 값 변환하여 넘김
    document.getElementById('hiddenPreferences').value = selectedPreferences.join(",");
}

