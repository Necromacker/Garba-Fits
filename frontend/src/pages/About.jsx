import React from 'react';
import { ArrowRightIcon, SparkleIcon, ShieldCheckIcon, CheckIcon } from '../components/Icons';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="container" style={{ padding: '40px 24px 80px', maxWidth: '1100px' }}>
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <span
          style={{
            background: 'rgba(195, 107, 126, 0.12)',
            color: 'var(--color-rose)',
            padding: '6px 16px',
            borderRadius: '9999px',
            fontSize: '0.86rem',
            fontWeight: '700',
            letterSpacing: '0.5px',
            textTransform: 'uppercase',
            display: 'inline-block',
            marginBottom: '16px'
          }}
        >
          Our Story
        </span>
        <h1 style={{ fontSize: 'clamp(2.4rem, 4vw, 3.4rem)', color: 'var(--color-charcoal)', marginBottom: '16px' }}>
          Celebrate Garba without Breaking the Bank
        </h1>
        <p style={{ maxWidth: '640px', margin: '0 auto', color: '#6E7485', fontSize: '1.1rem', lineHeight: '1.6' }}>
          GarbaFits is your campus-first premium traditional wear rental platform. Wear gorgeous, authentic designer Chaniyas and lehengas for Navratri, then share them with fellow students.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '28px',
          marginBottom: '60px'
        }}
      >
        <div
          style={{
            background: '#FFFFFF',
            padding: '36px 28px',
            borderRadius: '24px',
            border: '1.5px solid rgba(227, 174, 186, 0.4)',
            boxShadow: '0 10px 30px rgba(45, 49, 66, 0.06)'
          }}
        >
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '14px',
              background: '#FFF0F3',
              color: 'var(--color-rose)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px'
            }}
          >
            <SparkleIcon size={24} />
          </div>
          <h3 style={{ fontSize: '1.35rem', marginBottom: '10px', color: 'var(--color-charcoal)' }}>Authentic Gujarati Flair</h3>
          <p style={{ color: '#6E7485', fontSize: '0.94rem', lineHeight: '1.6' }}>
            Handcrafted Gamthi embroidery, real mirror work, Kutchi patches, and 9-meter full twirl flair curated specially for festive nights.
          </p>
        </div>

        <div
          style={{
            background: '#FFFFFF',
            padding: '36px 28px',
            borderRadius: '24px',
            border: '1.5px solid rgba(227, 174, 186, 0.4)',
            boxShadow: '0 10px 30px rgba(45, 49, 66, 0.06)'
          }}
        >
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '14px',
              background: '#FFF0F3',
              color: 'var(--color-rose)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px'
            }}
          >
            <ShieldCheckIcon size={24} />
          </div>
          <h3 style={{ fontSize: '1.35rem', marginBottom: '10px', color: 'var(--color-charcoal)' }}>Hassle-Free & Sanitized</h3>
          <p style={{ color: '#6E7485', fontSize: '0.94rem', lineHeight: '1.6' }}>
            Every outfit is professionally dry-cleaned, steam-sanitized, and inspected before each rental period. Zero stress, 100% sparkle.
          </p>
        </div>

        <div
          style={{
            background: '#FFFFFF',
            padding: '36px 28px',
            borderRadius: '24px',
            border: '1.5px solid rgba(227, 174, 186, 0.4)',
            boxShadow: '0 10px 30px rgba(45, 49, 66, 0.06)'
          }}
        >
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '14px',
              background: '#FFF0F3',
              color: 'var(--color-rose)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px'
            }}
          >
            <CheckIcon size={24} />
          </div>
          <h3 style={{ fontSize: '1.35rem', marginBottom: '10px', color: 'var(--color-charcoal)' }}>Sustainable & Affordable</h3>
          <p style={{ color: '#6E7485', fontSize: '0.94rem', lineHeight: '1.6' }}>
            Why spend ₹15,000+ on an outfit you wear once? Rent premium styles starting from ₹700/night and reduce festive fashion waste.
          </p>
        </div>
      </div>

      <div
        style={{
          textAlign: 'center',
          background: 'linear-gradient(135deg, #F8ECEE 0%, #FAF0EE 100%)',
          padding: '44px 28px',
          borderRadius: '28px',
          border: '1px solid rgba(195, 107, 126, 0.3)'
        }}
      >
        <h2 style={{ fontSize: '1.8rem', color: 'var(--color-charcoal)', marginBottom: '12px' }}>
          Ready to twirl in the best fits this Navratri?
        </h2>
        <p style={{ color: '#6E7485', marginBottom: '24px', fontSize: '1rem' }}>
          Explore our collection and reserve your look in under 2 minutes.
        </p>
        <Link
          to="/"
          style={{
            background: 'var(--color-charcoal)',
            color: '#FFFFFF',
            padding: '14px 34px',
            borderRadius: '9999px',
            fontWeight: '600',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            textDecoration: 'none',
            boxShadow: '0 8px 24px rgba(45, 49, 66, 0.2)'
          }}
        >
          <span>Browse Outfits</span>
          <ArrowRightIcon size={16} />
        </Link>
      </div>
    </div>
  );
}
