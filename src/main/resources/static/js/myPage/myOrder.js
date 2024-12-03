document.addEventListener("DOMContentLoaded", function () {
  let orderTotalPrice = 0;

  // 모든 금액을 더하기
  document.querySelectorAll(".total-price").forEach(priceElement => {
      const priceText = priceElement.textContent.replace(/,/g, ''); // 콤마 제거
      const price = parseInt(priceText, 10);
      if (!isNaN(price)) {
          orderTotalPrice += price;
      }
  });

  // 총 금액 업데이트
  const totalPriceElement = document.getElementById("orderTotalPrice");
  totalPriceElement.textContent = orderTotalPrice.toLocaleString() + "원"; // 콤마 추가
});