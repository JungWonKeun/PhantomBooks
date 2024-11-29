    // 팝업 요소
    const popup = document.getElementById("popup");
    const popupHeader = document.getElementById("popupHeader");
    const openPopupButton = document.getElementById("openPopup");
    const closePopupButton = document.getElementById("closePopup");

    let offsetX = 0;
    let offsetY = 0;
    let isDragging = false;

    // 팝업 열기
    openPopupButton.addEventListener("click", () => {
        popup.style.display = "block";
    });

    // 팝업 닫기
    closePopupButton.addEventListener("click", () => {
        popup.style.display = "none";
    });

    // 드래그 시작
    popupHeader.addEventListener("mousedown", (e) => {
        isDragging = true;
        offsetX = e.clientX - popup.offsetLeft;
        offsetY = e.clientY - popup.offsetTop;
        popupHeader.style.cursor = "grabbing";
    });

    // 드래그 중
    document.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        popup.style.left = `${e.clientX - offsetX}px`;
        popup.style.top = `${e.clientY - offsetY}px`;
    });

    // 드래그 종료
    document.addEventListener("mouseup", () => {
        isDragging = false;
        popupHeader.style.cursor = "grab";
    });