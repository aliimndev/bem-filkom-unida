import nodemailer from 'nodemailer';

// Konfigurasi transporter email
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail', // Menggunakan Gmail service untuk email institusi
    auth: {
      user: process.env.EMAIL_USER, // Email pengirim (bem.filkom@unida.ac.id)
      pass: process.env.EMAIL_PASS, // Password
    },
  });
};

export interface EmailData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const sendContactEmail = async (data: EmailData): Promise<void> => {
  const transporter = createTransporter();
  
  const mailOptions = {
    from: process.env.EMAIL_USER, // Email pengirim (bem.filkom@unida.ac.id)
    to: 'bem.filkom@unida.ac.id', // Email tujuan (sama dengan pengirim)
    subject: `[Contact Form] ${data.subject || 'Pesan dari ' + data.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
          Pesan Baru dari Website BEM FILKOM
        </h2>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #495057; margin-top: 0;">Detail Pengirim:</h3>
          <p><strong>Nama:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Subject:</strong> ${data.subject || 'Tidak ada subject'}</p>
        </div>
        
        <div style="background-color: #ffffff; padding: 20px; border: 1px solid #dee2e6; border-radius: 8px;">
          <h3 style="color: #495057; margin-top: 0;">Pesan:</h3>
          <p style="line-height: 1.6; color: #333;">${data.message.replace(/\n/g, '<br>')}</p>
        </div>
        
        <div style="margin-top: 20px; padding: 15px; background-color: #e9ecef; border-radius: 8px; font-size: 12px; color: #6c757d;">
          <p><strong>Waktu:</strong> ${new Date().toLocaleString('id-ID', { 
            timeZone: 'Asia/Jakarta',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}</p>
          <p><strong>Dikirim dari:</strong> Website BEM FILKOM Universitas Djuanda</p>
        </div>
      </div>
    `,
    text: `
Pesan Baru dari Website BEM FILKOM

Detail Pengirim:
- Nama: ${data.name}
- Email: ${data.email}
- Subject: ${data.subject || 'Tidak ada subject'}

Pesan:
${data.message}

Waktu: ${new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })}
Dikirim dari: Website BEM FILKOM Universitas Djuanda
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email berhasil dikirim ke bem.filkom@unida.ac.id');
  } catch (error) {
    console.error('Error mengirim email:', error);
    throw new Error('Gagal mengirim email. Silakan coba lagi nanti.');
  }
};
