/* ══════════════════════════════════════════════════════════
   WEBSITE UNTUK EMELLYA AMANDA — script.js
   Full Interactive Features dengan Banyak Kejutan
   Dibuat dengan penuh cinta 💕
══════════════════════════════════════════════════════════ */

// ═══ STATE MANAGEMENT ═══
const State = {
  currentSection: 0,
  totalSections: 10,
  musicPlaying: false,
  quizScore: 0,
  quizCurrent: 1,
  envelopeOpened: false,
  giftOpened: false,
  fireworksActive: false
};

// ═══ INITIALIZATION ═══
document.addEventListener('DOMContentLoaded', () => {
  console.log('%c💕 Website untuk Emellya Amanda 💕', 'color:#ff85c0;font-size:20px;font-weight:bold;');
  console.log('%c Dibuat dengan penuh cinta untuk perpisahan SMP kita... 🌸', 'color:#ffb3d9;font-size:14px;font-style:italic;');
  
  initLoader();
  initBackgroundCanvas();
  initFloatingHearts();
  initFloatingPetals();
  initStars();
  initKeyboardNav();
  updateProgress();
});

// ═══ LOADER ═══
function initLoader() {
  const loader = document.getElementById('loaderScreen');
  const progress = document.getElementById('loaderProgress');
  
  let width = 0;
  const interval = setInterval(() => {
    if (width >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        loader.classList.add('hidden');
        // Auto play music setelah load
        setTimeout(autoPlayMusic, 500);
      }, 500);
    } else {
      width += 2;
      progress.style.width = width + '%';
    }
  }, 30);
}

function autoPlayMusic() {
  const music = document.getElementById('bgMusic');
  if (music) {
    music.volume = 0.5;
    music.play().then(() => {
      State.musicPlaying = true;
      syncMusicUI();
    }).catch(err => {
      console.log('Autoplay prevented. User needs to interact first.');
    });
  }
}

// ═══ BACKGROUND CANVAS ═══
function initBackgroundCanvas() {
  const canvas = document.getElementById('bgCanvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);
  
  const particles = [];
  const particleCount = 50;
  
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.5 + 0.3
    });
  }
  
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 181, 217, ${p.opacity})`;
      ctx.fill();
      
      p.x += p.speedX;
      p.y += p.speedY;
      
      if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
      if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
    });
    
    requestAnimationFrame(draw);
  }
  
  draw();
}

// ═══ FLOATING HEARTS ═══
function initFloatingHearts() {
  const container = document.getElementById('heartsContainer');
  if (!container) return;
  
  function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.textContent = ['💕', '💖', '💗', '💝', '💓', '❤️'][Math.floor(Math.random() * 6)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.fontSize = (Math.random() * 1 + 0.8) + 'rem';
    heart.style.animationDuration = (Math.random() * 10 + 15) + 's';
    heart.style.animationDelay = Math.random() * 5 + 's';
    
    container.appendChild(heart);
    
    setTimeout(() => heart.remove(), 25000);
  }
  
  // Create initial hearts
  for (let i = 0; i < 8; i++) {
    setTimeout(createHeart, i * 1000);
  }
  
  // Create continuously
  setInterval(createHeart, 3000);
}

// ═══ FLOATING PETALS ═══
function initFloatingPetals() {
  const container = document.getElementById('petalsContainer');
  if (!container) return;
  
  function createPetal() {
    const petal = document.createElement('div');
    petal.className = 'floating-petal';
    petal.textContent = ['🌸', '🌺', '🌼', '🌷', '🏵️'][Math.floor(Math.random() * 5)];
    petal.style.left = Math.random() * 100 + '%';
    petal.style.fontSize = (Math.random() * 1.2 + 0.9) + 'rem';
    petal.style.animationDuration = (Math.random() * 12 + 18) + 's';
    petal.style.animationDelay = Math.random() * 7 + 's';
    
    container.appendChild(petal);
    
    setTimeout(() => petal.remove(), 30000);
  }
  
  for (let i = 0; i < 6; i++) {
    setTimeout(createPetal, i * 1500);
  }
  
  setInterval(createPetal, 4000);
}

// ═══ STARS (Landing Page) ═══
function initStars() {
  const layer = document.getElementById('starsLayer');
  if (!layer) return;
  
  for (let i = 0; i < 50; i++) {
    const star = document.createElement('div');
    star.style.position = 'absolute';
    star.style.width = '2px';
    star.style.height = '2px';
    star.style.background = 'white';
    star.style.borderRadius = '50%';
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.animation = `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite`;
    star.style.animationDelay = Math.random() * 3 + 's';
    star.style.boxShadow = '0 0 4px rgba(255,255,255,0.8)';
    layer.appendChild(star);
  }
  
  // Add twinkle animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes twinkle {
      0%, 100% { opacity: 0.3; transform: scale(1); }
      50% { opacity: 1; transform: scale(1.5); }
    }
  `;
  document.head.appendChild(style);
}

