// 전체 선택 또는 선택 해제 기능을 구현하는 함수
document.addEventListener("DOMContentLoaded", () => {
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

/* 체크박스 장바구니(찜을 곁들인)로 보내기  */
function ifChecked(action) {
    // 선택된 책 번호 수집
    const selectedBookNo = [];
    document.querySelectorAll('.book-checkbox:checked').forEach(checkbox => {
        selectedBookNo.push(checkbox.value);  // value 값을 사용하여 수집
    });

    // 선택된 책이 없으면 경고 메시지 출력 후 종료
    if (selectedBookNo.length === 0) {
        if (action === 'cart') {
            alert("책을 선택해 주세요.");
        } else if (action === 'wishlist') {
            alert("찜할 책을 선택해 주세요.");
        }
        return;
    }

    // Action에 따른 URL 및 메시지 설정
    let url, successMessage, failureMessage;
    if (action === 'cart') {
        url = "/searchBookPage/addCart";
        successMessage = `${selectedBookNo.length}개의 책을 장바구니에 추가하였습니다.`;
        failureMessage = "장바구니 추가에 실패했습니다.";
    } else if (action === 'wishlist') {
        url = "/searchBookPage/addWishlist";
        successMessage = `${selectedBookNo.length}개의 책을 찜 목록에 추가했습니다.`;
        failureMessage = "찜 목록 추가에 실패했습니다.";
    } else {
        alert("잘못된 요청입니다.");
        return;
    }

    // Fetch API를 사용하여 선택된 책을 서버로 전송
    fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ bookNo: selectedBookNo })
    })
        .then(response => {
            if (response.ok) {
                alert(successMessage);
                if (action === 'cart') {
                    let userResponse = confirm("장바구니로 이동하시겠습니까?");
                    if (userResponse) {
                        window.location.href = "/cart";  // 장바구니 페이지로 이동
                    }
                } else if (action === 'wishlist') {
                    let userResponse = confirm("찜 목록으로 이동하시겠습니까?");
                    if (userResponse) {
                        window.location.href = "/myPage/myWishList";  // 찜 목록 페이지로 이동
                    }
                }
                // "아니오"를 누르면 아무 작업도 하지 않음 (현재 페이지 유지)
            } else {
                throw new Error(failureMessage);
            }
        })
        .catch(error => {
            alert(error.message);
        });
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
    displayDiv.innerHTML = "선택한 항목 "; // 기존 내용을 초기화
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
            /*          console.log("Search submitted with values:");
                     console.log("Search Title:", searchValue);
                     console.log("Categories:", selectedCategories);
                     console.log("Preferences:", selectedPreferences);
          */

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


/* 검색후 옵션 선택 유지 */
document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(location.search);
    const categories = params.get("categories") ? params.get("categories").split(",") : [];
    const preferences = params.get("preferences") ? params.get("preferences").split(",") : [];
    const sortOption = params.get("sortOption");

    const selectedCategoryValuesDiv = document.getElementById("selectedCategoryValues");
    const selectedPreferenceValuesDiv = document.getElementById("selectedPreferenceValues");
    const searchOptionSelect = document.getElementById("searchOptionSelect");

    if (categories.length > 0) {
        categories.forEach(category => {
            const checkbox = document.querySelector(`#checkboxCategory input[value="${category}"]`);
            if (checkbox) {
                checkbox.checked = true;
            }
        });
        // 선택한 카테고리 값 업데이트
        updateSelectedValues(document.getElementById("checkboxCategory"), selectedCategoryValuesDiv);
    }

    if (preferences.length > 0) {
        preferences.forEach(preference => {
            const checkbox = document.querySelector(`#checkboxPreference input[value="${preference}"]`);
            if (checkbox) {
                checkbox.checked = true;
            }
        });
        // 선택한 선호도 값 업데이트
        updateSelectedValues(document.getElementById("checkboxPreference"), selectedPreferenceValuesDiv);
    }

    if (sortOption) {
        console.log("Retrieved sortOption:", sortOption); // 디버깅용 콘솔 출력
        searchOptionSelect.value = sortOption; // 값을 직접 할당하여 설정

        // 설정 후 값이 변경되었는지 확인
        console.log("Updated select value:", searchOptionSelect.value);
    }

    // 정렬 옵션 변경 시 hidden input 업데이트
    searchOptionSelect.addEventListener('change', function () {
        document.getElementById('hiddenSearchOption').value = this.value === "none" ? "" : this.value;
    });
   

});


