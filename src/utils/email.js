import nodemailer from "nodemailer";

export const sendOTPEmail = async (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"E-Commerce" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Verify Your Email - OTP Code",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; background: #f9f9f9; border-radius: 8px; border: 1px solid #ddd;">
          <h2 style="text-align: center; color: #4CAF50;">🔐 Email Verification</h2>
          <p style="font-size: 16px; color: #333;">
            Hello,
          </p>
          <p style="font-size: 16px; color: #333;">
            Thank you for registering with <b>E-Commerce</b>. Please use the OTP below to verify your email address:
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <span style="font-size: 28px; font-weight: bold; letter-spacing: 4px; color: #fff; background: #4CAF50; padding: 10px 20px; border-radius: 6px; display: inline-block;">
              ${otp}
            </span>
          </div>
          <p style="font-size: 14px; color: #555;">
            ⚠️ This OTP will expire in <b>10 minutes</b>. Please do not share it with anyone.
          </p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          <p style="font-size: 12px; color: #999; text-align: center;">
            If you didn’t request this, you can safely ignore this email.<br>
            &copy; ${new Date().getFullYear()} Your App. All rights reserved.
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    //console.log("OTP Email sent successfully to", email);
  } catch (error) {
    //console.error(" Error sending email:", error);
    throw new Error("Failed to send OTP email");
  }
};

export default sendOTPEmail;
