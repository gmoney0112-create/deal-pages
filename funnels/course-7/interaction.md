# Sales Funnel Interaction Design

## Overview
A 3-page sales funnel for "How to Write a 40-Page eBook: Even if You've Never Written a Grocery List" online course.

## Page 1: Landing Page
**Primary Goal**: Convert visitors to course buyers ($47)

**Interactive Elements**:
1. **Course Purchase CTA Button** - "Get Started Today for $47"
   - Action: Navigate to checkout page
   - Placement: Hero section, after testimonials, final CTA section

2. **Testimonial Carousel** - Auto-rotating testimonials with manual navigation
   - 6 testimonials from target audience (young adults, at-risk, faith-based)
   - Each with photo, name, location, and success story
   - Auto-rotate every 5 seconds, manual arrows to navigate

3. **Course Curriculum Accordion** - Expandable sections showing 12 modules
   - Each module title clickable to reveal 3-4 bullet points of content
   - Interactive hover effects and smooth expand/collapse animations

4. **Money-Back Guarantee Badge** - Hover effect showing guarantee details
   - 30-day money-back guarantee with faith-based messaging

## Page 2: Checkout Page
**Primary Goal**: Complete course purchase + order bumps

**Interactive Elements**:
1. **Main Course Purchase Form** - "Complete Your $47 Course Purchase"
   - Email, name, payment details
   - Real-time form validation
   - Secure checkout badge

2. **Order Bump 1** - "Add the Complete eBook & Audiobook Package for $14.99"
   - Toggle switch to add to order
   - Shows ebook cover mockup and audiobook waveform preview
   - Updates total price in real-time when toggled

3. **Order Bump 2** - "Upgrade to the Ultimate Bundle: Paperback + eBook + Audiobook for $29.99"
   - Toggle switch to add to order  
   - Shows physical book mockup, ebook on tablet, and headphones
   - Updates total price in real-time when toggled
   - Only available if Order Bump 1 is selected (creates urgency)

4. **Price Calculator Display** - Shows breakdown:
   - Course: $47
   - Order Bump 1: +$14.99 (if selected)
   - Order Bump 2: +$29.99 (if selected - replaces bump 1)
   - Total: Dynamic calculation

## Page 3: Thank You Page + Community Offer
**Primary Goal**: Upsell to Skool Community ($197/year or $47/month)

**Interactive Elements**:
1. **Skool Community Invitation** - "Join Our Exclusive Writer's Community"
   - Annual membership: $197/year (save $67)
   - "Yes! Join the Community" button
   - Shows community features: weekly calls, accountability groups, feedback sessions

2. **Downsell Offer** - If annual is declined
   - Monthly membership: $47/month
   - "Not ready for annual? Try monthly for $47" button
   - "No thanks, I'll write alone" decline option

3. **Success Celebration** - Confetti animation and course access confirmation
   - Download links for course materials
   - "What's Next" section with clear steps

4. **Social Share Buttons** - "Share Your Success"
   - Pre-written social media posts about joining the course
   - Facebook, Twitter, Instagram share links

## Multi-Turn Interaction Flow

### Flow 1: Course Purchase Journey
1. Visitor lands → Reads testimonials → Views curriculum → CTA click
2. Checkout → Selects/deselects order bumps → Completes payment
3. Thank you → Community offer → Accept/Decline → Access course

### Flow 2: Order Bump Logic
1. Base order: $47 (course only)
2. Add Order Bump 1: $47 + $14.99 = $61.99
3. Add Order Bump 2: $47 + $29.99 = $76.99 (replaces bump 1)
4. Real-time price updates and visual feedback

### Flow 3: Community Upsell Logic
1. Initial offer: $197/year
2. If declined: Show $47/month downsell
3. If declined again: Show course access with "maybe later" message

## Visual Feedback Systems
- Hover effects on all clickable elements
- Loading states for form submissions
- Success/error messages for all interactions
- Progress indicators for multi-step processes
- Smooth animations for all state changes

## Mobile Responsiveness
- All interactions optimized for mobile touch
- Swipe gestures for testimonial carousel
- Collapsible sections for easy navigation
- Large touch targets for all buttons and toggles