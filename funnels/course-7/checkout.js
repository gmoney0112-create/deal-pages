// Checkout Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Order bump elements
    const bump1Checkbox = document.getElementById('bump1-checkbox');
    const bump2Checkbox = document.getElementById('bump2-checkbox');
    const bump1Div = document.getElementById('bump1');
    const bump2Div = document.getElementById('bump2');
    const bump1Summary = document.getElementById('bump1-summary');
    const bump2Summary = document.getElementById('bump2-summary');
    const bump1Includes = document.getElementById('bump1-includes');
    const bump2Includes = document.getElementById('bump2-includes');
    const totalPrice = document.getElementById('total-price');
    const savingsText = document.getElementById('savings-text');
    const checkoutForm = document.getElementById('checkout-form');
    
    // Base prices
    const basePrice = 47;
    const bump1Price = 14.99;
    const bump2Price = 29.99;
    
    // Initialize checkout
    initOrderBumps();
    initFormValidation();
    updatePricing();
    
    // Order bump functionality
    function initOrderBumps() {
        // Bump 1 checkbox
        bump1Checkbox.addEventListener('change', function() {
            if (this.checked) {
                bump1Div.classList.add('selected');
                bump2Checkbox.disabled = false;
                bump2Div.style.opacity = '1';
                bump2Div.style.pointerEvents = 'auto';
                
                // Show bump 1 summary and includes
                bump1Summary.classList.remove('hidden');
                bump1Includes.classList.remove('hidden');
                
                // Animate selection
                anime({
                    targets: bump1Div,
                    scale: [1, 1.02, 1],
                    duration: 300,
                    easing: 'easeOutQuad'
                });
                
            } else {
                bump1Div.classList.remove('selected');
                bump2Checkbox.checked = false;
                bump2Checkbox.disabled = true;
                bump2Div.classList.remove('selected');
                bump2Div.style.opacity = '0.6';
                bump2Div.style.pointerEvents = 'none';
                
                // Hide bump summaries and includes
                bump1Summary.classList.add('hidden');
                bump2Summary.classList.add('hidden');
                bump1Includes.classList.add('hidden');
                bump2Includes.classList.add('hidden');
            }
            
            updatePricing();
        });
        
        // Bump 2 checkbox
        bump2Checkbox.addEventListener('change', function() {
            if (this.checked) {
                bump2Div.classList.add('selected');
                bump2Summary.classList.remove('hidden');
                bump2Includes.classList.remove('hidden');
                
                // Animate selection
                anime({
                    targets: bump2Div,
                    scale: [1, 1.02, 1],
                    duration: 300,
                    easing: 'easeOutQuad'
                });
                
            } else {
                bump2Div.classList.remove('selected');
                bump2Summary.classList.add('hidden');
                bump2Includes.classList.add('hidden');
            }
            
            updatePricing();
        });
        
        // Click on order bump divs to toggle checkboxes
        bump1Div.addEventListener('click', function(e) {
            if (e.target.type !== 'checkbox') {
                bump1Checkbox.checked = !bump1Checkbox.checked;
                bump1Checkbox.dispatchEvent(new Event('change'));
            }
        });
        
        bump2Div.addEventListener('click', function(e) {
            if (e.target.type !== 'checkbox' && !bump2Checkbox.disabled) {
                bump2Checkbox.checked = !bump2Checkbox.checked;
                bump2Checkbox.dispatchEvent(new Event('change'));
            }
        });
    }
    
    // Update pricing display
    function updatePricing() {
        let currentTotal = basePrice;
        let savings = 0;
        
        if (bump1Checkbox.checked) {
            currentTotal += bump1Price;
            savings += (59 - bump1Price); // Original price vs sale price
        }
        
        if (bump2Checkbox.checked) {
            // Bump 2 replaces bump 1, so we add the difference
            currentTotal = basePrice + bump2Price;
            savings = (99 - bump2Price) + (59 - bump1Price); // Both original prices vs sale prices
        }
        
        // Update total with animation
        totalPrice.textContent = `$${currentTotal.toFixed(2)}`;
        totalPrice.classList.add('price-highlight');
        
        setTimeout(() => {
            totalPrice.classList.remove('price-highlight');
        }, 500);
        
        // Update savings text
        if (savings > 0) {
            savingsText.textContent = `You save $${savings.toFixed(2)}!`;
            savingsText.classList.remove('hidden');
        } else {
            savingsText.classList.add('hidden');
        }
    }
    
    // Form validation and submission
    function initFormValidation() {
        checkoutForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            if (validateForm()) {
                // Show loading state
                const submitButton = checkoutForm.querySelector('button[type="submit"]');
                const originalText = submitButton.textContent;
                
                submitButton.textContent = 'Processing Order...';
                submitButton.disabled = true;
                
                // Simulate payment processing
                setTimeout(() => {
                    // Get order details
                    const orderDetails = {
                        course: true,
                        bump1: bump1Checkbox.checked,
                        bump2: bump2Checkbox.checked,
                        total: calculateTotal()
                    };
                    
                    // Store order details in localStorage for thank you page
                    localStorage.setItem('orderDetails', JSON.stringify(orderDetails));
                    
                    // Redirect to thank you page
                    window.location.href = 'thank-you.html';
                    
                }, 2000);
            }
        });
        
        // Real-time form validation
        const inputs = checkoutForm.querySelectorAll('input[required]');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                validateField(input);
            });
            
            input.addEventListener('input', () => {
                if (input.classList.contains('error')) {
                    validateField(input);
                }
            });
        });
    }
    
    // Calculate total price
    function calculateTotal() {
        let total = basePrice;
        
        if (bump1Checkbox.checked) {
            total += bump1Price;
        }
        
        if (bump2Checkbox.checked) {
            total = basePrice + bump2Price;
        }
        
        return total;
    }
    
    // Validate entire form
    function validateForm() {
        let isValid = true;
        const inputs = checkoutForm.querySelectorAll('input[required]');
        
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        
        // Check if terms are agreed
        const termsCheckbox = checkoutForm.querySelector('input[type="checkbox"][required]');
        if (!termsCheckbox.checked) {
            isValid = false;
            showFieldError(termsCheckbox, 'Please accept the terms and conditions');
        }
        
        return isValid;
    }
    
    // Validate individual field
    function validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';
        
        // Remove existing error styling
        field.classList.remove('error');
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
        
        // Validate based on field type
        switch (field.type) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address';
                }
                break;
                
            case 'text':
                if (field.placeholder.includes('1234')) {
                    // Card number validation
                    const cardNumber = value.replace(/\s/g, '');
                    if (cardNumber.length < 13 || cardNumber.length > 19) {
                        isValid = false;
                        errorMessage = 'Please enter a valid card number';
                    }
                } else if (field.placeholder.includes('MM')) {
                    // Expiry date validation
                    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
                    if (!expiryRegex.test(value)) {
                        isValid = false;
                        errorMessage = 'Please enter MM/YY format';
                    }
                } else if (field.placeholder.includes('123')) {
                    // CVV validation
                    if (value.length < 3 || value.length > 4) {
                        isValid = false;
                        errorMessage = 'Please enter a valid CVV';
                    }
                } else {
                    // Name fields
                    if (value.length < 2) {
                        isValid = false;
                        errorMessage = 'This field is required';
                    }
                }
                break;
        }
        
        if (!isValid) {
            showFieldError(field, errorMessage);
        }
        
        return isValid;
    }
    
    // Show field error
    function showFieldError(field, message) {
        field.classList.add('error');
        field.style.borderColor = '#EF4444';
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error text-red-500 text-sm mt-1';
        errorDiv.textContent = message;
        
        field.parentNode.appendChild(errorDiv);
    }
    
    // Format card number input
    const cardNumberInput = document.querySelector('input[placeholder*="1234"]');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s/g, '');
            let formattedValue = value.replace(/(.{4})/g, '$1 ').trim();
            e.target.value = formattedValue;
        });
    }
    
    // Format expiry date input
    const expiryInput = document.querySelector('input[placeholder*="MM"]');
    if (expiryInput) {
        expiryInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            e.target.value = value;
        });
    }
    
    // Only allow numbers in CVV
    const cvvInput = document.querySelector('input[placeholder*="123"]');
    if (cvvInput) {
        cvvInput.addEventListener('input', function(e) {
            e.target.value = e.target.value.replace(/\D/g, '');
        });
    }
    
    // Add hover effects to order bumps
    document.querySelectorAll('.order-bump').forEach(bump => {
        bump.addEventListener('mouseenter', () => {
            if (!bump.classList.contains('selected')) {
                bump.style.borderColor = '#0D9488';
                bump.style.transform = 'translateY(-2px)';
            }
        });
        
        bump.addEventListener('mouseleave', () => {
            if (!bump.classList.contains('selected')) {
                bump.style.borderColor = '#D1D5DB';
                bump.style.transform = 'translateY(0)';
            }
        });
    });
    
    // Add urgency timer (optional)
    function initUrgencyTimer() {
        const timerDiv = document.createElement('div');
        timerDiv.className = 'bg-red-50 border border-red-200 rounded-lg p-3 mb-4';
        timerDiv.innerHTML = `
            <div class="flex items-center space-x-2">
                <svg class="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"></path>
                </svg>
                <span class="text-red-800 font-medium">Special pricing expires in <span id="timer">15:00</span></span>
            </div>
        `;
        
        const checkoutForm = document.getElementById('checkout-form');
        checkoutForm.parentNode.insertBefore(timerDiv, checkoutForm);
        
        // Start countdown
        let minutes = 15;
        let seconds = 0;
        
        const countdown = setInterval(() => {
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(countdown);
                    timerDiv.innerHTML = '<div class="text-red-800 font-medium">Special pricing has expired</div>';
                    return;
                }
                minutes--;
                seconds = 59;
            } else {
                seconds--;
            }
            
            const timer = document.getElementById('timer');
            if (timer) {
                timer.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
            }
        }, 1000);
    }
    
    // Initialize urgency timer (comment out if not needed)
    // initUrgencyTimer();
    
    console.log('Checkout page initialized successfully!');
});