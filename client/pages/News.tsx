import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import Reveal from "@/components/effects/Reveal";

interface MediaItem {
  src: string;
  alt: string;
  date: string;
  category: string;
  type?: "video";
  poster?: string; // Tambah buat thumbnail video
}

export default function News() {
  const media: { [key: string]: MediaItem[] } = {
    "penyambutan-mahasiswa-baru": [
      {
        src: "/assets/img/asset1.webp",
        alt: "Penyambutan Mahasiswa Baru 2025",
        date: "10 Sep 2025",
        category: "Penyambutan Mahasiswa Baru",
      },
      {
        src: "/assets/img/asset3.webp",
        alt: "Penyambutan Mahasiswa Baru 2025",
        date: "10 Sep 2025",
        category: "Penyambutan Mahasiswa Baru",
      },
      {
        src: "/assets/img/asset4.webp",
        alt: "Penyambutan Mahasiswa Baru 2025",
        date: "10 Sep 2025",
        category: "Penyambutan Mahasiswa Baru",
      },
      {
        src: "/assets/video/as-vid1.mp4",
        alt: "Penyambutan Mahasiswa Baru 2025",
        date: "10 Sep 2025",
        category: "Penyambutan Mahasiswa Baru",
        type: "video",
      },
      {
        src: "/assets/video/as-vid2.mp4",
        alt: "Penyambutan Mahasiswa Baru 2025",
        date: "10 Sep 2025",
        category: "Penyambutan Mahasiswa Baru",
        type: "video",
      },
    ],
    "kaderisasi-filkom": [
      {
        src: "/assets/img/asset5.JPG",
        alt: "Kaderisasi FILKOM 2024 ",
        date: "14 Des 2024",
        category: "Kaderisasi Filkom",
      },
      {
        src: "/assets/img/asset6.JPG",
        alt: "Kaderisasi FILKOM 2024 ",
        date: "14 Des 2024",
        category: "Kaderisasi Filkom",
      },
    ],
    ldkm: [
      {
        src: "/assets/img/asset7.webp",
        alt: "LDKM FILKOM 2024",
        date: "21-22 Des 2024",
        category: "LDKM",
      },
      {
        src: "/assets/img/asset8.webp",
        alt: "LDKM FILKOM 2024",
        date: "21-22 Des 2024",
        category: "LDKM",
      },
      {
        src: "/assets/video/as-vid3.mp4",
        alt: "LDKM FILKOM 2024",
        date: "21-22 Des 2024",
        category: "LDKM",
        type: "video",
      },
      {
        src: "/assets/img/asset9.JPG",
        alt: "LDKM FILKOM 2024",
        date: "21-22 Des 2024",
        category: "LDKM",
      },
      {
        src: "/assets/video/as-vid4.mp4",
        alt: "LDKM FILKOM 2024",
        date: "21-22 Des 2024",
        category: "LDKM",
        type: "video",
      },
      {
        src: "/assets/img/asset10.JPG",
        alt: "LDKM FILKOM 2024",
        date: "21-22 Des 2024",
        category: "LDKM",
      },
      {
        src: "/assets/img/asset11.JPG",
        alt: "LDKM FILKOM 2024",
        date: "21-22 Des 2024",
        category: "LDKM",
      },
    ],
    "pendaftaran-bem": [
      {
        src: "/assets/img/asset12.webp", 
        alt: "Pendaftaran BEM FILKOM 2024",
        date: "26 Jun 2025",
        category: "Pendaftaran BEM",
      },
      {
        src: "/assets/img/asset13.jpg", 
        alt: "Pendaftaran BEM FILKOM 2024",
        date: "26 Jun 2025",
        category: "Pendaftaran BEM",
      },
    ],
  };

  // FIXED: Gabung semua, tapi urut berdasarkan date descending (terbaru dulu)
  const allMedia: MediaItem[] = Object.values(media)
    .flat()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="py-10 md:py-16">
      <div className="container">
        <article className="prose prose-slate dark:prose-invert max-w-none">
          <Reveal y={12}>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              Galeri Media
            </h1>
            <p className="mt-3 text-muted-foreground">
            Galeri ini menyajikan rangkaian kegiatan BEM FILKOM Universitas Djuanda yang mencerminkan semangat dan dedikasi mahasiswa.
            </p>
          </Reveal>

          <section className="mt-10">
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
              {allMedia.map((item, idx) => (
                <Reveal key={idx} y={16} delay={idx * 50}>
                  <div className="group relative overflow-hidden rounded-xl border bg-card shadow-md hover:shadow-xl transition-all duration-500 cursor-pointer break-inside-avoid mb-4">
                    <div className="relative w-full h-auto max-h-[80vh] overflow-hidden">
                      {item.type === "video" ? (
                        <video
                          className="w-full h-full object-cover"
                          controls
                          preload="metadata"
                          // muted // <-- FIXED: Dihapus biar ada suara default (user bisa mute manual)
                          playsInline // Buat mobile (iOS)
                          poster={item.poster} // Thumbnail preview
                          width="1920"
                          height="1080"
                          onError={(e) => {
                            console.error("Video load error:", item.src, e); // Log error di console buat debug
                          }}
                          aria-label={item.alt}
                        >
                          <source src={item.src} type="video/mp4" />
                          Browser Anda tidak mendukung video.{" "}
                          <a href={item.src}>Download di sini</a>.
                        </video>
                      ) : (
                        <img
                          src={item.src}
                          alt={item.alt}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          onError={(e) =>
                            console.error("Image load error:", item.src, e)
                          } // Debug buat foto juga
                        />
                      )}
                    </div>
                    {/* Overlay hanya untuk foto, hilangkan untuk video biar gak block controls */}
                    {item.type !== "video" && (
                      <>
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-500 z-10" />
                        <div className="absolute bottom-0 left-0 right-0 p-3 text-white bg-gradient-to-t from-black/80 to-transparent z-20">
                          <h3 className="font-semibold text-xs md:text-sm truncate">
                            {item.alt}
                          </h3>
                          <div className="flex justify-between items-center mt-1">
                            <p className="text-xs opacity-90">{item.date}</p>
                            <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                              {item.category}
                            </span>
                          </div>
                        </div>
                      </>
                    )}
                    {/* Untuk video, caption sederhana tanpa overlay, dan tanpa badge icon */}
                    {item.type === "video" && (
                      <div className="absolute bottom-0 left-0 right-0 p-3 text-white bg-gradient-to-t from-black/80 to-transparent z-20 pointer-events-none">
                        <h3 className="font-semibold text-xs md:text-sm truncate">
                          {item.alt}
                        </h3>
                        <p className="text-xs opacity-90 mt-1">{item.date}</p>
                        {/* FIXED: Tambah badge category untuk video juga, biar konsisten */}
                        <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full mt-1 inline-block">
                          {item.category}
                        </span>
                      </div>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          <div className="mt-12 flex items-center gap-3">
            <Link
              to="/"
              className="text-accent underline-offset-4 hover:underline"
            >
              Back to Home
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}