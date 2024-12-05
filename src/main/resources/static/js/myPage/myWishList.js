document.addEventListener('DOMContentLoaded', function () {
    const selectAllCheckbox = document.getElementById('selectAll');
    const deleteSelectedBtn = document.getElementById('deleteSelected');
    const addToCartBtn = document.getElementById('addToCart');
    const wishCheckboxes = document.querySelectorAll('.wish-checkbox');

    // 체크박스 상태 변경 시 버튼 상태 업데이트
    function updateButtonStates() {
        const checkedBoxes = document.querySelectorAll('.wish-checkbox:checked');
        const checkedCount = checkedBoxes.length;

        deleteSelectedBtn.disabled = checkedCount === 0;
        addToCartBtn.disabled = checkedCount === 0;

        // 버튼 텍스트 업데이트
        if (checkedCount > 0) {
            deleteSelectedBtn.innerHTML = `<i class="fas fa-trash"></i> 선택 삭제 (${checkedCount})`;
            addToCartBtn.innerHTML = `<i class="fas fa-shopping-cart"></i> 장바구니 담기 (${checkedCount})`;
        } else {
            deleteSelectedBtn.innerHTML = `<i class="fas fa-trash"></i> 선택 삭제`;
            addToCartBtn.innerHTML = `<i class="fas fa-shopping-cart"></i> 장바구니 담기`;
        }
    }

    // 전체 선택 체크박스 이벤트
    selectAllCheckbox.addEventListener('change', function () {
        wishCheckboxes.forEach(checkbox => {
            checkbox.checked = this.checked;
        });
        updateButtonStates();
    });

    // 개별 체크박스 이벤트
    wishCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            updateSelectAllCheckbox();
            updateButtonStates();
        });
    });

    // 선택 삭제 버튼 이벤트
    deleteSelectedBtn.addEventListener('click', async function () {
        if (!confirm('선택한 항목을 삭제하시겠습니까?')) return;

        const selectedBookNos = Array.from(wishCheckboxes)
            .filter(cb => cb.checked)
            .map(cb => parseInt(cb.dataset.bookNo));

        try {
            const response = await fetch('/member/deleteWishlist', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(selectedBookNos)
            });

            if (response.ok) {
                // 삭제 성공 시 페이지 새로고침
                location.reload();
            } else {
                throw new Error('삭제 실패');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('삭제 중 오류가 발생했습니다.');
        }
    });

    // 장바구니 버튼 이벤트
    addToCartBtn.addEventListener('click', async function () {
        const selectedBookNos = Array.from(wishCheckboxes)
            .filter(cb => cb.checked)
            .map(cb => parseInt(cb.dataset.bookNo));

        if (selectedBookNos.length === 0) {
            alert("책을 선택해 주세요.");
            return;
        }

        try {
            const response = await fetch("/searchBookPage/addCart", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ bookNo: selectedBookNos })
            });

            if (response.ok) {
                alert(`${selectedBookNos.length}개의 책을 장바구니에 추가하였습니다.`);
                let userResponse = confirm("장바구니로 이동하시겠습니까?");
                if (userResponse) {
                    window.location.href = "/cart";
                }
            } else {
                throw new Error("장바구니 추가에 실패했습니다.");
            }
        } catch (error) {
            alert(error.message);
        }
    });

    // 전체 선택 체크박스 상태 업데이트
    function updateSelectAllCheckbox() {
        const totalCheckboxes = wishCheckboxes.length;
        const checkedCount = document.querySelectorAll('.wish-checkbox:checked').length;
        selectAllCheckbox.checked = totalCheckboxes === checkedCount;
        selectAllCheckbox.indeterminate = checkedCount > 0 && checkedCount < totalCheckboxes;
    }

    // 하트 버튼 클릭 이벤트
    document.querySelectorAll('.book-heart').forEach(heart => {
        heart.addEventListener('click', async function (e) {
            e.preventDefault(); // 상위 링크로의 이벤트 전파 방지
            e.stopPropagation(); // 이벤트 버블링 방지

            const bookNo = this.dataset.bookNo;

            if (!confirm('찜 목록에서 삭제하시겠습니까?')) return;

            try {
                const response = await fetch('/member/deleteWishlist', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify([parseInt(bookNo)])
                });

                if (response.ok) {
                    // 삭제 성공 시 해당 아이템 요소 제거
                    const wishlistItem = this.closest('.wishlist-item');
                    wishlistItem.remove();

                    // 페이지 새로고침
                    location.reload();
                } else {
                    throw new Error('삭제 실패');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('삭제 중 오류가 발생했습니다.');
            }
        });
    });
});
