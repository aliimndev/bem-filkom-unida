import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import Reveal from "@/components/effects/Reveal";
import PlexusEffect from "@/components/effects/PlexusEffect";
import { motion } from "framer-motion";

const KAB_PHOTO = "/assets/kabinet25.jpeg?v=3";

// Komponen BlurText sederhana: Hanya blur staggered tanpa glow
function BlurText({ text, className }: { text: string; className?: string }) {
  const letters = Array.from(text);

  return (
    <motion.div
      className={cn("relative inline-block", className)}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {
          opacity: 0,
          y: 20,
        },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          variants={{
            hidden: {
              opacity: 0,
              filter: "blur(10px)",
              y: 10,
            },
            visible: {
              opacity: 1,
              filter: "blur(0px)",
              y: 0,
              transition: {
                duration: 0.4,
                ease: "easeOut",
              },
            },
          }}
          className="inline-block relative"
          style={{
            color: "white", // Base color white tetap
          }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.div>
  );
}

function Section({
  className,
  id,
  children,
}: React.PropsWithChildren<{ className?: string; id?: string }>) {
  return (
    <section id={id} className={cn("py-16 md:py-24", className)} role="main">
      {" "}
      {/* FIXED: Tambah role untuk accessibility */}
      {children}
    </section>
  );
}

function Hero() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      if (bgRef.current) {
        bgRef.current.style.opacity = "1";
      }
    };
    img.onerror = () => {
      if (bgRef.current) {
        bgRef.current.style.opacity = "1";
      }
    };
    img.src = KAB_PHOTO;
    return () => {
      // FIXED: Cleanup useEffect
      img.onload = null;
      img.onerror = null;
    };
  }, []);

  return (
    <section
      className="relative"
      role="banner"
      aria-label="Hero section for BEM FILKOM Kabinet Neogenesis"
    >
      <div className="container py-10 md:py-14">
        <div
          ref={bgRef}
          className="relative overflow-hidden rounded-3xl border shadow-sm min-h-[50vh] md:min-h-[70vh] lg:min-h-[80vh] grid place-items-start pt-4 md:pt-6 opacity-0 transition-opacity duration-1000 ease-out bg-cover bg-no-repeat bg-center-top md:bg-center"
          style={{
            backgroundImage: `url(${KAB_PHOTO})`,
            backgroundSize: "cover",
            backgroundPosition: "center", // Default, overridden by Tailwind responsive
            backgroundRepeat: "no-repeat",
          }}
          aria-label="Foto Kabinet Neogenesis"
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.3),transparent_70%)]" />{" "}
          {/* Overlay lebih opaque */}
          <div className="relative z-10 w-full px-4 md:px-8 text-center">
            <Reveal y={10} delay={50}>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-[11px] md:text-xs text-white/95 bg-white/5">
                <span className="size-2 rounded-full bg-primary" /> Badan
                Eksekutif Mahasiswa
              </div>
            </Reveal>
            <Reveal y={18} delay={120}>
              <div className="flex flex-col md:flex-row items-center justify-center space-y-1 md:space-y-0 md:gap-2">
                <BlurText
                  text="Kabinet"
                  className="text-5xl md:text-6xl font-extrabold tracking-tight drop-shadow-2xl"
                />
                <BlurText
                  text="Neogenesis"
                  className="text-5xl md:text-7xl font-extrabold leading-[1.08] tracking-tight drop-shadow-2xl"
                />
              </div>
            </Reveal>
            <Reveal y={18} delay={200}>
              <p className="mt-4 md:mt-5 text-base md:text-xl text-white/95 max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
                Menumbuhkan Generasi Baru, Mewujudkan Inovasi Nyata.
              </p>
            </Reveal>
            <Reveal y={18} delay={260}>
              <div className="mt-8 flex items-center justify-center text-white/95">
                <button
                  type="button"
                  aria-label="Scroll down to main programs"
                  className="rounded-full p-2 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40 focus-visible:outline-none transition" // FIXED: Tambah focus-visible
                  onClick={() => {
                    document
                      .getElementById("main-programs")
                      ?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      document.getElementById("main-programs")?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="size-7 animate-bounce"
                    aria-hidden
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

// MODIFIKASI: ProgramsIntro dengan layout grid card-based untuk points
function ProgramsIntro() {
  const title =
    "Badan Eksekutif Mahasiswa Fakultas Ilmu Komputer Universitas Djuanda";

  const introPoints = [
    {
      text: "BEM FILKOM UNIDA merupakan organisasi mahasiswa yang menjalankan fungsi eksekutif di lingkungan Fakultas Ilmu Komputer Universitas Djuanda.",
      icon: "👥", // Emoji sederhana buat visual (bisa ganti SVG)
    },
    {
      text: "Kami berkomitmen untuk menjadi wadah yang aktif, solutif, dan progresif dalam mengembangkan potensi mahasiswa.",
      icon: "🚀",
    },
    {
      text: "Menciptakan dampak positif bagi lingkungan kampus dan masyarakat luas melalui inisiatif inovatif.",
      icon: "💡",
    },
    {
      text: "Memulai era baru dengan Kabinet Neogenesis: Fokus pada kolaborasi, teknologi, dan pengembangan diri.",
      icon: "🌱",
    },
  ];

  return (
    <Section id="main-programs" className="pt-10 md:pt-14 bg-gradient-to-b from-background to-muted/10 pb-20"> {/* Tambah subtle bg & padding bottom */}
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12"> {/* Spacing lebih generous */}
          <Reveal y={12}>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
              Awal dari Sebuah Perubahan
            </h2>
          </Reveal>
          <Reveal y={12} delay={100}>
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-primary">
              {title}
            </h3>
          </Reveal>
        </div>

        {/* MODIFIKASI: Grid layout untuk points, responsive 1-col mobile / 2-col md+ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
          {introPoints.map((point, idx) => (
            <Reveal key={idx} y={16} delay={idx * 100}> {/* Stagger delay lebih variatif */}
              <div className="bg-card/80 backdrop-blur-sm rounded-xl border border-border/50 p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow"> {/* Card subtle dengan hover */}
                <div className="flex items-start gap-3 mb-2">
                  <span className="text-2xl md:text-3xl flex-shrink-0 mt-0.5 text-primary">
                    {point.icon}
                  </span>
                  <p className="text-base md:text-lg text-foreground leading-relaxed line-clamp-3 md:line-clamp-none"> {/* Line-clamp mobile biar gak overflow, relaxed line-height */}
                    {point.text}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Tambah divider subtle untuk transisi ke section berikutnya */}
        <div className="mt-12 pt-8 border-t border-muted/30" />
      </div>
    </Section>
  );
}

function VisionMission() {
  return (
    <Section className="pt-6 md:pt-8">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto">
          <Reveal y={12}>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              {" "}
              Arah Strategis Kabinet Neogenesis
            </h2>
          </Reveal>
        </div>

        <div className="mt-8 space-y-6">
          <Reveal y={14}>
            <div className="rounded-xl border bg-card p-6 md:p-7">
              <div className="flex items-center gap-3 mb-3">
                <div className="size-8 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    className="size-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight">
                  Visi
                </h3>
              </div>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                Mewujudkan BEM Fakultas Ilmu Komputer yang berkelanjutan,
                progresif, dan berdaya guna sebagai wadah pengembangan potensi,
                inovasi, serta penguatan karakter mahasiswa yang berlandaskan
                nilai-nilai keilmuan dan 21 karakter bertauhid.
              </p>
            </div>
          </Reveal>

          <Reveal y={14} delay={120}>
            <div className="rounded-xl border bg-card p-6 md:p-7">
              <div className="flex items-center gap-3 mb-3">
                <div className="size-8 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    className="size-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight">
                  Misi
                </h3>
              </div>
              <ul className="space-y-2 text-muted-foreground text-base md:text-lg">
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>
                    Meneruskan dan menyempurnakan program-program kerja BEM
                    sebelumnya dengan penguatan sistem, evaluasi rutin, dan
                    keberlanjutan dampak.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>
                    Mengembangkan lingkungan organisasi yang kolaboratif dan
                    profesional, baik secara internal antar bidang maupun
                    eksternal dengan organisasi lain di dalam dan luar kampus.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>
                    Mendorong lahirnya kegiatan kreatif dan inovatif yang
                    relevan dengan kebutuhan mahasiswa dan perkembangan dunia
                    teknologi.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>
                    Menjadi jembatan aspirasi mahasiswa Fakultas Ilmu Komputer
                    secara aktif dan responsif melalui sistem komunikasi yang
                    terbuka dan terstruktur.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>
                    Membumikan nilai-nilai keilmuan dan 21 karakter bertauhid
                    dalam setiap program kerja, baik dalam kegiatan akademik,
                    sosial, maupun pengembangan diri.
                  </span>
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

function Timeline() {
  const events = [
    {
      date: "Sep 2025", // FIXED: Format date konsisten
      title: "Penyambutan Mahasiswa Baru 2025",
      desc: "Kegiatan menyambut dan memperkenalkan mahasiswa baru pada lingkungan Fakultas Ilmu Komputer.",
      image: "/assets/time-line/maba.JPG", // FIXED: Tambah leading slash untuk public path
    },
    {
      date: "Nov 2025",
      title: "Kaderisasi Fakultas Ilmu Komputer",
      desc: "Memberikan wawasan IT serta menumbuhkan awareness dan kesiapan mahasiswa untuk jenjang selanjutnya.",
      image: "/assets/time-line/kaderisasi.png",
    },
    {
      date: "Des 2025",
      title: "LDKM Fakultas Ilmu Komputer",
      desc: "Memberikan pemahaman dasar organisasi serta menumbuhkan kepercayaan diri, tanggung jawab, dan inisiatif mahasiswa dalam berorganisasi.",
      image: "/assets/time-line/ldkm1.jpeg",
    },
    {
      date: "Feb 2026",
      title: "Pembukaan Pendaftaran BEM FILKOM",
      desc: "Membuka peluang bagi mahasiswa berbakat untuk berkontribusi dalam kemajuan organisasi.",
      image: "/assets/time-line/kpu.jpeg",
    },
    
  ];

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    e.currentTarget.src = "/assets/placeholder-event.jpg"; // FIXED: Fallback image jika error
  };

  return (
    <Section id="timeline" className="pt-10 md:pt-14 relative">
      <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-muted/50 -z-10 hidden md:block" />
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Reveal y={12}>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Timeline Program <br /> BEM FILKOM UNIDA 2025
            </h2>
          </Reveal>
        </div>

        <div className="max-w-7xl mx-auto space-y-6 md:space-y-12 relative">
          {" "}
          {/* FIXED: Adjust gap untuk mobile */}
          {events.map((event, idx) => (
            <Reveal key={idx} y={16} delay={idx * 80}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start relative">
                {" "}
                {/* FIXED: Gap lebih balanced */}
                <div className="relative z-10 shadow-lg rounded-lg overflow-hidden">
                  <img
                    src={event.image}
                    alt={`${event.title} - ${event.date}`} // FIXED: Alt text lebih deskriptif
                    className={cn(
                      "w-full h-48 md:h-64 object-cover",
                      (idx === 2 || idx === 3) &&
                        "object-bottom md:object-[center_bottom]",
                    )}
                    loading="lazy" // FIXED: Lazy load untuk performa
                    onError={handleImageError}
                  />
                </div>
                <div className="bg-card rounded-xl border p-4 md:p-6 lg:p-8 space-y-2 md:space-y-3">
                  <div className="text-xs md:text-sm font-medium text-primary">
                    {event.date}
                  </div>
                  <h3 className="text-lg md:text-xl lg:text-2xl font-bold tracking-tight">
                    {event.title}
                  </h3>
                  <p className="text-sm md:text-base lg:text-lg text-muted-foreground leading-relaxed">
                    {event.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

function ProgramTabs() {
  const [searchQuery, setSearchQuery] = useState("");

  const academicPrograms = [
    {
      title: "IDCamp 2025 AI Development",
      description:
        "Program pelatihan AI untuk mahasiswa IT dengan fokus pada development dan integration, termasuk beasiswa dan sertifikasi.",
      duration: "8 Weeks",
      level: "Intermediate",
      url: "https://idcamp.ioh.co.id/",
    },
    {
      title: "Beasiswa LPDP Reguler 2025",
      description:
        "Beasiswa penuh untuk program magister dan doktor di bidang ilmu komputer dan teknologi informasi.",
      duration: "2-4 Years",
      level: "Postgraduate",
      url: "https://lpdp.kemenkeu.go.id/en/beasiswa/umum/beasiswa-reguler-2025/",
    },
  ];

  const techPrograms = [
    {
      title: "My Digital Academy 2025 Bootcamp",
      description:
        "Pelatihan intensif digital skills untuk talenta IT, termasuk workshop, bootcamp 6 minggu, dan internship 3 bulan di Bank Mandiri.",
      duration: "6 Weeks + 3 Months Internship",
      level: "Beginner to Intermediate",
      url: "https://www.mydigitalacademy.co.id/",
    },
    {
      title: "Le Wagon Web Development Bootcamp Bali",
      description:
        "Bootcamp coding full-time untuk belajar software engineering, web development, dan AI di Bali.",
      duration: "9 Weeks",
      level: "Beginner",
      url: "https://www.lewagon.com/bali",
    },
    {
      title: "Impact Byte Full-Stack Coding Bootcamp",
      description:
        "Pelatihan full-stack development dengan JavaScript, fokus pada proyek real-world di Jakarta.",
      duration: "8 Weeks",
      level: "Beginner",
      url: "https://impactbyte.com/",
    },
  ];

  const communityPrograms = [
    {
      title: "Indonesia Mengglobal Mentorship Program 2025",
      description:
        "Program mentorship gratis 3 bulan untuk mahasiswa IT yang ingin melanjutkan studi global, termasuk bimbingan aplikasi dan funding.",
      duration: "3 Months",
      level: "All Levels",
      url: "https://indonesiamengglobal.com/mentorship/",
    },
    {
      title: "Markoding Volunteer Mentor Program",
      description:
        "Jadi mentor sukarelawan untuk mengajarkan skills IT 21st century kepada pemuda kurang mampu di Indonesia.",
      duration: "Ongoing",
      level: "Mentor",
      url: "https://www.markoding.org/volunteer-as-a-mentor",
    },
  ];

  const filterPrograms = (programs: any[]) => {
    return programs.filter(
      (program) =>
        program.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        program.description.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  };

  const ProgramList = ({ programs }: { programs: any[] }) => (
    <div className="space-y-4">
      {filterPrograms(programs).map((program, index) => (
        <Reveal key={`${program.title}-${index}`} y={10} delay={index * 50}>
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{program.title}</h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    {program.description}
                  </p>
                  <div className="flex gap-2 mt-3">
                    <Badge variant="outline" className="text-xs">
                      {program.duration}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {program.level}
                    </Badge>
                  </div>
                </div>
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="hover:bg-primary/5 hover:text-primary transition-colors"
                >
                  <a
                    href={program.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Daftar untuk program ${program.title} di situs resmi`}
                  >
                    Register
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </Reveal>
      ))}
      {filterPrograms(programs).length === 0 && (
        <p className="text-center text-muted-foreground mt-4">
          No programs match your search. Try another keyword.
        </p>
      )}
    </div>
  );

  return (
    <Section>
      <div className="container max-w-4xl">
        <div className="text-center mb-12">
          <Reveal y={16}>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              INFO FILKOM
            </h2>
          </Reveal>
          <Reveal y={16} delay={100}>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              Informasi mengenai beasiswa, bootcamp, pelatihan, dan berbagai
              peluang pengembangan diri. Dengan ini mahasiswa dapat
              terus mengikuti update terkini untuk mendukung prestasi dan karier
              di masa depan.
            </p>
          </Reveal>
        </div>
        <Tabs defaultValue="academic" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="academic">Academic</TabsTrigger>
            <TabsTrigger value="technology">Technology</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
          </TabsList>
          <div className="mt-6">
            <Input
              placeholder="Search programs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-md mx-auto mb-6"
            />
          </div>
          <TabsContent value="academic" className="mt-8">
            <ProgramList programs={academicPrograms} />
          </TabsContent>
          <TabsContent value="technology" className="mt-8">
            <ProgramList programs={techPrograms} />
          </TabsContent>
          <TabsContent value="community" className="mt-8">
            <ProgramList programs={communityPrograms} />
          </TabsContent>
        </Tabs>
      </div>
    </Section>
  );
}

function FinalCTA() {
  return (
    <Section className="relative bg-gradient-to-b from-background via-background to-muted/20">
      {" "}
      {/* FIXED: Gradient lebih smooth dari background ke muted ringan */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,hsl(var(--accent)/0.05),transparent_80%)]" />{" "}
      {/* FIXED: Radial lebih soft untuk depth */}
      <div className="container text-center max-w-3xl">
        <Reveal y={16}>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Mari berkolaborasi dalam gerakan mahasiswa FILKOM untuk mewujudkan
            inovasi dan kemajuan bersama
          </h2>
        </Reveal>
        <Reveal y={16} delay={100}>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            Bersama kita wujudkan ruang kolaborasi yang terbuka bagi ide dan
            kreativitas. Setiap langkah kecil akan menjadi bagian dari perubahan
            besar bagi kampus dan masyarakat
          </p>
        </Reveal>
        <Reveal y={18} delay={200}>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Button
              asChild
              className="shadow bg-accent text-accent-foreground hover:bg-accent/90"
            >
              <Link to="/divisions">Lihat Divisi Kami</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/contact">Mari Berkolaborasi</Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

export default function Index() {
  return (
    <div className="relative">
      <PlexusEffect 
        nodeCount={60}
        connectionDistance={100}
        animationSpeed={0.3}
        colors={{
          primary: 'rgba(107, 200, 226, 0.6)',
          secondary: 'rgba(75, 180, 210, 0.4)',
          accent: 'rgba(230, 148, 78, 0.5)',
        }}
      />
      <div className="relative z-10">
        <Hero />
        <ProgramsIntro />
        <VisionMission />
        <Timeline />
        <ProgramTabs />
        <FinalCTA />
      </div>
    </div>
  );
}