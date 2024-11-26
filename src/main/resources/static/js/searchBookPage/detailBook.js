/* 불러오기용 JS 별점 */
const rateWrap = document.querySelectorAll('.rating'),
        label = document.querySelectorAll('.rating .rating__label'),
        input = document.querySelectorAll('.rating .rating__input'),
        labelLength = label.length,
        opacityHover = '0.5';

let stars = document.querySelectorAll('.rating .star-icon');

checkedRate();

rateWrap.forEach(wrap => {
    wrap.addEventListener('mouseenter', () => {
        stars = wrap.querySelectorAll('.star-icon');

        stars.forEach((starIcon, idx) => {
            starIcon.addEventListener('mouseenter', () => {
                initStars(); 
                filledRate(idx, labelLength); 

                for (let i = 0; i < stars.length; i++) {
                    if (stars[i].classList.contains('filled')) {
                        stars[i].style.opacity = opacityHover;
                    }
                }
            });

            starIcon.addEventListener('mouseleave', () => {
                starIcon.style.opacity = '1';
                checkedRate(); 
            });

            wrap.addEventListener('mouseleave', () => {
                starIcon.style.opacity = '1';
            });
        });
    });
});

function filledRate(index, length) {
    if (index <= length) {
        for (let i = 0; i <= index; i++) {
            stars[i].classList.add('filled');
        }
    }
}

function checkedRate() {
    let checkedRadio = document.querySelectorAll('.rating input[type="radio"]:checked');


    initStars();
    checkedRadio.forEach(radio => {
        let previousSiblings = prevAll(radio);

        for (let i = 0; i < previousSiblings.length; i++) {
            previousSiblings[i].querySelector('.star-icon').classList.add('filled');
        }

        radio.nextElementSibling.classList.add('filled');

        function prevAll() {
            let radioSiblings = [],
                prevSibling = radio.parentElement.previousElementSibling;

            while (prevSibling) {
                radioSiblings.push(prevSibling);
                prevSibling = prevSibling.previousElementSibling;
            }
            return radioSiblings;
        }
    });
}

function initStars() {
    for (let i = 0; i < stars.length; i++) {
        stars[i].classList.remove('filled');
    }
}

//------------------------------------------------------------------------------------------------------------------------------------
// 리뷰 작성 start
const writeRateWrap = document.querySelectorAll('.write_rating'); // 작성용 별점 섹션
let writeStars;

// 선택된 별점 초기화
checkedWriteRate();

// Hover 이벤트 처리
writeRateWrap.forEach((wrap) => {
    writeStars = wrap.querySelectorAll('.write_star_icon'); // 작성용 별점 아이콘 선택

    writeStars.forEach((starIcon, idx) => {
        // Hover 시 별점 채우기
        starIcon.addEventListener('mouseenter', () => {
            initWriteStars(wrap); // 현재 섹션의 별점 초기화
            filledWriteRate(idx, writeStars); // Hover된 별까지 채우기
        });

        // Hover 해제 시 기존 상태 복원
        starIcon.addEventListener('mouseleave', () => {
            initWriteStars(wrap); // Hover 별점 초기화
            checkedWriteRate(wrap); // 체크된 별점 복원
        });

        // 클릭 시 별점 선택 처리
        starIcon.addEventListener('click', () => {
            updateWriteRating(wrap, idx + 1); // 클릭한 별점으로 설정
        });
    });
});

// 기존 선택된 별점 상태 반영
function checkedWriteRate() {
    const checkedRadio = document.querySelectorAll('.write_rating .write_rating__input:checked'); // 체크된 별점 라디오 버튼
    checkedRadio.forEach((radio) => {
        const wrap = radio.closest('.write_rating'); // 현재 작성 섹션 가져오기

        initWriteStars(wrap); // 별점 초기화
        if (radio) {
            const previousSiblings = prevAll(radio.parentElement);

            // 체크된 별점까지 채우기
            previousSiblings.forEach((sibling) => {
                sibling.querySelector('.write_star_icon').classList.add('filled');
            });
            radio.nextElementSibling.classList.add('filled');
        }
    });
}

