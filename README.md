# 🌟 BEM FILKOM UNIDA - Website Resmi

![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) ![Vite](https://img.shields.io/badge/Vite-F7B84B?style=for-the-badge&logo=vite&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white) ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white) ![Radix UI](https://img.shields.io/badge/Radix_UI-000000?style=for-the-badge&logo=radix-ui&logoColor=white)![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white) ![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white) ![Nodemailer](https://img.shields.io/badge/Nodemailer-00D4AA?style=for-the-badge&logo=nodemailer&logoColor=white) ![CORS](https://img.shields.io/badge/CORS-4A90E2?style=for-the-badge&logo=cors&logoColor=white)![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white) ![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white) ![Vitest](https://img.shields.io/badge/Vitest-FFD700?style=for-the-badge&logo=vitest&logoColor=black) ![PostCSS](https://img.shields.io/badge/PostCSS-DC3C00?style=for-the-badge&logo=postcss&logoColor=white)![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white) ![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

Website resmi Badan Eksekutif Mahasiswa Fakultas Ilmu Komputer Universitas Djuanda dengan Kabinet Neogenesis.

## 🚀 Fitur Utama

### ✨ **Visual Effects**
- **Plexus Effect Background**: Animasi jaringan interaktif dengan nodes yang bergerak dinamis
- **Cursor Glow Effect**: Efek spotlight yang mengikuti pergerakan mouse
- **Reveal Animations**: Animasi staggered untuk konten dengan Framer Motion
- **Glass Morphism Design**: Desain modern dengan efek kaca dan blur

### 📱 **Responsive Design**
- Fully responsive untuk semua ukuran layar
- Mobile-first approach
- Touch-friendly interactions
- Optimized untuk berbagai device

### 🎨 **Modern UI/UX**
- Clean dan minimalis design
- Smooth animations dan transitions
- Interactive elements dengan hover effects
- Accessibility compliant

### 🔧 **Technical Features**
- Server-Side Rendering (SSR) dengan Vite
- TypeScript untuk type safety
- Tailwind CSS untuk styling
- React Router untuk navigation
- Email integration untuk contact form

## 🛠️ Tech Stack

### Frontend
- **React 18** ⚛️ - UI Framework
- **TypeScript** 🔤 - Type Safety
- **Vite** ⚡ - Build Tool & Dev Server
- **Tailwind CSS** 🎨 - Styling Framework
- **Framer Motion** 🎭 - Animation Library
- **React Router DOM** 🛤️ - Client-side Routing
- **Radix UI** 🔧 - Accessible UI Components

### Backend
- **Express.js** 🚀 - Web Framework
- **Node.js** 🟢 - Runtime Environment
- **Nodemailer** 📧 - Email Service
- **CORS** 🌐 - Cross-Origin Resource Sharing

### Development Tools
- **Prettier** 💅 - Code Formatting
- **ESLint** 🔍 - Code Linting
- **Vitest** 🧪 - Testing Framework
- **PostCSS** 🎭 - CSS Processing

## 📁 Struktur Proyek

```
bem-filkom-unida/
├── client/                 # Frontend React App
│   ├── components/         # Reusable Components
│   │   ├── effects/       # Animation Effects
│   │   ├── layout/        # Layout Components
│   │   └── ui/           # UI Components (Radix UI)
│   ├── pages/            # Page Components
│   ├── hooks/            # Custom React Hooks
│   ├── lib/              # Utility Functions
│   └── global.css        # Global Styles
├── server/               # Backend Express App
│   ├── routes/           # API Routes
│   └── lib/              # Server Utilities
├── public/               # Static Assets
│   └── assets/           # Images, Videos, Audio
├── shared/               # Shared Code
└── dist/                 # Build Output
```

## 🚀 Instalasi & Setup

### Prerequisites
- Node.js 18+ 
- npm atau pnpm

### 1. Clone Repository
```bash
git clone <repository-url>
cd bem-filkom-unida
```

### 2. Install Dependencies
```bash
# Menggunakan npm
npm install

# Atau menggunakan pnpm (recommended)
pnpm install
```

### 3. Environment Setup
Buat file `.env` di root directory:
```env
# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=your-email@gmail.com
EMAIL_TO=admin@bemfilkom.com

# Server Configuration
PORT=3000
NODE_ENV=development
```

### 4. Development
```bash
# Start development server
npm run dev

# Atau
pnpm dev
```

### 5. Production Build
```bash
# Build untuk production
npm run build

# Start production server
npm start
```

## 📄 Halaman & Fitur

### 🏠 **Homepage (Index)**
- Hero section dengan foto kabinet
- Blur text animation
- Timeline program BEM FILKOM
- Info beasiswa dan program akademik
- Vision & Mission Kabinet Neogenesis

### 👥 **About**
- Kata pengantar dekan dan wakil dekan
- Profil ketua dan wakil ketua
- Sejarah BEM FILKOM

### 🏢 **Divisions**
- Informasi divisi-divisi BEM
- Profil masing-masing divisi

### 📰 **Gallery (News)**
- Galeri foto kegiatan
- Dokumentasi event
- Media sosial integration

### 📞 **Contact**
- Form kontak dengan validasi
- Email integration
- Informasi kontak lengkap

## 🎨 Customization

### Color Scheme
Warna utama dapat diubah di `client/global.css`:
```css
:root {
  --primary: 190 58% 58%;    /* Cyan */
  --secondary: 200 62% 42%;  /* Teal */
  --accent: 28 75% 62%;      /* Orange */
  --background: 200 48% 24%; /* Dark Blue */
}
```

### Plexus Effect Configuration
Sesuaikan efek Plexus di `client/pages/Index.tsx`:
```tsx
<PlexusEffect 
  nodeCount={60}              // Jumlah nodes
  connectionDistance={100}    // Jarak koneksi
  animationSpeed={0.3}        // Kecepatan animasi
  colors={{
    primary: 'rgba(107, 200, 226, 0.6)',
    secondary: 'rgba(75, 180, 210, 0.4)',
    accent: 'rgba(230, 148, 78, 0.5)',
  }}
/>
```

## 🔧 Scripts

```bash
# Development
npm run dev              # Start dev server
npm run build           # Build production
npm run build:client    # Build client only
npm run build:server    # Build server only
npm start              # Start production server

# Code Quality
npm run format.fix     # Format code dengan Prettier
npm run typecheck      # TypeScript type checking
npm test              # Run tests
```

## 📱 Responsive Breakpoints

```css
/* Mobile First */
sm: 640px    /* Small devices */
md: 768px    /* Medium devices */
lg: 1024px   /* Large devices */
xl: 1280px   /* Extra large devices */
2xl: 1536px  /* 2X large devices */
```

## 🚀 Deployment

### Netlify (Recommended)
1. Connect repository ke Netlify
2. Build command: `npm run build`
3. Publish directory: `dist/spa`
4. Environment variables: Set di Netlify dashboard

### Vercel
1. Import project ke Vercel
2. Framework: Vite
3. Build command: `npm run build`
4. Output directory: `dist/spa`

### Manual Server
1. Build project: `npm run build`
2. Upload `dist/` folder ke server
3. Install dependencies: `npm install --production`
4. Start server: `npm start`

## 🐛 Troubleshooting

### Common Issues

**1. Email tidak terkirim**
- Pastikan EMAIL_PASS menggunakan App Password (bukan password biasa)
- Check SMTP settings di `.env`

**2. Build error**
- Clear cache: `rm -rf node_modules dist`
- Reinstall: `npm install`

**3. Plexus Effect tidak muncul**
- Check browser console untuk errors
- Pastikan `isVisible` state true
- Verify canvas dimensions

**4. Performance issues**
- Reduce `nodeCount` di PlexusEffect
- Enable `isReducedMotion` untuk accessibility
- Check browser DevTools Performance tab

## 🤝 Contributing

1. Fork repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push branch: `git push origin feature/amazing-feature`
5. Open Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Tim Development

- **Frontend Development**: React, TypeScript, Tailwind CSS
- **Backend Development**: Express.js, Node.js
- **UI/UX Design**: Modern glass morphism design
- **Animation**: Framer Motion, Custom CSS animations

## 📞 Support

Untuk pertanyaan atau dukungan teknis:
- Email: bem.filkom@unida.ac.id
- GitHub Issues: [Repository Issues](https://github.com/aliimndev/bem-filkom-unida.git/issues)

---

**BEM FILKOM UNIDA** - Menumbuhkan Generasi Baru, Mewujudkan Inovasi Nyata 🚀