const categoryButton = document.getElementById("myCategoryBringingInBtn");
const catCancelButton = document.getElementById("catBtnAllCancel");
let categoriesLoaded = false; // 상태를 저장하는 변수

categoryButton.addEventListener("click", () => {
    if (!categoriesLoaded) {
        // "불러오기" 상태
        fetch('/searchBookPage/myCategoryBringingInBtn', {
            method: 'GET',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("에러 발생");
                }
                return response.json();
            })
            .then(categories => {
                console.log("categories:", categories);

                // 체크박스 업데이트
                const checkboxes = document.querySelectorAll('.categoryCheckbox');
                checkboxes.forEach(checkbox => {
                    if (categories.includes(parseInt(checkbox.value))) {
                        checkbox.checked = true;
                    } else {
                        checkbox.checked = false;
                    }
                });

                // 버튼 텍스트 변경
                categoryButton.textContent = "해제하기";
                categoriesLoaded = true; // 상태 업데이트

                // 선택한 카테고리 값 업데이트
                updateSelectedCategories();

                // 전체 선택 취소 버튼 표시 여부 업데이트
                updateAllCancelButtonVisibility();
            })
            .catch(error => console.error("Error:", error));
    } else {
        // "해제하기" 상태
        const checkboxes = document.querySelectorAll('.categoryCheckbox');
        checkboxes.forEach(checkbox => {
            checkbox.checked = false; // 체크박스 해제
        });

        // 버튼 텍스트 변경
        categoryButton.textContent = "불러오기";
        categoriesLoaded = false; // 상태 업데이트

        // 선택한 카테고리 값 업데이트
        updateSelectedCategories();

        // 전체 선택 취소 버튼 숨기기
        catCancelButton.hidden = true;
    }
});

catCancelButton.addEventListener("click", () => {
    // 모든 체크박스 해제
    const checkboxes = document.querySelectorAll('.categoryCheckbox');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });

    // 선택한 카테고리 값 업데이트
    updateSelectedCategories();

    // 전체 선택 취소 버튼 숨기기
    catCancelButton.hidden = true;

    // 버튼 텍스트 변경
    categoryButton.textContent = "불러오기";
    categoriesLoaded = false;
});

// 체크박스 상태 변경 시 전체 선택 취소 버튼 보이기 여부 업데이트
function updateAllCancelButtonVisibility() {
    const checkboxes = document.querySelectorAll('.categoryCheckbox');
    const anyChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);
    catCancelButton.hidden = !anyChecked;
}

// 체크박스가 변경될 때마다 전체 선택 취소 버튼의 상태를 업데이트
const checkboxes = document.querySelectorAll('.categoryCheckbox');
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', updateAllCancelButtonVisibility);
});

// 체크박스 상태 변화에 따라 선택 항목 및 숨겨진 필드 업데이트
document.querySelectorAll('.categoryCheckbox').forEach(checkbox => {
    checkbox.addEventListener('change', updateSelectedCategories);
});

// 선택한 카테고리 값을 업데이트하는 함수
function updateSelectedCategories() {
    const selectedCategories = [];
    const selectedCategoryValuesDiv = document.getElementById("selectedCategoryValues");
    const hiddenCategoriesInput = document.getElementById("hiddenCategories");

    // 선택된 체크박스를 배열로 수집
    document.querySelectorAll('.categoryCheckbox:checked').forEach(checkbox => {
        const categoryLabel = checkbox.closest("label").textContent.trim(); // 체크박스의 부모 label에서 텍스트 추출
        selectedCategories.push(categoryLabel);
    });

    // 선택한 항목을 표시
    selectedCategoryValuesDiv.textContent = `선택한 항목: ${selectedCategories.join(", ")}`;

    // 숨겨진 필드에 값 저장
    hiddenCategoriesInput.value = selectedCategories.join(",");
}

