let initialCategoryState = new Set();
let initialPreferenceState = new Set();

function saveInitialState() {
  initialCategoryState = new Set(
    Array.from(document.querySelectorAll('.category-checkbox:checked')).map(input => input.value)
  );
  initialPreferenceState = new Set(
    Array.from(document.querySelectorAll('.preference-checkbox:checked')).map(input => input.value)
  );
}

function hasUnsavedChanges() {
  const currentCategoryState = new Set(
    Array.from(document.querySelectorAll('.category-checkbox:checked')).map(input => input.value)
  );
  const currentPreferenceState = new Set(
    Array.from(document.querySelectorAll('.preference-checkbox:checked')).map(input => input.value)
  );

  return JSON.stringify([...currentCategoryState]) !== JSON.stringify([...initialCategoryState]) ||
    JSON.stringify([...currentPreferenceState]) !== JSON.stringify([...initialPreferenceState]);
}

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





// document.addEventListener('DOMContentLoaded', function () {
//   const btnContainer = document.querySelector('.btn-container'); // 버튼 컨테이너 선택
//   const footer = document.querySelector('footer'); // 푸터 요소 선택
//   const scrollOffset = 10; // 위치 변경할 스크롤 값

//   function updateBtnContainerPosition() {
//     const footerOffsetTop = footer.getBoundingClientRect().top + window.scrollY; // 푸터의 절대 위치
//     const containerHeight = btnContainer.offsetHeight;
//     const maxTop = footerOffsetTop - containerHeight; // 푸터에 닿기 전의 위치

//     if (window.scrollY > scrollOffset) {
//       // 스크롤이 200px 넘었을 때
//       if (window.scrollY + 800 >= maxTop) {
//         // 푸터에 닿기 전에 멈추게 설정
//         btnContainer.style.position = 'absolute';
//         btnContainer.style.top = `${maxTop}px`; // 푸터 바로 위로 이동
//         btnContainer.style.right = '41%';
//       } else {
//         // 기본 고정 상태
//         btnContainer.style.position = 'fixed';
//         btnContainer.style.top = '800px';
//         btnContainer.style.right = '41%';
//       }
//     } else {
//       // 스크롤이 200px 이하일 때 기본 위치로 되돌리기
//       btnContainer.style.position = 'fixed';
//       btnContainer.style.right = '290px';
//       btnContainer.style.top = '220px';
//     }
//   }

//   window.addEventListener('scroll', updateBtnContainerPosition);
// });





// document.addEventListener('DOMContentLoaded', function () {
//   const stickyCards = document.querySelectorAll('.sticky-card'); // 모든 .sticky-card 요소 선택
//   const offset = 270; // 원하는 고정 위치
//   const footer = document.querySelector('footer'); // 푸터 요소 선택

//   function updateStickyCardPositions() {
//     stickyCards.forEach(card => {
//       const footerOffsetTop = footer.getBoundingClientRect().top + window.scrollY; // 푸터의 절대 위치
//       const cardHeight = card.offsetHeight;

//       if (window.scrollY > offset) {
//         const maxAllowedHeight = footerOffsetTop - window.scrollY - 55; // 푸터와 겹치기 전 가능한 최대 높이 계산

//         if (maxAllowedHeight < cardHeight) {
//           // 푸터에 닿기 전에 카드의 높이를 조정
//           card.style.height = `${maxAllowedHeight}px`;
//         } else {
//           // 기본 고정 상태
//           setSticky(card);
//         }
//       } else {
//         resetPosition(card);
//       }
//     });
//   }

//   function resetPosition(card) {
//     card.style.position = 'static';
//     card.style.width = ''; // 원래 넓이로 되돌리기
//     card.style.height = ''; // 원래 높이로 되돌리기
//   }

//   function setSticky(card) {
//     card.style.position = 'fixed';
//     card.style.top = '1px';
//     card.style.width = `${card.parentElement.offsetWidth * 0.6}px`; // 부모 요소 넓이의 45%로 설정
//     card.style.height = `${card.parentElement.offsetWidth}px`; // 부모 요소의 넓이에 비례한 유동적인 높이 설정
//   }

//   window.addEventListener('scroll', updateStickyCardPositions);
// });

