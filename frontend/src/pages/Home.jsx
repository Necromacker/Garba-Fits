import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { BrowseRentIcon, EyeIcon, ArrowRightIcon, StarIcon, CloseIcon } from '../components/Icons';
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

  /* ── Animation & queue state machines ── */
  const currentTimelineRef = useRef(null);
  const isAnimatingRef = useRef(false);
  const currentViewRef = useRef(activeTab || 'home');
  const pendingTabRef = useRef(null);
  const isInitialMountRef = useRef(true);

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

  /* ── Slide in Home components like initial entrance from off-screen ── */
  const playHomeEntrance = (onComplete) => {
    isAnimatingRef.current = true;

    // Reset initial positions for off-screen entrance
    gsap.set(circleRef.current, { x: '120vw', opacity: 0 });
    gsap.set(headlineRef.current, { x: '-120vw', opacity: 0 });
    gsap.set(imageRef.current, { x: '110vw', opacity: 0 });
    gsap.set(subtitleRef.current, { x: '-110vw', opacity: 1 });
    gsap.set(actionsRef.current, { opacity: 0 });

    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      onComplete: () => {
        currentViewRef.current = 'home';
        isAnimatingRef.current = false;
        if (onComplete) onComplete();

        // Check if user clicked 'rent' while the home entrance was running
        if (pendingTabRef.current && pendingTabRef.current !== 'home') {
          const next = pendingTabRef.current;
          pendingTabRef.current = null;
          onActiveTabChange(next);
          if (next === 'rent') {
            transitionToRent();
          }
        }
      }
    });
    currentTimelineRef.current = tl;

    // PAIR 1: semicircle (right) + headline (left) together
    tl.fromTo(circleRef.current,
      { x: '120vw', opacity: 0 },
      { x: '0%', opacity: 0.92, duration: 0.85 }, 0)
      .fromTo(headlineRef.current,
        { x: '-120vw', opacity: 0 },
        { x: '0%', opacity: 1, duration: 0.85 }, 0)

      // PAIR 2: hero image (right) + subtitle (left) together (no fade on subtitle)
      .fromTo(imageRef.current,
        { x: '110vw', opacity: 0 },
        { x: '0%', opacity: 1, duration: 0.8 }, '+=0.05')
      .fromTo(subtitleRef.current,
        { x: '-110vw', opacity: 1 },
        { x: '0%', opacity: 1, duration: 0.8 }, '<')

      // Button: fade in after that
      .fromTo(actionsRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.55, ease: 'power2.out' }, '+=0.05');

    return tl;
  };

  /* ── Transition from Home to Rent ── */
  const transitionToRent = () => {
    isAnimatingRef.current = true;

    const leftCards = getLeftCards();
    const rightCards = getRightCards();
    const allCards = getAllCards();

    // Preset cards off-screen before making track visible
    gsap.set(leftCards, { x: '-140vw', opacity: 0 });
    gsap.set(rightCards, { x: '140vw', opacity: 0 });
    gsap.set(cardsTrackRef.current, {
      visibility: 'visible',
      pointerEvents: 'auto'
    });

    const tl = gsap.timeline({
      onComplete: () => {
        currentViewRef.current = 'rent';
        isAnimatingRef.current = false;

        // Lock cards in position
        gsap.set(allCards, {
          x: '0%',
          opacity: 1,
          visibility: 'visible'
        });

        // Check if user clicked 'home' while the rent transition was running
        if (pendingTabRef.current && pendingTabRef.current !== 'rent') {
          const next = pendingTabRef.current;
          pendingTabRef.current = null;
          onActiveTabChange(next);
          if (next === 'home') {
            transitionToHome();
          }
        }
      }
    });
    currentTimelineRef.current = tl;

    // 1. Button fades out first
    tl.to(actionsRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.out'
    }, 0);

    // 2. Headline & subtitle slide LEFT off-screen
    tl.to(headlineRef.current, {
      x: '-140vw',
      opacity: 0,
      duration: 0.65,
      ease: 'power3.in'
    }, 0.08);

    tl.to(subtitleRef.current, {
      x: '-140vw',
      opacity: 0,
      duration: 0.65,
      ease: 'power3.in'
    }, 0.12);

    // 3. SVG & semicircle bg slide RIGHT off-screen
    tl.to(imageRef.current, {
      x: '140vw',
      opacity: 0,
      duration: 0.65,
      ease: 'power3.in'
    }, 0.08);

    tl.to(circleRef.current, {
      x: '140vw',
      opacity: 0,
      duration: 0.7,
      ease: 'power3.in'
    }, 0.12);

    // 4. Disable intro pointer events
    tl.add(() => {
      gsap.set([introBoxRef.current, graphicBoxRef.current], { pointerEvents: 'none' });
    }, '+=0.02');

    // 5. From the same off-screen sides:
    // Left cards slide in from LEFT off-screen
    tl.to(leftCards,
      {
        x: '0%',
        opacity: 1,
        duration: 0.75,
        stagger: 0.08,
        ease: 'power3.out'
      },
      '+=0.04'
    );

    // Right cards slide in from RIGHT off-screen
    tl.to(rightCards,
      {
        x: '0%',
        opacity: 1,
        duration: 0.75,
        stagger: 0.08,
        ease: 'power3.out'
      },
      '<' // concurrent with left cards
    );
  };

  /* ── Transition from Rent back to Home ── */
  const transitionToHome = () => {
    isAnimatingRef.current = true;

    const leftCards = getLeftCards();
    const rightCards = getRightCards();

    const tl = gsap.timeline({
      onComplete: () => {
        currentViewRef.current = 'home';
        isAnimatingRef.current = false;
        gsap.set(cardsTrackRef.current, {
          visibility: 'hidden',
          pointerEvents: 'none'
        });
        gsap.set([introBoxRef.current, graphicBoxRef.current], { pointerEvents: 'auto' });

        // Check if user clicked 'rent' while the home transition was running
        if (pendingTabRef.current && pendingTabRef.current !== 'home') {
          const next = pendingTabRef.current;
          pendingTabRef.current = null;
          onActiveTabChange(next);
          if (next === 'rent') {
            transitionToRent();
          }
        }
      }
    });
    currentTimelineRef.current = tl;

    // 1. Slide left cards back to left off-screen, right cards back to right off-screen
    tl.to(leftCards, {
      x: '-140vw',
      opacity: 0,
      duration: 0.55,
      stagger: 0.06,
      ease: 'power3.in'
    }, 0);

    tl.to(rightCards, {
      x: '140vw',
      opacity: 0,
      duration: 0.55,
      stagger: 0.06,
      ease: 'power3.in'
    }, '<');

    // 2. Hide cards container and restore pointer events
    tl.add(() => {
      gsap.set(cardsTrackRef.current, {
        visibility: 'hidden',
        pointerEvents: 'none'
      });
      gsap.set([introBoxRef.current, graphicBoxRef.current], { pointerEvents: 'auto' });

      // Reset home components off-screen ready to slide in
      gsap.set(circleRef.current, { x: '120vw', opacity: 0 });
      gsap.set(headlineRef.current, { x: '-120vw', opacity: 0 });
      gsap.set(imageRef.current, { x: '110vw', opacity: 0 });
      gsap.set(subtitleRef.current, { x: '-110vw', opacity: 1 });
      gsap.set(actionsRef.current, { opacity: 0 });
    });

    // 3. Bring home page components in from off-screen (exact same pairs as initial load)
    // PAIR 1: semicircle (right) + headline (left) together
    tl.fromTo(circleRef.current,
      { x: '120vw', opacity: 0 },
      { x: '0%', opacity: 0.92, duration: 0.85, ease: 'power3.out' }, '+=0.04')
      .fromTo(headlineRef.current,
        { x: '-120vw', opacity: 0 },
        { x: '0%', opacity: 1, duration: 0.85, ease: 'power3.out' }, '<')

      // PAIR 2: hero image (right) + subtitle (left) together (no fade on subtitle)
      .fromTo(imageRef.current,
        { x: '110vw', opacity: 0 },
        { x: '0%', opacity: 1, duration: 0.8, ease: 'power3.out' }, '+=0.05')
      .fromTo(subtitleRef.current,
        { x: '-110vw', opacity: 1 },
        { x: '0%', opacity: 1, duration: 0.8, ease: 'power3.out' }, '<')

      // Button: fade in
      .fromTo(actionsRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.55, ease: 'power2.out' }, '+=0.05');
  };

  /* ── Unified Transition Request Handler with Smart Queue ── */
  const requestTransition = (targetTab) => {
    // If already in target view and no animation is running, do nothing
    if (targetTab === currentViewRef.current && !isAnimatingRef.current) {
      return;
    }

    // If an animation is currently playing, queue the request and let current animation finish first
    if (isAnimatingRef.current) {
      pendingTabRef.current = targetTab;
      // Slightly accelerate current animation so user feels immediate responsiveness
      if (currentTimelineRef.current) {
        currentTimelineRef.current.timeScale(1.35);
      }
      return;
    }

    // Not animating: switch navbar highlight now and trigger animation
    pendingTabRef.current = null;
    onActiveTabChange(targetTab);

    if (targetTab === 'rent') {
      transitionToRent();
    } else if (targetTab === 'home') {
      transitionToHome();
    }
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

    if (activeTab === 'rent') {
      currentViewRef.current = 'rent';
      gsap.set([introBoxRef.current, graphicBoxRef.current], { pointerEvents: 'none', opacity: 0 });
      gsap.set(cardsTrackRef.current, {
        visibility: 'visible',
        pointerEvents: 'auto'
      });
      gsap.set(allCards, {
        x: '0%',
        opacity: 1
      });
    } else {
      currentViewRef.current = 'home';
      gsap.set(leftCards, { x: '-140vw', opacity: 0 });
      gsap.set(rightCards, { x: '140vw', opacity: 0 });
      gsap.set(cardsTrackRef.current, {
        visibility: 'hidden',
        pointerEvents: 'none'
      });
      playHomeEntrance();
    }

    isInitialMountRef.current = false;

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
                <h1 className="hero-headline" ref={headlineRef} style={{ opacity: 0 }}>
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
                <div className="hero-actions" ref={actionsRef} style={{ opacity: 0 }}>
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
                <div className="hero-circle-backdrop" ref={circleRef} style={{ opacity: 0 }} />
                <div className="hero-image-wrapper" ref={imageRef} style={{ opacity: 0 }}>
                  <img src={heroImg} alt="GarbaFits Illustration Preview" />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ════════════ OUTFIT CARDS: Equidistant track across full width ════════════ */}
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
