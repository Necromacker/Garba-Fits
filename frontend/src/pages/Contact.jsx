import React, { useState } from 'react';
import { ArrowRightIcon } from '../components/Icons';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="container" style={{ padding: '40px 24px 80px', maxWidth: '900px' }}>
      <div style={{ textAlign: 'center', marginBottom: '44px' }}>
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
          Get In Touch
        </span>
        <h1 style={{ fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)', color: 'var(--color-charcoal)', marginBottom: '14px' }}>
          Have Questions or Custom Size Requests?
        </h1>
        <p style={{ color: '#6E7485', fontSize: '1.05rem', maxWidth: '580px', margin: '0 auto' }}>
          We're here to help you get the perfect fit for your Garba nights. Reach out anytime!
        </p>
      </div>

      <div
        style={{
          background: '#FFFFFF',
          borderRadius: '28px',
          border: '1.5px solid rgba(227, 174, 186, 0.4)',
          boxShadow: '0 12px 36px rgba(45, 49, 66, 0.08)',
          padding: '40px 36px',
          maxWidth: '680px',
          margin: '0 auto'
        }}
      >
        {submitted ? (
          <div style={{ textAlign: 'center', padding: '30px 20px' }}>
            <div
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: '#E8F5E9',
                color: '#2E7D32',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 18px',
                fontSize: '1.8rem'
              }}
            >
              ✓
            </div>
            <h3 style={{ fontSize: '1.5rem', color: 'var(--color-charcoal)', marginBottom: '8px' }}>
              Message Received!
            </h3>
            <p style={{ color: '#6E7485', marginBottom: '24px' }}>
              Thank you for reaching out. A GarbaFits coordinator will get back to you shortly.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              style={{
                background: 'var(--color-rose)',
                color: '#FFFFFF',
                border: 'none',
                padding: '10px 24px',
                borderRadius: '9999px',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '600', color: 'var(--color-charcoal)', marginBottom: '8px' }}>
                Full Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Diya Patel"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: '1.5px solid rgba(227, 174, 186, 0.5)',
                  fontSize: '0.95rem',
                  outline: 'none',
                  fontFamily: 'inherit'
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '600', color: 'var(--color-charcoal)', marginBottom: '8px' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@college.edu"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    border: '1.5px solid rgba(227, 174, 186, 0.5)',
                    fontSize: '0.95rem',
                    outline: 'none',
                    fontFamily: 'inherit'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '600', color: 'var(--color-charcoal)', marginBottom: '8px' }}>
                  Phone / WhatsApp
                </label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    border: '1.5px solid rgba(227, 174, 186, 0.5)',
                    fontSize: '0.95rem',
                    outline: 'none',
                    fontFamily: 'inherit'
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '600', color: 'var(--color-charcoal)', marginBottom: '8px' }}>
                Your Message / Fitting Query
              </label>
              <textarea
                required
                rows={4}
                placeholder="Let us know what outfit, sizes, or Navratri dates you have questions about..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: '1.5px solid rgba(227, 174, 186, 0.5)',
                  fontSize: '0.95rem',
                  outline: 'none',
                  fontFamily: 'inherit',
                  resize: 'vertical'
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                background: 'var(--color-charcoal)',
                color: '#FFFFFF',
                padding: '14px 28px',
                borderRadius: '9999px',
                border: 'none',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                marginTop: '8px',
                transition: 'all 0.25s ease',
                boxShadow: '0 8px 24px rgba(45, 49, 66, 0.2)'
              }}
            >
              <span>Send Inquiry</span>
              <ArrowRightIcon size={16} />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
