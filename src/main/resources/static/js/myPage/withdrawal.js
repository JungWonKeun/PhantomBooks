let canvas, ctx;
let isDrawing = false;
let lastX = 0;
let lastY = 0;

document.addEventListener('DOMContentLoaded', function() {
	try {
		initializeCanvas();
		setupModalEvents();
	} catch (error) {
		console.error('초기화 중 오류 발생:', error);
	}
});

function initializeCanvas() {
	console.log('캔버스 초기화 시작');
	canvas = document.getElementById('signatureCanvas');
	if (!canvas) {
		console.error('캔버스 엘리먼트를 찾을 수 없습니다.');
		return;
	}
	ctx = canvas.getContext('2d');
	
	canvas.width = 400;
	canvas.height = 150;
	
	ctx.strokeStyle = '#000';
	ctx.lineWidth = 2;
	ctx.lineCap = 'round';

	canvas.addEventListener('mousedown', startDrawing);
	canvas.addEventListener('mousemove', draw);
	canvas.addEventListener('mouseup', stopDrawing);
	canvas.addEventListener('mouseout', stopDrawing);
}

function setupModalEvents() {
	console.log('모달 이벤트 설정 시작');
	const modal = document.getElementById('withdrawalModal');
	const withdrawalBtn = document.querySelector('.withdrawal-btn');
	const cancelBtn = document.getElementById('cancelWithdrawal');
	const confirmBtn = document.getElementById('confirmWithdrawal');
	const clearBtn = document.getElementById('clearSignature');
	
	if (!modal || !withdrawalBtn || !cancelBtn || !confirmBtn || !clearBtn) {
		console.error('필요한 엘리먼트를 찾을 수 없습니다.');
		return;
	}
	
	withdrawalBtn.onclick = () => modal.style.display = 'block';
	cancelBtn.onclick = () => {
		modal.style.display = 'none';
		clearCanvas();
	}
	clearBtn.onclick = clearCanvas;

	confirmBtn.onclick = processWithdrawal;
}

async function processWithdrawal() {
	const password = document.getElementById('password').value;

	if (!password) {
		alert('비밀번호를 입력해주세요.');
		return;
	}

	if (isCanvasBlank()) {
		alert('서명을 해주세요.');
		return;
	}

	try {
		const response = await fetch('/myPage/withdrawalProcess', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ password: password })
		});

		if (response.ok) {
			alert('회원 탈퇴가 완료되었습니다.');
			location.href = '/member/logout';
		} else {
			const error = await response.text();
			alert(error || '비밀번호가 일치하지 않습니다.');
		}
	} catch (error) {
		alert('서버 통신 중 오류가 발생했습니다.');
	}
}

function startDrawing(e) {
	isDrawing = true;
	[lastX, lastY] = [e.offsetX, e.offsetY];
}

function draw(e) {
	if (!isDrawing) return;
	ctx.beginPath();
	ctx.moveTo(lastX, lastY);
	ctx.lineTo(e.offsetX, e.offsetY);
	ctx.stroke();
	[lastX, lastY] = [e.offsetX, e.offsetY];
}

function stopDrawing() {
	isDrawing = false;
}

function clearCanvas() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function isCanvasBlank() {
	const blank = document.createElement('canvas');
	blank.width = canvas.width;
	blank.height = canvas.height;
	return canvas.toDataURL() === blank.toDataURL();
}