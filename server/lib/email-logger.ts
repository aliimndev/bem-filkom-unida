import 'dotenv/config';

// Solusi sederhana: Simpan pesan dan kirim notifikasi
export interface EmailData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const logContactMessage = async (data: EmailData): Promise<void> => {
  const timestamp = new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' });
  
  const logMessage = `
========================================
PESAN BARU DARI WEBSITE BEM FILKOM
========================================
Waktu: ${timestamp}
Nama: ${data.name}
Email: ${data.email}
Subject: ${data.subject || 'Tidak ada subject'}
Pesan:
${data.message}
========================================
`;

  console.log(logMessage);
  
  // Simpan ke file log
  const fs = await import('fs');
  const logFile = 'contact-messages.log';
  
  try {
    fs.appendFileSync(logFile, logMessage + '\n');
    console.log(`✅ Pesan tersimpan di ${logFile}`);
  } catch (error) {
    console.error('Error menyimpan log:', error);
  }
};
