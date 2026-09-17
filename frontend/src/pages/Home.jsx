import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { BrowseRentIcon, EyeIcon, ArrowRightIcon, StarIcon, CloseIcon, SparkleIcon, ShieldCheckIcon } from '../components/Icons';
import RentalModal from '../components/RentalModal';
import heroImg from '../assets/1.png';
import '../styles/style-home.css';

/* ── Caption carousel data ── */
const CAPTIONS = [
  "Rent the Chaniya, spend the rest on tuck shop.",
  "Rent the best Chaniya before your roommate does.",
  "MIT gives you deadlines. We give you the best Chaniyas in the same college.",
];

/* ── 8 outfit cards data (2 rows of 4) ── */
const OUTFITS = [
  {
    id: 'gfit-01',
    name: 'Royal Mirrorwork Peacock Chaniya Choli',
    colorTheme: 'Royal Blue & Emerald',
    fabric: 'Pure Heavy Gamthi Cotton with Real Mirror Work',
    pricePerNight: 700,
    rentPrice: 1499,
    deposit: 2000,
    retailValue: 14500,
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.9,
    reviewsCount: 42,
    image: '/assets/outfits/outfit1.png',
    navratriDay: 1,
    flair: '9M Full Twirl',
    desc: 'Authentic Gujarati craftsmanship featuring intricate Gamthi embroidery and real mirror accents that sparkle under garba night lights.'
  },
  {
    id: 'gfit-02',
    name: 'Sunkissed Marigold Rabari Ensemble',
    colorTheme: 'Mustard Yellow & Crimson',
    fabric: 'Organic Khadi Cotton with Cowrie Shell Tassels',
    pricePerNight: 700,
    rentPrice: 1699,
    deposit: 2500,
    retailValue: 16800,
    sizes: ['XS', 'S', 'M', 'L'],
    rating: 5.0,
    reviewsCount: 38,
    image: '/assets/outfits/outfit2.png',
    navratriDay: 2,
    flair: '10M Ultra Flared',
    desc: 'Traditional Rabari tribal design adorned with hand-stitched motifs and cowrie shell hangings designed for effortless 360-degree spins.'
  },
  {
    id: 'gfit-03',
    name: 'Regal Magenta Rani Bandhani Set',
    colorTheme: 'Rani Pink & Gold',
    fabric: 'Georgette with Heavy Gota Patti & Zari Borders',
    pricePerNight: 700,
    rentPrice: 1399,
    deposit: 2000,
    retailValue: 13000,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.8,
    reviewsCount: 29,
    image: '/assets/outfits/outfit3.png',
    navratriDay: 3,
    flair: '8.5M Lightweight',
    desc: 'Vibrant Bandhani tie-dye artistry paired with golden Gota Patti lace work, offering lightweight comfort for energetic garba rounds.'
  },
  {
    id: 'gfit-04',
    name: 'Heritage Ivory Kutchi Patchwork',
    colorTheme: 'Off-White & Multi-Hue',
    fabric: 'Pure Slub Cotton with Authentic Kutch Patches',
    pricePerNight: 700,
    rentPrice: 1799,
    deposit: 2500,
    retailValue: 18500,
    sizes: ['S', 'M', 'L'],
    rating: 4.9,
    reviewsCount: 51,
    image: '/assets/outfits/outfit4.png',
    navratriDay: 4,
    flair: '9.5M Heavy Gher',
    desc: 'Heritage Kutchi artisanal masterpiece weaving together hand-woven patches, thread tassels, and mirror work for a standout festive look.'
  },
  {
    id: 'gfit-05',
    name: 'Navratri Emerald Gamthi Gher Chaniya',
    colorTheme: 'Emerald Green & Ruby',
    fabric: 'Pure Handloom Cotton with Hand-embroidery',
    pricePerNight: 700,
    rentPrice: 1599,
    deposit: 2200,
    retailValue: 15200,
    sizes: ['S', 'M', 'L'],
    rating: 4.9,
    reviewsCount: 34,
    image: '/assets/outfits/outfit5.png',
    navratriDay: 5,
    flair: '9M Flare',
    desc: 'Rich emerald green hand-embroidered ghagra paired with an ornate mirror blouse and contrasting dupatta.'
  },
  {
    id: 'gfit-06',
    name: 'Sunset Amber Abhala Festive Chaniya',
    colorTheme: 'Amber Orange & Rust',
    fabric: 'Chanderi Silk with Intricate Abhala Work',
    pricePerNight: 700,
    rentPrice: 1649,
    deposit: 2400,
    retailValue: 16000,
    sizes: ['M', 'L', 'XL'],
    rating: 5.0,
    reviewsCount: 47,
    image: '/assets/outfits/outfit6.png',
    navratriDay: 6,
    flair: '10M Flow',
    desc: 'Warm sunset amber palette highlighted with luminous abhala mirror discs and handcrafted tassels.'
  },
  {
    id: 'gfit-07',
    name: 'Midnight Starlight Mirror Lehenga',
    colorTheme: 'Navy Blue & Silver',
    fabric: 'Raw Silk with Heavy Foil and Mirror Motifs',
    pricePerNight: 700,
    rentPrice: 1549,
    deposit: 2200,
    retailValue: 14800,
    sizes: ['XS', 'S', 'M', 'L'],
    rating: 4.8,
    reviewsCount: 31,
    image: '/assets/outfits/outfit1.png',
    navratriDay: 7,
    flair: '9M Ultra Twirl',
    desc: 'Deep navy midnight ensemble glittering with cosmic mirror reflections, crafted for graceful garba steps.'
  },
  {
    id: 'gfit-08',
    name: 'Scarlet Crimson Golden Zari Twirl',
    colorTheme: 'Deep Scarlet & Gold',
    fabric: 'Mulmul Cotton with Traditional Zari & Shells',
    pricePerNight: 700,
    rentPrice: 1749,
    deposit: 2500,
    retailValue: 17500,
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.9,
    reviewsCount: 56,
    image: '/assets/outfits/outfit2.png',
    navratriDay: 8,
    flair: '10M Heavy Gher',
    desc: 'Festive red traditional silhouette rich with auspicious golden borders, cowrie hangings, and celebratory flair.'
  },
];

