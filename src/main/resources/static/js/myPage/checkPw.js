document.getElementById('checkPwForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const password = document.getElementById('memberPw').value;
    
    try {
        const response = await fetch('/myPage/checkPassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password: password })
        });

        if (response.ok) {
            window.location.href = '/myPage/info';
        } else {
            alert('비밀번호가 일치하지 않습니다.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('오류가 발생했습니다. 다시 시도해주세요.');
    }
}); 