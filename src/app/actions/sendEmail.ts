'use server'

import nodemailer from 'nodemailer';

interface FormData {
  attending: 'yes' | 'no';
  name: string;
  phone: string;
  email: string;
  accommodation: string;
  dietary: string;
  brunch: boolean;
}

export async function sendEmail(formData: FormData) {
  try {
    // Validate required environment variables
    const gmailUser = process.env.GMAIL_USER;
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

    if (!gmailUser || !gmailAppPassword) {
      throw new Error('Gmail credentials not configured in environment variables');
    }

    // Create transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailAppPassword, // Use app-specific password, not regular password
      },
    });

    // Prepare email content
    const attendingText = formData.attending === 'yes' ? 'Kommer att närvara' : 'Kommer inte att närvara';
    const brunchText = formData.brunch ? 'Ja' : 'Nej';

    const emailContent = `
Ny RSVP för Max & Miku's bröllop

Närvarande: ${attendingText}
Namn: ${formData.name}
Telefon: ${formData.phone}
E-post: ${formData.email}
Boende: ${formData.accommodation}
Specialkost: ${formData.dietary || 'Ingen angiven'}
Brunch: ${brunchText}

Skickad: ${new Date().toLocaleString('sv-SE')}
    `.trim();

    // Send email
    const mailOptions = {
      from: gmailUser,
      to: 'MaxMikuGodfrey@gmail.com', // Send to yourself
      subject: `RSVP från ${formData.name} - Max & Miku's bröllop`,
      text: emailContent,
      html: `
        <h2>Ny RSVP för Max & Miku's bröllop</h2>
        <table style="border-collapse: collapse; width: 100%;">
          <tr style="border-bottom: 1px solid #ddd;">
            <td style="padding: 8px; font-weight: bold;">Närvarande:</td>
            <td style="padding: 8px;">${attendingText}</td>
          </tr>
          <tr style="border-bottom: 1px solid #ddd;">
            <td style="padding: 8px; font-weight: bold;">Namn:</td>
            <td style="padding: 8px;">${formData.name}</td>
          </tr>
          <tr style="border-bottom: 1px solid #ddd;">
            <td style="padding: 8px; font-weight: bold;">Telefon:</td>
            <td style="padding: 8px;">${formData.phone}</td>
          </tr>
          <tr style="border-bottom: 1px solid #ddd;">
            <td style="padding: 8px; font-weight: bold;">E-post:</td>
            <td style="padding: 8px;">${formData.email}</td>
          </tr>
          <tr style="border-bottom: 1px solid #ddd;">
            <td style="padding: 8px; font-weight: bold;">Boende:</td>
            <td style="padding: 8px;">${formData.accommodation}</td>
          </tr>
          <tr style="border-bottom: 1px solid #ddd;">
            <td style="padding: 8px; font-weight: bold;">Specialkost:</td>
            <td style="padding: 8px;">${formData.dietary || 'Ingen angiven'}</td>
          </tr>
          <tr style="border-bottom: 1px solid #ddd;">
            <td style="padding: 8px; font-weight: bold;">Brunch:</td>
            <td style="padding: 8px;">${brunchText}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold;">Skickad:</td>
            <td style="padding: 8px;">${new Date().toLocaleString('sv-SE')}</td>
          </tr>
        </table>
      `,
    };

    const result = await transporter.sendMail(mailOptions);
    
    return {
      success: true,
      message: 'RSVP skickat framgångsrikt!',
      messageId: result.messageId,
    };

  } catch (error) {
    console.error('Error sending email:', error);
    
    return {
      success: false,
      message: 'Det gick inte att skicka RSVP. Försök igen eller kontakta oss direkt.',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}