// Hover 상태로 별 채우기
function filledWriteRate(index, stars) {
    for (let i = 0; i <= index; i++) {
        stars[i].classList.add('filled');
    }
}

// 클릭 시 별점 업데이트
function updateWriteRating(wrap, score) {
    const inputs = wrap.querySelectorAll('.write_rating__input');

    // 선택된 별점에 따라 라디오 버튼 체크
    inputs.forEach((input) => {
        input.checked = parseFloat(input.value) === score;
    });

    // 새로운 상태 반영
    initWriteStars(wrap);
    filledWriteRate(score - 1, wrap.querySelectorAll('.write_star_icon'));
}

// 별점 초기화
function initWriteStars(wrap) {
    const stars = wrap.querySelectorAll('.write_star_icon');
    stars.forEach((star) => {
        star.classList.remove('filled');
    });
}

// 이전 형제 요소 가져오기
function prevAll(element) {
    const siblings = [];
    let prevSibling = element.previousElementSibling;

    while (prevSibling) {
        siblings.push(prevSibling);
        prevSibling = prevSibling.previousElementSibling;
    }
    return siblings;
}

// 리뷰 작성 및 제출
const bookNo = document.querySelector(".book-detail.book-item").dataset.bookNo;

// 리뷰 작성 버튼 클릭 이벤트
document.querySelector("#submitReview").addEventListener("click", (event) => {
    event.preventDefault(); // 기본 제출 동작 방지

    // 1. 폼 데이터 수집
    const form = document.querySelector("#writeReviewForm");
    const formData = new FormData(form);

    // 2. bookNo 추가
    formData.append("bookNo", bookNo);

    // 3. 검증
    const rating = formData.get("rating");
    const title = formData.get("title").trim();
    const content = formData.get("content").trim();

    if (!rating) {
        alert("별점을 선택해주세요.");
        return;
    }
    if (!title) {
        alert("제목을 입력해주세요.");
        return;
    }
    if (!content) {
        alert("내용을 입력해주세요.");
        return;
    }

    // 4. 데이터 전송
    fetch(`/searchBookPage/writeReview/${bookNo}`, {
        method: "POST",
        body: formData,
    })
        .then((response) => {
            if (response.ok) return response.text(); // 서버 응답 처리
            throw new Error("서버 오류 발생!");
        })
        .then((data) => {
            if (data) {
                alert("리뷰 작성 성공!");
                location.reload(); // 페이지 새로고침
            } else {
                alert("리뷰 작성 실패!");
            }
        })
        .catch((err) => {
            console.error(err);
        });
});

/* 리뷰 작성 end */

