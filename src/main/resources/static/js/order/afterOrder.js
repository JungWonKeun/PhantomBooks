document.addEventListener('DOMContentLoaded', () => {
  const rows = document.querySelectorAll('tbody tr');
  let totalPrice = 0;

  rows.forEach(row => {
      const count = parseInt(row.querySelector('td:nth-child(3)').textContent, 10) || 0;
      const price = parseInt(row.querySelector('td:nth-child(4)').textContent.replace(/[^\d]/g, ''), 10) || 0;
      totalPrice += count * price;
  });

  const deliveryFee = 3500;
  document.getElementById('totalPrice').textContent = totalPrice.toLocaleString() + ' 원';
  document.getElementById('totalPayment').textContent = (totalPrice + deliveryFee).toLocaleString() + ' 원';
});
