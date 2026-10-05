import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Admin notification recipients
const ADMIN_EMAILS = process.env.ADMIN_EMAILS || 'vrutimoradiya999@gmail.com, krishnagorde04@gmail.com';

const GOOGLE_CLIENT_ID = (process.env.GOOGLE_CLIENT_ID || '').trim();
const GOOGLE_CLIENT_SECRET = (process.env.GOOGLE_CLIENT_SECRET || '').trim();
const GOOGLE_REFRESH_TOKEN = (process.env.GOOGLE_REFRESH_TOKEN || '').trim();
const EMAIL_USER = (process.env.EMAIL_USER || 'vrutimoradiya999@gmail.com').trim();

/**
 * Exchange Refresh Token for a fresh Access Token using Google OAuth2 over HTTPS (Port 443)
 */
async function getGoogleAccessToken() {
  const params = new URLSearchParams({
    client_id: GOOGLE_CLIENT_ID,
    client_secret: GOOGLE_CLIENT_SECRET,
    refresh_token: GOOGLE_REFRESH_TOKEN,
    grant_type: 'refresh_token'
  });

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString()
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(`Google OAuth token exchange failed: ${data.error_description || data.error || JSON.stringify(data)}`);
  }
  return data.access_token;
}

/**
 * Format RFC 2822 email and Base64URL encode for Gmail REST API
 */
function createRawEmail({ from, to, subject, html }) {
  const toHeader = Array.isArray(to) ? to.join(', ') : to;
  const messageParts = [
    `From: ${from}`,
    `To: ${toHeader}`,
    `Subject: =?utf-8?B?${Buffer.from(subject).toString('base64')}?=`,
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=utf-8',
    'Content-Transfer-Encoding: base64',
    '',
    Buffer.from(html).toString('base64')
  ];

  const rawMessage = messageParts.join('\r\n');
  return Buffer.from(rawMessage)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

/**
 * Send email via Gmail REST API (Pure HTTPS Port 443 - Bypasses all Render SMTP blocks)
 */
async function sendViaGmailAPI(to, subject, html) {
  const accessToken = await getGoogleAccessToken();
  const raw = createRawEmail({
    from: `GarbaFits <${EMAIL_USER}>`,
    to,
    subject,
    html
  });

  const res = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ raw })
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(`Gmail API send failed: ${data.error?.message || JSON.stringify(data)}`);
  }
  return data;
}

// Nodemailer SMTP fallback for local development
function createTransporter() {
  const emailPass = process.env.EMAIL_PASS ? process.env.EMAIL_PASS.replace(/\s+/g, '') : null;
  if (EMAIL_USER && emailPass) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL_USER,
        pass: emailPass
      }
    });
  }
  return null;
}

const transporter = createTransporter();

/**
 * Unified dispatch function (Prioritizes Gmail REST API over Port 443)
 */
async function dispatchEmail({ to, subject, html }) {
  if (GOOGLE_CLIENT_ID && GOOGLE_CLIENT_SECRET && GOOGLE_REFRESH_TOKEN) {
    return await sendViaGmailAPI(to, subject, html);
  }

  if (transporter) {
    return await transporter.sendMail({
      from: `"GarbaFits" <${EMAIL_USER}>`,
      to,
      subject,
      html
    });
  }

  throw new Error('No email credentials configured. Please set GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, and GOOGLE_REFRESH_TOKEN in Render environment.');
}

/**
 * Send Simple Acknowledgment Email to Customer
 */