/*-------------------------------------- 리뷰 수정 ------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
    const wrap = document.querySelector('.wrap');
    if (!wrap) {
        console.error("'.wrap' 요소를 찾을 수 없습니다. HTML 구조를 확인하세요.");
        return;
    }
    wrap.addEventListener('click', (event) => {
        const target = event.target;
        if (target.id === 'updateReview') {
            const reviewNo = target.getAttribute('data-review-no');
            if (!reviewNo) {
                console.error('리뷰 번호를 찾을 수 없습니다.');
                return;
            }
            console.log(`수정 버튼 클릭됨. 리뷰 번호: ${reviewNo}`);
            toggleEditMode(reviewNo, target);
        }
    });
});

function toggleEditMode(reviewNo, button) {
    console.log(`toggleEditMode 실행. 리뷰 번호: ${reviewNo}`);
    
    const titleInput = document.querySelector(`input[data-review-no="${reviewNo}"]`);
    const contentTextarea = document.querySelector(`textarea[data-review-no="${reviewNo}"]`);
    const cancelButton = document.querySelector(`button[data-review-no="${reviewNo}"][id="deleteReview"]`);
    const rating = document.querySelector(`.rating[data-review-no="${reviewNo}"]`);
    const ratingInputs = rating?.querySelectorAll('input[type="radio"]');
    const imageInput = document.querySelector(`#imageInput-${reviewNo}`)
    if (!titleInput || !contentTextarea || !cancelButton || !ratingInputs) {
        console.error(`리뷰 요소를 찾을 수 없습니다. 리뷰 번호: ${reviewNo}`);
        return;
    }

    if (button.textContent === "수정") {
        console.log(`수정 모드 활성화: 리뷰 번호 ${reviewNo}`);

        titleInput.removeAttribute('readonly');
        contentTextarea.removeAttribute('readonly');
        rating.classList.remove('readonly'); // 수정 가능 상태
        ratingInputs.forEach(input => input.removeAttribute('disabled'));
        if (imageInput) imageInput.removeAttribute('disabled');

        titleInput.style.border = "1px solid #ccc";
        contentTextarea.style.border = "1px solid #ccc";

        button.textContent = "저장";
        cancelButton.textContent = "취소";
        titleInput.focus();
    } else if (button.textContent === "저장") {
        console.log(`저장 요청: 리뷰 번호 ${reviewNo}`);
        const updatedTitle = titleInput.value.trim();
        const updatedContent = contentTextarea.value.trim();
        const updatedRating = [...ratingInputs].find(input => input.checked)?.value;
        const updatedImage = imageInput?.files[0];
        if (!updatedTitle || !updatedContent || !updatedRating) {
            alert("제목, 내용, 별점을 모두 입력해주세요.");
            return;
        }
        const formData = new FormData();
        formData.append('reviewNo', reviewNo);
        formData.append('reviewTitle', updatedTitle);
        formData.append('reviewContent', updatedContent);
        formData.append('rating', updatedRating);
        if (updatedImage) {
            formData.append('image', updatedImage);
        }
        fetch(`/searchBookPage/updateReview/${reviewNo}`, {
            method: 'POST',
            body: formData
        })
            .then(response => {
                if (response.ok) {
                    alert('리뷰가 수정되었습니다.');
                    resetEditMode(titleInput, contentTextarea, rating, ratingInputs, imageInput, button, cancelButton);
                } else {
                    throw new Error('서버 응답 실패');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('리뷰 수정 중 문제가 발생했습니다. 다시 시도해주세요.');
            });
        
    }
}
function resetEditMode(titleInput, contentTextarea, rating, ratingInputs, imageInput, button, cancelButton) {
    console.log('수정 모드 종료.');
    titleInput.setAttribute('readonly', true);
    contentTextarea.setAttribute('readonly', true);
    titleInput.style.border = "none";
    contentTextarea.style.border = "none";
    rating.classList.add('readonly'); // 읽기 전용 상태
    ratingInputs.forEach(input => input.setAttribute('disabled', true));
    if (imageInput) imageInput.setAttribute('disabled', true);
    button.textContent = "수정";
    cancelButton.textContent = "삭제";
}


/*-------------------------------------- 리뷰 수정 end------------------------------------------- */

/* -------------------------------------- 리뷰 삭제 -------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
    const wrap = document.querySelector('.wrap'); // 리뷰 컨테이너

    if (!wrap) {
        console.error("리뷰 컨테이너가 존재하지 않습니다.");
        return;
    }

    wrap.addEventListener('click', (event) => {
        const target = event.target;

        if (target.id === 'deleteReview') {
            const reviewNo = target.getAttribute('data-review-no');
            if (!reviewNo) {
                console.error('리뷰 번호가 존재하지 않습니다.');
                return;
            }

            // 삭제 확인 알림
            if (confirm('정말 이 리뷰를 삭제하시겠습니까?')) {
                deleteReview(reviewNo);
            }
        }
    });
});

// 리뷰 삭제 요청 (POST 방식)
function deleteReview(reviewNo) {
    fetch(`/searchBookPage/deleteReview?reviewNo=${reviewNo}`, { method: 'DELETE' })
        .then((response) => {
            if (response.ok) return response.text();
            
            throw new Error('리뷰 삭제에 실패했습니다.');
        })
        .then(result => {
            if (result  = 0) {
                alert('리뷰 삭제 중 문제가 발생했습니다. 다시 시도해주세요.');
            }
            alert('리뷰가 삭제되었습니다.');
            location.reload();
        })
        .catch((error) => {
            console.error('삭제 중 오류 발생:', error);
        });
}


/* -------------------------------------- 리뷰 삭제 end -------------------------------------------- */



