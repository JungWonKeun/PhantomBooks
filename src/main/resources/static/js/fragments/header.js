document.addEventListener('DOMContentLoaded', function () {
  const urlParams = new URLSearchParams(window.location.search);
  const showLoginModal = urlParams.get('showLoginModal') === 'true';
  if (showLoginModal) {
    const modalLogin = new bootstrap.Modal(document.getElementById('modalLogin'), {});
    modalLogin.show();
  }
});
if (document.querySelector("#modalLogin form")) {
const modalLoginForm = document.querySelector("#modalLogin form");

modalLoginForm.addEventListener("submit", function (event) {
  event.preventDefault(); // 기본 폼 제출 동작을 막음

  const memberId = document.querySelector("input[name='memberId']").value;
  const memberPw = document.querySelector("input[name='memberPw']").value;


  fetch("/member/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "X-Requested-With": "XMLHttpRequest"
    },
    body: new URLSearchParams({
      memberId: memberId,
      memberPw: memberPw,
    })
  })
    .then(response => {
      if (!response.ok) {
        // 401 또는 기타 오류 상태일 때 오류 메시지 처리
        throw new Error("아이디 또는 비밀번호를 확인해주세요");
      }
      return response.json();  // JSON으로 파싱
    })
    .then(data => {
      const modalElement = document.getElementById("modalLogin");
      const modal = bootstrap.Modal.getInstance(modalElement);
      
      if (data.authority === 2) {  // authority 값이 2이면 관리자
        window.location.href = "/admin";
        return;
      }
      
      modal.hide();
      
      // URL에서 장바구니 리다이렉트 파라미터 확인
      const urlParams = new URLSearchParams(window.location.search);
      const fromCart = urlParams.get('fromCart') === 'true';

      if (fromCart) {
        window.location.href = '/cart'; // 장바구니 페이지로 리다이렉트
      } else if (data.categoryYn === 'N') {
        showPreferencePopup();
      } else {
        window.location.reload(); // categoryYn이 'N'이 아닐 때만 새로고침
      }
    })
    .catch(error => {
      alert(error.message);
      console.error("Error:", error);
    });

});
}

// 팝업 관련 함수들 추가
function showPreferencePopup() {
  const popupHtml = `
    <div class="popup-overlay" id="preferencePopup">
      <div class="popup-content">
        <h2>취향 조사 안내</h2>
        <p>고객님의 취향에 따른 도서 추천을 위한 취향 조사 페이지로 이동하시겠습니까?</p>
        
        <div class="checkbox-wrapper">
          <input type="checkbox" id="dontShowAgain">
          <label for="dontShowAgain">다시 보지 않기</label>
        </div>

        <div class="button-group">
          <button onclick="handleConfirm()" class="btn btn-primary">네</button>
          <button onclick="handleCancel()" class="btn btn-secondary">아니요</button>
        </div>
      </div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', popupHtml);
}

async function handleConfirm() {
  const dontShowAgain = document.getElementById('dontShowAgain').checked;
  
  if (dontShowAgain) {
    await updateCategoryYn();
  }
  
  window.location.href = '/myPage/preference';
}

async function handleCancel() {
  const dontShowAgain = document.getElementById('dontShowAgain').checked;
  
  if (dontShowAgain) {
    await updateCategoryYn();
  }
  
  const popup = document.getElementById('preferencePopup');
  popup.remove();
  window.location.reload(); // 팝업 닫은 후 새로고침
}

async function updateCategoryYn() {
  try {
    const response = await fetch('/member/updateCategoryYn', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error('카테고리 업데이트 실패');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('처리 중 오류가 발생했습니다.');
  }
}

// 장바구니 클릭 시 로그인 체크 함수
function checkLoginForCart() {
    alert("로그인 회원만 이용 가능합니다. 로그인 후 이용 바랍니다.");
    const modalLogin = new bootstrap.Modal(document.getElementById('modalLogin'));
    modalLogin.show();
}
