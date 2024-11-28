document.addEventListener('DOMContentLoaded', function() {
    initializeMyPage();
    initializeAnimations();
});

function initializeMyPage() {
    // 각 섹션의 데이터 로딩
    loadRecentPurchases();
    loadRecentReviews();
    loadWishlist();
    loadInquiries();
    
    // 더보기 버튼 이벤트 리스너 추가
    initializeMoreButtons();
}

function initializeAnimations() {
    // 카드 등장 애니메이션
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

function initializeMoreButtons() {
    const moreButtons = document.querySelectorAll('.more-btn');
    moreButtons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.gap = '0.5rem';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.gap = '0.3rem';
        });
    });
}

// AJAX 데이터 로딩 함수들
function loadRecentPurchases() {
    fetch('/api/mypage/recent-purchases')
        .then(response => response.json())
        .then(data => {
            updatePurchasesList(data);
        })
        .catch(error => {
            console.error('구매 내역 로딩 실패:', error);
        });
}

function loadRecentReviews() {
    fetch('/api/mypage/recent-reviews')
        .then(response => response.json())
        .then(data => {
            updateReviewsList(data);
        })
        .catch(error => {
            console.error('리뷰 로딩 실패:', error);
        });
}

function loadWishlist() {
    fetch('/api/mypage/wishlist')
        .then(response => response.json())
        .then(data => {
            updateWishlist(data);
        })
        .catch(error => {
            console.error('찜 목록 로딩 실패:', error);
        });
}

function loadInquiries() {
    fetch('/api/mypage/recent-inquiries')
        .then(response => response.json())
        .then(data => {
            updateInquiriesList(data);
        })
        .catch(error => {
            console.error('문의 내역 로딩 실패:', error);
        });
}

// 데이터 업데이트 함수들
function updatePurchasesList(data) {
    const container = document.querySelector('.purchase-history .summary-list');
    if (!container) return;
    
    if (data.length === 0) {
        container.innerHTML = '<p class="empty-message">최근 구매 내역이 없습니다.</p>';
        return;
    }
    
    container.innerHTML = data.map(purchase => `
        <div class="summary-item">
            <span>${purchase.orderDate}</span>
            <span>${purchase.bookTitle}</span>
        </div>
    `).join('');
}

// 나머지 업데이트 함수들도 비슷한 패턴으로 구현...
