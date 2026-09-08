const { PrismaClient } = require('@prisma/client');
const { sendContactEmail } = require('../services/emailService');

let prisma;
try {
  prisma = new PrismaClient();
} catch (err) {
  console.warn('[Prisma Warning] Could not instantiate PrismaClient immediately:', err.message);
}

const submitContactForm = async (req, res) => {
  try {
    const { fullName, email, mobile, subject, message } = req.body;

    // Validate required fields
    if (!fullName || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        error: 'Full name, email address, subject, and message are required.'
      });
    }

    // Basic email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid email address.'
      });
    }

    // 1. Attempt to save to database (audit record)
    let savedRecord = null;
    if (prisma && prisma.contactMessage) {
      try {
        savedRecord = await prisma.contactMessage.create({
          data: {
            fullName: fullName.trim(),
            email: email.trim().toLowerCase(),
            mobile: mobile ? mobile.trim() : null,
            subject: subject.trim(),
            message: message.trim()
          }
        });
      } catch (dbError) {
        console.warn('[Database Warning] Could not persist message to DB:', dbError.message);
      }
    }

    // 2. Dispatch email via Custom Domain SMTP (mail.shamiit.com)
    const emailResult = await sendContactEmail({
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      mobile: mobile ? mobile.trim() : '',
      subject: subject.trim(),
      message: message.trim()
    });

    if (!emailResult.success) {
      return res.status(502).json({
        success: false,
        error: emailResult.error || 'Failed to dispatch email via SMTP.'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Thank you for reaching out! We have received your message and will respond promptly.',
      recordId: savedRecord?.id || null
    });
  } catch (error) {
    console.error('[Contact Controller Error]:', error);
    return res.status(500).json({
      success: false,
      error: 'An unexpected error occurred while processing your message. Please try again later.'
    });
  }
};

module.exports = { submitContactForm };
