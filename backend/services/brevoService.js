const { BrevoClient } = require('@getbrevo/brevo');

/**
 * Send contact inquiry email via Brevo HTTP API
 * @param {Object} data 
 * @param {string} data.fullName
 * @param {string} data.email
 * @param {string} data.mobile
 * @param {string} data.subject
 * @param {string} data.message
 */
const sendContactEmail = async ({ fullName, email, mobile, subject, message }) => {
  const apiKey = process.env.BREVO_API_KEY;

  if (!apiKey) {
    console.warn('[Brevo Service] BREVO_API_KEY is not set in environment variables. Email notification skipped.');
    return { success: false, error: 'BREVO_API_KEY is missing in backend/.env' };
  }

  try {
    const client = new BrevoClient({ apiKey });

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
          Sent securely via KisanMitra Web Portal • Powered by Brevo HTTP Transactional Engine
        </div>
      </div>
    `;

    const response = await client.transactionalEmails.sendTransacEmail({
      subject: `[KisanMitra Contact] ${subject} - ${fullName}`,
      htmlContent: htmlContent,
      sender: {
        name: process.env.BREVO_SENDER_NAME || 'KisanMitra Support',
        email: process.env.BREVO_SENDER_EMAIL || 'support@kisanmitra.com'
      },
      to: [
        {
          email: process.env.CONTACT_RECEIVER_EMAIL || process.env.BREVO_SENDER_EMAIL || 'support@kisanmitra.com',
          name: 'KisanMitra Admin'
        }
      ],
      replyTo: {
        email: email,
        name: fullName
      }
    });

    return { success: true, response };
  } catch (error) {
    const errorMsg = error?.body?.message || error?.message || String(error);
    console.error('[Brevo Error]:', errorMsg);
    return { success: false, error: errorMsg };
  }
};

module.exports = { sendContactEmail };
