import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import Reveal from "@/components/effects/Reveal";
import { motion, AnimatePresence } from "framer-motion"; 
// FIXED: Tambah import untuk animasi slide smooth

function Section({ className, children }: React.PropsWithChildren<{ className?: string }>) {
  return <section className={cn("py-16 md:py-24", className)}>{children}</section>;
}

function Hero() {
  return (
    <Section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute -top-32 left-1/2 size-[550px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,hsl(var(--accent)/0.25),transparent_60%)] blur-3xl" />
      </div>
      <div className="container max-w-4xl text-center">
        <Reveal y={10} delay={50}>
          <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-foreground/70 bg-background/60 backdrop-blur">
            <span className="size-2 rounded-full bg-primary" /> Tentang BEM FILKOM
          </div>
        </Reveal>
        <Reveal y={18} delay={120}>
          <h1 className="mt-4 text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
            Bangkit Bersama <br/>BEM FILKOM UNIDA <br /> di Era Digital Tauhid
          </h1>
        </Reveal>
        <Reveal y={18} delay={200}>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Lahir bersama FILKOM pada 2023, BEM FILKOM adalah denyut nadi mahasiswa Ilmu Komputer UNIDA—penggerak inovasi yang menyatukan teknologi canggih dengan nilai Pancadarma. Di Kabinet Neogenesis 2025, kami lahirkan "Neogenesis": regenerasi dinamis yang inklusif, kolaboratif, dan siap ubah FILKOM jadi pusat tech berbasis Tauhid untuk bangsa maju.
          </p>
        </Reveal>
        <Reveal y={18} delay={260}>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Button asChild className="shadow bg-accent text-accent-foreground hover:bg-accent/90" aria-label="Gabung Tim Kami">
              <Link to="/divisions">Lihat Divisi Kami</Link>
            </Button>
            <Button asChild variant="outline" aria-label="Hubungi Kami">
              <Link to="/contact">Mari Berkolaborasi</Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

function VisionMission() {
  const [currentSlide, setCurrentSlide] = useState(0); // FIXED: State untuk track slide aktif (0: Dekan, 1: Wakil Dekan)

  const slides = [
    // Slide 1: Dekan
    {
      name: "Dr. Ir. H. Himmatul Miftah, M.Si., MPM",
      position: "Dekan Fakultas Ilmu Komputer",
      image: "/assets/about/dekan-filkom.jpeg",
      quote: "FILKOM UNIDA adalah tempat penuh potensi tak terbatas—kami tekankan pendidikan ilmu komputer di dunia yang terhubung teknologi, untuk ciptakan lulusan unggul yang bersatu dalam Tauhid dan standar internasional.",
      description: "Sejak resmi berdiri 2023, FILKOM kelola S1 Ilmu Komputer dengan amanah visi: bangun fakultas unggul yang edukasi bangsa via tech inovatif. Dengan kepercayaan masyarakat yang melonjak, kami siap tambah prodi baru—mari wujudkan kemajuan bersama!",
    },
    // Slide 2: Wakil Dekan
    {
      name: "Muhammad Encep, S.Kom., M.T.I., MTA",
      position: "Wakil Dekan Bidang Akademik",
      image: "/assets/about/wakil-dekan.webp",
      quote: "Diharapkan mahasiswa dapat sharing knowledge dengan dosen-praktisi berpengalaman, perkuat riset & inovasi—jadi lulusan unggul dengan magang luar negeri dan referensi industri nyata.",
      description: "Pimpin kurikulum terintegrasi Pancadarma (Pendidikan, Penelitian, Pengabdian, Ketauhidan, Profesionalitas), ia bangun lingkungan belajar kekeluargaan—di mana kebersamaan dorong mahasiswa FILKOM capai prestasi global.",
    },
  ];

  const nextSlide = () => setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1)); // FIXED: Next slide, loop ke awal
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1)); // FIXED: Prev slide, loop ke akhir

  return (
    <Section>
      <div className="container">
        <div className="text-center mb-12">
          <Reveal y={16}>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Kata Pengantar</h2>
          </Reveal>
          <Reveal y={16} delay={100}>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              Sambutan dari Pimpinan Fakultas Ilmu Komputer Universitas Djuanda
            </p>
          </Reveal>
        </div>
        {/* FIXED: Slider Container */}
        <div className="relative max-w-4xl mx-auto mb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide} // FIXED: Key unik untuk trigger animasi per slide
              initial={{ x: currentSlide === 0 ? "100%" : "-100%", opacity: 0 }} // FIXED: Slide in dari kanan/kiri
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: currentSlide === 0 ? "-100%" : "100%", opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }} // FIXED: Smooth transition
              className="flex flex-col md:flex-row items-center gap-8"
            >
              <div className="w-full md:w-1/2">
                <img
                  src={slides[currentSlide].image}
                  alt={`${slides[currentSlide].name}, ${slides[currentSlide].position}`}
                  className="w-full h-auto object-contain rounded-lg shadow-md" // FIX: Ganti ke object-contain biar foto full tanpa crop kepala; tambah object-position: top kalau perlu prioritas atas
                  style={{ aspectRatio: "3/4" }} // FIX: Adjust ratio lebih square (3:4) biar kepala aman, gak terlalu portrait
                />
              </div>
              <div className="w-full md:w-1/2 space-y-4">
                <blockquote className="border-l-4 border-primary pl-4 italic text-lg text-foreground">
                  "{slides[currentSlide].quote}"
                  <footer className="mt-2 text-sm text-muted-foreground">— {slides[currentSlide].name}</footer>
                </blockquote>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {slides[currentSlide].description}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* FIXED: Navigation Arrows */}
          <div className="flex justify-center gap-4 mt-6">
            <Button
              variant="outline"
              size="sm"
              onClick={prevSlide}
              aria-label="Slide sebelumnya"
              className="p-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </Button>
            <div className="flex items-center gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={cn(
                    "size-3 rounded-full transition-colors",
                    currentSlide === index ? "bg-primary" : "bg-muted hover:bg-primary/50"
                  )}
                  aria-label={`Pilih slide ${index + 1}`}
                />
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={nextSlide}
              aria-label="Slide selanjutnya"
              className="p-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </Button>
          </div>

          {/* FIXED: Indicators Text */}
          <p className="text-center text-sm text-muted-foreground mt-4">
            Slide {currentSlide + 1} dari {slides.length}
          </p>
        </div>
      </div>
    </Section>
  );
}