// ═══ MUSIC CONTROL ═══
function toggleMusic() {
  const music = document.getElementById('bgMusic');
  if (!music) return;
  
  if (State.musicPlaying) {
    music.pause();
    State.musicPlaying = false;
  } else {
    music.play().then(() => {
      State.musicPlaying = true;
    }).catch(err => console.log('Play error:', err));
  }
  
  syncMusicUI();
}

function syncMusicUI() {
  const playIcon = document.getElementById('playIcon');
  const pauseIcon = document.getElementById('pauseIcon');
  const wave = document.getElementById('musicWave');
  const label = document.getElementById('musicLabel');
  
  if (State.musicPlaying) {
    playIcon.style.display = 'none';
    pauseIcon.style.display = 'block';
    wave.classList.remove('paused');
    label.textContent = 'Sedang Diputar ♪';
  } else {
    playIcon.style.display = 'block';
    pauseIcon.style.display = 'none';
    wave.classList.add('paused');
    label.textContent = 'Putar Musik ♪';
  }
}

// ═══ SECTION NAVIGATION ═══
function startJourney() {
  // Ensure music is playing
  if (!State.musicPlaying) {
    const music = document.getElementById('bgMusic');
    if (music) {
      music.play().then(() => {
        State.musicPlaying = true;
        syncMusicUI();
      }).catch(err => {});
    }
  }
  
  goToSection(1);
  createCelebrationBurst();
}

function goToSection(n) {
  if (n < 0 || n >= State.totalSections) return;
  
  // Hide all sections
  document.querySelectorAll('.section').forEach(sec => {
    sec.classList.remove('active');
  });
  
  // Show target section
  const target = document.getElementById('section' + n);
  if (target) {
    target.classList.add('active');
    State.currentSection = n;
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    updateProgress();
    triggerSectionEffects(n);
  }
}

function nextSection() {
  goToSection(State.currentSection + 1);
}

function prevSection() {
  goToSection(State.currentSection - 1);
}

function triggerSectionEffects(n) {
  if (n === 4) resetEnvelope();
  if (n === 5) createSparkles(100);
  if (n === 6) resetQuiz();
  if (n === 8) resetGift();
  if (n === 9) {
    createFinaleHearts();
    setTimeout(() => launchFireworks(), 1000);
  }
}

function updateProgress() {
  const percent = (State.currentSection / (State.totalSections - 1)) * 100;
  const fill = document.getElementById('progressFill');
  const text = document.getElementById('progressText');
  
  if (fill) fill.style.width = percent + '%';
  if (text) text.textContent = Math.round(percent) + '%';
}

function initKeyboardNav() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') nextSection();
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') prevSection();
  });
}

function restartJourney() {
  State.quizScore = 0;
  State.quizCurrent = 1;
  State.envelopeOpened = false;
  State.giftOpened = false;
  goToSection(0);
  createCelebrationBurst();
}

