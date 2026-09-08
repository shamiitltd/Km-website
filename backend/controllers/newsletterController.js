const { PrismaClient } = require('@prisma/client');
const { 
  sendNewsletterConfirmationEmail,
  sendSingleTestEmail,
  sendManualBroadcastToSubscribers
} = require('../services/emailService');

let prisma;
try {
  prisma = new PrismaClient();
} catch (err) {
  console.warn('[Prisma Warning] Could not instantiate PrismaClient in newsletterController:', err.message);
}

/**
 * Handle newsletter / waitlist subscription
 * POST /api/newsletter/subscribe
 * Body: { email, source, sourceLabel }
 */
const subscribeNewsletter = async (req, res) => {
  try {
    const { email, source = 'general', sourceLabel } = req.body;

    // Validate email presence
    if (!email || !email.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid email address.'
      });
    }

    const trimmedEmail = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return res.status(400).json({
        success: false,
        error: 'The email address format is invalid.'
      });
    }

    const normalizedSource = (source || 'general').trim().toLowerCase();
    const finalSourceLabel = sourceLabel || normalizedSource;

    let isNewSubscriber = true;
    let savedRecord = null;

    // 1. Attempt to persist to database via Prisma (Global uniqueness on email)
    if (prisma && prisma.newsletterSubscriber) {
      try {
        const existing = await prisma.newsletterSubscriber.findUnique({
          where: {
            email: trimmedEmail
          }
        });

        if (existing) {
          isNewSubscriber = false;
          savedRecord = existing;
        } else {
          savedRecord = await prisma.newsletterSubscriber.create({
            data: {
              email: trimmedEmail,
              source: normalizedSource,
              sourceLabel: finalSourceLabel
            }
          });
        }
      } catch (dbErr) {
        console.warn('[Database Warning] Could not persist newsletter subscriber:', dbErr.message);
      }
    }

    // If user is already subscribed anywhere across the platform
    if (!isNewSubscriber) {
      return res.status(200).json({
        success: true,
        alreadySubscribed: true,
        message: "You are already subscribed! This email is already registered across all KisanMitra updates, pricing alerts, and newsletters."
      });
    }

    // 2. Dispatch personalized confirmation email to user & notify admin
    const emailResult = await sendNewsletterConfirmationEmail({
      email: trimmedEmail,
      source: normalizedSource,
      sourceLabel: finalSourceLabel
    });

    if (!emailResult.success) {
      // In case SMTP is misconfigured or failed
      return res.status(502).json({
        success: false,
        error: emailResult.error || 'Failed to dispatch confirmation email via SMTP.'
      });
    }

    return res.status(200).json({
      success: true,
      message: "You're all set! A confirmation email has been dispatched to your inbox.",
      recordId: savedRecord?.id || null
    });
  } catch (error) {
    console.error('[Newsletter Controller Error]:', error);
    return res.status(500).json({
      success: false,
      error: 'An unexpected error occurred while processing your subscription. Please try again.'
    });
  }
};

/**
 * GET /api/newsletter/stats (Protected)
 * Returns subscriber count & recent broadcasts
 */
const getBroadcastStats = async (req, res) => {
  try {
    let subscriberCount = 0;
    let recentBroadcasts = [];

    if (prisma && prisma.newsletterSubscriber) {
      subscriberCount = await prisma.newsletterSubscriber.count();
    }

    if (prisma && prisma.broadcastLog) {
      recentBroadcasts = await prisma.broadcastLog.findMany({
        orderBy: { sentAt: 'desc' },
        take: 10
      });
    }

    res.json({
      success: true,
      subscriberCount,
      recentBroadcasts
    });
  } catch (error) {
    console.error('[Broadcast Stats Error]:', error);
    res.status(500).json({ success: false, error: 'Failed to retrieve stats' });
  }
};

/**
 * POST /api/newsletter/test-broadcast (Protected)
 * Dispatches a single test email preview to specified address
 */
const sendTestBroadcast = async (req, res) => {
  try {
    const { testEmail, subject, category, heading, message, ctaText, ctaUrl, imageUrl } = req.body;

    if (!testEmail || !testEmail.trim()) {
      return res.status(400).json({ success: false, error: 'Test recipient email is required' });
    }
    if (!subject || !subject.trim()) {
      return res.status(400).json({ success: false, error: 'Subject is required' });
    }
    if (!message || !message.trim()) {
      return res.status(400).json({ success: false, error: 'Message content is required' });
    }

    const result = await sendSingleTestEmail({
      testEmail: testEmail.trim(),
      subject: subject.trim(),
      category: category || 'ANNOUNCEMENT',
      heading: heading || subject,
      message: message.trim(),
      ctaText,
      ctaUrl,
      imageUrl
    });

    if (!result.success) {
      return res.status(502).json({ success: false, error: result.error });
    }

    res.json({
      success: true,
      message: `Test preview email successfully dispatched to ${testEmail}!`
    });
  } catch (error) {
    console.error('[Send Test Error]:', error);
    res.status(500).json({ success: false, error: error.message || 'Internal server error' });
  }
};

/**
 * POST /api/newsletter/broadcast (Protected)
 * Dispatches manual broadcast to all active subscribers
 */
const dispatchManualBroadcast = async (req, res) => {
  try {
    const { subject, category, heading, message, ctaText, ctaUrl, imageUrl } = req.body;

    if (!subject || !subject.trim()) {
      return res.status(400).json({ success: false, error: 'Broadcast subject is required' });
    }
    if (!message || !message.trim()) {
      return res.status(400).json({ success: false, error: 'Message content is required' });
    }

    const result = await sendManualBroadcastToSubscribers({
      subject: subject.trim(),
      category: category || 'ANNOUNCEMENT',
      heading: heading || subject,
      message: message.trim(),
      ctaText,
      ctaUrl,
      imageUrl
    });

    if (!result.success) {
      return res.status(502).json({ success: false, error: result.error });
    }

    res.json({
      success: true,
      count: result.count,
      sent: result.sent,
      failed: result.failed,
      errors: result.errors,
      logId: result.logId,
      message: `Broadcast completed! Dispatched to ${result.sent} of ${result.count} subscribers.`
    });
  } catch (error) {
    console.error('[Manual Broadcast Error]:', error);
    res.status(500).json({ success: false, error: error.message || 'Internal server error' });
  }
};

module.exports = { 
  subscribeNewsletter,
  getBroadcastStats,
  sendTestBroadcast,
  dispatchManualBroadcast
};
