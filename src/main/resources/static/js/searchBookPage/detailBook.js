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

        

            wrap.addEventListener('mouseleave', () => {
                starIcon.style.opacity = '1';
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
// 작성용 별점 처리시작 
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
            if(response.ok) return response.text(); // JSON 응답 처리
            throw new Error("서버 오류 발생!");
            
        })
        .then((data) => {
            if (data) {
                alert('리뷰 작성 성공!');
                location.reload(); // 페이지 새로고침
            } else {
                alert('리뷰 작성 실패!');
            }
        })
        .catch(err => {
            console.error(err);
        });
});


  





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


/*
    삭제 버튼 클릭 시
const delBtn = document.querySelector('.deleteReview').addEventListener('click', () => {
    if (confirm("삭제하시겠습니까?")) {

    })
 */