// ═══ ENVELOPE ═══
function resetEnvelope() {
  if (State.envelopeOpened) return;
  
  const env = document.getElementById('envelope');
  const scene = document.getElementById('envelopeScene');
  const letter = document.getElementById('letterWrap');
  
  if (env) {
    env.classList.remove('open');
    env.style.cursor = 'pointer';
  }
  if (scene) scene.style.display = 'block';
  if (letter) letter.style.display = 'none';
}

function openEnvelope() {
  if (State.envelopeOpened) return;
  
  State.envelopeOpened = true;
  const env = document.getElementById('envelope');
  env.classList.add('open');
  env.style.cursor = 'default';
  
  // Heart burst effect
  createHeartBurst(env);
  
  // Show letter after animation
  setTimeout(() => {
    document.getElementById('envelopeScene').style.display = 'none';
    document.getElementById('letterWrap').style.display = 'block';
    createSparkles(60);
  }, 1200);
}

function createHeartBurst(element) {
  const rect = element.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  
  for (let i = 0; i < 30; i++) {
    const heart = document.createElement('div');
    heart.textContent = ['💕', '💖', '💗', '💝'][Math.floor(Math.random() * 4)];
    heart.style.cssText = `
      position: fixed;
      left: ${centerX}px;
      top: ${centerY}px;
      font-size: ${Math.random() * 20 + 15}px;
      pointer-events: none;
      z-index: 10000;
    `;
    
    document.body.appendChild(heart);
    
    const angle = (Math.PI * 2 * i) / 30;
    const velocity = Math.random() * 6 + 3;
    let x = 0, y = 0, opacity = 1;
    
    const animate = () => {
      x += Math.cos(angle) * velocity;
      y += Math.sin(angle) * velocity + (y / 50);
      opacity -= 0.02;
      
      heart.style.transform = `translate(${x}px, ${y}px) rotate(${x * 2}deg)`;
      heart.style.opacity = opacity;
      
      if (opacity > 0) {
        requestAnimationFrame(animate);
      } else {
        heart.remove();
      }
    };
    
    requestAnimationFrame(animate);
  }
}

// ═══ QUIZ ═══
function resetQuiz() {
  State.quizScore = 0;
  State.quizCurrent = 1;
  
  document.querySelectorAll('.quiz-card').forEach((card, i) => {
    card.classList.toggle('active', i === 0);
    card.querySelectorAll('.q-opt').forEach(opt => {
      opt.classList.remove('correct', 'wrong');
      opt.disabled = false;
    });
  });
  
  const result = document.getElementById('quizResult');
  if (result) result.style.display = 'none';
  
  updateQuizProgress(0);
}

function updateQuizProgress(answered) {
  const percent = (answered / 5) * 100;
  const bar = document.getElementById('quizBar');
  const label = document.getElementById('quizLabel');
  
  if (bar) bar.style.width = percent + '%';
  if (label) label.textContent = answered + ' / 5';
}

function answerQuiz(qNum, isCorrect, btn) {
  const card = document.getElementById('quiz' + qNum);
  const options = card.querySelectorAll('.q-opt');
  
  // Disable all options
  options.forEach(opt => opt.disabled = true);
  
  if (isCorrect) {
    btn.classList.add('correct');
    State.quizScore++;
    createSparklesBurst(btn);
  } else {
    btn.classList.add('wrong');
    // Show correct answer
    setTimeout(() => {
      options.forEach(opt => {
        const onclick = opt.getAttribute('onclick');
        if (onclick && onclick.includes('true')) {
          opt.classList.add('correct');
        }
      });
    }, 600);
  }
  
  updateQuizProgress(qNum);
  
  // Move to next question or show result
  setTimeout(() => {
    if (qNum < 5) {
      card.classList.remove('active');
      const next = document.getElementById('quiz' + (qNum + 1));
      if (next) next.classList.add('active');
    } else {
      setTimeout(showQuizResult, 1000);
    }
  }, 1800);
}

