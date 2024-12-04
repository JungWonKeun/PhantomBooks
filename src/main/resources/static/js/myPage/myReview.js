document.addEventListener('DOMContentLoaded', function() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    let currentPage = 1;

    loadMoreBtn?.addEventListener('click', async function() {
        currentPage++;
        try {
            const response = await fetch(`/myPage/myReview/more?page=${currentPage}`);
            const data = await response.json();
            
            if(data.reviews && data.reviews.length > 0) {
                const container = document.getElementById('reviewContainer');
                
                data.reviews.forEach(review => {
                    container.insertAdjacentHTML('beforeend', `
                        <div class="review-item">
                            <a href="/searchBookPage/bookDetail/${review.bookNo}" class="review-summary">
                                <div class="review-book-title">${review.bookTitle}</div>
                                <div class="review-detail">
                                    <div class="review-header">
                                        <div class="review-title">${review.reviewTitle}</div>
                                        <div class="review-score">
                                            <i class="fas fa-star"></i>
                                            <span>${review.reviewScore}</span>
                                        </div>
                                    </div>
                                    <div class="review-content">${review.reviewContent}</div>
                                </div>
                            </a>
                        </div>
                    `);
                });

                // 마지막 페이지에 도달하면 더보기 버튼 숨기기
                if(currentPage >= data.totalPages) {
                    loadMoreBtn.style.display = 'none';
                }
            }
        } catch(error) {
            console.error('Error loading more reviews:', error);
        }
    });
}); 