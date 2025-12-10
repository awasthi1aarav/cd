// --- Birthday Countdown Logic ---
const birthdayDate = new Date("Dec 13, 2025 00:00:00").getTime();
const timerElement = document.getElementById("timer");
const messageArea = document.getElementById("message-area");

const countdown = setInterval(function() {
    const now = new Date().getTime();
    const distance = birthdayDate - now;
    
    // Time calculations (Days, Hours, Minutes, Seconds)
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Output the result
    document.getElementById("days").innerHTML = days.toString().padStart(2, '0');
    document.getElementById("hours").innerHTML = hours.toString().padStart(2, '0');
    document.getElementById("minutes").innerHTML = minutes.toString().padStart(2, '0');
    document.getElementById("seconds").innerHTML = seconds.toString().padStart(2, '0');

    // If the count down is finished
    if (distance < 0) {
        clearInterval(countdown);
        messageArea.innerHTML = "SURPRISE! It's your special day! Happy Birthday, Gorgeous!";
        timerElement.innerHTML = "I LOVE YOU! ❤️";
        timerElement.classList.add("finished");
    }
}, 1000);

// --- 1. Floating Hearts Effect ---
function createFloatingHeart() {
    const heart = document.createElement('span');
    heart.classList.add('heart');
    heart.innerHTML = '❤️'; // The heart emoji itself

    // Random initial position (x-axis)
    heart.style.left = Math.random() * window.innerWidth + 'px';
    
    // Random size
    const size = Math.random() * 1.5 + 1; // size between 1.0 and 2.5
    heart.style.fontSize = size + 'em'; 
    
    // Random animation duration
    const duration = Math.random() * 8 + 5; // duration between 5s and 13s
    heart.style.animation = `floatUp ${duration}s linear infinite`; 

    // Start heart from the bottom of the viewport
    heart.style.bottom = '-100px'; 
    
    document.body.appendChild(heart);

    // Remove the heart element after its animation finishes to clean up the DOM
    setTimeout(() => {
        heart.remove();
    }, duration * 1000);
}

// Custom CSS animation for floating up (add this to style.css or use JS if preferred)
// For simplicity, we'll assume a basic floatUp keyframe is defined in the CSS.
// You must add these keyframes to your style.css:
/*
@keyframes floatUp {
    0% { transform: translateY(0) rotate(0deg); opacity: 1; }
    100% { transform: translateY(-1000px) rotate(360deg); opacity: 0; }
}
*/

// Create a new heart every half second
setInterval(createFloatingHeart, 500);


// --- 2. Cursor Heart Trail Effect ---
let lastHeartTime = 0;
const minInterval = 50; // Milliseconds between hearts (throttle the effect)

document.addEventListener('mousemove', (event) => {
    const now = Date.now();
    
    // Throttle the heart creation
    if (now - lastHeartTime < minInterval) {
        return; 
    }
    lastHeartTime = now;

    const trailHeart = document.createElement('span');
    trailHeart.classList.add('heart');
    trailHeart.innerHTML = '💖'; // A slightly different heart emoji for the trail
    
    // Set position based on cursor location
    trailHeart.style.left = event.pageX + 'px';
    trailHeart.style.top = event.pageY + 'px';
    
    // Make trail hearts small and quickly fading
    trailHeart.style.fontSize = '0.8em';
    trailHeart.style.opacity = '0.8';
    
    // Add a quick fade-out animation
    trailHeart.style.transition = 'all 0.5s ease-out';
    
    document.body.appendChild(trailHeart);

    // Use a short timeout to fade and remove the trail heart
    setTimeout(() => {
        trailHeart.style.opacity = '0';
        trailHeart.style.transform = 'translateY(-10px)';
        
        // Remove element after transition completes
        setTimeout(() => trailHeart.remove(), 500);
    }, 50);
});