document.addEventListener('DOMContentLoaded', function() {
    // 전역 변수 최소화
    const faqList = document.querySelector('.faq-list');
    const noticeBoard = document.querySelector('.notice-board');

    // 이벤트 위임을 사용한 FAQ 아코디언
    if (faqList) {
        faqList.addEventListener('click', function(e) {
            const title = e.target.closest('.faq-title');
            if (!title) return;

            const item = title.closest('.faq-item');
            const content = item.querySelector('.faq-content');
            
            // 이전 활성화된 항목 닫기
            const activeContent = faqList.querySelector('.faq-content.active');
            if (activeContent && activeContent !== content) {
                activeContent.classList.remove('active');
                activeContent.style.display = 'none';
            }

            // 현재 항목 토글
            content.style.display = content.style.display === 'block' ? 'none' : 'block';
            content.classList.toggle('active');
        });
    }

    // 데이터 로드 함수 최적화
    function loadFAQ() {
        fetch('/customer/faq')
            .then(response => response.json())
            .then(data => {
                if (!Array.isArray(data)) return;
                
                const fragment = document.createDocumentFragment();
                data.slice(0, 5).forEach(faq => { // 한 번에 5개만 표시
                    const faqItem = document.createElement('div');
                    faqItem.className = 'faq-item';
                    faqItem.innerHTML = `
                        <div class="faq-title">${faq.title}</div>
                        <div class="faq-content">${faq.content}</div>
                    `;
                    fragment.appendChild(faqItem);
                });
                
                if (faqList) faqList.appendChild(fragment);
            })
            .catch(console.error);
    }

    function loadNotices() {
        fetch('/customer/notice')
            .then(response => response.json())
            .then(data => {
                if (!Array.isArray(data)) return;
                
                const fragment = document.createDocumentFragment();
                data.slice(0, 5).forEach(notice => { // 한 번에 5개만 표시
                    const noticeItem = document.createElement('div');
                    noticeItem.className = 'notice-item';
                    noticeItem.innerHTML = `
                        <a href="/customer/notice/detail/${notice.noticeNo}" class="notice-link">
                            <span class="notice-title">${notice.title}</span>
                            <span class="notice-date">${new Date(notice.createDate).toLocaleDateString()}</span>
                        </a>
                    `;
                    fragment.appendChild(noticeItem);
                });
                
                if (noticeBoard) noticeBoard.appendChild(fragment);
            })
            .catch(console.error);
    }

    // 초기 데이터 로드
    loadFAQ();
    loadNotices();
});

function showTab(tabId) {
    // 모든 탭 컨텐츠 숨기기
    document.querySelectorAll('.tabContent').forEach(content => {
        content.classList.add('hidden');
    });
    
    // 모든 탭 버튼 비활성화
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // 선택된 탭 컨텐츠 보이기
    document.getElementById(tabId).classList.remove('hidden');
    
    // 선택된 탭 버튼 활성화
    document.querySelector(`.tab[onclick="showTab('${tabId}')"]`).classList.add('active');
}

// 페이지 로드 시 기본 탭 표시
document.addEventListener('DOMContentLoaded', () => {
    showTab('faq');  // 기본적으로 FAQ 탭 표시
});
  