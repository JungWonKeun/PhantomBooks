// 전체 선택 또는 선택 해제 기능을 구현하는 함수
function ifChecked(action) {
  // 모든 체크박스 요소를 가져옵니다.
  const checkboxes = document.querySelectorAll('.book-checkbox');
  
  if (action === 'all') {
    // 현재 체크된 체크박스 개수와 전체 체크박스 개수를 계산.
    const totalCheckboxes = checkboxes.length;
    const checkedCount = Array.from(checkboxes).filter(checkbox => checkbox.checked).length;

    if (checkedCount === 0) {
      // 모든 체크박스가 선택되지 않은 경우: 전체를 체크합니다.
      checkboxes.forEach(checkbox => checkbox.checked = true);
    } else if (checkedCount === totalCheckboxes) {
      // 모든 체크박스가 선택된 경우: 전체 선택 해제합니다.
      checkboxes.forEach(checkbox => checkbox.checked = false);
    } else {
      // 일부만 선택된 경우: 선택되지 않은 것만 체크합니다.
      checkboxes.forEach(checkbox => {
        if (!checkbox.checked) {
          checkbox.checked = true;
        }
      });
    }
  }
}


