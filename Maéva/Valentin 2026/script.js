const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const questionBlock = document.getElementById('question-block');
const loadingScreen = document.getElementById('loading-screen');
const finalScreen = document.getElementById('final-screen');
const progressBar = document.getElementById('progress-bar');
const loadingText = document.getElementById('loading-text');

let yesScale = 1;
let phraseIdx = 0;
let isMusicStarted = false;
let player;

// 1. Chargement de l'API YouTube
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Cette fonction crée le lecteur après le téléchargement de l'API
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '0',
        width: '0',
        videoId: 'u_p62PqXpW0', // ID de Sailing - Rod Stewart
        playerVars: {
            'autoplay': 0,
            'controls': 0
        },
        events: {
            'onReady': onPlayerReady
        }
    });
}

function onPlayerReady(event) {
    // Le lecteur est prêt, mais on attend l'interaction pour jouer
}

// 2. Cœurs volants
setInterval(() => {
    const heart = document.createElement('div');
    heart.innerHTML = Math.random() > 0.5 ? '❤️' : '🤍';
    heart.className = 'floating-heart';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.top = '110vh';
    heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
    const duration = Math.random() * 3 + 4;
    heart.style.animation = `float ${duration}s linear forwards`;
    document.getElementById('hearts-bg').appendChild(heart);
    setTimeout(() => heart.remove(), duration * 1000);
}, 450);

// 3. Logique du bouton "NON" et musique
function moveNo() {
    // Lancer la musique au premier mouvement
    if (!isMusicStarted && player && player.playVideo) {
        player.playVideo();
        isMusicStarted = true;
    }

    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth - 50);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight - 50);
    
    noBtn.style.position = 'fixed';
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;

    yesScale += 0.25;
    yesBtn.style.transform = `scale(${yesScale})`;

    const phrasesNon = ["Non", "Vraiment ?", "Tu en es sûre ?", "Réfléchis bien...", "C'est ton dernier mot ?", "Mauvaise idée...", "Allez Maéva !", "Regarde le gros OUI !", "Dis OUI maintenant !"];
    noBtn.innerText = phrasesNon[phraseIdx];
    phraseIdx = (phraseIdx + 1) % phrasesNon.length;
}

noBtn.addEventListener('mouseover', moveNo);
noBtn.addEventListener('touchstart', (e) => { e.preventDefault(); moveNo(); });

// 4. Transition vers le chargement
yesBtn.addEventListener('click', () => {
    questionBlock.style.opacity = '0';
    setTimeout(() => {
        questionBlock.classList.add('hidden');
        loadingScreen.classList.remove('hidden');
        loadingScreen.classList.add('fade-in');
        startLoading();
    }, 500);
});

function startLoading() {
    let progress = 0;
    const phrasesLoading = ["Chargement des souvenirs...", "Accordage de Rod Stewart...", "Calcul des bisous...", "Magie en cours..."];
    const interval = setInterval(() => {
        progress += 0.7;
        progressBar.style.width = progress + '%';
        
        if (Math.floor(progress) % 25 === 0) {
            loadingText.innerText = phrasesLoading[Math.floor(progress/25) % phrasesLoading.length];
        }

        if (progress >= 100) {
            clearInterval(interval);
            showFinal();
        }
    }, 40);
}

function showFinal() {
    loadingScreen.style.opacity = '0';
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        finalScreen.classList.remove('hidden');
        finalScreen.classList.add('fade-in');
    }, 600);
}