function createSparklesBurst(element) {
  const rect = element.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  
  for (let i = 0; i < 15; i++) {
    const sparkle = document.createElement('div');
    sparkle.textContent = ['✨', '⭐', '💫', '✦'][Math.floor(Math.random() * 4)];
    sparkle.style.cssText = `
      position: fixed;
      left: ${centerX}px;
      top: ${centerY}px;
      font-size: 20px;
      pointer-events: none;
      z-index: 10000;
    `;
    
    document.body.appendChild(sparkle);
    
    const angle = (Math.PI * 2 * i) / 15;
    let distance = 0;
    let opacity = 1;
    
    const animate = () => {
      distance += 5;
      opacity -= 0.025;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;
      
      sparkle.style.transform = `translate(${x}px, ${y}px) rotate(${distance * 3}deg)`;
      sparkle.style.opacity = opacity;
      
      if (opacity > 0) {
        requestAnimationFrame(animate);
      } else {
        sparkle.remove();
      }
    };
    
    requestAnimationFrame(animate);
  }
}

function showQuizResult() {
  document.querySelectorAll('.quiz-card').forEach(c => c.classList.remove('active'));
  
  const result = document.getElementById('quizResult');
  result.style.display = 'block';
  
  const emoji = document.getElementById('qrEmoji');
  const score = document.getElementById('qrScore');
  const stars = document.getElementById('qrStars');
  const message = document.getElementById('qrMessage');
  
  score.textContent = State.quizScore + '/5';
  
  if (State.quizScore === 5) {
    emoji.textContent = '🎉';
    stars.textContent = '⭐⭐⭐⭐⭐';
    message.textContent = 'WOW! Kamu benar-benar mengenalku dengan sempurna! Aku sangat tersentuh dan bahagia... 💖';
    createMassiveFireworks();
  } else if (State.quizScore === 4) {
    emoji.textContent = '😊';
    stars.textContent = '⭐⭐⭐⭐';
    message.textContent = 'Hebat! Kamu mengenalku dengan sangat baik! Hanya sedikit yang terlewat, tapi tidak apa-apa!';
    createConfetti(100);
  } else if (State.quizScore === 3) {
    emoji.textContent = '💕';
    stars.textContent = '⭐⭐⭐';
    message.textContent = 'Bagus! Kita masih punya banyak waktu untuk saling mengenal lebih dalam lagi kan? 😊';
  } else if (State.quizScore === 2) {
    emoji.textContent = '🌸';
    stars.textContent = '⭐⭐';
    message.textContent = 'Tidak apa-apa! Ini berarti kita punya banyak hal untuk diceritakan satu sama lain!';
  } else {
    emoji.textContent = '😅';
    stars.textContent = '⭐';
    message.textContent = 'Hehe, sepertinya kita perlu menghabiskan lebih banyak waktu bersama ya! Dan itu hal yang menyenangkan! 💖';
  }
}

// ═══ GIFT BOX ═══
function resetGift() {
  if (State.giftOpened) return;
  
  const box = document.getElementById('giftBox');
  const scene = document.getElementById('giftScene');
  const reveal = document.getElementById('giftReveal');
  const hint = document.getElementById('giftHint');
  
  if (box) {
    box.classList.remove('opened');
    box.style.cursor = 'pointer';
  }
  if (scene) scene.style.display = 'block';
  if (reveal) reveal.style.display = 'none';
  if (hint) hint.style.display = 'block';
}

function openGift() {
  if (State.giftOpened) return;
  
  State.giftOpened = true;
  const box = document.getElementById('giftBox');
  box.classList.add('opened');
  box.style.cursor = 'default';
  
  createConfetti(150);
  
  setTimeout(() => {
    document.getElementById('giftHint').style.display = 'none';
    
    setTimeout(() => {
      document.getElementById('giftReveal').style.display = 'block';
      createHeartRain();
      createSparkles(80);
    }, 800);
  }, 1200);
}