/* 카테고리 가져오기 끝 */
/* 내 프리퍼런스 불러오기  */

// 취향 버튼 관련 코드만 남김
const preferenceButton = document.getElementById("myPreferenceBringingInBtn");
const prefCancelButton = document.getElementById("preBtnAllCancel");
let preferencesLoaded = false; // 상태를 저장하는 변수

preferenceButton.addEventListener("click", () => {
    if (!preferencesLoaded) {
        // "불러오기" 상태
        fetch('/searchBookPage/myPreferenceBringingInBtn', {
            method: 'GET',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("에러 발생");
                }
                return response.json();
            })
            .then(preferences => {
                console.log("preferences:", preferences);

                // 체크박스 업데이트
                const checkboxes = document.querySelectorAll('.preferenceCheckbox');
                checkboxes.forEach(checkbox => {
                    if (preferences.includes(parseInt(checkbox.value))) {
                        checkbox.checked = true;
                    }
                });

                // 버튼 텍스트 변경
                preferenceButton.textContent = "해제하기";
                preferencesLoaded = true; // 상태 업데이트

                // 전체 선택 취소 버튼 표시 여부 업데이트
                updatePreferenceCancelButtonVisibility();
            })
            .catch(error => console.error("Error:", error));
    } else {
        // "해제하기" 상태
        const checkboxes = document.querySelectorAll('.preferenceCheckbox');
        checkboxes.forEach(checkbox => {
            checkbox.checked = false; // 체크박스 해제
        });

        // 버튼 텍스트 변경
        preferenceButton.textContent = "불러오기";
        preferencesLoaded = false; // 상태 업데이트

        // 전체 선택 취소 버튼 숨기기
        prefCancelButton.hidden = true;
    }
});

prefCancelButton.addEventListener("click", () => {
    // 모든 체크박스 해제
    const checkboxes = document.querySelectorAll('.preferenceCheckbox');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });

    // 전체 선택 취소 버튼 숨기기
    prefCancelButton.hidden = true;

    // 버튼 텍스트 변경
    preferenceButton.textContent = "불러오기";
    preferencesLoaded = false;
});

// 체크박스 상태 변경 시 전체 선택 취소 버튼 보이기 여부 업데이트 (취향 체크박스)
function updatePreferenceCancelButtonVisibility() {
    const checkboxes = document.querySelectorAll('.preferenceCheckbox');
    const anyChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);
    prefCancelButton.hidden = !anyChecked;
}

// 체크박스가 변경될 때마다 전체 선택 취소 버튼의 상태를 업데이트 (취향 체크박스)
const preferenceCheckboxes = document.querySelectorAll('.preferenceCheckbox');
preferenceCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', updatePreferenceCancelButtonVisibility);
});


// 체크박스 상태 변화에 따라 선택 항목 및 숨겨진 필드 업데이트
document.querySelectorAll('.preferenceCheckbox').forEach(checkbox => {
    checkbox.addEventListener('change', updateSelectedPreferences);
});

// 선택한 항목을 표시하고 숨겨진 필드 업데이트하는 함수
function updateSelectedPreferences() {
    const selectedPreferences = [];
    const selectedPreferenceValuesDiv = document.getElementById("selectedPreferenceValues");
    const hiddenPreferencesInput = document.getElementById("hiddenPreferences");

    // 선택된 체크박스를 배열로 수집
    document.querySelectorAll('.preferenceCheckbox:checked').forEach(checkbox => {
        const preferenceLabel = checkbox.closest("label").textContent.trim(); // 체크박스의 부모 label에서 텍스트 추출
        selectedPreferences.push(preferenceLabel);
    });

    // 선택한 항목을 표시
    selectedPreferenceValuesDiv.textContent = `선택한 항목: ${selectedPreferences.join(", ")}`;

    // 숨겨진 필드에 값 저장
    hiddenPreferencesInput.value = selectedPreferences.join(",");
}
/* 내 프리퍼런스 불러오기  끝 */