document.addEventListener('DOMContentLoaded', function () {
  // DOM 요소 선택
  const categoryButtons = document.querySelectorAll('.category-container .preference');
  const preferenceButtons = document.querySelectorAll('.preference-container .preference');
  const categoryBadgeContainer = document.querySelector('.category-container .card-body');
  const preferenceBadgeContainer = document.querySelector('.preference-container .card-body');
  const categoryText = document.querySelector('.category-container .card-text');
  const preferenceText = document.querySelector('.preference-container .card-text');

  const plusCategoryButton = document.getElementById('plusCategory');
  const minusCategoryButton = document.getElementById('minusCategory');
  const plusPreferenceButton = document.getElementById('plusPreference');
  const minusPreferenceButton = document.getElementById('minusPreference');
  const allPlusButton = document.getElementById('allPlus');
  const allMinusButton = document.getElementById('allMinus');
  const loadCategoryButton = document.getElementById('loadCategory');
  const loadPreferenceButton = document.getElementById('loadPreference');

  const loadAllButton = document.getElementById('allLoad');

  // 버튼 스타일 토글 함수
  function toggleButtonStyle(button, isSelected) {
    if (isSelected) {
      button.classList.add('btn-primary', 'selected');
      button.classList.remove('btn-light');
    } else {
      button.classList.remove('btn-primary', 'selected');
      button.classList.add('btn-light');
    }
  }

  // 설명 텍스트 가시성 업데이트
  function updateTextVisibility(badgeContainer, textElement) {
    const badgeCount = badgeContainer.querySelectorAll('.badge').length;
    textElement.style.display = badgeCount > 0 ? 'none' : '';
  }

  // 배지 추가 및 제거
  function toggleBadge(button, badgeContainer, textElement) {
    const checkbox = button.querySelector('input[type="checkbox"]');
    const badgeText = button.querySelector('.checkbox-text').textContent.trim();
    const existingBadge = [...badgeContainer.querySelectorAll('.badge span:first-child')].find(
      span => span.textContent === badgeText
    );


    if (existingBadge) {
      existingBadge.closest('.badge').remove();
      toggleButtonStyle(button, false);
      if (checkbox) checkbox.checked = false;
    } else {
      const badge = document.createElement('span');
      badge.className = 'badge text-primary-emphasis ms-1 col-auto bg-primary-subtle gap-1 border border-primary-subtle rounded-pill';
      badge.innerHTML = `
        <span style="font-size: 18px;">${badgeText}</span>
        <svg class="bi ms-1 remove-badge" width="20" height="20">
          <use xlink:href="#x-circle-fill"></use>
        </svg>`;
      badgeContainer.appendChild(badge);
      toggleButtonStyle(button, true);
      if (checkbox) checkbox.checked = true;
    }

    updateTextVisibility(badgeContainer, textElement);
  }


  // 모두 담기
  function selectAll(buttons, badgeContainer, textElement) {
    buttons.forEach(button => {
      const checkbox = button.querySelector('input[type="checkbox"]');
      const badgeText = button.querySelector('.checkbox-text').textContent.trim();
      const existingBadge = [...badgeContainer.querySelectorAll('.badge span:first-child')].find(
        span => span.textContent === badgeText
      );

      if (!existingBadge) {
        const badge = document.createElement('span');
        badge.className = 'badge text-primary-emphasis ms-1 col-auto bg-primary-subtle gap-1 border border-primary-subtle rounded-pill';
        badge.innerHTML = `
          <span style="font-size: 18px;">${badgeText}</span>
          <svg class="bi ms-1 remove-badge" width="20" height="20">
            <use xlink:href="#x-circle-fill"></use>
          </svg>`;
        badgeContainer.appendChild(badge);
      }

      toggleButtonStyle(button, true);
      if (checkbox) checkbox.checked = true;
    });

    updateTextVisibility(badgeContainer, textElement);
  }

  // 모두 빼기
  function clearAll(buttons, badgeContainer, textElement) {
    badgeContainer.querySelectorAll('.badge').forEach(badge => badge.remove());
    buttons.forEach(button => {
      const checkbox = button.querySelector('input[type="checkbox"]');
      toggleButtonStyle(button, false);
      if (checkbox) checkbox.checked = false;
    });
    updateTextVisibility(badgeContainer, textElement);
  }

  // 데이터 동기화
  function syncButtonsWithData(buttons, badgeContainer, textElement, selectedValues) {
    buttons.forEach(button => {
      const checkbox = button.querySelector('input[type="checkbox"]');
      const buttonValue = Number(checkbox.value);

      if (selectedValues.includes(buttonValue)) {
        if (!button.classList.contains('btn-primary')) {
          toggleBadge(button, badgeContainer, textElement);
        }
      } else {
        if (button.classList.contains('btn-primary')) {
          toggleBadge(button, badgeContainer, textElement);
        }
      }
    });
  }

  // Load 카테고리 데이터
  function loadCategory() {
    return fetch('/myPage/loadCategory', { method: 'GET' })
      .then(response => response.ok ? response.json() : Promise.reject('Failed to load categories'))
      .then(data => {
        const selectedCategories = data.map(item => Number(item.categoryNo));
        syncButtonsWithData(categoryButtons, categoryBadgeContainer, categoryText, selectedCategories);
        return '카테고리 로드 성공';
      });
  }

  // Load 프리퍼런스 데이터
  function loadPreference() {
    return fetch('/myPage/loadPreference', { method: 'GET' })
      .then(response => response.ok ? response.json() : Promise.reject('Failed to load preferences'))
      .then(data => {
        const selectedPreferences = data.map(item => Number(item.preferenceNo));
        syncButtonsWithData(preferenceButtons, preferenceBadgeContainer, preferenceText, selectedPreferences);
        return '선호 취향 로드 성공';
      });
  }

  // 버튼 이벤트 리스너 등록
  categoryButtons.forEach(button => {
    // 버튼 전체에 대한 클릭 이벤트
    button.addEventListener('click', function(e) {
      // 라벨이나 체크박스를 클릭한 경우는 무시
      if (e.target.closest('.checkbox-label') || e.target.closest('input[type="checkbox"]')) {
        return;
      }
      toggleBadge(button, categoryBadgeContainer, categoryText);
    });

    // 라벨에 대한 클릭 이벤트
    const label = button.querySelector('.checkbox-label');
    if (label) {
      label.addEventListener('click', function(e) {
        e.stopPropagation(); // 이벤트 버블링 중지
        toggleBadge(button, categoryBadgeContainer, categoryText);
      });
    }
  });

  preferenceButtons.forEach(button => {
    // 버튼 전체에 대한 클릭 이벤트
    button.addEventListener('click', function(e) {
      // 라벨이나 체크박스를 클릭한 경우는 무시
      if (e.target.closest('.checkbox-label') || e.target.closest('input[type="checkbox"]')) {
        return;
      }
      toggleBadge(button, preferenceBadgeContainer, preferenceText);
    });

    // 라벨에 대한 클릭 이벤트
    const label = button.querySelector('.checkbox-label');
    if (label) {
      label.addEventListener('click', function(e) {
        e.stopPropagation(); // 이벤트 버블링 중지
        toggleBadge(button, preferenceBadgeContainer, preferenceText);
      });
    }
  });

  plusCategoryButton.addEventListener('click', () =>
    selectAll(categoryButtons, categoryBadgeContainer, categoryText)
  );

  minusCategoryButton.addEventListener('click', () =>
    clearAll(categoryButtons, categoryBadgeContainer, categoryText)
  );

  plusPreferenceButton.addEventListener('click', () =>
    selectAll(preferenceButtons, preferenceBadgeContainer, preferenceText)
  );

  minusPreferenceButton.addEventListener('click', () =>
    clearAll(preferenceButtons, preferenceBadgeContainer, preferenceText)
  );

  allPlusButton.addEventListener('click', () => {
    selectAll(categoryButtons, categoryBadgeContainer, categoryText);
    selectAll(preferenceButtons, preferenceBadgeContainer, preferenceText);
  });

  allMinusButton.addEventListener('click', () => {
    clearAll(categoryButtons, categoryBadgeContainer, categoryText);
    clearAll(preferenceButtons, preferenceBadgeContainer, preferenceText);
  });

  loadAllButton.addEventListener('click', () => {
    if (confirm('저장된 카테고리와 선호 취향을 불러오시겠습니까?')) {
      Promise.all([loadCategory(), loadPreference()])
        .catch(error => alert(error));
    }
  });

  loadCategoryButton.addEventListener('click', () => {
    if (confirm('저장된 카테고리를 불러오시겠습니까?')) {
      loadCategory()
        .catch(error => alert(error));
    }
  });

  loadPreferenceButton.addEventListener('click', () => {
    if (confirm('저장된 선호 취향을 불러오시겠습니까?')) {
      loadPreference()
        .catch(error => alert(error));
    }
  });

  // 배지 제거 이벤트
  document.addEventListener('click', event => {
    const target = event.target.closest('.remove-badge');
    if (target) {
      const badge = target.closest('.badge');
      const badgeText = badge.querySelector('span').textContent.trim();

      let buttons, badgeContainer, textElement;

      if (categoryBadgeContainer.contains(badge)) {
        buttons = categoryButtons;
        badgeContainer = categoryBadgeContainer;
        textElement = categoryText;
      } else if (preferenceBadgeContainer.contains(badge)) {
        buttons = preferenceButtons;
        badgeContainer = preferenceBadgeContainer;
        textElement = preferenceText;
      }

      buttons.forEach(button => {
        const checkbox = button.querySelector('input[type="checkbox"]');
        const buttonText = button.querySelector('.checkbox-text').textContent.trim();

        if (buttonText === badgeText) {
          toggleButtonStyle(button, false);
          if (checkbox) checkbox.checked = false;
        }
      });

      badge.remove();
      updateTextVisibility(badgeContainer, textElement);
    }
  });

  // 페이지 로드 시 초기 상태 저장
  Promise.all([loadCategory(), loadPreference()])
    .then(() => {
      console.log('데이터 자동 로드 완료');
      saveInitialState(); // 초기 상태 저장
    })
    .catch(error => {
      console.error('데이터 자동 로드 실패:', error);
    });

  // 초기 텍스트 가시성 업데이트
  updateTextVisibility(categoryBadgeContainer, categoryText);
  updateTextVisibility(preferenceBadgeContainer, preferenceText);


});