export async function sendCustomerAcknowledgment(booking) {
  const customerEmail = booking.email;
  const customerName = booking.customerName || 'Garba Enthusiast';

  if (!customerEmail || !customerEmail.includes('@')) {
    return;
  }

  const subject = `Your Request has been Noted | GarbaFits`;
  const htmlContent = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 580px; margin: 0 auto; background-color: #ffffff; border: 1px solid #f0e6e8; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
      <div style="background: linear-gradient(135deg, #F57285, #8F1426); padding: 28px 24px; text-align: center; color: #ffffff;">
        <h1 style="margin: 0; font-size: 26px; font-weight: 700; letter-spacing: 0.5px;">GarbaFits</h1>
        <p style="margin: 6px 0 0 0; font-size: 14px; opacity: 0.9;">Chaniya Choli Rental & Free Studio Trials</p>
      </div>
      
      <div style="padding: 28px 24px; color: #2D3142; line-height: 1.6;">
        <h2 style="font-size: 20px; color: #8F1426; margin-top: 0;">Hi ${customerName},</h2>
        
        <p style="font-size: 15px; margin-bottom: 16px;">
          Thank you for reaching out to <strong>GarbaFits</strong>!
        </p>
        
        <div style="background-color: #FFF5F6; border-left: 4px solid #F57285; padding: 16px 20px; border-radius: 6px; margin: 20px 0;">
          <p style="margin: 0; font-size: 15px; font-weight: 500; color: #4A1521;">
            ✓ Your request has been noted successfully. Our stylist will get back to you soon on WhatsApp / Phone to coordinate your fitting.
          </p>
        </div>

        <p style="font-size: 14px; color: #555555; margin-top: 24px;">
          If you have any quick questions in the meantime, feel free to reach out to our team at <strong>+91 6354 793 852</strong>.
        </p>

        <p style="font-size: 14px; margin-top: 24px; color: #2D3142;">
          Warm regards,<br>
          <strong>Team GarbaFits</strong>
        </p>
      </div>

      <div style="background-color: #faf7f8; padding: 16px 24px; text-align: center; font-size: 12px; color: #888888; border-top: 1px solid #f0e6e8;">
        © ${new Date().getFullYear()} GarbaFits Rentals · MIT ADT Campus, Pune · Ahmedabad Studio
      </div>
    </div>
  `;

  try {
    await dispatchEmail({
      to: customerEmail,
      subject,
      html: htmlContent
    });
    console.log(`Customer acknowledgment sent successfully!`);
  } catch (err) {
    console.error(`[Email Error] Customer acknowledgment failed:`, err.message);
  }
}

/**
 * Send Full Tracking Notification Email to Admin
 */
export async function sendAdminNotification(booking) {
  const subject = `⚡ New Free Trial / Booking Request: ${booking.customerName} (${booking.id})`;
  const datesText = Array.isArray(booking.selectedDates) ? booking.selectedDates.join(', ') : (booking.selectedDates || 'Not specified');

  const htmlContent = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 10px; overflow: hidden;">
      <div style="background-color: #2D3142; color: #ffffff; padding: 20px 24px;">
        <h2 style="margin: 0; font-size: 20px;">⚡ New GarbaFits Request Received</h2>
        <p style="margin: 4px 0 0 0; font-size: 13px; opacity: 0.8;">Booking ID: ${booking.id} · ${new Date().toLocaleString()}</p>
      </div>

      <div style="padding: 24px; color: #1a202c;">
        <h3 style="margin-top: 0; color: #8F1426; font-size: 16px; border-bottom: 2px solid #F57285; padding-bottom: 6px;">Customer Details</h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
          <tr>
            <td style="padding: 8px 0; color: #718096; width: 140px;">Customer Name:</td>
            <td style="padding: 8px 0; font-weight: 600;">${booking.customerName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #718096;">Phone / WhatsApp:</td>
            <td style="padding: 8px 0; font-weight: 600; color: #0284c7;"><a href="tel:${booking.phone}">${booking.phone}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #718096;">Email Address:</td>
            <td style="padding: 8px 0; font-weight: 600;">${booking.email || 'N/A'}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #718096;">Delivery Location:</td>
            <td style="padding: 8px 0; font-weight: 600;">${booking.deliveryLocation || 'N/A'}</td>
          </tr>
        </table>

        <h3 style="margin-top: 0; color: #8F1426; font-size: 16px; border-bottom: 2px solid #F57285; padding-bottom: 6px;">Outfit & Request Details</h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr>
            <td style="padding: 8px 0; color: #718096; width: 140px;">Outfit Requested:</td>
            <td style="padding: 8px 0; font-weight: 600;">${booking.outfitName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #718096;">Selected Dates:</td>
            <td style="padding: 8px 0; font-weight: 600;">${datesText}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #718096;">Mode:</td>
            <td style="padding: 8px 0; font-weight: 600;">${booking.paymentMethod === 'trial' ? 'Free Studio Trial' : booking.paymentMethod}</td>
          </tr>
        </table>

        <div style="margin-top: 24px; text-align: center;">
          <a href="https://wa.me/91${booking.phone.replace(/\D/g, '')}?text=Hi%20${encodeURIComponent(booking.customerName)},%20this%20is%20from%20GarbaFits!%20We%20received%20your%20trial%20request." style="display: inline-block; background-color: #25D366; color: #ffffff; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 14px;">
            Open in WhatsApp to Reply
          </a>
        </div>
      </div>
    </div>
  `;

  try {
    await dispatchEmail({
      to: ADMIN_EMAILS,
      subject,
      html: htmlContent
    });
    console.log(`Admin notification sent successfully!`);
  } catch (err) {
    console.error(`[Email Error] Admin notification failed:`, err.message);
  }
}
