import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

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
        <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-foreground/70 bg-background/60 backdrop-blur">
          <span className="size-2 rounded-full bg-primary" /> Struktur Organisasi
        </div>
        <h1 className="mt-4 text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
        Profil Kepengurusan
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
        Di balik setiap inovasi dan program Pancadarma BEM FILKOM, ada tim penuh semangat kolaboratif organisasi yang wujudkan visi Neogenesis untuk kemajuan FILKOM UNIDA.
Setiap divisi jadi pilar kuat, dorong kesejahteraan mahasiswa melalui tech berbasis Tauhid.
        </p>
        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          <Button asChild className="shadow bg-accent text-accent-foreground hover:bg-accent/90">
            <Link to="/contact">Mari Berkolaborasi</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/news">Lihat Keseruan Kami</Link>
          </Button>
        </div>
      </div>
    </Section>
  );
}

function ExecutiveBoard() {
  const leadershipPairs = [
    {
      group: "Duo Kepemimpinan",
      names: ["Muhammad Sahrullah Nursa'ban", "Aulia Alhafidz"],
      positions: ["Ketua Umum", "Wakil Ketua"],
      roles: ["Pemimpin Visi", "Pendukung Operasional"],
      description: "Pimpin BEM FILKOM dengan dedikasi Neogenesis—bangun kolaborasi inklusif yang satukan inovasi tech dengan nilai Pancadarma untuk generasi pertama FILKOM.",
      images: ["assets/divisions/ketum.webp"],
      color: "from-blue-500/20 to-cyan-500/20",
    },
    {
      group: "Duo Sekretariat",
      names: ["Nayla Awalia Syafitri", "Arinda Setyo Rini"],
      positions: ["Sekretaris 1", "Sekretaris 2"],
      roles: ["Pengelola Dokumentasi"],
      description: "Kelola komunikasi & arsip dengan ketelitian—pastikan transparansi Pancadarma jadi fondasi setiap langkah organisasi kami.",
      images: ["/assets/divisions/sekre-bem.webp"],
      color: "from-green-500/20 to-emerald-500/20",
    },
    {
      group: "Bendahara",
      names: ["Abilpa Siti Kholifah"],
      positions: ["Bendahara"],
      roles: ["Pengelola Keuangan"],
      description: "Awasi keuangan dengan amanah Tauhid—dukung program berkelanjutan agar BEM FILKOM tetap dinamis dan berdampak nyata.",
      images: ["/assets/divisions/bend-bem.jpg"],
      color: "from-orange-500/20 to-red-500/20",
    },
  ];

  return (
    <Section>
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Dewan Eksekutif</h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
          Kenali tim inti BEM FILKOM—penggerak utama yang wujudkan misi bersama lewat kepemimpinan kolaboratif dan inovatif.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-3">
          {leadershipPairs.map((pair, index) => (
            <Card key={pair.group} className="h-full">
              <CardHeader className="text-center">
                <div className="flex flex-col items-center md:flex-row gap-2 mb-4 justify-center">
                  {pair.images.map((imgSrc, imgIdx) => (
                    <div
                      key={imgIdx}
                      className={cn(
                        "aspect-[3/3] w-64 md:w-52 h-auto overflow-hidden rounded-lg bg-gradient-to-br", 
                        pair.color, 
                        "flex-shrink-0 border border-border/50"
                      )}
                      aria-label={`Foto ${pair.names[imgIdx]}`}
                    >
                      <img 
                        src={imgSrc} 
                        alt={`${pair.names[imgIdx]} - ${pair.positions[imgIdx] || pair.positions[0]}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
                <div className="space-y-1">
                  {pair.names.map((name, idx) => (
                    <CardTitle key={idx} className="text-lg leading-tight">{name}</CardTitle>
                  ))}
                </div>
                <div className="space-y-1">
                  {pair.positions.map((position, idx) => (
                    <CardDescription key={idx} className="font-medium text-primary">{position}</CardDescription>
                  ))}
                </div>
                <Badge variant="secondary" className="w-fit mx-auto text-xs">
                  {pair.roles.join(" & ")}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {pair.description}
                </p>
                {/* Bagian Key Responsibilities dihapus biar lebih fokus ke foto dan deskripsi */}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}

function DivisionsSection() {
  const divisions = [
    {
      name: "Divisi Kremas",
      fullName: "Divisi Kreativitas dan Seni Digital",
      description: "Bangkitkan kreativitas melalui event seni-tech—integrasikan budaya lokal dengan inovasi digital, sesuai Kearifan Lokal Pancadarma untuk ekspresi inklusif.",
      head: "Rizki Aditya",
      members: 15,
      responsibilities: [
        "Selenggarakan festival budaya & pameran seni digital",
        "Kelola workshop kreatif & talent show berbasis tech",
        "Promosikan ekspresi seni yang inklusif & beragam",
        "Kolaborasi dengan seniman lokal & komunitas kreatif"
      ],
      programs: [
        "Festival Seni Digital",
        "Kompetisi Talent Tech",
        "Pameran AI Art",
        "Workshop Desain Kreatif"
      ],
      image: "/assets/divisions/kremas.png",
      color: "from-indigo-500/20 to-purple-500/20",
    },
    {
      name: "Divisi Netkomas",
      fullName: "Divisi Networking dan Komunikasi",
      description: "Divisi Netkomas menjadi wadah untuk mempererat koneksi dan sinergi antar mahasiswa. Setiap ide adalah langkah menuju pembelajaran dan kemajuan bersama.",
      head: "Muhammad Ray Putra",
      members: 5,
      responsibilities: [
        "Menjalin hubungan dengan komunitas teknologi dan profesional IT",
"Menyelenggarakan kegiatan jejaring akademik dan profesional",
"Mengelola informasi serta publikasi antarorganisasi",
"Membangun komunikasi dan kerja sama dengan mahasiswa, dosen, dan pihak eksternal"

      ],
      programs: [
        "Gathering Komunitas Tech",
        "Hackathon Kolaboratif",
        "Workshop Pengembangan Skill",
        "Hari Networking"
      ],
      image: "/assets/divisions/netkomas.png",
      color: "from-blue-500/20 to-cyan-500/20",
    },
    {
      name: "Divisi Peninfo",
      fullName: "Divisi Penelitian dan Informasi",
      description: "Lakukan riset & kumpul data untuk insights cerdas—dukung keputusan organisasi dengan etika Tauhid, dari survey hingga tren tech terkini.",
      head: "Budi Santoso",
      members: 18,
      responsibilities: [
        "Lakukan survey kepuasan mahasiswa FILKOM",
        "Riset best practices & tren IT",
        "Analisis data & pelaporan",
        "Kelola & sebarkan informasi"
      ],
      programs: [
        "Kompetisi Riset Mahasiswa",
        "Workshop Analisis Data",
        "Seminar Literasi Informasi",
        "Pelatihan Metodologi Riset"
      ],
      image: "/assets/divisions/peninfo.png",
      color: "from-green-500/20 to-emerald-500/20",
    },
    {
      name: "Divisi Himpunan",
      fullName: "Divisi Himpunan Mahasiswa",
      description: "Kelola aktivitas organisasi & kembangkan anggota—bangun komunitas kuat dengan rasa kebersamaan Pancadarma untuk mahasiswa berprestasi.",
      head: "Maya Sari",
      members: 20,
      responsibilities: [
        "Kelola organisasi mahasiswa",
        "Rekrut & kembangkan anggota",
        "Bangun kegiatan komunitas",
        "Dukung kesejahteraan mahasiswa"
      ],
      programs: [
        "Orientasi Anggota Baru",
        "Program Pengembangan Leadership",
        "Proyek Pengabdian Masyarakat",
        "Inisiatif Kesejahteraan"
      ],
      image: "/assets/divisions/himpunan.png",
      color: "from-orange-500/20 to-red-500/20",
    },
  ];

  return (
    <Section className="relative">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,hsl(var(--primary)/0.06),transparent_70%)]" />
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Divisi-Divisi</h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Setiap divisi punya spesialisasi unik, kolaborasi untuk program holistik yang wujudkan visi FILKOM—dari kreativitas hingga riset berkelanjutan.
          </p>
        </div>
        <div className="grid gap-8 lg:grid-cols-4">
          {divisions.map((division, index) => (
            <Card key={division.name} className="h-full overflow-hidden">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src={division.image} 
                  alt={division.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  aria-label={`Gambar Divisi ${division.name}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <CardTitle className="text-white text-xl drop-shadow-lg">{division.name}</CardTitle>
                  <CardDescription className="text-white/90 text-sm drop-shadow-lg">
                    {division.fullName}
                  </CardDescription>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="secondary" className="text-xs bg-white/20 text-white border-white/30">
                      {division.members} Anggota
                    </Badge>
                    <Badge variant="outline" className="text-xs bg-white/20 text-white border-white/30">
                      Ketua: {division.head}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <CardContent className="p-6 space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {division.description}
                </p>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">Tanggung Jawab Utama:</h4>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      {division.responsibilities.map((responsibility, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>{responsibility}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">Program Unggulan:</h4>
                    <div className="flex flex-wrap gap-1">
                      {division.programs.map((program, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {program}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
}

function DivisionTabs() {
  const kremasMembers = [
    { name: "Muhammad Rabbani Razaq", role: "Kepala Divisi", year: "2025" },
    { name: "Arief Hidayatullah", role: "Anggota Divisi", year: "2025" },
    { name: "Haikal Hidayat", role: "Anggota Divisi", year: "2025" },
    { name: "Ali Imannudin", role: "Full-stack Web Developer", year: "2025" },
  ];

  const netkomasMembers = [
    { name: "Muhammad Ray Putra", role: "Kepala Divisi", year: "2025" },
    { name: "Hilmi Ahmad Kamil", role: "Anggota Divisi", year: "2025" },
    { name: "Muhammad Barez Sapado Siregar", role: "Anggota Divisi", year: "2025" },
    { name: "Muhammad Pratama Rizky", role: "Anggota Divisi", year: "2025" },
    { name: "Sulis Sri Utami", role: "Anggota Divisi", year: "2025"},
  ];

  const peninfoMembers = [
    { name: "Muhammad Faatih Farhaan", role: "Kepala Divisi", year: "2025" },
    { name: "Ayi Reja Ardani", role: "Anggota Divisi", year: "2025" },
    { name: "Alfatir Muhammad Syafur", role: "Anggota Divisi", year: "2025" },
    { name: "Fadli Resmanda", role: "Anggota Divisi", year: "2025" },
    { name: "Suci Adri Avrillia", role: "Anggota Divisi", year: "2025" },
  ];

  const himpunanMembers = [
    { name: "Anggun Rahmadani", role: "Kepala Divisi", year: "2025" },
    { name: "Amanda Neisya Yulyana", role: "Anggota Divisi", year: "2025" },
    { name: "Siti Raudha Al-Zahra", role: "Anggota Divisi", year: "2025" },
    { name: "Arjuna Aulia Ghifari", role: "Anggota Divisi", year: "2025" },
    
  ];

  const MemberList = ({ members }: { members: any[] }) => (
    <div className="space-y-3">
      {members.map((member, index) => (
        <Card key={member.name} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-sm">{member.name}</h3>
                  <p className="text-xs text-muted-foreground">{member.role}</p>
                </div>
              </div>
              <Badge variant="outline" className="text-xs">
                {member.year}
              </Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <Section>
      <div className="container max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Anggota Divisi</h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Temui talenta penuh passion yang pimpin & gerakkan setiap divisi dengan dedikasi & keahlian Pancadarma.
          </p>
        </div>
        <Tabs defaultValue="kremas" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="kremas">Kremas</TabsTrigger>
            <TabsTrigger value="netkomas">Netkomas</TabsTrigger>
            <TabsTrigger value="peninfo">Peninfo</TabsTrigger>
            <TabsTrigger value="himpunan">Himpunan</TabsTrigger>
          </TabsList>
          <TabsContent value="kremas" className="mt-8">
            <MemberList members={kremasMembers} />
          </TabsContent>
          <TabsContent value="netkomas" className="mt-8">
            <MemberList members={netkomasMembers} />
          </TabsContent>
          <TabsContent value="peninfo" className="mt-8">
            <MemberList members={peninfoMembers} />
          </TabsContent>
          <TabsContent value="himpunan" className="mt-8">
            <MemberList members={himpunanMembers} />
          </TabsContent>
        </Tabs>
      </div>
    </Section>
  );
}

function CallToAction() {
  return (
    <Section className="relative bg-gradient-to-b from-background to-muted/30">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,hsl(var(--accent)/0.08),transparent_70%)]" />
      <div className="container text-center max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          Siap Gabung & Buat Perubahan?
        </h2>
        <p className="mt-3 text-muted-foreground">
          Jadilah bagian tim dinamis BEM FILKOM yang ubah komunitas mahasiswa—pilih divisi sesuai passion & skill mu untuk dampak nyata.
        </p>
        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          <Button asChild className="shadow bg-accent text-accent-foreground hover:bg-accent/90">
            <Link to="/contact">Mari Berkolaborasi</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/news">Lihat Keseruan Kami</Link>
          </Button>
        </div>
      </div>
    </Section>
  );
}

export default function Divisions() {
  return (
    <div>
      <Hero />
      <ExecutiveBoard />
      <DivisionsSection />
      <DivisionTabs />
      <CallToAction />
    </div>
  );
}