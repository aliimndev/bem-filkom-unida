import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-primary">404</h1>
          <h2 className="text-2xl font-semibold">Halaman Tidak Ditemukan</h2>
          <p className="text-muted-foreground max-w-md">
            Maaf, halaman yang Anda cari tidak ditemukan. Mungkin halaman tersebut telah dipindahkan atau dihapus.
          </p>
        </div>
        
        <div className="flex gap-4 justify-center">
          <Button asChild>
            <Link to="/">Kembali ke Beranda</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/contact">Hubungi Kami</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
