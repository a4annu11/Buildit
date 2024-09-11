import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
} from "./emailTemplates.js";
import { sendEmail } from "./nodemailer.js";

export const sendVerificationEmail = async (to, verificationToken) => {
  const subject = "Verify your email address";
  const html = VERIFICATION_EMAIL_TEMPLATE.replace(
    "{verificationCode}",
    verificationToken
  );
  await sendEmail({ to, subject, html });
};

export const sendWelcomeEmail = async (to, name) => {
  const subject = "Welcome to our platform!";
  const html = `<p>Hi ${name},</p><p>Thank you for verifying your email. Welcome to our platform!</p>`;
  await sendEmail({ to, subject, html });
};

export const sendPasswordResetEmail = async (to, resetLink) => {
  const subject = "Password Reset Request";
  const html = PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetLink);
  await sendEmail({ to, subject, html });
};

export const sendResetSuccessEmail = async (to) => {
  const subject = "Password Reset Successful";
  const html = PASSWORD_RESET_SUCCESS_TEMPLATE;
  await sendEmail({ to, subject, html });
};

export const sendEmailToAdmin = async (serviceProvider) => {
  const to = "buildit.operations@gmail.com"; // Admin email
  const subject = "New Service Provider Verification Request";
  const html = `
    <p>A new service provider has registered and requires verification.</p>
    <p><strong>Name:</strong> ${serviceProvider.name}</p>
    <p><strong>Email:</strong> ${serviceProvider.email}</p>
    <p>Please log in to the admin dashboard to verify this account.</p>
  `;

  await sendEmail({ to, subject, html });
};