function Leadership() {
  const leaders = [
    {
      name: "Muhammad Sahrulloh Nursa'ban",
      position: "Ketua BEM FILKOM",
      division: "Kabinet Neogenesis",
      image: "/assets/about/ketu.webp",
      quote: "BEM FILKOM bukan sekadar organisasi—ini platform regenerasi di mana ide tech lahir untuk ubah FILKOM jadi leader inovasi UNIDA.",
    },
    {
      name: "Aulia Alhafidz",
      position: "Wakil Ketua BEM FILKOM",
      division: "Kabinet Neogenesis",
      image: "/assets/about/watum.jpeg",
      quote: "Diharapkan mahasiswa dapat bergabung bersama BEM FILKOM dalam permainan Roblox Fish It untuk menikmati keseruan memancing bersama selama 24 jam nonstop.",
    },
  ];

  return (
    <Section>
      <div className="container">
        <div className="text-center mb-12">
          <Reveal y={16}>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Pemimpin BEM FILKOM Saat Ini</h2>
          </Reveal>
          <Reveal y={16} delay={100}>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              Ketua dan Wakil Ketua Kabinet Neogenesis yang memimpin BEM sebagai pionir organisasi mahasiswa FILKOM—siap wujudkan perubahan nyata untuk generasi pertama.
            </p>
          </Reveal>
        </div>
        <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          {leaders.map((leader, index) => (
            <Reveal key={leader.name} y={20} delay={150 + index * 50}>
              <Card className="h-full">
                <CardHeader className="flex justify-center p-6">
                  <div className="max-w-xs w-full mx-auto">
                    <img
                      src={leader.image}
                      alt={`${leader.name}, ${leader.position}`}
                      className="w-full h-auto object-contain rounded-lg shadow-md" // FIX: Ganti ke object-contain biar foto full tanpa crop
                      style={{ aspectRatio: "1/1" }} // FIX: Adjust ratio lebih square (1:1) biar kepala aman
                    />
                  </div>
                </CardHeader>
                <CardContent className="text-center space-y-3">
                  <CardTitle className="text-lg">{leader.name}</CardTitle>
                  <CardDescription className="font-medium text-primary">{leader.position}</CardDescription>
                  <Badge variant="secondary" className="w-fit mx-auto">{leader.division}</Badge>
                  <blockquote className="border-l-4 border-primary pl-4 italic text-sm text-foreground">
                    "{leader.quote}"
                    <footer className="mt-2 text-xs text-muted-foreground">— {leader.name}</footer>
                  </blockquote>
                  <Button 
                    asChild 
                    variant="outline" 
                    size="sm" 
                    className="w-full mt-2"
                  >
                    <Link to="/contact?role=leadership">
                      Kolaborasi dengan Tim
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

function Values() {
  const values = [
    {
      title: "Local Wisdom",
      description: "Kami hormati & integrasikan budaya lokal, tradisi, dan pengetahuan daerah untuk kuatkan identitas komunitas FILKOM yang berakar kuat.",
      icon: (
        <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 7l9-4 9 4-9 4-9-4z" />
          <path d="M21 10v6" />
          <path d="M3 10v6l9 4 9-4" />
        </svg>
      ),
    },
    {
      title: "National Wisdom",
      description: "Junjung nilai persatuan bangsa, bangun kebanggaan & tanggung jawab untuk kemajuan Indonesia melalui inovasi tech berkelanjutan.",
      icon: (
        <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ),
    },
    {
      title: "Global Wisdom",
      description: "Peluk perspektif internasional & adaptasi standar dunia, kontribusi pada kemajuan global sambil jaga esensi Tauhid.",
      icon: (
        <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
        </svg>
      ),
    },
    {
      title: "Spiritual Wisdom",
      description: "Tanam nilai Siddiq, Amanah, Tabligh, Fathonah—promosikan etika, empati, & istiqomah dalam setiap aksi tech kami.",
      icon: (
        <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="2" x2="12" y2="22" />
          <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
          <line x1="19.07" y1="4.93" x2="4.93" y2="19.07" />
          <line x1="2" y1="12" x2="22" y2="12" />
        </svg>
      ),  
    },
  ];

  return (
    <Section className="relative">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,hsl(var(--accent)/0.08),transparent_70%)]" />
      <div className="container">
        <div className="text-center mb-12">
          <Reveal y={16}>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Nilai-Nilai yang Harus Dijunjung Tinggi</h2>
          </Reveal>
          <Reveal y={16} delay={100}>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              Prinsip dasar yang membimbing tindakan kami dan membentuk budaya organisasi.
            </p>
          </Reveal>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {values.map((value, index) => (
            <Reveal key={value.title} y={20} delay={150 + index * 50}>
              <Card className="h-full group hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex size-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 text-primary group-hover:scale-110 transition-transform">
                    {value.icon}
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

function CallToAction() {
  return (
    <Section className="relative bg-gradient-to-b from-background to-muted/50">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,hsl(var(--primary)/0.08),transparent_70%)]" />
      <div className="container text-center max-w-3xl">
        <Reveal y={16}>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Siap Ubah FILKOM Jadi Lebih Unggul?
          </h2>
        </Reveal>
        <Reveal y={16} delay={100}>
          <p className="mt-3 text-muted-foreground">
            Gabung BEM FILKOM sekarang—jadi bagian komunitas yang hargai suara mu, dukung pertumbuhan karir tech, dan ciptakan dampak nyata lewat Pancadarma. Generasi pertama FILKOM butuh kamu!
          </p>
        </Reveal>
        <Reveal y={18} delay={200}>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Button asChild className="shadow bg-accent text-accent-foreground hover:bg-accent/90" aria-label="Jelajahi Divisi">
              <Link to="/divisions">Lihat Divisi Kami</Link>
            </Button>
            <Button asChild variant="outline" aria-label="Hubungi Kami">
              <Link to="/contact">Mari Berkolaborasi</Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

export default function About() {
  return (
    <div>
      <Hero />
      <VisionMission />
      <Leadership />
      <Values />
      <CallToAction />
    </div>
  );
}