function createHeartRain() {
  for (let i = 0; i < 40; i++) {
    setTimeout(() => {
      const heart = document.createElement('div');
      heart.textContent = ['💕', '💖', '💗', '💝', '💓'][Math.floor(Math.random() * 5)];
      heart.style.cssText = `
        position: fixed;
        left: ${Math.random() * 100}vw;
        top: -50px;
        font-size: ${Math.random() * 25 + 20}px;
        pointer-events: none;
        z-index: 10000;
      `;
      
      document.body.appendChild(heart);
      
      let y = -50;
      let rotation = 0;
      let opacity = 1;
      
      const fall = () => {
        y += 4 + Math.random() * 3;
        rotation += 5;
        
        if (y > window.innerHeight) {
          opacity -= 0.05;
        }
        
        heart.style.top = y + 'px';
        heart.style.transform = `rotate(${rotation}deg)`;
        heart.style.opacity = opacity;
        
        if (opacity > 0) {
          requestAnimationFrame(fall);
        } else {
          heart.remove();
        }
      };
      
      requestAnimationFrame(fall);
    }, i * 100);
  }
}

// ═══ SPARKLES ═══
function createSparkles(count) {
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const sparkle = document.createElement('div');
      sparkle.textContent = ['✨', '⭐', '💫', '✦', '🌟'][Math.floor(Math.random() * 5)];
      sparkle.style.cssText = `
        position: fixed;
        left: ${Math.random() * 100}vw;
        top: ${Math.random() * 100}vh;
        font-size: ${Math.random() * 20 + 15}px;
        pointer-events: none;
        z-index: 10000;
        animation: sparkleFloat 2s ease-out forwards;
      `;
      
      document.body.appendChild(sparkle);
      
      setTimeout(() => sparkle.remove(), 2000);
    }, i * 30);
  }
  
  // Add animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes sparkleFloat {
      0% { opacity: 0; transform: scale(0) rotate(0deg); }
      50% { opacity: 1; transform: scale(1.2) rotate(180deg); }
      100% { opacity: 0; transform: scale(0) rotate(360deg); }
    }
  `;
  if (!document.querySelector('[data-sparkle-anim]')) {
    style.setAttribute('data-sparkle-anim', 'true');
    document.head.appendChild(style);
  }
}

// ═══ CONFETTI ═══
function createConfetti(count) {
  const container = document.getElementById('confettiLayer');
  if (!container) return;
  
  const colors = ['#ff85c0', '#ffb3d9', '#ff6b9d', '#e4c1f9', '#ffcdb2', '#f4a4a4', '#d4a5d8'];
  
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = Math.random() * 100 + 'vw';
      confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
      confetti.style.animationDelay = Math.random() * 0.5 + 's';
      confetti.style.opacity = Math.random() * 0.6 + 0.4;
      
      if (Math.random() > 0.5) {
        confetti.style.borderRadius = '50%';
      }
      
      container.appendChild(confetti);
      
      setTimeout(() => confetti.remove(), 6000);
    }, i * 20);
  }
}

// ═══ CELEBRATION BURST ═══
function createCelebrationBurst() {
  createConfetti(80);
  createSparkles(50);
  
  // Heart burst from center
  for (let i = 0; i < 25; i++) {
    const heart = document.createElement('div');
    heart.textContent = '💕';
    heart.style.cssText = `
      position: fixed;
      left: 50vw;
      top: 50vh;
      font-size: 30px;
      pointer-events: none;
      z-index: 10000;
    `;
    
    document.body.appendChild(heart);
    
    const angle = (Math.PI * 2 * i) / 25;
    let distance = 0;
    let opacity = 1;
    
    const burst = () => {
      distance += 10;
      opacity -= 0.02;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;
      
      heart.style.transform = `translate(${x}px, ${y}px) scale(${1 + distance / 100})`;
      heart.style.opacity = opacity;
      
      if (opacity > 0) {
        requestAnimationFrame(burst);
      } else {
        heart.remove();
      }
    };
    
    setTimeout(() => requestAnimationFrame(burst), i * 30);
  }
}

// ═══ FINALE HEARTS ═══
function createFinaleHearts() {
  const container = document.getElementById('finaleHearts');
  if (!container) return;
  
  container.innerHTML = '💕 💖 💗 💝 💓 ❤️ 💕 💖';
  
  // Animate each heart
  const hearts = container.textContent.split(' ');
  container.innerHTML = '';
  
  hearts.forEach((heart, i) => {
    const span = document.createElement('span');
    span.textContent = heart;
    span.style.display = 'inline-block';
    span.style.animation = `heartbeat 1.5s ease-in-out infinite`;
    span.style.animationDelay = (i * 0.1) + 's';
    container.appendChild(span);
  });
}

// ═══ FIREWORKS ═══
function launchFireworks() {
  if (State.fireworksActive) return;
  State.fireworksActive = true;
  
  const canvas = document.getElementById('fireworksCanvas');
  if (!canvas) return;
  
  canvas.style.display = 'block';
  const ctx = canvas.getContext('2d');
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  const particles = [];
  const colors = ['#ff85c0', '#ffb3d9', '#ff6b9d', '#ff4d94', '#e4c1f9', '#ffd700', '#ffffff'];
  
  class Particle {
    constructor(x, y, color) {
      this.x = x;
      this.y = y;
      this.color = color;
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 8 + 3;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.alpha = 1;
      this.decay = Math.random() * 0.015 + 0.01;
      this.size = Math.random() * 3 + 2;
    }
    
    update() {
      this.vx *= 0.98;
      this.vy *= 0.98;
      this.vy += 0.15;
      this.x += this.vx;
      this.y += this.vy;
      this.alpha -= this.decay;
    }
    
    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.restore();
    }
  }
  
  function createFirework() {
    const x = Math.random() * canvas.width * 0.6 + canvas.width * 0.2;
    const y = Math.random() * canvas.height * 0.5 + canvas.height * 0.1;
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    for (let i = 0; i < 80; i++) {
      particles.push(new Particle(x, y, color));
    }
  }
  
  function animate() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].update();
      particles[i].draw();
      
      if (particles[i].alpha <= 0) {
        particles.splice(i, 1);
      }
    }
    
    if (State.fireworksActive) {
      requestAnimationFrame(animate);
    } else {
      canvas.style.display = 'none';
    }
  }
  
  // Launch fireworks
  const launchInterval = setInterval(() => {
    if (Math.random() < 0.4) createFirework();
  }, 500);
  
  animate();
  
  // Stop after 10 seconds
  setTimeout(() => {
    clearInterval(launchInterval);
    setTimeout(() => {
      State.fireworksActive = false;
    }, 3000);
  }, 10000);
}

function createMassiveFireworks() {
  State.fireworksActive = true;
  launchFireworks();
  
  // Add extra effects
  createConfetti(200);
  createSparkles(150);
}

// ═══ CONSOLE EASTER EGG ═══
setTimeout(() => {
  console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color:#ff85c0;');
  console.log('%c💌 Pesan untuk Emellya:', 'color:#ff4d94;font-size:16px;font-weight:bold;');
  console.log('%c', '');
  console.log('%cKamu adalah orang yang paling istimewa dalam hidupku.', 'color:#ffb3d9;font-size:14px;');
  console.log('%cMeskipun kamu pendiam, tapi kamu selalu membuat hariku lebih berwarna.', 'color:#ffb3d9;font-size:14px;');
  console.log('%cTerima kasih sudah ada, terima kasih sudah menjadi dirimu.', 'color:#ffb3d9;font-size:14px;');
  console.log('%cAku akan selalu mencintaimu. Selamanya. 💕', 'color:#ff4d94;font-size:14px;font-weight:bold;');
  console.log('%c', '');
  console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color:#ff85c0;');
}, 3000);

console.log('%c✨ Website ini dibuat dengan penuh cinta khusus untuk Emellya Amanda ✨', 'color:#e4c1f9;font-size:12px;font-style:italic;');