/* 검색시 옵션 설정  */
document.getElementById('searchOptionSelect').addEventListener('change', function () {
    const selectedValue = this.value;

    if (selectedValue === "none") {
        // 기본값인 경우, hidden input 값을 빈 문자열로 설정
        document.getElementById('hiddenSearchOption').value = "";
    } else {
        // 선택된 값으로 hidden input을 업데이트
        document.getElementById('hiddenSearchOption').value = selectedValue;
    }
});

/* 검색시 옵션 설정 끝  */

/* 찜 보내기  */
function singleWishListBtn(button) {
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
   

    // 서버에 bookNo를 전송
    fetch(`/searchBookPage/singleWishlist`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ bookNo: bookNo }) // PUT 요청 본문에 bookNo를 JSON 형식으로 전송합니다.
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('찜 목록 추가에 실패했습니다.');
            }
            return response.text(); // 응답을 텍스트로 처리합니다.
        })
        .then(data => {
            if (data === "추가 성공") {
                alert(`"${bookTitle}"을(를) 찜 목록에 추가했습니다.`);
            } else {
               if(confirm(`이미 찜한 책입니다.
                \n"${bookTitle}"를 삭제 하시겠습니까?`)){   

                fetch(`/searchBookPage/deleteWishlist`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ bookNo: bookNo }) // PUT 요청 본문에 bookNo를 JSON 형식으로 전송합니다.
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('찜 목록 삭제에 실패했습니다.');
                        }
                        return response.text(); // 응답을 텍스트로 처리합니다.
                    })
                    .then(data => {
                    if (data === "삭제 성공") {
                        alert(`"${bookTitle}"을(를) 찜 목록에서 삭제했습니다.`);
                    }
                    })
                    .catch(error => {
                        console.error('에러:', error);
                    });
               }else{
                   return;
               }
            }
        })
        .catch(error => console.error('에러:', error));
}

/* 찜 보내기  */

document.getElementById("applyOption").addEventListener("click", () => {
    // 검색 폼의 검색 버튼을 선택합니다.
    const searchButton = document.querySelector('.search-bar form button[type="submit"]');
    
    // 검색 버튼 클릭
    if (searchButton) {
        searchButton.click();
    }
});



















/* 바로구매 버튼  */

/* document.addEventListener('DOMContentLoaded', () => {
    const buyNowButtons = document.querySelectorAll('#buyNow');
    
    buyNowButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 가장 가까운 .book-item 요소 찾기
            const bookItem = this.closest('.book-item');
            
            // 필요한 정보 추출
            const bookNo = bookItem.getAttribute('data-book-no');
            const bookTitle = bookItem.querySelector('.book-title').textContent;
            const bookCover = bookItem.querySelector('.book-item-image img').src;
            const bookPrice = bookItem.querySelector('span:nth-child(6)').textContent.replace('원', '');
            
            // 데이터 객체 생성
            const orderData = {
                bookNo: bookNo,
                bookTitle: bookTitle,
                bookCover: bookCover,
                bookPrice: parseInt(bookPrice)
            };
            
            // 서버로 데이터 전송 및 페이지 이동
            fetch('/searchBookPage/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderData)
            })
            .then(response => {
                if (response.ok) {
                    // 주문 페이지로 이동
                    window.location.href = '/order/orderPage';
                } else {
                    // 에러 처리
                    alert('주문 처리 중 오류가 발생했습니다.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('주문 처리 중 네트워크 오류가 발생했습니다.');
            });
        });
    });
});




// 팝업 열기 및 닫기 제어
document.getElementById("categoryButton").addEventListener("click", function () {
    const categoryPopup = document.getElementById("checkboxCategory");
    categoryPopup.style.display = categoryPopup.style.display === "block" ? "none" : "block";
  });
  
  document.getElementById("preferenceButton").addEventListener("click", function () {
    const preferencePopup = document.getElementById("checkboxPreference");
    preferencePopup.style.display = preferencePopup.style.display === "block" ? "none" : "block";
  });
  
  // 적용 버튼 클릭 시 팝업 닫기
  document.getElementById("applyCategoryButton").addEventListener("click", function () {
    document.getElementById("checkboxCategory").style.display = "none";
  });
  
  document.getElementById("applyPreferenceButton").addEventListener("click", function () {
    document.getElementById("checkboxPreference").style.display = "none";
  });
  
 */