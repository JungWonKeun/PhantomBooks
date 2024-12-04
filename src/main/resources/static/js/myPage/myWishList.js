document.addEventListener('DOMContentLoaded', function() {
    const selectAllCheckbox = document.getElementById('selectAll');
    const deleteSelectedBtn = document.getElementById('deleteSelected');
    const wishCheckboxes = document.querySelectorAll('.wish-checkbox');

    // 전체 선택 체크박스 이벤트
    selectAllCheckbox.addEventListener('change', function() {
        wishCheckboxes.forEach(checkbox => {
            checkbox.checked = this.checked;
        });
        updateDeleteButtonState();
    });

    // 개별 체크박스 이벤트
    wishCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            updateSelectAllCheckbox();
            updateDeleteButtonState();
        });
    });

    // 선택 삭제 버튼 이벤트
    deleteSelectedBtn.addEventListener('click', async function() {
        if(!confirm('선택한 항목을 삭제하시겠습니까?')) return;

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

            if(response.ok) {
                // 삭제 성공 시 페이지 새로고침
                location.reload();
            } else {
                throw new Error('삭제 실패');
            }
        } catch(error) {
            console.error('Error:', error);
            alert('삭제 중 오류가 발생했습니다.');
        }
    });

    // 삭제 버튼 상태 업데이트
    function updateDeleteButtonState() {
        const checkedCount = document.querySelectorAll('.wish-checkbox:checked').length;
        deleteSelectedBtn.disabled = checkedCount === 0;
    }

    // 전체 선택 체크박스 상태 업데이트
    function updateSelectAllCheckbox() {
        const totalCheckboxes = wishCheckboxes.length;
        const checkedCount = document.querySelectorAll('.wish-checkbox:checked').length;
        selectAllCheckbox.checked = totalCheckboxes === checkedCount;
        selectAllCheckbox.indeterminate = checkedCount > 0 && checkedCount < totalCheckboxes;
    }
});