function resetEditMode(titleInput, contentTextarea, rating, ratingInputs, imageInput, button, cancelButton) {
    console.log('수정 모드 종료.');

    titleInput.setAttribute('readonly', true);
    contentTextarea.setAttribute('readonly', true);
    titleInput.style.border = "none";
    contentTextarea.style.border = "none";

    rating.classList.add('readonly'); // 읽기 전용 상태
    ratingInputs.forEach(input => input.setAttribute('disabled', true));
    if (imageInput) imageInput.setAttribute('disabled', true);

    button.textContent = "수정";
    cancelButton.textContent = "삭제";
}

/*  리뷰 페이지 네이션 */
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".pagination a").forEach((item) => {
        item.addEventListener("click", handlePaginationClick);
    });
});
function handlePaginationClick(event) {
    event.preventDefault(); // 기본 링크 동작 방지
    const url = new URL(location.href); // 현재 URL 기반
    const cp = event.target.innerText.trim(); // 클릭한 페이지 번호
    if (!isNaN(cp)) {
        url.searchParams.set("cp", cp);
    } else if (cp === "<<") {
        url.searchParams.set("cp", "1");
    } else if (cp === "<") {
        url.searchParams.set("cp", pagination?.prevPage || "1");
    } else if (cp === ">") {
        url.searchParams.set("cp", pagination?.nextPage || "1");
    } else if (cp === ">>") {
        url.searchParams.set("cp", pagination?.maxPage || "1");
    }
    location.href = url.toString();
}
/* 리뷰 페이지 네이션 */

/* 리뷰 작성 버튼 */



/* 리뷰 작성 버튼 */




/* 리뷰 작성 이미지 미리보기  start */
const imageInput = document.getElementById('write-imageInput');
const preview = document.querySelector('.write-review-img-thumb');

imageInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      preview.src = reader.result;
    };
    reader.readAsDataURL(file);
  }
});

/* 리뷰 작성 이미지 미리보기 end  */

/*-------------------------------------- 리뷰 수정 end ------------------------------------------- */
/* 수정전 별점 JS */
/* 
const rateWrap = document.querySelectorAll('.rating'),
        label = document.querySelectorAll('.rating .rating__label'),
        input = document.querySelectorAll('.rating .rating__input'),
        labelLength = label.length,
        opacityHover = '0.5';

let stars = document.querySelectorAll('.rating .star-icon');

checkedRate();

rateWrap.forEach(wrap => {
    wrap.addEventListener('mouseenter', () => {
        stars = wrap.querySelectorAll('.star-icon');

        stars.forEach((starIcon, idx) => {
            starIcon.addEventListener('mouseenter', () => {
                initStars(); 
                filledRate(idx, labelLength); 

                for (let i = 0; i < stars.length; i++) {
                    if (stars[i].classList.contains('filled')) {
                        stars[i].style.opacity = opacityHover;
                    }
                }
            });

            starIcon.addEventListener('mouseleave', () => {
                starIcon.style.opacity = '1';
                checkedRate(); 
            });

            wrap.addEventListener('mouseleave', () => {
                starIcon.style.opacity = '1';
            });
        });
    });
});

function filledRate(index, length) {
    if (index <= length) {
        for (let i = 0; i <= index; i++) {
            stars[i].classList.add('filled');
        }
    }
}

function checkedRate() {
    let checkedRadio = document.querySelectorAll('.rating input[type="radio"]:checked');


    initStars();
    checkedRadio.forEach(radio => {
        let previousSiblings = prevAll(radio);

        for (let i = 0; i < previousSiblings.length; i++) {
            previousSiblings[i].querySelector('.star-icon').classList.add('filled');
        }

        radio.nextElementSibling.classList.add('filled');

        function prevAll() {
            let radioSiblings = [],
                prevSibling = radio.parentElement.previousElementSibling;

            while (prevSibling) {
                radioSiblings.push(prevSibling);
                prevSibling = prevSibling.previousElementSibling;
            }
            return radioSiblings;
        }
    });
}

function initStars() {
    for (let i = 0; i < stars.length; i++) {
        stars[i].classList.remove('filled');
    }
}


 */


