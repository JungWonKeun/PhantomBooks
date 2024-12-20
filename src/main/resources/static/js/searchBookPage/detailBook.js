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

document.querySelector("#submitReview").addEventListener("click", (event) => {
    event.preventDefault(); // 기본 제출 동작 방지

    // 1. 폼 데이터 수집
    const form = document.querySelector("#writeReviewForm");
    const formData = new FormData(form);

    // 2. 검증
    const rating = formData.get("rating");
    const title = formData.get("title").trim();
    const content = formData.get("content").trim();
    const reviewImage = document.querySelector("input[name='reviewImage']").files[0];

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

    // 이미지가 있는 경우에만 추가
    if (reviewImage) {
        formData.append("reviewImage", reviewImage);
    }

    // 3. 데이터 전송
    fetch(`/searchBookPage/writeReview/${bookNo}`, {
        method: "POST",
        body: formData
    })
        .then((response) => {
            if (response.ok) return response.text(); // JSON 응답 처리
            throw new Error("서버 오류 발생!");

        })
        .then((data) => {
            if (data === "true") {
                alert('리뷰 작성 성공!');
                location.reload(); // 페이지 새로고침
            } else if (data === "false") {
                alert('1회 구매당 1회 리뷰 작성이 가능합니다');
            }
             else {
                alert('리뷰 작성 실패!');
            }
        })
        .catch(err => {
            console.error(err);
        });
});
/* 리뷰 작성 end */

/* 리뷰 작성 end */

/*-------------------------------------- 리뷰 수정 ------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
    const wrap = document.querySelector('.wrap'); // 리뷰 컨테이너

    if (!wrap) {
        console.error("리뷰 컨테이너가 존재하지 않습니다.");
        return;
    }

    // 통합된 이벤트 핸들러 설정
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
        } else if (target.id === 'deleteReview') {
            const reviewNo = target.getAttribute('data-review-no');
            if (!reviewNo) {
                console.error('리뷰 번호를 찾을 수 없습니다.');
                return;
            }
            console.log(`삭제 버튼 클릭됨. 리뷰 번호: ${reviewNo}`);
            if (confirm('정말 이 리뷰를 삭제하시겠습니까?')) {
                deleteReview(reviewNo);
            }
        }
    });
});

/** 수정 모드 전환 */
function toggleEditMode(reviewNo, button) {
    console.log(`toggleEditMode 실행. 리뷰 번호: ${reviewNo}`);


    const titleInput = document.querySelector(`input[data-review-no="${reviewNo}"]`);
    const contentTextarea = document.querySelector(`textarea[data-review-no="${reviewNo}"]`);
    const cancelButton = document.querySelector(`button[data-review-no="${reviewNo}"][id="deleteReview"]`);
    const rating = document.querySelector(`.rating[data-review-no="${reviewNo}"]`);
    const ratingInputs = rating?.querySelectorAll('input[type="radio"]');
    const imageInput = document.querySelector(`#imageInput-${reviewNo}`);

    if (!titleInput || !contentTextarea || !cancelButton || !ratingInputs) {
        console.error(`리뷰 요소를 찾을 수 없습니다. 리뷰 번호: ${reviewNo}`);
        return;
    }

    if (button.textContent === "수정") {
        console.log(`수정 모드 활성화: 리뷰 번호 ${reviewNo}`);

        
    alert("이미지 미 선택시 기본이미지로 대체됩니다.");

        // 수정 모드 활성화
        titleInput.removeAttribute('readonly');
        contentTextarea.removeAttribute('readonly');
        rating.classList.remove('readonly');
        ratingInputs.forEach(input => input.removeAttribute('disabled'));

        titleInput.style.border = "1px solid #ccc";
        contentTextarea.style.border = "1px solid #ccc";

        // 이미지 파일 선택 요소 보이도록 설정
        if (imageInput) {
            imageInput.style.display = "block";
        }

        // 버튼 상태 변경
        button.textContent = "저장";
        cancelButton.textContent = "취소";

        // 취소 버튼 동작 설정
        cancelButton.onclick = (event) => {
            event.stopPropagation(); // 이벤트 전파 중단
            console.log('수정 취소 버튼 클릭됨.');
            // 페이지 새로고침으로 초기 상태 복구
            location.reload();
        };

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

        // 서버로 데이터 전송
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
                    location.reload(); // 저장 후 페이지 새로고침
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



// ------------------------------------------------------------------------------
/** 리뷰 삭제 요청 (DELETE 방식) */
/* function deleteReview(reviewNo) {
    fetch(`/searchBookPage/deleteReview?reviewNo=${reviewNo}`, { method: 'DELETE' })
        .then((response) => {
            if (response.ok) return response.text();

            throw new Error('리뷰 삭제에 실패했습니다.');
        })
        .then(result => {
            if (result === '0') {
                alert('리뷰 삭제 중 문제가 발생했습니다. 다시 시도해주세요.');
            } else {
                alert('리뷰가 삭제되었습니다.');
                location.reload();
            }
        })
        .catch((error) => {
            console.error('삭제 중 오류 발생:', error);
        });
} */

//------------------------------------------------------------------------------------------------------
/** 리뷰 삭제 요청 (DELETE 방식) */
function deleteReview(reviewNo) {
    fetch(`/searchBookPage/deleteReview?reviewNo=${reviewNo}`, { method: 'DELETE' })
        .then((response) => {
            if (response.ok) return response.text();

            throw new Error('리뷰 삭제에 실패했습니다.');
        })
        .then(result => {
            if (result === '0') {
                alert(' 리뷰가 삭제되었습니다. 확인해 주세요');
                location.reload();
            } else {
                alert('리뷰가 삭제되었습니다.');
                location.reload();
            }
        })
        .catch((error) => {
            console.error('삭제 중 오류 발생:', error);
        });
}

/* -------------------------------------------------------------------------------------- */
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




/* 리뷰 작성 이미지 미리보기  start */
const imageInput = document.getElementById('imageInput');
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

/* 리뷰 수정 이미지 미리보기  시작*/
document.addEventListener('DOMContentLoaded', () => {
    // 파일 입력 요소를 모두 선택합니다.
    const imageInputs = document.querySelectorAll('[id^="imageInput-"]'); // ID가 imageInput-로 시작하는 요소들

    imageInputs.forEach((imageInput) => {
        // 파일 입력 요소에서 리뷰 번호를 추출합니다.
        const reviewNo = imageInput.id.split('-')[1];
        
        // 해당 리뷰 번호를 사용하여 미리보기 이미지를 선택합니다.
        const preview = document.getElementById(`reviewImageInput-${reviewNo}`);

        // 파일 입력에 이벤트 리스너를 추가합니다.
        imageInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                    if (preview) {
                        preview.src = reader.result;
                    }
                };
                reader.readAsDataURL(file);
            }
        });
    });
});



 



