import nodemailer from "nodemailer";

// Create a transporter using SMTP or a dummy transport
const createTransporter = async () => {
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT || 587,
      secure: process.env.SMTP_SECURE === "true", 
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  // Fallback to a mock transporter that just logs to console
  console.warn("⚠️ No SMTP credentials found. Emails will be logged to console instead of sent.");
  return {
    sendMail: async (mailOptions) => {
      console.log("-----------------------------------------");
      console.log(`📧 MOCK EMAIL SENT TO: ${mailOptions.to}`);
      console.log(`📝 SUBJECT: ${mailOptions.subject}`);
      console.log(`📄 CONTENT: \n${mailOptions.text || mailOptions.html}`);
      console.log("-----------------------------------------");
      return { messageId: "mock-id-123" };
    }
  };
};

export const sendEmail = async ({ to, subject, html, text }) => {
  try {
    const transporter = await createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_FROM || '"Zolix CRM" <noreply@zolix.app>',
      to,
      subject,
      text: text || "Please view this email in a client that supports HTML.",
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully to ${to}`);
    return info;
  } catch (error) {
    console.error(`Failed to send email to ${to}:`, error);
    throw new Error("Email sending failed");
  }
};

export const sendInviteEmail = async (toEmail, inviteToken) => {
  const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
  const inviteLink = `${frontendUrl}/invite/${inviteToken}`;
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaec; border-radius: 8px;">
      <h2 style="color: #333; text-align: center;">You've been invited to Zolix CRM</h2>
      <p style="color: #555; font-size: 16px;">Hello,</p>
      <p style="color: #555; font-size: 16px;">You have been invited to join your team on Zolix CRM. Click the button below to set up your account and get started.</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${inviteLink}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px;">Accept Invitation</a>
      </div>
      <p style="color: #555; font-size: 14px;">If the button doesn't work, you can copy and paste this link into your browser:</p>
      <p style="background-color: #f4f4f5; padding: 10px; border-radius: 4px; word-break: break-all; color: #333; font-size: 14px;">${inviteLink}</p>
      <hr style="border: none; border-top: 1px solid #eaeaec; margin: 30px 0;" />
      <p style="color: #888; font-size: 12px; text-align: center;">Zolix CRM - The modern way to manage your business.</p>
    </div>
  `;

  await sendEmail({
    to: toEmail,
    subject: "You are invited to join Zolix CRM",
    html,
  });
};
