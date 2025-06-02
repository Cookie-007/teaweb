const IMAGE_COUNT = 5;

let currentIndex = 0;
let lastIndex = 0;
let sliderTimer = null;

const bannerImg = document.querySelector('#banner img');
const preview = document.getElementById('preview');

const fragment = document.createDocumentFragment();
for (let i = 0; i < IMAGE_COUNT; i++) {
    const dot = document.createElement('div');
    if (i === 0) dot.className = 'preview-active';
    fragment.appendChild(dot);
}
preview.appendChild(fragment);

function switchToImage(index) {
    currentIndex = (index + IMAGE_COUNT) % IMAGE_COUNT;
    bannerImg.src = `./img/banner${currentIndex + 1}.png`;

    preview.children[lastIndex].className = '';
    preview.children[currentIndex].className = 'preview-active';
    lastIndex = currentIndex;
}

function nextImage() {
    switchToImage(currentIndex + 1);
}

function startAutoPlay() {
    stopAutoPlay();
    sliderTimer = setInterval(nextImage, 3500);
}

function stopAutoPlay() {
    clearInterval(sliderTimer);
}

startAutoPlay();


Array.from(preview.children).forEach((dot, index) => {
    dot.addEventListener('mouseenter', () => {
        stopAutoPlay();
        switchToImage(index);
    });
    dot.addEventListener('mouseleave', startAutoPlay);
});

// 绑定全局控制
document.getElementById('banner').addEventListener('mouseenter', stopAutoPlay);
document.getElementById('banner').addEventListener('mouseleave', startAutoPlay);