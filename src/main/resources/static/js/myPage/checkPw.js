// 내 정보 페이지 오픈 및 닫기
document.addEventListener('DOMContentLoaded', function () {
  const openBtn = document.getElementById("openBtn");
  const closeBtn = document.getElementById("closeBtn");
  const menus = document.querySelectorAll('.menu');

  // 각 메뉴 클릭 시 active 상태 토글
  menus.forEach(menu => {
    menu.addEventListener('click', function () {
      this.classList.toggle('active');
    });
  });

  // 모두 열기 버튼 클릭
  openBtn.addEventListener("click", () => {
    openBtn.style.display = "none";
    closeBtn.style.display = "inline-block";
    menus.forEach(menu => {
      menu.classList.add("active");
    });
  });

  // 모두 닫기 버튼 클릭
  closeBtn.addEventListener("click", () => {
    openBtn.style.display = "inline-block";
    closeBtn.style.display = "none";
    menus.forEach(menu => {
      menu.classList.remove("active");
    });
  });
});

document.getElementById('checkPwForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const password = document.getElementById('memberPw').value;
    
    try {
        const response = await fetch('/myPage/checkPassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password: password })
        });

        if (response.ok) {
            window.location.href = '/myPage/info';
        } else {
            alert('비밀번호가 일치하지 않습니다.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('오류가 발생했습니다. 다시 시도해주세요.');
    }
}); 