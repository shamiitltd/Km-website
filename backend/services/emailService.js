const nodemailer = require('nodemailer');
const { PrismaClient } = require('@prisma/client');
const path = require('path');
const fs = require('fs');

let prisma;
try {
  prisma = new PrismaClient();
} catch (err) {
  console.warn('[Prisma Warning in emailService]:', err.message);
}

/**
 * Creates and returns a Nodemailer transporter configured for the custom domain SMTP server
 */
const createTransporter = () => {
  const host = process.env.SMTP_HOST || 'mail.shamiit.com';
  const port = parseInt(process.env.SMTP_PORT || '465', 10);
  const secure = process.env.SMTP_SECURE === 'true' || port === 465;

  return nodemailer.createTransport({
    host,
    port,
    secure, // true for 465 (SSL/TLS), false for 587 (STARTTLS)
    auth: {
      user: process.env.SMTP_USER || 'km@shamiit.com',
      pass: process.env.SMTP_PASS || '',
    },
    tls: {
      // Prevents certificate verification rejections common on custom mail servers
      rejectUnauthorized: false,
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  });
};

/**
 * Send contact form inquiry using custom domain SMTP (mail.shamiit.com)
 * @param {Object} data
 * @param {string} data.fullName
 * @param {string} data.email
 * @param {string} data.mobile
 * @param {string} data.subject
 * @param {string} data.message
 */
const sendContactEmail = async ({ fullName, email, mobile, subject, message }) => {
  const smtpPass = process.env.SMTP_PASS;

  if (!smtpPass) {
    const errorMsg = 'SMTP_PASS is not configured in backend/.env. Please enter your password for km@shamiit.com.';
    console.warn(`[SMTP Warning] ${errorMsg}`);
    return { success: false, error: errorMsg };
  }

  try {
    const transporter = createTransporter();

    const senderEmail = process.env.SMTP_USER || 'km@shamiit.com';
    const senderName = process.env.SMTP_FROM_NAME || 'KisanMitra Support';
    const recipientEmail = process.env.CONTACT_RECEIVER_EMAIL || 'km@shamiit.com';

    const htmlContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 600px; margin: 0 auto; border: 1px solid #e6e6e6; border-radius: 12px; overflow: hidden;">
        <div style="background-color: #123C26; color: #ffffff; padding: 24px; text-align: center;">
          <h2 style="margin: 0; font-size: 24px; font-weight: 700;">New Contact Inquiry</h2>
          <p style="margin: 6px 0 0; font-size: 14px; color: #B0D939; font-weight: 500;">KisanMitra Customer Support Desk</p>
        </div>
        
        <div style="padding: 28px; background-color: #ffffff;">
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 8px 0; color: #666; font-size: 14px; width: 130px;">Sender Name:</td>
              <td style="padding: 8px 0; font-size: 15px; font-weight: 600; color: #111;">${fullName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666; font-size: 14px;">Email Address:</td>
              <td style="padding: 8px 0; font-size: 15px; font-weight: 600; color: #111;">
                <a href="mailto:${email}" style="color: #2C8C44; text-decoration: none;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666; font-size: 14px;">Phone Number:</td>
              <td style="padding: 8px 0; font-size: 15px; font-weight: 600; color: #111;">${mobile || 'Not provided'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666; font-size: 14px;">Inquiry Subject:</td>
              <td style="padding: 8px 0; font-size: 15px; font-weight: 600; color: #111;">${subject}</td>
            </tr>
          </table>

          <div style="border-top: 1px solid #eeeeee; padding-top: 18px; margin-top: 10px;">
            <p style="margin: 0 0 10px; font-weight: 600; font-size: 14px; color: #444;">Message Content:</p>
            <div style="background-color: #f7faf7; border-left: 4px solid #2C8C44; padding: 16px; border-radius: 6px; font-size: 15px; color: #2d3748; white-space: pre-wrap;">${message}</div>
          </div>
        </div>

        <div style="background-color: #f8faf9; color: #718096; padding: 16px; font-size: 12px; text-align: center; border-top: 1px solid #edf2f7;">
          Sent securely via KisanMitra Web Portal • Powered by mail.shamiit.com Custom SMTP
        </div>
      </div>
    `;

    const info = await transporter.sendMail({
      from: `"${senderName}" <${senderEmail}>`,
      to: recipientEmail,
      replyTo: `"${fullName}" <${email}>`,
      subject: `[KisanMitra Inquiry] ${subject} - ${fullName}`,
      html: htmlContent,
      text: `Name: ${fullName}\nEmail: ${email}\nPhone: ${mobile || 'N/A'}\nSubject: ${subject}\n\nMessage:\n${message}`,
    });

    console.log('[SMTP Success] Email dispatched via mail.shamiit.com:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('[SMTP Error] Failed to send email via custom SMTP:', error);
    return { success: false, error: error.message || 'Custom SMTP transmission error' };
  }
};

/**
 * Send newsletter / waitlist confirmation email to user & notify admin
 * @param {Object} params
 * @param {string} params.email - Subscriber's email address
 * @param {string} params.source - 'pricing' | 'careers' | 'refund' | 'blog' | 'general'
 * @param {string} [params.sourceLabel] - Friendly label (e.g. 'Pricing Launch Priority List')
 */
const sendNewsletterConfirmationEmail = async ({ email, source, sourceLabel }) => {
  const smtpPass = process.env.SMTP_PASS;

  if (!smtpPass) {
    const errorMsg = 'SMTP_PASS is not configured in backend/.env. Please enter your password for km@shamiit.com.';
    console.warn(`[SMTP Warning] ${errorMsg}`);
    return { success: false, error: errorMsg };
  }

  try {
    const transporter = createTransporter();

    const senderEmail = process.env.SMTP_USER || 'km@shamiit.com';
    const senderName = process.env.SMTP_FROM_NAME || 'KisanMitra Support';
    const adminEmail = process.env.CONTACT_RECEIVER_EMAIL || 'km@shamiit.com';

    // Content tailored to each subscription source
    let subject = '🌱 Welcome to KisanMitra!';
    let badgeText = 'SUBSCRIPTION CONFIRMED';
    let heading = 'You are on the Priority List!';
    let bodyContent = 'Thank you for subscribing to KisanMitra updates.';
    let bulletPoints = [];

    switch (source) {
      case 'pricing':
        subject = "🌱 You're on the KisanMitra Pricing Priority List!";
        badgeText = 'PRIORITY ACCESS CONFIRMED';
        heading = 'Fair & Farmer-First Pricing Coming Soon';
        bodyContent = "Thank you for your interest in KisanMitra! We are putting the final touches on our transparent, affordable subscription plans and farmer packages designed for maximum yield and ROI.";
        bulletPoints = [
          'Immediate notification the moment pricing plans go live',
          'Early-bird subscriber access & exclusive promotional benefits',
          'Direct onboarding assistance from our dedicated agronomy team'
        ];
        break;

      case 'careers':
        subject = '🌾 KisanMitra Careers - Talent Alert Activated';
        badgeText = 'TALENT NETWORK REGISTERED';
        heading = 'Welcome to the KisanMitra Talent Network';
        bodyContent = 'Thank you for wanting to build the future of Indian AgriTech with us! We have registered your email for career openings and recruitment updates.';
        bulletPoints = [
          'Priority alerts when engineering, AI & agronomy roles open',
          'Fast-track candidate screening for newsletter subscribers',
          'Updates on our team culture, remote opportunities & roadmap'
        ];
        break;

      case 'refund':
        subject = '📋 KisanMitra - Policy Updates Confirmation';
        badgeText = 'POLICY NOTIFICATION ACTIVE';
        heading = 'Customer Assurance & Policy Updates';
        bodyContent = 'Thank you for subscribing. We are finalizing our transparent, 100% farmer-first cancellation, refund, and customer assurance policies.';
        bulletPoints = [
          'Notification as soon as the formal policy is published',
          'Guaranteed transparent terms with zero hidden deductions',
          'Direct access to our dedicated regional customer grievance desk'
        ];
        break;

      case 'blog':
      case 'newsletter':
      default:
        subject = '🌾 Welcome to the KisanMitra Farming Insights Newsletter!';
        badgeText = 'NEWSLETTER CONFIRMED';
        heading = 'Welcome to KisanMitra Farming Insights!';
        bodyContent = "You are now officially subscribed to the KisanMitra community newsletter. We deliver cutting-edge agronomy insights, AI tools guides, and market intelligence directly to your inbox.";
        bulletPoints = [
          'Actionable smart farming techniques and seasonal crop advice',
          'AI disease detection tutorials and soil health management',
          'Weekly mandi rate trends and government agricultural schemes'
        ];
        break;
    }

    const bulletsHtml = bulletPoints
      .map(
        (point) => `
        <li style="margin-bottom: 8px; font-size: 14px; color: #2d3748; line-height: 1.5;">
          <strong style="color: #2C8C44; margin-right: 6px;">✓</strong> ${point}
        </li>`
      )
      .join('');

    const subscriberHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; background-color: #ffffff;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #0A2213 0%, #123C26 100%); color: #ffffff; padding: 32px 24px; text-align: center;">
          <div style="display: inline-block; background-color: rgba(176, 217, 57, 0.15); border: 1px solid rgba(176, 217, 57, 0.4); color: #B0D939; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 700; letter-spacing: 1px; margin-bottom: 12px;">
            ${badgeText}
          </div>
          <h1 style="margin: 0; font-size: 26px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px;">KisanMitra</h1>
          <p style="margin: 6px 0 0; font-size: 14px; color: #E2F0D9; font-weight: 400;">AI Powered Smart Farming Companion</p>
        </div>

        <!-- Body -->
        <div style="padding: 32px 28px;">
          <h2 style="font-size: 20px; font-weight: 700; color: #123C26; margin: 0 0 14px;">${heading}</h2>
          <p style="font-size: 15px; color: #4a5568; margin: 0 0 20px; line-height: 1.6;">
            ${bodyContent}
          </p>

          <div style="background-color: #F0FDF4; border-left: 4px solid #2C8C44; padding: 14px 18px; border-radius: 8px; margin: 16px 0 20px;">
            <p style="margin: 0; font-size: 13.5px; color: #166534; font-weight: 700;">
              ✨ Universal KisanMitra Access Activated
            </p>
            <p style="margin: 4px 0 0; font-size: 13px; color: #374151; line-height: 1.5;">
              You are now enrolled across all KisanMitra updates. You do not need to sign up again on other pages — you will automatically receive priority pricing notifications, feature rollouts, and agronomy insights!
            </p>
          </div>

          <div style="background-color: #F4FAF5; border: 1px solid #D6EAD9; border-radius: 12px; padding: 20px; margin: 20px 0;">
            <p style="margin: 0 0 12px; font-weight: 700; font-size: 13px; color: #123C26; text-transform: uppercase; letter-spacing: 0.5px;">
              What You Will Receive:
            </p>
            <ul style="list-style: none; padding: 0; margin: 0;">
              ${bulletsHtml}
            </ul>
          </div>

          <p style="font-size: 14px; color: #718096; margin: 20px 0 24px; line-height: 1.5;">
            Have questions or specific farming needs? Reply directly to this email or reach us anytime at <a href="mailto:${senderEmail}" style="color: #2C8C44; text-decoration: none; font-weight: 600;">${senderEmail}</a>.
          </p>
        </div>

        <!-- Footer -->
        <div style="background-color: #FAFCFA; border-top: 1px solid #E2E8F0; padding: 20px 24px; text-align: center; color: #A0AEC0; font-size: 12px;">
          <p style="margin: 0 0 6px;">You received this email because you subscribed to updates at <strong style="color: #718096;">KisanMitra</strong> with ${email}.</p>
          <p style="margin: 0;">SHAMIIT LLP • Dayanatpur Jewar, Greater Noida, UP - 203135, India</p>
        </div>
      </div>
    `;

    // 1. Dispatch confirmation to Subscriber
    const subscriberInfo = await transporter.sendMail({
      from: `"${senderName}" <${senderEmail}>`,
      to: email,
      replyTo: senderEmail,
      subject,
      html: subscriberHtml,
      text: `${heading}\n\n${bodyContent}\n\nThank you for subscribing with ${email}.`
    });

    console.log(`[SMTP Newsletter] Confirmation dispatched to subscriber (${email}):`, subscriberInfo.messageId);

    // 2. Dispatch notification to Admin (km@shamiit.com)
    try {
      const adminHtml = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; max-width: 550px;">
          <h3 style="color: #123C26; margin-top: 0;">🎉 New Newsletter Subscriber</h3>
          <table style="width: 100%; border-collapse: collapse; margin-top: 12px; font-size: 14px;">
            <tr>
              <td style="padding: 6px 0; color: #718096; width: 120px;">Email:</td>
              <td style="padding: 6px 0; font-weight: bold; color: #1a202c;"><a href="mailto:${email}" style="color: #2C8C44;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #718096;">Channel:</td>
              <td style="padding: 6px 0; font-weight: bold; color: #1a202c;">${sourceLabel || source}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #718096;">Time:</td>
              <td style="padding: 6px 0; color: #1a202c;">${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} (IST)</td>
            </tr>
          </table>
          <hr style="border: none; border-top: 1px solid #edf2f7; margin: 16px 0;" />
          <p style="font-size: 12px; color: #a0aec0; margin: 0;">KisanMitra Notification Engine via mail.shamiit.com</p>
        </div>
      `;

      await transporter.sendMail({
        from: `"${senderName}" <${senderEmail}>`,
        to: adminEmail,
        replyTo: email,
        subject: `[New Subscriber] ${email} joined ${sourceLabel || source}`,
        html: adminHtml,
        text: `New subscriber registered: ${email}\nChannel: ${sourceLabel || source}\nTime: ${new Date().toISOString()}`
      });
    } catch (adminErr) {
      console.warn('[SMTP Warning] Failed to dispatch admin alert email (subscriber email succeeded):', adminErr.message);
    }

    return { success: true, messageId: subscriberInfo.messageId };
  } catch (error) {
    console.error('[SMTP Error] Failed to send newsletter confirmation email:', error);
    return { success: false, error: error.message || 'Custom SMTP newsletter transmission error' };
  }
};

/**
 * Resolves an imageUrl for email delivery.
 * If the image was uploaded to the local uploads directory or is a local/relative path,
 * it attaches the physical image file inline via Content-ID (CID) so email clients
 * (Gmail, Apple Mail, Outlook, mobile devices) display it 100% reliably regardless
 * of localhost/remote network boundaries or privacy blockers.
 * If the image is a remote HTTPS URL, it serves via direct link.
 * 
 * @param {string} rawImageUrl
 * @returns {{ displayUrl: string | null, attachments: Array }}
 */
const resolveEmailImageAttachment = (rawImageUrl) => {
  if (!rawImageUrl || typeof rawImageUrl !== 'string' || !rawImageUrl.trim()) {
    return { displayUrl: null, attachments: [] };
  }

  const cleanUrl = rawImageUrl.trim();
  const uploadsDir = path.join(__dirname, '../uploads');

  // 1. Check if it points to a local upload path or filename (e.g. /uploads/img-xxx.png)
  const uploadMatch = cleanUrl.match(/\/uploads\/([a-zA-Z0-9_\-\.]+)/) || cleanUrl.match(/uploads[\\\/]([a-zA-Z0-9_\-\.]+)/);
  if (uploadMatch) {
    const filename = uploadMatch[1];
    const localFilePath = path.join(uploadsDir, filename);

    if (fs.existsSync(localFilePath)) {
      const cid = `img_${filename.replace(/[^a-zA-Z0-9]/g, '')}@kisanmitra`;
      return {
        displayUrl: `cid:${cid}`,
        attachments: [
          {
            filename: filename,
            path: localFilePath,
            cid: cid,
            contentDisposition: 'inline'
          }
        ]
      };
    }
  }

  // 2. Check if cleanUrl is directly a filename in uploads/
  const directPath = path.join(uploadsDir, cleanUrl);
  if (fs.existsSync(directPath)) {
    const cid = `img_${cleanUrl.replace(/[^a-zA-Z0-9]/g, '')}@kisanmitra`;
    return {
      displayUrl: `cid:${cid}`,
      attachments: [
        {
          filename: cleanUrl,
          path: directPath,
          cid: cid,
          contentDisposition: 'inline'
        }
      ]
    };
  }

  // 3. Check for base64 data URIs
  const dataUriMatch = cleanUrl.match(/^data:([a-zA-Z0-9\/\+]+);base64,(.+)$/);
  if (dataUriMatch) {
    const mime = dataUriMatch[1];
    const base64Data = dataUriMatch[2];
    const ext = mime.split('/')[1] || 'png';
    const cid = `img_${Date.now()}@kisanmitra`;
    return {
      displayUrl: `cid:${cid}`,
      attachments: [
        {
          filename: `cover.${ext}`,
          content: Buffer.from(base64Data, 'base64'),
          cid: cid,
          contentDisposition: 'inline'
        }
      ]
    };
  }

  // 4. If relative path and BASE_URL is set in production
  const baseUrl = process.env.BASE_URL || process.env.BACKEND_URL;
  if (cleanUrl.startsWith('/uploads/') && baseUrl) {
    return {
      displayUrl: `${baseUrl.replace(/\/$/, '')}${cleanUrl}`,
      attachments: []
    };
  }

  // 5. Remote HTTPS URL (e.g. Unsplash)
  return {
    displayUrl: cleanUrl,
    attachments: []
  };
};

/**
 * Broadcast a new blog publication notification to all subscribed users
 * @param {Object} blog
 * @param {string} blog.id
 * @param {string} blog.title
 * @param {string} blog.content
 * @param {string} blog.category
 * @param {string} blog.author
 * @param {string} blog.readTime
 * @param {string} blog.imageUrl
 */
const sendBlogBroadcastToSubscribers = async (blog) => {
  const smtpPass = process.env.SMTP_PASS;
  if (!smtpPass) {
    console.warn('[SMTP Warning] SMTP_PASS not configured. Cannot dispatch blog broadcast.');
    return { success: false, error: 'SMTP_PASS not configured' };
  }

  if (!prisma || !prisma.newsletterSubscriber) {
    console.warn('[Broadcast Warning] Database not connected. Cannot fetch subscribers.');
    return { success: false, error: 'Database not connected' };
  }

  // 1. Fetch all registered subscribers
  let subscribers = [];
  try {
    subscribers = await prisma.newsletterSubscriber.findMany({
      select: { email: true }
    });
  } catch (dbErr) {
    console.error('[Broadcast DB Error] Failed to fetch subscribers:', dbErr);
    return { success: false, error: dbErr.message };
  }

  if (!subscribers || subscribers.length === 0) {
    console.log('[Broadcast] No subscribers found in database. Skipping email broadcast.');
    return { success: true, count: 0, sent: 0, failed: 0 };
  }

  console.log(`[Broadcast] Initiating blog email broadcast to ${subscribers.length} subscriber(s) for "${blog.title}"...`);

  // 2. Prepare clean excerpt without HTML tags
  const cleanExcerpt = (blog.content || '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 240) + '...';

  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
  const blogUrl = `${frontendUrl}/blog/${blog.id}`;

  const transporter = createTransporter();
  const senderEmail = process.env.SMTP_USER || 'km@shamiit.com';
  const senderName = process.env.SMTP_FROM_NAME || 'KisanMitra Updates';

  // Resolve cover image and inline CID attachments
  const imageInfo = resolveEmailImageAttachment(blog.imageUrl);

  // 3. Clean, responsive HTML Email Template
  const emailHtml = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 620px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; background-color: #ffffff;">
      <!-- Header Banner -->
      <div style="background: linear-gradient(135deg, #0A2213 0%, #123C26 100%); color: #ffffff; padding: 30px 24px; text-align: center;">
        <span style="display: inline-block; background-color: rgba(176, 217, 57, 0.2); border: 1px solid rgba(176, 217, 57, 0.4); color: #B0D939; padding: 4px 14px; border-radius: 20px; font-size: 11px; font-weight: 700; letter-spacing: 1px; margin-bottom: 10px;">
          NEW KISANMITRA ARTICLE
        </span>
        <h1 style="margin: 0; font-size: 24px; font-weight: 800; color: #ffffff;">KisanMitra Insights</h1>
        <p style="margin: 4px 0 0; font-size: 13px; color: #E2F0D9;">Smart Farming • Agronomy • Technology</p>
      </div>

      <!-- Blog Cover Image -->
      ${imageInfo.displayUrl ? `
        <div style="width: 100%; max-height: 280px; overflow: hidden; background-color: #f7fafc;">
          <img src="${imageInfo.displayUrl}" alt="${blog.title}" style="width: 100%; height: auto; max-height: 280px; object-fit: cover; display: block;" />
        </div>
      ` : ''}

      <!-- Content Body -->
      <div style="padding: 28px 26px;">
        <div style="margin-bottom: 12px;">
          <span style="background-color: #EAF7ED; color: #2C8C44; font-weight: 700; font-size: 12px; padding: 4px 12px; border-radius: 6px; display: inline-block;">
            ${blog.category || 'Agronomy'}
          </span>
          <span style="color: #718096; font-size: 12px; margin-left: 8px;">
            • ${blog.readTime || '5 min read'}
          </span>
        </div>

        <h2 style="font-size: 22px; font-weight: 800; color: #123C26; margin: 0 0 10px; line-height: 1.35;">
          ${blog.title}
        </h2>

        <p style="font-size: 13px; color: #718096; margin: 0 0 18px;">
          By <strong style="color: #2d3748;">${blog.author || 'Kisan Mitra Team'}</strong>
        </p>

        <p style="font-size: 15px; color: #4a5568; line-height: 1.65; margin: 0 0 24px; background-color: #f9fbf9; border-left: 4px solid #2C8C44; padding: 14px 16px; border-radius: 6px;">
          ${cleanExcerpt}
        </p>

        <div style="text-align: center; margin: 28px 0 16px;">
          <a href="${blogUrl}" style="display: inline-block; background-color: #2C8C44; color: #ffffff; font-weight: 700; font-size: 15px; text-decoration: none; padding: 14px 32px; border-radius: 10px;">
            Read Full Story →
          </a>
        </div>
      </div>

      <!-- Footer -->
      <div style="background-color: #FAFCFA; border-top: 1px solid #E2E8F0; padding: 20px 24px; text-align: center; color: #A0AEC0; font-size: 12px;">
        <p style="margin: 0 0 6px;">You are receiving this update because you are subscribed to <strong style="color: #718096;">KisanMitra</strong>.</p>
        <p style="margin: 0;">SHAMIIT LLP • Dayanatpur Jewar, Greater Noida, UP - 203135, India</p>
      </div>
    </div>
  `;

  let sentCount = 0;
  let failedCount = 0;
  const errors = [];

  // 4. Fault-tolerant transmission loop (isolated per subscriber)
  for (const subscriber of subscribers) {
    try {
      await transporter.sendMail({
        from: `"${senderName}" <${senderEmail}>`,
        to: subscriber.email,
        replyTo: senderEmail,
        subject: `🌾 [New Post] ${blog.title}`,
        html: emailHtml,
        text: `New KisanMitra Article: ${blog.title}\n\n${cleanExcerpt}\n\nRead the full story: ${blogUrl}`,
        attachments: imageInfo.attachments
      });
      sentCount++;
      console.log(`[Broadcast Success] Dispatched to ${subscriber.email}`);
    } catch (err) {
      failedCount++;
      errors.push({ email: subscriber.email, error: err.message });
      console.error(`[Broadcast Fail] Failed sending to ${subscriber.email}:`, err.message);
    }
  }

  console.log(`[Broadcast Completed] Total: ${subscribers.length} | Sent: ${sentCount} | Failed: ${failedCount}`);
  return { success: true, count: subscribers.length, sent: sentCount, failed: failedCount, errors };
};

/**
 * Generate responsive HTML email for manual broadcast announcement
 */
const buildManualBroadcastHtml = ({ category, heading, message, ctaText, ctaUrl, resolvedImageUrl, recipientEmail }) => {
  // Convert newlines to paragraphs if not HTML
  const formattedBody = message.includes('<p>')
    ? message
    : message
        .split('\n\n')
        .map(p => `<p style="margin: 0 0 16px; font-size: 15px; color: #4a5568; line-height: 1.68;">${p.replace(/\n/g, '<br/>')}</p>`)
        .join('');

  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 620px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; background-color: #ffffff;">
      <!-- Header Banner -->
      <div style="background: linear-gradient(135deg, #0A2213 0%, #123C26 100%); color: #ffffff; padding: 32px 24px; text-align: center;">
        <span style="display: inline-block; background-color: rgba(176, 217, 57, 0.2); border: 1px solid rgba(176, 217, 57, 0.4); color: #B0D939; padding: 4px 14px; border-radius: 20px; font-size: 11px; font-weight: 700; letter-spacing: 1px; margin-bottom: 12px; text-transform: uppercase;">
          ${category || 'Announcement'}
        </span>
        <h1 style="margin: 0; font-size: 26px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px;">KisanMitra</h1>
        <p style="margin: 5px 0 0; font-size: 14px; color: #E2F0D9;">Smart Agriculture • Advisory • Community</p>
      </div>

      <!-- Optional Cover Image -->
      ${resolvedImageUrl ? `
        <div style="width: 100%; max-height: 300px; overflow: hidden; background-color: #f7fafc;">
          <img src="${resolvedImageUrl}" alt="${heading}" style="width: 100%; height: auto; max-height: 300px; object-fit: cover; display: block;" />
        </div>
      ` : ''}

      <!-- Main Content Body -->
      <div style="padding: 32px 28px;">
        <h2 style="font-size: 22px; font-weight: 800; color: #123C26; margin: 0 0 16px; line-height: 1.35;">
          ${heading}
        </h2>

        <div style="font-size: 15px; color: #374151; margin-bottom: 24px;">
          ${formattedBody}
        </div>

        <!-- Optional Call to Action Button -->
        ${ctaText && ctaUrl ? `
          <div style="text-align: center; margin: 32px 0 20px;">
            <a href="${ctaUrl}" style="display: inline-block; background-color: #2C8C44; color: #ffffff; font-weight: 700; font-size: 15px; text-decoration: none; padding: 14px 34px; border-radius: 10px; box-shadow: 0 4px 14px rgba(44, 140, 68, 0.35);">
              ${ctaText} →
            </a>
          </div>
        ` : ''}
      </div>

      <!-- Footer -->
      <div style="background-color: #FAFCFA; border-top: 1px solid #E2E8F0; padding: 22px 24px; text-align: center; color: #A0AEC0; font-size: 12px;">
        <p style="margin: 0 0 6px;">Sent to <strong style="color: #718096;">${recipientEmail || 'Subscribed Member'}</strong> as part of the KisanMitra community.</p>
        <p style="margin: 0;">SHAMIIT LLP • Dayanatpur Jewar, Greater Noida, UP - 203135, India</p>
      </div>
    </div>
  `;
};

/**
 * Send a single test preview email to admin/tester
 */
const sendSingleTestEmail = async ({ testEmail, subject, category, heading, message, ctaText, ctaUrl, imageUrl }) => {
  const smtpPass = process.env.SMTP_PASS;
  if (!smtpPass) {
    return { success: false, error: 'SMTP_PASS not configured in backend/.env' };
  }

  try {
    const transporter = createTransporter();
    const senderEmail = process.env.SMTP_USER || 'km@shamiit.com';
    const senderName = process.env.SMTP_FROM_NAME || 'KisanMitra Broadcast';

    const imageInfo = resolveEmailImageAttachment(imageUrl);

    const htmlContent = buildManualBroadcastHtml({
      category,
      heading: heading || subject,
      message,
      ctaText,
      ctaUrl,
      resolvedImageUrl: imageInfo.displayUrl,
      recipientEmail: testEmail
    });

    const info = await transporter.sendMail({
      from: `"${senderName}" <${senderEmail}>`,
      to: testEmail,
      replyTo: senderEmail,
      subject: `[TEST PREVIEW] ${subject}`,
      html: htmlContent,
      text: `${heading || subject}\n\n${message}\n\n${ctaText ? `${ctaText}: ${ctaUrl}` : ''}`,
      attachments: imageInfo.attachments
    });

    console.log(`[Test Broadcast Success] Sent test preview to ${testEmail}:`, info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('[Test Broadcast Error]:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Send manual broadcast announcement to all subscribers with fault tolerance & database logging
 */
const sendManualBroadcastToSubscribers = async ({ subject, category, heading, message, ctaText, ctaUrl, imageUrl }) => {
  const smtpPass = process.env.SMTP_PASS;
  if (!smtpPass) {
    return { success: false, error: 'SMTP_PASS not configured in backend/.env' };
  }

  if (!prisma || !prisma.newsletterSubscriber) {
    return { success: false, error: 'Database not connected' };
  }

  let subscribers = [];
  try {
    subscribers = await prisma.newsletterSubscriber.findMany({
      select: { email: true }
    });
  } catch (dbErr) {
    console.error('[Broadcast DB Error]:', dbErr);
    return { success: false, error: dbErr.message };
  }

  if (!subscribers || subscribers.length === 0) {
    return { success: true, count: 0, sent: 0, failed: 0, message: 'No subscribers found in database.' };
  }

  console.log(`[Manual Broadcast] Broadcasting to ${subscribers.length} subscriber(s): "${subject}"...`);

  const transporter = createTransporter();
  const senderEmail = process.env.SMTP_USER || 'km@shamiit.com';
  const senderName = process.env.SMTP_FROM_NAME || 'KisanMitra Updates';

  // Resolve cover image and inline attachments once for all recipients
  const imageInfo = resolveEmailImageAttachment(imageUrl);

  let sentCount = 0;
  let failedCount = 0;
  const errors = [];

  for (const subscriber of subscribers) {
    try {
      const htmlContent = buildManualBroadcastHtml({
        category,
        heading: heading || subject,
        message,
        ctaText,
        ctaUrl,
        resolvedImageUrl: imageInfo.displayUrl,
        recipientEmail: subscriber.email
      });

      await transporter.sendMail({
        from: `"${senderName}" <${senderEmail}>`,
        to: subscriber.email,
        replyTo: senderEmail,
        subject,
        html: htmlContent,
        text: `${heading || subject}\n\n${message}\n\n${ctaText ? `${ctaText}: ${ctaUrl}` : ''}`,
        attachments: imageInfo.attachments
      });

      sentCount++;
      console.log(`[Manual Broadcast Success] Sent to ${subscriber.email}`);
    } catch (err) {
      failedCount++;
      errors.push({ email: subscriber.email, error: err.message });
      console.error(`[Manual Broadcast Fail] Failed sending to ${subscriber.email}:`, err.message);
    }
  }

  // Save audit log to database
  let savedLog = null;
  if (prisma.broadcastLog) {
    try {
      savedLog = await prisma.broadcastLog.create({
        data: {
          subject,
          category: category || 'ANNOUNCEMENT',
          heading: heading || subject,
          recipientCount: subscribers.length,
          sentCount,
          failedCount,
          status: failedCount === 0 ? 'COMPLETED' : sentCount > 0 ? 'PARTIAL' : 'FAILED'
        }
      });
    } catch (logErr) {
      console.warn('[Broadcast Log Warning] Could not save log to DB:', logErr.message);
    }
  }

  console.log(`[Manual Broadcast Completed] Total: ${subscribers.length} | Sent: ${sentCount} | Failed: ${failedCount}`);
  return { 
    success: true, 
    count: subscribers.length, 
    sent: sentCount, 
    failed: failedCount, 
    errors,
    logId: savedLog?.id || null 
  };
};

module.exports = { 
  sendContactEmail, 
  sendNewsletterConfirmationEmail,
  sendBlogBroadcastToSubscribers,
  sendSingleTestEmail,
  sendManualBroadcastToSubscribers
};
