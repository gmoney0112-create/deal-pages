import { useState, useEffect } from 'react';
import { Check, Star, BookOpen, Headphones, FileCheck, Book, Phone, Mail, User, Lock, Shield, Sparkles, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { toast } from 'sonner';

// Types
type Page = 'landing' | 'checkout' | 'thankyou';
type OrderDetails = {
  course: boolean;
  bump1: boolean;
  bump2: boolean;
  total: number;
};

// Main App Component
function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [showLeadPopup, setShowLeadPopup] = useState(false);
  const [orderDetails, setOrderDetails] = useState<OrderDetails>({
    course: true,
    bump1: false,
    bump2: false,
    total: 7
  });

  // Show lead popup after 5 seconds on landing page
  useEffect(() => {
    if (currentPage === 'landing') {
      const timer = setTimeout(() => {
        setShowLeadPopup(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [currentPage]);

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const updateOrderDetails = (details: Partial<OrderDetails>) => {
    setOrderDetails(prev => ({ ...prev, ...details }));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="font-bold text-xl text-[#0D9488]">
              Modern eBook Blueprint
            </div>
            {currentPage === 'landing' && (
              <Button 
                onClick={() => navigateTo('checkout')}
                className="bg-[#0D9488] hover:bg-[#0F766E] text-white animate-pulse-cta"
              >
                Get Started - $7
              </Button>
            )}
            {currentPage === 'checkout' && (
              <button 
                onClick={() => navigateTo('landing')}
                className="text-gray-600 hover:text-[#0D9488] transition-colors text-sm"
              >
                ← Back to Course
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <main className="pt-16">
        {currentPage === 'landing' && (
          <LandingPage onNavigate={() => navigateTo('checkout')} />
        )}
        {currentPage === 'checkout' && (
          <CheckoutPage 
            updateOrderDetails={updateOrderDetails}
            onComplete={() => navigateTo('thankyou')}
          />
        )}
        {currentPage === 'thankyou' && (
          <ThankYouPage orderDetails={orderDetails} />
        )}
      </main>

      {/* Lead Capture Popup */}
      <LeadCapturePopup 
        isOpen={showLeadPopup} 
        onClose={() => setShowLeadPopup(false)}
        onSubmit={() => setShowLeadPopup(false)}
      />
    </div>
  );
}

// Landing Page Component
function LandingPage({ onNavigate }: { onNavigate: () => void }) {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Maria Rodriguez",
      location: "Houston, TX",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      text: "I never thought I could write a book. I dropped out of high school and barely passed English. But this course showed me my story mattered. I wrote 'From GED to Glory' in 3 weeks and it's already helping other young moms.",
      book: "From GED to Glory: How I Broke the Cycle for My Kids",
      result: "127 copies sold in first month"
    },
    {
      name: "DeShawn Johnson",
      location: "Detroit, MI",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      text: "I was sleeping in my car when I started this course. I wrote about my journey from homeless to hopeful. The 12-chapter structure made it so simple. Now I'm speaking at youth groups.",
      book: "Faith in the Driver's Seat: Finding God in Your Lowest Moments",
      result: "Speaking at 8 churches"
    },
    {
      name: "Sarah Chen",
      location: "Los Angeles, CA",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      text: "As a first-generation college student, I felt like I didn't belong anywhere. This course helped me write about navigating Asian-American identity. I used the album drop strategy and sold 89 copies in one week!",
      book: "Between Two Worlds: Finding Your Voice as a First-Gen Christian",
      result: "89 copies first week"
    },
    {
      name: "Marcus Thompson",
      location: "Atlanta, GA",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      text: "I did 3 years in prison and thought my story was too messed up to share. This course showed me that's exactly why I needed to write it. Now I mentor at-risk youth and my book is required reading.",
      book: "Letters from Cell Block D to Destiny",
      result: "Mentoring 25 youth"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { value: "2,847+", label: "Students Enrolled" },
    { value: "1,243", label: "Books Published" },
    { value: "94%", label: "Success Rate" },
    { value: "4.9★", label: "Average Rating" }
  ];

  const curriculum = [
    { title: "Why Write an eBook?", desc: "Discover your calling as a writer and why your story matters", items: ["Your story's value", "Biblical foundation: Habakkuk 2:2", "Testimony vs credentials", "Destiny-altering books"] },
    { title: "Choosing Your Message", desc: "Find the book idea that's already inside you", items: ["3 places your message hides", "The one-sentence test", "Prayer and confirmation", "Real book examples"] },
    { title: "Viral Inspiration", desc: "Make your message memorable and shareable", items: ["Beyoncé's launch strategy", "Cardi B authenticity", "Paul the Apostle's viral content", "Tweetable quotes"] },
    { title: "Structuring Like a Pro", desc: "The simple formula that eliminates overwhelm", items: ["The mixtape analogy", "12 chapters × 3-4 pages", "The 5-step rhythm", "Real chapter breakdowns"] },
    { title: "Writing with Flow", desc: "Find your authentic voice without trying too hard", items: ["Flow = Voice + Clarity + Spirit", "Voice recording trick", "Twitter-style sentences", "Praying before writing"] },
    { title: "Storytelling That Hits", desc: "The show vs. tell rule that transforms writing", items: ["Why stories stick", "3-part story formula", "Showing vs telling examples", "Vulnerability without messiness"] },
    { title: "Adding the Faith Factor", desc: "Weave in God's truth without being preachy", items: ["Connecting scripture to story", "Relatable > Religious", "Your testimony = survival guide", "Hopeless → hopeful transformation"] },
    { title: "Editing Without Losing Your Sauce", desc: "Polish your writing while keeping personality", items: ["Grammarly & Hemingway App", "Reading out loud test", "Keeping your slang", "Cutting the fluff"] },
    { title: "Design & Covers", desc: "Create a cover that stops the scroll", items: ["Canva tutorial", "Color psychology", "Font choices", "Instagram-worthy quotes"] },
    { title: "Publishing Like a Boss", desc: "Get your book live worldwide in 24 hours", items: ["DIY vs Pro publishing", "Amazon KDP step-by-step", "Pricing strategies", "Categories and keywords"] },
    { title: "Marketing Like Drake", desc: "Build hype and sell books without being pushy", items: ["Building anticipation", "Social media strategies", "Collaborations and shoutouts", "Launch event tactics"] },
    { title: "Leaving Legacy", desc: "Build something that outlives you", items: ["Paul's eternal impact", "Maintaining momentum", "Expanding your platform", "Kingdom mindset"] }
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-white to-gray-50 min-h-screen flex items-center relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 bg-[#0D9488]/10 text-[#0D9488] px-4 py-2 rounded-full text-sm font-medium">
                  <Sparkles className="w-4 h-4" />
                  <span>Over 2,847 Writers Have Published Their First eBook</span>
                </div>
                <h1 className="font-bold text-5xl lg:text-6xl leading-tight">
                  <span className="gradient-text">Modern eBook Blueprint</span>
                  <br />
                  <span className="text-gray-900">Write Your First 40-Page Book in 30 Days</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  The exact 12-step system that's helped thousands of young adults become published authors - even if you've never written anything before.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-[#10B981] rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span>30 Days or Less</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-[#10B981] rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span>Faith-Based Approach</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-[#10B981] rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span>No Experience Needed</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-lg">
                  <div className="flex items-baseline space-x-2 mb-2">
                    <span className="text-4xl font-bold text-[#0D9488]">$7</span>
                    <span className="text-lg text-gray-500 line-through">$97</span>
                    <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-medium">93% OFF</span>
                  </div>
                  <div className="text-gray-600 mb-4">One-time payment. Lifetime access.</div>
                  <Button 
                    onClick={onNavigate}
                    className="w-full bg-[#0D9488] hover:bg-[#0F766E] text-white py-6 text-lg font-semibold rounded-xl hover-lift animate-pulse-cta"
                  >
                    Start Writing Your eBook Today
                  </Button>
                  <div className="mt-4 text-sm text-gray-500 text-center flex items-center justify-center space-x-2">
                    <Shield className="w-4 h-4" />
                    <span>30-Day Money-Back Guarantee</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-2xl border border-gray-200">
                <img 
                  src="https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=600&h=400&fit=crop" 
                  alt="eBook writing course" 
                  className="w-full rounded-lg mb-6"
                />
                <div className="space-y-4">
                  <h3 className="font-bold text-xl">What You'll Get:</h3>
                  <ul className="space-y-2 text-gray-600">
                    {[
                      "12 Step-by-Step Video Modules",
                      "40-Page eBook Template",
                      "Publishing & Marketing Guide",
                      "Bonus: Faith-Based Writing Prompts"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center space-x-3">
                        <Check className="w-5 h-5 text-[#10B981]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-bold text-3xl lg:text-4xl text-gray-900 mb-4">
              Join 2,847+ Writers Who've Published Their First eBook
            </h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl font-bold text-[#0D9488] mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-bold text-3xl lg:text-4xl text-gray-900 mb-4">
              Real Stories from Real Writers
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how ordinary young adults are becoming published authors and changing lives
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="testimonial-card rounded-2xl p-8 shadow-lg border border-gray-200">
              <div className="flex items-center mb-6">
                <img 
                  src={testimonials[activeTestimonial].image} 
                  alt={testimonials[activeTestimonial].name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <div className="font-semibold text-gray-900">{testimonials[activeTestimonial].name}</div>
                  <div className="text-gray-600">{testimonials[activeTestimonial].location}</div>
                  <div className="flex text-[#F59E0B]">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                </div>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                "{testimonials[activeTestimonial].text}"
              </p>
              <div className="bg-[#0D9488]/10 rounded-lg p-4">
                <div className="text-sm text-[#0F766E]">
                  <strong>Book:</strong> {testimonials[activeTestimonial].book}<br />
                  <strong>Result:</strong> {testimonials[activeTestimonial].result}
                </div>
              </div>
            </div>
            
            <div className="flex justify-center space-x-2 mt-6">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    i === activeTestimonial ? 'bg-[#0D9488]' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-bold text-3xl lg:text-4xl text-gray-900 mb-4">
              Everything You Need to Write, Publish & Market Your eBook
            </h2>
            <p className="text-xl text-gray-600">
              12 comprehensive modules that take you from blank page to published author
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {curriculum.map((module, i) => (
              <AccordionItem key={i} value={`module-${i}`} className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-gray-50">
                  <div className="flex items-center space-x-4 text-left">
                    <div className="w-10 h-10 bg-[#0D9488] text-white rounded-full flex items-center justify-center font-bold shrink-0">
                      {i + 1}
                    </div>
                    <div>
                      <div className="font-semibold text-lg text-gray-900">{module.title}</div>
                      <div className="text-gray-600 text-sm">{module.desc}</div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <ul className="space-y-2 text-gray-700 pl-14">
                    {module.items.map((item, j) => (
                      <li key={j}>• {item}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#ECFDF5] to-[#D1FAE5] rounded-3xl p-12 shadow-xl text-center">
            <div className="w-20 h-20 bg-[#0D9488] rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h2 className="font-bold text-3xl text-gray-900 mb-4">
              30-Day Money-Back Guarantee
            </h2>
            <p className="text-xl text-gray-700 mb-6 leading-relaxed">
              I'm so confident this course will help you write your eBook that I'm giving you a full 30 days to try it risk-free. If you don't feel like you're making progress, if you're not inspired, or if you're not completely satisfied for any reason, just email me and I'll refund every penny. No questions asked.
            </p>
            <div className="text-lg text-[#0F766E] font-medium">
              "Because God's calling on your life is worth the investment."
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-bold text-4xl lg:text-5xl mb-6">
            Your Story Is Waiting to Be Written
          </h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            The world needs what God's placed inside you. Don't let fear, doubt, or "I'm not a writer" keep you silent. Your testimony could be the exact thing someone needs to keep going.
          </p>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8 max-w-md mx-auto">
            <div className="flex items-baseline justify-center space-x-2 mb-2">
              <span className="text-4xl font-bold text-[#14B8A6]">$7</span>
              <span className="text-lg text-gray-400 line-through">$97</span>
            </div>
            <div className="text-gray-300 mb-4">One-time investment in your calling</div>
            <Button 
              onClick={onNavigate}
              className="w-full bg-[#0D9488] hover:bg-[#0F766E] text-white py-6 text-lg font-semibold rounded-xl hover-lift animate-pulse-cta"
            >
              Start Your Writing Journey Now
            </Button>
            <div className="mt-4 text-sm text-gray-400 flex items-center justify-center space-x-2">
              <Shield className="w-4 h-4" />
              <span>30-Day Money-Back Guarantee</span>
            </div>
          </div>

          <div className="text-gray-400 text-sm">
            "Write the vision and make it plain..." - Habakkuk 2:2
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="font-bold text-2xl text-[#0D9488] mb-4">
            Modern eBook Blueprint
          </div>
          <div className="text-gray-600 mb-4">
            Helping young adults share their stories and change lives through writing
          </div>
          <div className="text-sm text-gray-500">
            © 2025 Terrance Gee. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

// Lead Capture Popup Component
function LeadCapturePopup({ isOpen, onClose, onSubmit }: { isOpen: boolean; onClose: () => void; onSubmit: () => void }) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success('Your Free Quick Start Guide has been sent to your email!');
      setIsSubmitting(false);
      onSubmit();
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            <div className="flex items-center justify-center space-x-2 text-[#0D9488] mb-2">
              <Gift className="w-6 h-6" />
              <span className="text-sm font-medium">FREE GIFT</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              Get Your Free Quick Start Guide
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="text-center text-gray-600 mb-6">
          Enter your details below and I'll send you the Quick Start Guide immediately. 
          Plus, you'll get exclusive tips to help you start writing today!
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>Full Name</span>
            </Label>
            <Input
              id="name"
              type="text"
              required
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="email" className="flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>Email Address</span>
            </Label>
            <Input
              id="email"
              type="email"
              required
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="phone" className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>Phone Number</span>
            </Label>
            <Input
              id="phone"
              type="tel"
              required
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="mt-1"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#0D9488] hover:bg-[#0F766E] text-white py-6 text-lg font-semibold"
          >
            {isSubmitting ? 'Sending...' : 'Send Me The Free Guide!'}
          </Button>

          <div className="text-center text-xs text-gray-500">
            We respect your privacy. Unsubscribe at any time.
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// Checkout Page Component
function CheckoutPage({ 
  updateOrderDetails, 
  onComplete 
}: { 
  updateOrderDetails: (details: Partial<OrderDetails>) => void;
  onComplete: () => void;
}) {
  const [bump1Selected, setBump1Selected] = useState(false);
  const [bump2Selected, setBump2Selected] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const basePrice = 7;
  const bump1Price = 17;
  const bump2Price = 37;

  const calculateTotal = () => {
    let total = basePrice;
    if (bump1Selected) total += bump1Price;
    if (bump2Selected) total += bump2Price;
    return total;
  };

  const handleBump1Toggle = () => {
    setBump1Selected(!bump1Selected);
    if (bump2Selected && !bump1Selected) {
      setBump2Selected(false);
    }
  };

  const handleBump2Toggle = () => {
    if (bump1Selected) {
      setBump2Selected(!bump2Selected);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    const total = calculateTotal();
    updateOrderDetails({
      bump1: bump1Selected,
      bump2: bump2Selected,
      total: total
    });
    
    setTimeout(() => {
      setIsProcessing(false);
      onComplete();
    }, 2000);
  };

  const total = calculateTotal();
  const savings = (bump1Selected ? 42 : 0) + (bump2Selected ? 62 : 0);

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 min-h-screen py-12 animate-fade-in">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Main Checkout Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
              {/* Header */}
              <div className="bg-[#0D9488] text-white p-6">
                <h1 className="font-bold text-2xl mb-2">Complete Your Order</h1>
                <p className="text-teal-100">Get instant access to the complete ebook writing course</p>
              </div>

              {/* Order Summary */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center space-x-4">
                  <img 
                    src="https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=100&h=100&fit=crop" 
                    alt="Course" 
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">Modern eBook Blueprint Course</h3>
                    <p className="text-gray-600 text-sm">12 modules, templates, publishing guide, and bonus materials</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">$7</div>
                    <div className="text-sm text-gray-500 line-through">$97</div>
                  </div>
                </div>
              </div>

              {/* Order Bump Offers */}
              <div className="p-6 border-b border-gray-200 bg-gray-50">
                <h3 className="font-semibold text-lg text-gray-900 mb-4">Enhance Your Learning Experience</h3>
                
                {/* Order Bump 1 */}
                <div 
                  className={`order-bump bg-white rounded-xl p-4 border-2 mb-4 ${bump1Selected ? 'selected border-[#10B981]' : 'border-gray-200'}`}
                  onClick={handleBump1Toggle}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 mt-1">
                      <Checkbox checked={bump1Selected} onCheckedChange={handleBump1Toggle} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="bg-[#F59E0B] text-white text-xs px-2 py-1 rounded font-medium">SPECIAL OFFER</span>
                        <span className="text-sm text-gray-600">Save 71%</span>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">Complete eBook, Audiobook & Checklist Package</h4>
                      <p className="text-gray-600 text-sm mb-3">
                        Get the complete course in multiple formats plus a step-by-step checklist to track your progress.
                      </p>
                      <div className="flex items-center space-x-4">
                        <div className="flex space-x-2">
                          <BookOpen className="w-8 h-8 text-[#0D9488]" />
                          <Headphones className="w-8 h-8 text-[#0D9488]" />
                          <FileCheck className="w-8 h-8 text-[#0D9488]" />
                        </div>
                        <div className="flex-1">
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Downloadable eBook (PDF, EPUB)</li>
                            <li>• Full audiobook narration (6+ hours)</li>
                            <li>• 30-Day Writing Checklist</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900">$17</div>
                      <div className="text-sm text-gray-500 line-through">$59</div>
                    </div>
                  </div>
                </div>

                {/* Order Bump 2 */}
                <div 
                  className={`order-bump bg-white rounded-xl p-4 border-2 ${bump2Selected ? 'selected border-[#10B981]' : 'border-gray-200'} ${!bump1Selected ? 'opacity-60' : ''}`}
                  onClick={handleBump2Toggle}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 mt-1">
                      <Checkbox 
                        checked={bump2Selected} 
                        onCheckedChange={handleBump2Toggle}
                        disabled={!bump1Selected}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="bg-[#10B981] text-white text-xs px-2 py-1 rounded font-medium">BEST VALUE</span>
                        <span className="text-sm text-gray-600">Save 63%</span>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">Ultimate Bundle: Paperback + eBook + Audiobook</h4>
                      <p className="text-gray-600 text-sm mb-3">
                        Get everything in Order Bump 1 PLUS a physical paperback copy delivered to your door.
                      </p>
                      <div className="flex items-center space-x-4">
                        <div className="flex space-x-2">
                          <Book className="w-8 h-8 text-[#0D9488]" />
                          <BookOpen className="w-8 h-8 text-[#0D9488]" />
                          <Headphones className="w-8 h-8 text-[#0D9488]" />
                        </div>
                        <div className="flex-1">
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Physical paperback book (free shipping)</li>
                            <li>• Complete eBook package</li>
                            <li>• Full audiobook (6+ hours)</li>
                          </ul>
                        </div>
                      </div>
                      {!bump1Selected && (
                        <div className="mt-3 p-2 bg-blue-50 rounded-lg">
                          <p className="text-xs text-blue-800">
                            <strong>Requires Order Bump 1:</strong> Add the eBook & Audiobook package first
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900">$37</div>
                      <div className="text-sm text-gray-500 line-through">$99</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Checkout Form */}
              <div className="p-6">
                <form onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <Label>First Name</Label>
                      <Input required className="mt-1" placeholder="John" />
                    </div>
                    <div>
                      <Label>Last Name</Label>
                      <Input required className="mt-1" placeholder="Doe" />
                    </div>
                  </div>

                  <div className="mb-6">
                    <Label>Email Address</Label>
                    <Input type="email" required className="mt-1" placeholder="john@example.com" />
                    <p className="text-sm text-gray-500 mt-1">Your login details will be sent to this email</p>
                  </div>

                  <div className="mb-6">
                    <Label>Card Number</Label>
                    <div className="relative mt-1">
                      <Input required placeholder="1234 5678 9012 3456" />
                      <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <Label>Expiry Date</Label>
                      <Input required placeholder="MM/YY" className="mt-1" />
                    </div>
                    <div>
                      <Label>CVV</Label>
                      <Input required placeholder="123" className="mt-1" />
                    </div>
                  </div>

                  <div className="mb-6">
                    <Label className="flex items-center space-x-3">
                      <Checkbox required />
                      <span className="text-sm text-gray-700">
                        I agree to the Terms & Conditions and Privacy Policy
                      </span>
                    </Label>
                  </div>

                  <Button 
                    type="submit"
                    disabled={isProcessing}
                    className="w-full bg-[#0D9488] hover:bg-[#0F766E] text-white py-6 text-lg font-semibold rounded-xl"
                  >
                    {isProcessing ? 'Processing Order...' : 'Complete My Order'}
                  </Button>

                  <div className="mt-4 text-center">
                    <div className="inline-flex items-center space-x-2 bg-[#10B981] text-white text-sm px-4 py-2 rounded-lg">
                      <Shield className="w-4 h-4" />
                      <span>Secure SSL Checkout</span>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 sticky top-24">
              <div className="p-6 border-b border-gray-200">
                <h3 className="font-semibold text-lg text-gray-900 mb-4">Order Summary</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Modern eBook Blueprint</span>
                    <span className="font-medium text-gray-900">$7.00</span>
                  </div>
                  
                  {bump1Selected && (
                    <div className="flex justify-between items-center text-gray-600">
                      <span>eBook, Audiobook & Checklist</span>
                      <span>$17.00</span>
                    </div>
                  )}
                  
                  {bump2Selected && (
                    <div className="flex justify-between items-center text-gray-600">
                      <span>Ultimate Bundle Upgrade</span>
                      <span>$37.00</span>
                    </div>
                  )}
                </div>
                
                <div className="border-t border-gray-200 mt-4 pt-4">
                  <div className="flex justify-between items-center text-lg">
                    <span className="font-semibold text-gray-900">Total</span>
                    <span className="font-bold text-[#0D9488] price-highlight">${total.toFixed(2)}</span>
                  </div>
                  {savings > 0 && (
                    <div className="text-sm text-[#10B981] font-medium mt-1">
                      You save ${savings}!
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6">
                <h4 className="font-semibold text-gray-900 mb-3">What's Included:</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-[#10B981]" />
                    <span>12 Video Modules</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-[#10B981]" />
                    <span>40-Page eBook Template</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-[#10B981]" />
                    <span>Publishing & Marketing Guide</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-[#10B981]" />
                    <span>Bonus Writing Prompts</span>
                  </li>
                </ul>

                {bump1Selected && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h5 className="font-medium text-gray-900 mb-2">Plus Package:</h5>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>• Downloadable eBook</li>
                      <li>• Full audiobook</li>
                      <li>• 30-Day Checklist</li>
                    </ul>
                  </div>
                )}

                {bump2Selected && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h5 className="font-medium text-gray-900 mb-2">Plus Ultimate Bundle:</h5>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>• Physical paperback</li>
                      <li>• Free shipping</li>
                    </ul>
                  </div>
                )}
              </div>

              <div className="p-6 bg-gray-50 border-t border-gray-200">
                <div className="text-center text-sm text-gray-600 space-y-1">
                  <div className="flex items-center justify-center space-x-2">
                    <Check className="w-4 h-4 text-[#10B981]" />
                    <span>30-Day Money-Back Guarantee</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Check className="w-4 h-4 text-[#10B981]" />
                    <span>Instant Access After Purchase</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Thank You Page Component
function ThankYouPage({ orderDetails }: { orderDetails: OrderDetails }) {
  const [showDownsell, setShowDownsell] = useState(false);
  const [communityJoined, setCommunityJoined] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Confetti effect
  useEffect(() => {
    const confettiCount = 50;
    const colors = ['#0D9488', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];
    
    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti-piece';
      confetti.style.left = Math.random() * 100 + 'vw';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.animation = `confetti-fall ${Math.random() * 3 + 2}s linear forwards`;
      confetti.style.animationDelay = Math.random() * 2 + 's';
      document.body.appendChild(confetti);
      
      setTimeout(() => confetti.remove(), 5000);
    }
  }, []);

  const handleJoinCommunity = (plan: 'lifetime' | 'annual') => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setCommunityJoined(true);
      toast.success(`Welcome to the ${plan === 'lifetime' ? 'Lifetime' : 'Annual'} Community!`);
    }, 1500);
  };

  const handleDecline = () => {
    setShowDownsell(true);
  };

  const handleJoinTrial = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setCommunityJoined(true);
      toast.success('Your 7-Day Free Trial has started!');
    }, 1500);
  };

  return (
    <div className="animate-fade-in">
      {/* Success Hero Section */}
      <section className="bg-gradient-to-br from-white to-[#ECFDF5] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-24 h-24 bg-[#10B981] rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-12 h-12 text-white" />
          </div>

          <h1 className="font-bold text-4xl lg:text-5xl text-gray-900 mb-4">
            Congratulations! 🎉
          </h1>
          <p className="text-xl text-gray-700 mb-8 leading-relaxed">
            Your order is complete! You're now part of the 2,847+ writers who've taken the first step toward becoming published authors.
          </p>

          {/* Order Summary */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 mb-8 max-w-2xl mx-auto">
            <h2 className="font-semibold text-xl text-gray-900 mb-4">Your Order Summary</h2>
            <div className="space-y-3 text-left">
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-700">Modern eBook Blueprint Course</span>
                <span className="font-medium text-gray-900">$7.00</span>
              </div>
              
              {orderDetails.bump1 && (
                <div className="flex justify-between items-center py-2 text-sm text-gray-600">
                  <span>+ eBook, Audiobook & Checklist</span>
                  <span>$17.00</span>
                </div>
              )}
              
              {orderDetails.bump2 && (
                <div className="flex justify-between items-center py-2 text-sm text-gray-600">
                  <span>+ Ultimate Bundle</span>
                  <span>$37.00</span>
                </div>
              )}
            </div>
            <div className="border-t border-gray-200 mt-4 pt-4">
              <div className="flex justify-between items-center text-lg">
                <span className="font-semibold text-gray-900">Total Paid</span>
                <span className="font-bold text-[#0D9488]">${orderDetails.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 mb-8 max-w-2xl mx-auto text-left">
            <h3 className="font-semibold text-xl text-gray-900 mb-4">What's Next?</h3>
            <div className="space-y-4">
              {[
                { step: "1", title: "Check Your Email", desc: "Your login details and course access link have been sent to your email address." },
                { step: "2", title: "Start Module 1", desc: "Begin with 'Why Write an eBook?' and discover your calling as a writer." },
                { step: "3", title: "Download Your Bonuses", desc: "Access your templates, guides, and any additional materials you purchased." }
              ].map((item, i) => (
                <div key={i} className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-[#0D9488] text-white rounded-full flex items-center justify-center font-bold text-sm shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{item.title}</div>
                    <div className="text-gray-600 text-sm">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Community Offer Section */}
      {!communityJoined && !showDownsell && (
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-bold text-3xl lg:text-4xl text-gray-900 mb-4">
                Ready to Accelerate Your Success?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Join our exclusive community of writers who support, encourage, and hold each other accountable to finish and publish their books.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#ECFDF5] to-[#D1FAE5] rounded-3xl p-8 lg:p-12 max-w-4xl mx-auto border-2 border-[#10B981]">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="bg-[#10B981] text-white text-sm px-3 py-1 rounded-full font-medium">EXCLUSIVE INVITATION</span>
                  </div>
                  <h3 className="font-bold text-2xl lg:text-3xl text-gray-900 mb-4">
                    Join the Modern eBook Blueprint Skool Community
                  </h3>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    Get the support, accountability, and guidance you need to finish your book. Connect with fellow writers and learn from those who've already published.
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    {[
                      "Weekly live Q&A calls with Terrance",
                      "Small accountability groups (max 8 people)",
                      "Manuscript feedback and editing help",
                      "Publishing and marketing support",
                      "24/7 community chat and support"
                    ].map((feature, i) => (
                      <div key={i} className="flex items-center space-x-3">
                        <Check className="w-5 h-5 text-[#10B981]" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-4">
                  {/* Lifetime Option */}
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-2 border-[#F59E0B]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="bg-[#F59E0B] text-white text-xs px-2 py-1 rounded font-medium">BEST VALUE</span>
                      <span className="text-sm text-gray-500">One-time payment</span>
                    </div>
                    <div className="text-center mb-4">
                      <div className="text-4xl font-bold text-[#0D9488]">$497</div>
                      <div className="text-gray-600">Lifetime Access</div>
                      <div className="text-sm text-[#10B981] font-medium">Never pay again!</div>
                    </div>
                    <Button 
                      onClick={() => handleJoinCommunity('lifetime')}
                      disabled={isProcessing}
                      className="w-full bg-[#F59E0B] hover:bg-[#D97706] text-white py-4 text-lg font-semibold rounded-xl animate-pulse-cta"
                    >
                      {isProcessing ? 'Processing...' : 'Get Lifetime Access'}
                    </Button>
                  </div>

                  {/* Annual Option */}
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                    <div className="text-center mb-4">
                      <div className="text-3xl font-bold text-[#0D9488]">$197</div>
                      <div className="text-gray-600">per year</div>
                    </div>
                    <Button 
                      onClick={() => handleJoinCommunity('annual')}
                      disabled={isProcessing}
                      className="w-full bg-[#0D9488] hover:bg-[#0F766E] text-white py-4 text-lg font-semibold rounded-xl"
                    >
                      {isProcessing ? 'Processing...' : 'Join Annual - $197/year'}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="text-center mt-8">
                <button 
                  onClick={handleDecline}
                  className="text-gray-600 hover:text-gray-800 underline text-sm"
                >
                  No thanks, I'll write alone
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Downsell Offer Section */}
      {showDownsell && !communityJoined && (
        <section className="py-16 bg-gray-50 animate-slide-up">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A] rounded-3xl p-8 lg:p-12 text-center border-2 border-[#F59E0B]">
              <div className="mb-6">
                <span className="bg-[#F59E0B] text-white text-sm px-3 py-1 rounded-full font-medium">WAIT! SPECIAL OFFER</span>
              </div>
              
              <h3 className="font-bold text-2xl lg:text-3xl text-gray-900 mb-4">
                Try the Community Risk-Free for 7 Days!
              </h3>
              <p className="text-gray-700 mb-6 leading-relaxed max-w-2xl mx-auto">
                I understand commitments can feel like a lot. That's why I'm offering you a 7-day free trial to experience the community. If you love it, continue for just $47/month. Cancel anytime.
              </p>
              
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg max-w-md mx-auto mb-6">
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-[#F59E0B] mb-2">FREE</div>
                  <div className="text-gray-600 mb-1">7-Day Trial</div>
                  <div className="text-sm text-gray-500">Then $47/month - Cancel anytime</div>
                </div>
                
                <div className="space-y-3 mb-6 text-left">
                  {[
                    "Full community access for 7 days",
                    "Join weekly Q&A call",
                    "Get feedback on your writing",
                    "Connect with other writers",
                    "Cancel anytime, no questions asked"
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center space-x-3">
                      <Check className="w-5 h-5 text-[#10B981]" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Button 
                  onClick={handleJoinTrial}
                  disabled={isProcessing}
                  className="w-full bg-[#F59E0B] hover:bg-[#D97706] text-white py-4 text-lg font-semibold rounded-xl animate-pulse-cta"
                >
                  {isProcessing ? 'Starting Trial...' : 'Start My 7-Day Free Trial'}
                </Button>
                
                <div className="text-center text-xs text-gray-500 mt-4">
                  No credit card required for trial
                </div>
              </div>
              
              <div className="text-center">
                <button 
                  onClick={() => setCommunityJoined(true)}
                  className="text-gray-600 hover:text-gray-800 underline text-sm"
                >
                  No thanks, I'll figure it out on my own
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Success Message */}
      {communityJoined && (
        <section className="py-16 bg-white animate-slide-up">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-[#10B981] text-white rounded-2xl p-8">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-2xl mb-4">Welcome to the Community! 🎉</h3>
              <p className="text-lg mb-4">
                Check your email for your community access link. You'll get instant access to weekly calls, accountability groups, and our supportive writer community.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Final Message */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="font-bold text-2xl text-gray-900 mb-4">
            Welcome to the Modern eBook Blueprint Family! 📚
          </h3>
          <p className="text-gray-700 mb-6 leading-relaxed">
            Whether you join the community or not, you're now part of something bigger. You've taken the first step toward sharing your story and changing lives. I'm excited to see what God does through your writing.
          </p>
          
          <div className="bg-[#0D9488]/10 rounded-2xl p-6 mb-6">
            <h4 className="font-semibold text-gray-900 mb-2">Your Next Steps:</h4>
            <ol className="text-left text-gray-700 space-y-2">
              <li>1. Check your email for course access details</li>
              <li>2. Log in and start Module 1: "Why Write an eBook?"</li>
              <li>3. Download your templates and bonus materials</li>
              <li>4. Set aside 30 minutes daily for your writing journey</li>
            </ol>
          </div>
          
          <div className="text-sm text-gray-600">
            Questions? Email me directly at terrance@modernebookblueprint.com
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-sm text-gray-500">
            © 2025 Terrance Gee. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;