const saveCategoryButton = document.getElementById('saveCategory');
const savePreferenceButton = document.getElementById('savePreference');
const saveAllButton = document.getElementById('allSave');

function saveCategory(showAlert = true) {
  const checkedCategory = Array.from(document.querySelectorAll('.category-checkbox:checked')).map(input => input.value);

  console.log("체크된 카테고리", checkedCategory);

  return fetch('/myPage/saveCategory', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(checkedCategory),
  })
    .then(response => {
      if (response.ok) return response.text();
      throw new Error('Failed to save categories');
    })
    .then(result => {
      if (showAlert) {
        if (result === 'Success') alert('선호 카테고리가 성공적으로 저장되었습니다.');
        else alert('카테고리 저장에 실패했습니다.');
      }
      return result; // 전체 저장 버튼에서 사용
    })
    .catch(err => {
      console.error(err);
      if (showAlert) alert('선호 카테고리 저장 중 오류가 발생했습니다.');
      throw err;
    });
}

function savePreference(showAlert = true) {
  const checkedPreference = Array.from(document.querySelectorAll('.preference-checkbox:checked')).map(input => input.value);

  console.log("체크된 프리퍼런스", checkedPreference);

  return fetch('/myPage/savePreference', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(checkedPreference),
  })
    .then(response => {
      if (response.ok) return response.text();
      throw new Error('Failed to save preferences');
    })
    .then(result => {
      if (showAlert) {
        if (result === 'Success') alert('선호 취향이 성공적으로 저장되었습니다.');
        else alert('선호 취향 저장에 실패했습니다.');
      }
      return result; // 전체 저장 버튼에서 사용
    })
    .catch(err => {
      console.error(err);
      if (showAlert) alert('선호 취향 저장 중 오류가 발생했습니다.');
      throw err;
    });
}


