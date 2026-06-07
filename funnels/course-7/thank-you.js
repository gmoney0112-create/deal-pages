// Thank You Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Page elements
    const confettiContainer = document.getElementById('confetti-container');
    const orderSummary = document.getElementById('order-summary');
    const totalPaid = document.getElementById('total-paid');
    const joinCommunityBtn = document.getElementById('join-community-btn');
    const declineCommunityBtn = document.getElementById('decline-community-btn');
    const communityOfferMain = document.getElementById('community-offer-main');
    const downsellOfferSection = document.getElementById('downsell-offer-section');
    const joinMonthlyBtn = document.getElementById('join-monthly-btn');
    const declineMonthlyBtn = document.getElementById('decline-monthly-btn');
    const finalMessage = document.getElementById('final-message');
    
    // Initialize page
    initConfetti();
    displayOrderSummary();
    initCommunityOffers();
    
    // Confetti animation using p5.js
    function initConfetti() {
        new p5((p) => {
            let confetti = [];
            let colors = ['#0D9488', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];
            
            p.setup = () => {
                const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
                canvas.parent('confetti-container');
                
                // Create initial confetti pieces
                for (let i = 0; i < 100; i++) {
                    confetti.push(createConfettiPiece());
                }
            };
            
            p.draw = () => {
                p.clear();
                
                // Update and draw confetti
                for (let i = confetti.length - 1; i >= 0; i--) {
                    const piece = confetti[i];
                    
                    // Update position
                    piece.x += piece.vx;
                    piece.y += piece.vy;
                    piece.vy += piece.gravity;
                    piece.rotation += piece.rotationSpeed;
                    
                    // Draw confetti
                    p.push();
                    p.translate(piece.x, piece.y);
                    p.rotate(piece.rotation);
                    p.fill(piece.color);
                    p.noStroke();
                    
                    if (piece.shape === 'circle') {
                        p.ellipse(0, 0, piece.size);
                    } else {
                        p.rect(0, 0, piece.size, piece.size * 0.6);
                    }
                    p.pop();
                    
                    // Remove confetti that are off screen
                    if (piece.y > p.height + 50) {
                        confetti.splice(i, 1);
                    }
                }
                
                // Add new confetti occasionally
                if (p.random() < 0.1 && confetti.length < 50) {
                    confetti.push(createConfettiPiece());
                }
            };
            
            function createConfettiPiece() {
                return {
                    x: p.random(p.width),
                    y: -50,
                    vx: p.random(-2, 2),
                    vy: p.random(2, 5),
                    gravity: 0.1,
                    size: p.random(4, 12),
                    color: p.random(colors),
                    rotation: 0,
                    rotationSpeed: p.random(-0.1, 0.1),
                    shape: p.random() > 0.5 ? 'circle' : 'rect'
                };
            }
            
            // Stop confetti after 10 seconds
            setTimeout(() => {
                confetti = [];
            }, 10000);
        });
    }
    
    // Display order summary from localStorage
    function displayOrderSummary() {
        const orderDetails = JSON.parse(localStorage.getItem('orderDetails') || '{}');
        
        if (orderDetails.course) {
            let summaryHTML = `
                <div class="flex justify-between items-center py-2">
                    <span class="text-gray-700">How to Write a 40-Page eBook Course</span>
                    <span class="font-medium text-gray-900">$47.00</span>
                </div>
            `;
            
            if (orderDetails.bump1) {
                summaryHTML += `
                    <div class="flex justify-between items-center py-2 text-sm text-gray-600">
                        <span>+ eBook & Audiobook Package</span>
                        <span>$14.99</span>
                    </div>
                `;
            }
            
            if (orderDetails.bump2) {
                summaryHTML += `
                    <div class="flex justify-between items-center py-2 text-sm text-gray-600">
                        <span>+ Ultimate Bundle Upgrade</span>
                        <span>$29.99</span>
                    </div>
                `;
            }
            
            orderSummary.innerHTML = summaryHTML;
            totalPaid.textContent = `$${orderDetails.total.toFixed(2)}`;
        } else {
            // Fallback for buyers arriving via Stripe redirect (localStorage not set by Stripe)
            orderSummary.innerHTML = `
                <div class="flex justify-between items-center py-2">
                    <span class="text-gray-700">How to Write a 40-Page eBook Course</span>
                    <span class="font-medium text-gray-900">$7.00</span>
                </div>
            `;
            totalPaid.textContent = '$7.00';
        }
    }
    
    // Initialize community offers
    function initCommunityOffers() {
        joinCommunityBtn.addEventListener('click', () => {
            joinCommunity('annual');
        });
        
        declineCommunityBtn.addEventListener('click', () => {
            showDownsellOffer();
        });
        
        joinMonthlyBtn.addEventListener('click', () => {
            joinCommunity('monthly');
        });
        
        declineMonthlyBtn.addEventListener('click', () => {
            showFinalMessage();
        });
    }
    
    // Handle community joining — redirect to Stripe for each plan
    // TODO: replace placeholder URLs with real Stripe Payment Links
    function joinCommunity(plan) {
        const stripeLinks = {
            annual:  'https://buy.stripe.com/REPLACE_WITH_ANNUAL_197_LINK',
            monthly: 'https://buy.stripe.com/REPLACE_WITH_MONTHLY_47_LINK'
        };
        window.location.href = stripeLinks[plan];
    }
    
    // Show community success message
    function showCommunitySuccess(plan) {
        const successMessage = document.createElement('div');
        successMessage.className = 'bg-success text-white rounded-2xl p-8 text-center';
        successMessage.innerHTML = `
            <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
            </div>
            <h3 class="font-display font-bold text-2xl mb-4">Welcome to the Community! 🎉</h3>
            <p class="text-lg mb-4">
                You've joined the ${plan === 'annual' ? 'annual' : 'monthly'} Skool community! 
                Check your email for your community access link.
            </p>
            <p class="text-sm opacity-90">
                You'll get instant access to weekly calls, accountability groups, and our supportive writer community.
            </p>
        `;
        
        // Insert success message
        const container = plan === 'annual' ? 
            communityOfferMain.parentNode : 
            downsellOfferSection.parentNode;
        
        container.insertBefore(successMessage, plan === 'annual' ? communityOfferMain : downsellOfferSection);
        
        // Animate in
        anime({
            targets: successMessage,
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 500,
            easing: 'easeOutQuad'
        });
        
        // Scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Show final message after a delay
        setTimeout(() => {
            showFinalMessage();
        }, 3000);
    }
    
    // Show downsell offer
    function showDownsellOffer() {
        // Hide main offer
        communityOfferMain.style.display = 'none';
        
        // Show downsell
        downsellOfferSection.classList.remove('hidden');
        
        // Animate in
        anime({
            targets: downsellOfferSection,
            opacity: [0, 1],
            translateY: [50, 0],
            duration: 600,
            easing: 'easeOutQuad'
        });
        
        // Scroll to downsell
        downsellOfferSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    // Show final message
    function showFinalMessage() {
        // Hide any remaining offers
        communityOfferMain.style.display = 'none';
        downsellOfferSection.style.display = 'none';
        
        // Show final message
        finalMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Add some celebration
        anime({
            targets: finalMessage,
            scale: [0.95, 1],
            opacity: [0.8, 1],
            duration: 800,
            easing: 'easeOutElastic(1, .8)'
        });
    }
    
    // Add social sharing functionality
    function initSocialSharing() {
        const shareButtons = document.querySelectorAll('[data-share]');
        
        shareButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const platform = button.getAttribute('data-share');
                const text = encodeURIComponent('Just joined the Write Your eBook course! Excited to finally share my story and become a published author. #WriteYourEBook');
                const url = encodeURIComponent(window.location.origin);
                
                let shareUrl = '';
                switch (platform) {
                    case 'twitter':
                        shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
                        break;
                    case 'facebook':
                        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                        break;
                    case 'linkedin':
                        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
                        break;
                }
                
                if (shareUrl) {
                    window.open(shareUrl, '_blank', 'width=600,height=400');
                }
            });
        });
    }
    
    // Add exit tracking
    let exitIntentShown = false;
    
    document.addEventListener('mouseleave', (e) => {
        if (e.clientY <= 0 && !exitIntentShown && 
            communityOfferMain.style.display !== 'none' && 
            downsellOfferSection.classList.contains('hidden')) {
            exitIntentShown = true;
            
            // Could show a last-chance popup here
            console.log('Exit intent on thank you page - could show last chance offer');
        }
    });
    
    // Add scroll animations
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe elements that should animate in
        document.querySelectorAll('.community-offer, .downsell-offer').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease-out';
            observer.observe(el);
        });
    }
    
    initScrollAnimations();
    
    // Add conversion tracking
    function trackConversion(event, value = 0) {
        console.log(`Conversion event: ${event}`, { value });
        // Here you would typically send this to your analytics platform
        // gtag('event', event, { value: value, currency: 'USD' });
    }
    
    // Track page load
    trackConversion('purchase_complete', parseFloat(totalPaid.textContent.replace('$', '')));
    
    console.log('Thank you page initialized successfully!');
});