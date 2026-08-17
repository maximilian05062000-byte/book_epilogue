// First 20 Split Background Carousel Pairs
const artImages = [
    'images/' + encodeURIComponent('photo_2026-08-13_20-18-39_акварель.png'),
    'images/' + encodeURIComponent('photo_2026-08-13_20-19-34_акварель.png'),
    'images/' + encodeURIComponent('photo_2026-08-13_20-19-41_акварель.png'),
    'images/' + encodeURIComponent('photo_2026-08-13_20-19-44_акварель.png'),
    'images/' + encodeURIComponent('photo_2026-08-13_20-19-47_акварель.png'),
    'images/' + encodeURIComponent('photo_2026-08-13_20-19-49_акварель.png'),
    'images/' + encodeURIComponent('photo_2026-08-13_20-19-52_акварель.png'),
    'images/' + encodeURIComponent('photo_2026-08-13_20-19-57_акварель.png'),
    'images/' + encodeURIComponent('photo_2026-08-14_14-46-49_акварель.png'),
    'images/' + encodeURIComponent('photo_2026-08-14_14-46-53_акварель.png'),
    'images/' + encodeURIComponent('photo_2026-08-14_14-46-56_акварель.png'),
    'images/' + encodeURIComponent('photo_2026-08-14_14-46-58_акварель.png'),
    'images/' + encodeURIComponent('photo_2026-08-14_14-47-03_акварель.png'),
    'images/' + encodeURIComponent('photo_2026-08-14_wedding_ring_акварель.png'),
    'images/' + encodeURIComponent('chika_left_акварель.png'),
    'images/' + encodeURIComponent('1-арт.png'),
    'images/' + encodeURIComponent('2-арт.png'),
    'images/' + encodeURIComponent('3-арт.png'),
    'images/' + encodeURIComponent('4-арт.png'),
    'images/' + encodeURIComponent('5-арт.png')
];

const realImages = [
    'images/' + encodeURIComponent('photo_2026-08-13_20-18-39.jpg'),
    'images/' + encodeURIComponent('photo_2026-08-13_20-19-34.jpg'),
    'images/' + encodeURIComponent('photo_2026-08-13_20-19-41.jpg'),
    'images/' + encodeURIComponent('photo_2026-08-13_20-19-44.jpg'),
    'images/' + encodeURIComponent('photo_2026-08-13_20-19-47.jpg'),
    'images/' + encodeURIComponent('photo_2026-08-13_20-19-49.jpg'),
    'images/' + encodeURIComponent('photo_2026-08-13_20-19-52.jpg'),
    'images/' + encodeURIComponent('photo_2026-08-13_20-19-57.jpg'),
    'images/' + encodeURIComponent('photo_2026-08-14_14-46-49.jpg'),
    'images/' + encodeURIComponent('photo_2026-08-14_14-46-53.jpg'),
    'images/' + encodeURIComponent('photo_2026-08-14_14-46-56.jpg'),
    'images/' + encodeURIComponent('photo_2026-08-14_14-46-58.jpg'),
    'images/' + encodeURIComponent('photo_2026-08-14_14-47-03.jpg'),
    'images/' + encodeURIComponent('photo_2026-08-14_wedding_ring.jpg'),
    'images/' + encodeURIComponent('chika_right.png'),
    'images/' + encodeURIComponent('1.png'),
    'images/' + encodeURIComponent('2.jpg'),
    'images/' + encodeURIComponent('3.jpg'),
    'images/' + encodeURIComponent('4.png'),
    'images/' + encodeURIComponent('5.png')
];

let globalSlideIndex = 0;
const totalSlides = 21; // 20 split pairs + 1 full-screen cover climax

const artSlide1 = document.getElementById('art-slide-1');
const artSlide2 = document.getElementById('art-slide-2');
let activeArt = artSlide1;
let inactiveArt = artSlide2;

const realSlide1 = document.getElementById('real-slide-1');
const realSlide2 = document.getElementById('real-slide-2');
let activeReal = realSlide1;
let inactiveReal = realSlide2;

const fullCoverSlide = document.getElementById('full-cover-slide');
const splitBgContainer = document.getElementById('split-bg-container');

function updateSlideshow() {
    const currentIndex = globalSlideIndex % totalSlides;
    globalSlideIndex++;

    if (currentIndex === 20) {
        // 21ST CLIMAX SLIDE: Seamless Full-Screen Book Cover (0 Split Line)
        if (fullCoverSlide) fullCoverSlide.classList.add('active');
        if (splitBgContainer) splitBgContainer.classList.add('no-border');
    } else {
        // FIRST 20 SLIDES: Split 50/50 Pairs (Left Art <-> Right Real Photo)
        if (fullCoverSlide) fullCoverSlide.classList.remove('active');
        if (splitBgContainer) splitBgContainer.classList.remove('no-border');

        const nextArt = artImages[currentIndex % artImages.length];
        const nextReal = realImages[currentIndex % realImages.length];

        inactiveArt.style.backgroundImage = `url('${nextArt}')`;
        inactiveArt.classList.add('active');
        activeArt.classList.remove('active');
        const tempArt = activeArt;
        activeArt = inactiveArt;
        inactiveArt = tempArt;

        inactiveReal.style.backgroundImage = `url('${nextReal}')`;
        inactiveReal.classList.add('active');
        activeReal.classList.remove('active');
        const tempReal = activeReal;
        activeReal = inactiveReal;
        inactiveReal = tempReal;
    }
}

// Background Audio Engine for Nobuo Uematsu - Zanarkand
const audio = document.getElementById('bg-audio');
let isAudioPlaying = false;

function playAudio() {
    if (isAudioPlaying || !audio) return;
    audio.volume = 0.9;
    const playPromise = audio.play();
    if (playPromise !== undefined) {
        playPromise.then(() => {
            isAudioPlaying = true;
        }).catch(() => {});
    }
}

['click', 'touchstart', 'keydown'].forEach(evt => {
    document.addEventListener(evt, playAudio, { passive: true });
});

window.addEventListener('load', playAudio);

// GLOBAL HANDLERS (EXPLICIT & 100% RELIABLE)
window.startReading = function() {
    const welcomeOverlay = document.getElementById('welcome-overlay');
    if (welcomeOverlay) {
        welcomeOverlay.classList.add('hidden-overlay');
    }
    playAudio();
};

window.hideCard = function(e) {
    if (e && e.stopPropagation) e.stopPropagation();
    const epilogueCard = document.getElementById('epilogue-card');
    const showTextBtn = document.getElementById('show-text-btn');
    const vignette = document.querySelector('.bg-vignette');
    
    if (epilogueCard) epilogueCard.classList.add('card-hidden');
    if (showTextBtn) showTextBtn.classList.remove('hidden-restore');
    if (vignette) vignette.classList.add('vignette-clear');
};

window.showCard = function(e) {
    if (e && e.stopPropagation) e.stopPropagation();
    const epilogueCard = document.getElementById('epilogue-card');
    const showTextBtn = document.getElementById('show-text-btn');
    const vignette = document.querySelector('.bg-vignette');
    
    if (epilogueCard) epilogueCard.classList.remove('card-hidden');
    if (showTextBtn) showTextBtn.classList.add('hidden-restore');
    if (vignette) vignette.classList.remove('vignette-clear');
};

// Initialize Background Slideshow
updateSlideshow();
setInterval(updateSlideshow, 5000);