/* 리뷰 수정 이미지 미리보기 끝 */

// 장바구니 담기
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


    // 서버에 bookNo를 전송
    fetch(`/searchBookPage/detailCart`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ bookNo: bookNo })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('장바구니 추가에 실패했습니다.');
            }
            return response.text();  // 응답을 텍스트로 받습니다.
        })
        .then(message => {
            if (message === "추가 성공") {
                alert(`"${bookTitle}"을(를) 장바구니에 추가했습니다.`);
                let userResponse = confirm("장바구니로 이동하시겠습니까?");
                if (userResponse) {
                    window.location.href = "/cart";  // 장바구니 페이지로 이동
                }
            } else {
                alert('장바구니 추가에 실패했습니다.');
            }
        })
        .catch(error => console.error('에러:', error));

}

/*  찜 목록 추가  */
function singleWishListBtn(button) {
    // 클릭된 버튼의 상위 요소에서 book-item 클래스를 가진 요소를 찾습니다.
    const bookItem = button.closest('.book-item');

    if (!bookItem) {
        console.error("bookItem 요소를 찾을 수 없습니다.");
        return;
    }

    // data-book-no 속성에서 bookNo 가져오기
    const bookNo = parseInt(bookItem.getAttribute('data-book-no'), 10);

    if (isNaN(bookNo)) {
        console.error("유효한 bookNo를 찾을 수 없습니다.");
        return;
    }

    // 책 제목을 알림에 표시
    const bookTitleElement = bookItem.querySelector('.book-detail-header-name');
    const bookTitle = bookTitleElement ? bookTitleElement.textContent.trim() : '제목 없음';

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
                window.location.reload();   
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
                            window.location.reload();   
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




/* 찜목록 추가 끝 */








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

// "바로구매" 버튼 클릭 이벤트 리스너 추가
// "바로구매" 버튼 클릭 이벤트 리스너 추가