saveCategoryButton.addEventListener('click', () => {
  if (confirm('선호 카테고리 저장하시겠습니까?') === false) return;
  saveCategory();
});

savePreferenceButton.addEventListener('click', () => {
  if (confirm('선호 취향 저장하시겠습니까?') === false) return;
  savePreference();
});

saveAllButton.addEventListener('click', async () => {
  if (confirm('전부 저장하시겠습니까?') === false) return;

  try {
    const [categoryResult, preferenceResult] = await Promise.all([
      saveCategory(false),
      savePreference(false)
    ]);

    if (categoryResult === 'Success' && preferenceResult === 'Success') {
      alert('모든 저장이 성공적으로 완료되었습니다.');
      saveInitialState();
    } else {
      alert('일부 저장이 실패했습니다.\n선호 카테고리 저장: ' + categoryResult + '\n선호 취향 저장: ' + preferenceResult);
    }
  } catch (err) {
    console.error(err);
    alert('저장 중 오류가 발생했습니다.');
  }
});

// beforeunload 이벤트 리스너
window.addEventListener('beforeunload', (event) => {
  if (hasUnsavedChanges()) {
    const message = '저장되지 않은 변경사항이 있습니다. 정말로 페이지를 떠나시겠습니까?';
    event.preventDefault();
    (event || window.event).returnValue = message;
    return message;
  }
});

// 배지 추가 시 애니메이션
function addBadgeWithAnimation(badge, container) {
  badge.style.opacity = '0';
  badge.style.transform = 'scale(0.8)';
  container.appendChild(badge);

  requestAnimationFrame(() => {
    badge.style.transition = 'all 0.3s ease';
    badge.style.opacity = '1';
    badge.style.transform = 'scale(1)';
  });
}

// 배지 제거 시 애니메이션
function removeBadgeWithAnimation(badge) {
  badge.style.transition = 'all 0.3s ease';
  badge.style.opacity = '0';
  badge.style.transform = 'scale(0.8)';

  setTimeout(() => badge.remove(), 300);
}


const btnContainer = document.querySelector('.btn-container');
const buttons = btnContainer.querySelectorAll('button');

// 버튼 컨테이너의 가로 길이에 맞춰 버튼 정렬
const resizeButtons = () => {
  let totalWidth = 0;

  buttons.forEach((button) => {
    totalWidth += button.offsetWidth + 10; // 버튼 너비와 간격(10px)
  });

  if (totalWidth > window.innerWidth * 0.9) {
    btnContainer.style.flexWrap = 'wrap';
  } else {
    btnContainer.style.flexWrap = 'nowrap';
  }
};

// 초기 호출 �� 윈도우 리사이즈 시 적용
resizeButtons();
window.addEventListener('resize', resizeButtons);