/* ── Outfit Card Component: Price tag on top left of image + two equidistant buttons below ── */
const OutfitCardItem = React.forwardRef(({ outfit, onRent, onView }, ref) => (
  <div className="hero-outfit-card" ref={ref}>
    <div className="card-media-wrap">
      <img
        src={outfit.image}
        alt={outfit.name}
        loading="eager"
        onError={(e) => {
          e.currentTarget.src = '/assets/outfits/outfit1.png';
        }}
      />
      {/* Price tag on top left of the image with margin */}
      <span className="card-price-tag">
        ₹ {outfit.pricePerNight || 700} / Night
      </span>
    </div>

    {/* Two buttons below with equidistant gap and margin */}
    <div className="card-minimal-footer">
      <button
        type="button"
        className="btn-card-view"
        onClick={() => onView(outfit)}
        title="View outfit details"
      >
        <EyeIcon size={16} />
        <span>View</span>
      </button>
      <button
        type="button"
        className="btn-card-rent"
        onClick={() => onRent(outfit)}
        title="Rent this outfit"
      >
        <span>Rent</span>
        <ArrowRightIcon size={16} />
      </button>
    </div>
  </div>
));

OutfitCardItem.displayName = 'OutfitCardItem';

export default function Home({
  activeTab = 'home',
  onActiveTabChange = () => { },
  requestedNav = null
}) {
  const [captionIndex, setCaptionIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  /* ── Modal states ── */
  const [selectedOutfit, setSelectedOutfit] = useState(null);
  const [viewModalOutfit, setViewModalOutfit] = useState(null);

  /* ── Refs: hero intro elements ── */
  const circleRef = useRef(null);
  const imageRef = useRef(null);
  const headlineRef = useRef(null);
  const subtitleRef = useRef(null);
  const actionsRef = useRef(null);
  const introBoxRef = useRef(null);
  const graphicBoxRef = useRef(null);

  /* ── Refs: outfit card elements ── */
  const cardRefs = useRef([]);
  const cardsTrackRef = useRef(null);

  const getLeftCards = () => cardRefs.current.filter((_, idx) => (idx % 4) < 2).filter(Boolean);
  const getRightCards = () => cardRefs.current.filter((_, idx) => (idx % 4) >= 2).filter(Boolean);
  const getAllCards = () => cardRefs.current.filter(Boolean);

  /* ── Refs: About view panels ── */
  const aboutTrackRef = useRef(null);
  const aboutLeftRef = useRef(null);
  const aboutRightRef = useRef(null);

  /* ── Refs: Contact view panels ── */
  const contactTrackRef = useRef(null);
  const contactLeftRef = useRef(null);
  const contactRightRef = useRef(null);

  /* ── Contact form state ── */
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', phone: '', email: '', message: '' });

  /* ── Animation & queue state machines ── */
  const currentTimelineRef = useRef(null);
  const isAnimatingRef = useRef(false);
  const currentViewRef = useRef(activeTab || 'home');
  const pendingTabRef = useRef(null);

  /* ── Caption carousel ── */
  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCaptionIndex(prev => (prev + 1) % CAPTIONS.length);
        setVisible(true);
      }, 500);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  /* ── Universal View Slide-Out Animation ── */
  const buildSlideOut = (fromView, tl) => {
    if (fromView === 'home') {
      tl.to(actionsRef.current, { opacity: 0, duration: 0.25, ease: 'power2.out' }, 0)
        .to([headlineRef.current, subtitleRef.current], { x: '-140vw', opacity: 0, duration: 0.55, ease: 'power3.in' }, 0.05)
        .to([circleRef.current, imageRef.current], { x: '140vw', opacity: 0, duration: 0.55, ease: 'power3.in' }, 0.05)
        .add(() => {
          gsap.set([introBoxRef.current, graphicBoxRef.current], { pointerEvents: 'none' });
        });
    } else if (fromView === 'rent') {
      const leftCards = getLeftCards();
      const rightCards = getRightCards();
      tl.to(leftCards, { x: '-140vw', opacity: 0, duration: 0.5, stagger: 0.04, ease: 'power3.in' }, 0)
        .to(rightCards, { x: '140vw', opacity: 0, duration: 0.5, stagger: 0.04, ease: 'power3.in' }, '<')
        .add(() => {
          gsap.set(cardsTrackRef.current, { visibility: 'hidden', pointerEvents: 'none' });
        });
    } else if (fromView === 'about') {
      tl.to(aboutLeftRef.current, { x: '-140vw', opacity: 0, duration: 0.5, ease: 'power3.in' }, 0)
        .to(aboutRightRef.current, { x: '140vw', opacity: 0, duration: 0.5, ease: 'power3.in' }, '<')
        .add(() => {
          gsap.set(aboutTrackRef.current, { visibility: 'hidden', pointerEvents: 'none' });
        });
    } else if (fromView === 'contact') {
      tl.to(contactLeftRef.current, { x: '-140vw', opacity: 0, duration: 0.5, ease: 'power3.in' }, 0)
        .to(contactRightRef.current, { x: '140vw', opacity: 0, duration: 0.5, ease: 'power3.in' }, '<')
        .add(() => {
          gsap.set(contactTrackRef.current, { visibility: 'hidden', pointerEvents: 'none' });
        });
    }
  };

  /* ── Universal View Slide-In Preparation ── */
  const prepareSlideIn = (toView) => {
    if (toView === 'home') {
      gsap.set([introBoxRef.current, graphicBoxRef.current], { pointerEvents: 'auto', opacity: 1 });
      gsap.set([headlineRef.current, subtitleRef.current], { x: '-140vw', opacity: 0 });
      gsap.set([circleRef.current, imageRef.current], { x: '140vw', opacity: 0 });
      gsap.set(actionsRef.current, { opacity: 0 });
    } else if (toView === 'rent') {
      const leftCards = getLeftCards();
      const rightCards = getRightCards();
      gsap.set(cardsTrackRef.current, { visibility: 'visible', pointerEvents: 'auto' });
      gsap.set(leftCards, { x: '-140vw', opacity: 0 });
      gsap.set(rightCards, { x: '140vw', opacity: 0 });
    } else if (toView === 'about') {
      gsap.set(aboutTrackRef.current, { visibility: 'visible', pointerEvents: 'auto' });
      gsap.set(aboutLeftRef.current, { x: '-140vw', opacity: 0 });
      gsap.set(aboutRightRef.current, { x: '140vw', opacity: 0 });
    } else if (toView === 'contact') {
      gsap.set(contactTrackRef.current, { visibility: 'visible', pointerEvents: 'auto' });
      gsap.set(contactLeftRef.current, { x: '-140vw', opacity: 0 });
      gsap.set(contactRightRef.current, { x: '140vw', opacity: 0 });
    }
  };

  /* ── Universal View Slide-In Tweens Attachment ── */
  const attachSlideIn = (toView, tl) => {
    if (toView === 'home') {
      tl.to([headlineRef.current, subtitleRef.current], { x: '0%', opacity: 1, duration: 0.7, ease: 'power3.out' }, '+=0.02')
        .to([circleRef.current, imageRef.current], { x: '0%', opacity: 1, duration: 0.7, ease: 'power3.out' }, '<')
        .to(actionsRef.current, { opacity: 1, duration: 0.45, ease: 'power2.out' }, '-=0.3');
    } else if (toView === 'rent') {
      const leftCards = getLeftCards();
      const rightCards = getRightCards();
      tl.to(leftCards, { x: '0%', opacity: 1, duration: 0.65, stagger: 0.06, ease: 'power3.out' }, '+=0.02')
        .to(rightCards, { x: '0%', opacity: 1, duration: 0.65, stagger: 0.06, ease: 'power3.out' }, '<');
    } else if (toView === 'about') {
      tl.to(aboutLeftRef.current, { x: '0%', opacity: 1, duration: 0.65, ease: 'power3.out' }, '+=0.02')
        .to(aboutRightRef.current, { x: '0%', opacity: 1, duration: 0.65, ease: 'power3.out' }, '<');
    } else if (toView === 'contact') {
      tl.to(contactLeftRef.current, { x: '0%', opacity: 1, duration: 0.65, ease: 'power3.out' }, '+=0.02')
        .to(contactRightRef.current, { x: '0%', opacity: 1, duration: 0.65, ease: 'power3.out' }, '<');
    }
  };

  /* ── Unified Transition Request Handler with Queue ── */
  const requestTransition = (targetTab) => {
    if (targetTab === currentViewRef.current && !isAnimatingRef.current) {
      return;
    }

    if (isAnimatingRef.current) {
      pendingTabRef.current = targetTab;
      if (currentTimelineRef.current) {
        currentTimelineRef.current.timeScale(1.5);
      }
      return;
    }

    const fromView = currentViewRef.current;
    isAnimatingRef.current = true;
    pendingTabRef.current = null;
    onActiveTabChange(targetTab);

    prepareSlideIn(targetTab);

    const tl = gsap.timeline({
      onComplete: () => {
        currentViewRef.current = targetTab;
        isAnimatingRef.current = false;

        if (targetTab === 'home') {
          gsap.set([headlineRef.current, subtitleRef.current, circleRef.current, imageRef.current, actionsRef.current], { x: '0%', opacity: 1, clearProps: 'transform' });
        } else if (targetTab === 'rent') {
          gsap.set(getAllCards(), { x: '0%', opacity: 1, visibility: 'visible', clearProps: 'transform' });
        } else if (targetTab === 'about') {
          gsap.set([aboutLeftRef.current, aboutRightRef.current], { x: '0%', opacity: 1, clearProps: 'transform' });
        } else if (targetTab === 'contact') {
          gsap.set([contactLeftRef.current, contactRightRef.current], { x: '0%', opacity: 1, clearProps: 'transform' });
        }

        if (pendingTabRef.current && pendingTabRef.current !== targetTab) {
          const next = pendingTabRef.current;
          pendingTabRef.current = null;
          requestTransition(next);
        }
      }
    });

    currentTimelineRef.current = tl;
    buildSlideOut(fromView, tl);
    attachSlideIn(targetTab, tl);
  };

  /* ── React to navbar click events passed via requestedNav ── */
  useEffect(() => {
    if (!requestedNav) return;
    requestTransition(requestedNav.tab);
  }, [requestedNav]);

  /* ── Initial mount entrance ── */
  useEffect(() => {
    const leftCards = getLeftCards();
    const rightCards = getRightCards();
    const allCards = getAllCards();

    // Reset non-active views off-screen
    gsap.set(leftCards, { x: '-140vw', opacity: 0 });
    gsap.set(rightCards, { x: '140vw', opacity: 0 });
    gsap.set(cardsTrackRef.current, { visibility: 'hidden', pointerEvents: 'none' });

    gsap.set(aboutLeftRef.current, { x: '-140vw', opacity: 0 });
    gsap.set(aboutRightRef.current, { x: '140vw', opacity: 0 });
    gsap.set(aboutTrackRef.current, { visibility: 'hidden', pointerEvents: 'none' });

    gsap.set(contactLeftRef.current, { x: '-140vw', opacity: 0 });
    gsap.set(contactRightRef.current, { x: '140vw', opacity: 0 });
    gsap.set(contactTrackRef.current, { visibility: 'hidden', pointerEvents: 'none' });

    if (activeTab === 'rent') {
      currentViewRef.current = 'rent';
      gsap.set([introBoxRef.current, graphicBoxRef.current], { pointerEvents: 'none', opacity: 0 });
      gsap.set(cardsTrackRef.current, { visibility: 'visible', pointerEvents: 'auto' });
      gsap.set(allCards, { x: '0%', opacity: 1 });
    } else if (activeTab === 'about') {
      currentViewRef.current = 'about';
      gsap.set([introBoxRef.current, graphicBoxRef.current], { pointerEvents: 'none', opacity: 0 });
      gsap.set(aboutTrackRef.current, { visibility: 'visible', pointerEvents: 'auto' });
      gsap.set([aboutLeftRef.current, aboutRightRef.current], { x: '0%', opacity: 1 });
    } else if (activeTab === 'contact') {
      currentViewRef.current = 'contact';
      gsap.set([introBoxRef.current, graphicBoxRef.current], { pointerEvents: 'none', opacity: 0 });
      gsap.set(contactTrackRef.current, { visibility: 'visible', pointerEvents: 'auto' });
      gsap.set([contactLeftRef.current, contactRightRef.current], { x: '0%', opacity: 1 });
    } else {
      currentViewRef.current = 'home';
      gsap.set([introBoxRef.current, graphicBoxRef.current], { pointerEvents: 'auto', opacity: 1 });
      gsap.set([headlineRef.current, subtitleRef.current, circleRef.current, imageRef.current, actionsRef.current], { x: '0%', opacity: 1 });
    }

    return () => {
      if (currentTimelineRef.current) currentTimelineRef.current.kill();
    };
  }, []);

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-grid">

            {/* ════════════ LEFT COLUMN: Intro text ════════════ */}
            <div className="hero-content">
              <div className="hero-intro-wrapper" ref={introBoxRef}>
                <h1 className="hero-headline" ref={headlineRef}>
                  <span className="headline-word text-rose">Wear</span>{' '}
                  <span className="headline-word text-charcoal">it,</span>{' '}
                  <span className="hero-pill-frame">
                    <img src="/assets/hero-pill.jpg" alt="Celebratory Garba dancers" />
                  </span>
                  <br />
                  <span className="headline-word text-charcoal">Then</span>{' '}
                  <span className="headline-word text-rose">share</span>{' '}
                  <span className="headline-word text-charcoal">it.</span>
                </h1>

                <p ref={subtitleRef} className="hero-subtitle caption-carousel"
                  style={{ opacity: visible ? 1 : 0 }}>
                  {CAPTIONS[captionIndex]}
                </p>

                {/* Primary "Rent Now" button */}
                <div className="hero-actions" ref={actionsRef}>
                  <button
                    className="btn-primary"
                    id="hero-action-btn"
                    onClick={() => requestTransition('rent')}
                  >
                    <BrowseRentIcon size={18} />
                    <span>Rent Now</span>
                  </button>
                </div>
              </div>
            </div>

            {/* ════════════ RIGHT COLUMN: Semicircle/SVG ════════════ */}
            <div className="hero-visual">
              <div className="hero-visual-wrapper" ref={graphicBoxRef}>
                <div className="hero-circle-backdrop" ref={circleRef} />
                <div className="hero-image-wrapper" ref={imageRef}>
                  <img src={heroImg} alt="GarbaFits Illustration Preview" />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ════════════ OUTFIT CARDS (RENT VIEW): Equidistant track ════════════ */}
        <div className="cards-equidistant-container" ref={cardsTrackRef}>
          {OUTFITS.map((outfit, index) => (
            <OutfitCardItem
              key={outfit.id}
              outfit={outfit}
              ref={(el) => (cardRefs.current[index] = el)}
              onRent={(item) => setSelectedOutfit(item)}
              onView={(item) => setViewModalOutfit(item)}
            />
          ))}
        </div>

        {/* ════════════ ABOUT VIEW: In-page slide panels ════════════ */}
        <div className="about-slide-container" ref={aboutTrackRef}>
          {/* Left panel */}
          <div className="about-panel-left" ref={aboutLeftRef}>
            <div className="about-hero-card">
              <span className="about-tag">Campus Traditional Wear</span>
              <h2 className="about-title">Why buy once when you can slay every night?</h2>
              <p className="about-desc">
                GarbaFits connects college students with authentic, high-quality Gamthi and Kutchi Chaniya Cholis without the ₹15,000+ price tag. Wear designer fits, turn heads with 9-meter full twirls, and pass the sparkle forward.
              </p>
              <div className="about-stats-grid">
                <div className="about-stat-box">
                  <span className="stat-num">100%</span>
                  <span className="stat-lbl">Steam Sanitized</span>
                </div>
                <div className="about-stat-box">
                  <span className="stat-num">9M+</span>
                  <span className="stat-lbl">Ultra Flare Twirl</span>
                </div>
                <div className="about-stat-box">
                  <span className="stat-num">₹700</span>
                  <span className="stat-lbl">Starting / Night</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right panel */}
          <div className="about-panel-right" ref={aboutRightRef}>
            <div className="about-feature-card">
              <div className="about-icon-wrap">
                <SparkleIcon size={22} />
              </div>
              <div>
                <h4 className="about-feature-title">Authentic Gamthi & Kutchi Craft</h4>
                <p className="about-feature-desc">Real mirrorwork, vibrant cowrie shell hangings, and handcrafted embroidery that shines under garba lights.</p>
              </div>
            </div>

            <div className="about-feature-card">
              <div className="about-icon-wrap">
                <ShieldCheckIcon size={22} />
              </div>
              <div>
                <h4 className="about-feature-title">Pristine Hygiene & Quality</h4>
                <p className="about-feature-desc">Every outfit is professionally dry-cleaned, steam-sanitized, and inspected before each festive hand-off.</p>
              </div>
            </div>

            <div className="about-feature-card">
              <div className="about-icon-wrap">
                <BrowseRentIcon size={22} />
              </div>
              <div>
                <h4 className="about-feature-title">Seamless Campus Pickup & Returns</h4>
                <p className="about-feature-desc">Reserve in 2 minutes, pick up near your campus hub, and return post-Navratri with zero hassle.</p>
              </div>
            </div>
          </div>
        </div>

        {/* ════════════ CONTACT VIEW: In-page slide panels ════════════ */}
        <div className="contact-slide-container" ref={contactTrackRef}>
          {/* Left panel: Form */}
          <div className="contact-panel-left" ref={contactLeftRef}>
            <div className="contact-form-card">
              <span className="about-tag">Get in Touch</span>
              <h2 className="about-title" style={{ fontSize: '1.75rem', marginBottom: '8px' }}>Fitting or Booking Query?</h2>
              <p className="about-desc" style={{ marginBottom: '18px', fontSize: '0.9rem' }}>
                Drop us a message for size trials, group discounts, or custom Navratri dates.
              </p>

              {contactSubmitted ? (
                <div style={{ textAlign: 'center', padding: '24px 16px', background: '#F0FFF4', borderRadius: '16px', border: '1px solid #C6F6D5' }}>
                  <div style={{ fontSize: '1.6rem', color: '#38A169', marginBottom: '8px' }}>✓</div>
                  <h3 style={{ fontSize: '1.2rem', color: 'var(--color-charcoal)', marginBottom: '6px' }}>Query Received!</h3>
                  <p style={{ color: '#4A5568', fontSize: '0.88rem', marginBottom: '16px' }}>A coordinator will contact you shortly via WhatsApp.</p>
                  <button
                    type="button"
                    onClick={() => setContactSubmitted(false)}
                    style={{ background: 'var(--color-rose)', color: '#FFFFFF', border: 'none', padding: '8px 20px', borderRadius: '9999px', fontSize: '0.86rem', fontWeight: '600', cursor: 'pointer' }}
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setContactSubmitted(true);
                  }}
                  style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}
                >
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: 'var(--color-charcoal)', marginBottom: '5px' }}>Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Diya Patel"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid rgba(227, 174, 186, 0.4)', fontSize: '0.9rem', outline: 'none', fontFamily: 'inherit' }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: 'var(--color-charcoal)', marginBottom: '5px' }}>WhatsApp / Phone</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={contactForm.phone}
                        onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid rgba(227, 174, 186, 0.4)', fontSize: '0.9rem', outline: 'none', fontFamily: 'inherit' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: 'var(--color-charcoal)', marginBottom: '5px' }}>Email</label>
                      <input
                        type="email"
                        placeholder="name@college.edu"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid rgba(227, 174, 186, 0.4)', fontSize: '0.9rem', outline: 'none', fontFamily: 'inherit' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', color: 'var(--color-charcoal)', marginBottom: '5px' }}>Message / Outfit Query</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Let us know which outfit, size, or dates you need..."
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid rgba(227, 174, 186, 0.4)', fontSize: '0.9rem', outline: 'none', fontFamily: 'inherit', resize: 'vertical' }}
                    />
                  </div>

                  <button
                    type="submit"
                    style={{ background: 'var(--color-charcoal)', color: '#FFFFFF', padding: '12px 24px', borderRadius: '9999px', border: 'none', fontSize: '0.94rem', fontWeight: '600', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '4px', transition: 'all 0.25s ease' }}
                  >
                    <span>Send Message</span>
                    <ArrowRightIcon size={16} />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right panel: Concierge & Fast Help */}
          <div className="contact-panel-right" ref={contactRightRef}>
            <div className="contact-info-card">
              <h3 style={{ fontSize: '1.3rem', color: 'var(--color-charcoal)', fontFamily: 'var(--font-serif)', marginBottom: '4px' }}>
                Instant Concierge & Trials
              </h3>

              <div className="contact-info-item">
                <div className="contact-icon-bubble">
                  <BrowseRentIcon size={20} />
                </div>
                <div>
                  <div className="contact-item-title">On-Campus Trial Slots</div>
                  <div className="contact-item-desc">Try on Chaniyas with our campus style ambassadors before finalizing your booking.</div>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-icon-bubble">
                  <SparkleIcon size={20} />
                </div>
                <div>
                  <div className="contact-item-title">Fast WhatsApp Support</div>
                  <div className="contact-item-desc">+91 98765 43210 (10 AM to 11 PM daily during festive season)</div>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-icon-bubble">
                  <ShieldCheckIcon size={20} />
                </div>
                <div>
                  <div className="contact-item-title">Instant Deposit Refund</div>
                  <div className="contact-item-desc">Deposits are credited back via UPI within 2 hours of outfit return.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Quick View Modal ── */}
      {viewModalOutfit && (
        <div className="view-modal-overlay" onClick={() => setViewModalOutfit(null)}>
          <div className="view-modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="view-modal-close" onClick={() => setViewModalOutfit(null)} aria-label="Close modal">
              <CloseIcon size={20} />
            </button>

            <div className="view-modal-grid">
              <div className="view-modal-media">
                <img
                  src={viewModalOutfit.image}
                  alt={viewModalOutfit.name}
                  onError={(e) => { e.currentTarget.src = '/assets/outfits/outfit1.png'; }}
                />
                <span className="view-modal-day">Navratri Day {viewModalOutfit.navratriDay}</span>
                <span className="view-modal-flair">{viewModalOutfit.flair}</span>
              </div>

              <div className="view-modal-info">
                <div className="view-modal-rating">
                  <StarIcon size={16} />
                  <span>{viewModalOutfit.rating}</span>
                  <span className="view-modal-reviews">({viewModalOutfit.reviewsCount} reviews)</span>
                </div>

                <h2 className="view-modal-title">{viewModalOutfit.name}</h2>
                <div className="view-modal-theme">{viewModalOutfit.colorTheme}</div>
                <p className="view-modal-desc">{viewModalOutfit.desc}</p>

                <div className="view-modal-specs">
                  <div className="spec-item">
                    <span className="spec-label">Fabric & Craft</span>
                    <span className="spec-value">{viewModalOutfit.fabric}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Available Sizes</span>
                    <div className="spec-sizes">
                      {viewModalOutfit.sizes.map(s => <span key={s} className="size-chip active">{s}</span>)}
                    </div>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Retail Worth</span>
                    <span className="spec-value">₹{viewModalOutfit.retailValue.toLocaleString()}</span>
                  </div>
                </div>

                <div className="view-modal-footer">
                  <div className="view-modal-price">
                    <span className="modal-price-label">3-Day Rental</span>
                    <div className="modal-price-val">
                      ₹{viewModalOutfit.rentPrice.toLocaleString()}
                      <span className="modal-dep">+ ₹{viewModalOutfit.deposit} deposit</span>
                    </div>
                  </div>

                  <button
                    className="btn-primary"
                    style={{ padding: '12px 28px' }}
                    onClick={() => {
                      const target = viewModalOutfit;
                      setViewModalOutfit(null);
                      setSelectedOutfit(target);
                    }}
                  >
                    <span>Proceed to Rent</span>
                    <ArrowRightIcon size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Rental Booking Modal ── */}
      {selectedOutfit && (
        <RentalModal
          outfit={selectedOutfit}
          onClose={() => setSelectedOutfit(null)}
        />
      )}
    </div>
  );
}
