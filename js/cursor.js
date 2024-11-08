/* Cursor.js 
 * A fancy cursor for your website
 * GitHub: https:///www.github.com/0x4248/cursor.js
 * Licence: GNU General Public License v3.0
 * By: 0x4248
 */

let innerCursorPos = {
	x: 0,
	y: 0
};

let targetPos = {
	x: 0,
	y: 0
};

let tooltipEnabled = false;

let scrollTimer = null;

document.addEventListener('mousemove', (e) => {
	const cursor = document.querySelector('.cursor');
	if (!tooltipEnabled) {
		cursor.style.left = `${e.clientX}px`;
		cursor.style.top = `${e.clientY}px`;
	} else {
		cursor.style.left = `${e.clientX + 80}px`;
		cursor.style.top = `${e.clientY + 40}px`;
	}
	targetPos.x = e.clientX;
	targetPos.y = e.clientY;
});

document.querySelectorAll('a, button').forEach(el => {
	el.addEventListener('mouseover', () => {
		if (!tooltipEnabled) {
			document.querySelector('.cursor').classList.add('hover');
		}
		document.querySelector('.cursor-inner').classList.add('hover');
	});
	el.addEventListener('mouseleave', () => {
		document.querySelector('.cursor').classList.remove('hover');
		document.querySelector('.cursor-inner').classList.remove('hover');
	});
});

document.addEventListener('wheel', () => {
	if (!tooltipEnabled) {
		document.querySelector('.cursor').classList.add('scroll');
		document.querySelector('.cursor-inner').classList.add('scroll');
		clearTimeout(scrollTimer);
		scrollTimer = setTimeout(() => {
			document.querySelector('.cursor').classList.remove('scroll');
			document.querySelector('.cursor-inner').classList.remove('scroll');
		}, 150);
	}
});

document.addEventListener('mousedown', () => {
	document.querySelector('.cursor').classList.add('clicked');
	document.querySelector('.cursor-inner').classList.add('clicked');
});

document.addEventListener('mouseup', () => {
	document.querySelector('.cursor').classList.remove('clicked');
	document.querySelector('.cursor-inner').classList.remove('clicked');
});

window.addEventListener('wheel', (e) => {
	if (e.deltaY > 0) {
		innerCursorPos.y += 2;
	} else {
		innerCursorPos.y -= 2;
	}
});

async function updateInnerCursor() {
	const cursorInner = document.querySelector('.cursor-inner');
	const dx = (targetPos.x - innerCursorPos.x) * 0.2;
	const dy = (targetPos.y - innerCursorPos.y) * 0.2;

	innerCursorPos.x += dx;
	innerCursorPos.y += dy;

	cursorInner.style.left = `${innerCursorPos.x}px`;
	cursorInner.style.top = `${innerCursorPos.y}px`;

	requestAnimationFrame(updateInnerCursor);
}

requestAnimationFrame(updateInnerCursor);

function showTooltip(text) {
	const cursor = document.querySelector('.cursor');
	cursor.classList.add('tooltip');
	cursor.innerHTML = text;
	tooltipEnabled = true;
}

function hideTooltip() {
	const cursor = document.querySelector('.cursor');
	cursor.classList.remove('tooltip');
	cursor.innerHTML = '';
	tooltipEnabled = false;
	innerCursorPos = {
		x: targetPos.x,
		y: targetPos.y
	};

	cursor.style.left = `${targetPos.x}px`;
	cursor.style.top = `${targetPos.y}px`;
}

function updateTooltip(text) {
	const cursor = document.querySelector('.cursor');
	cursor.innerHTML = text;
}

function logVersion() {
	fetch('/api/version.json')
		.then(response => response.json())
		.then(data => console.log(`Cursor.js loaded with version ${data.version}`))
		.catch(error => console.error('Error fetching version:', error));
}

logVersion();
