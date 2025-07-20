import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { HotelProvider } from "@/context/HotelContext";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sistema de Gestión Hotelera",
  description: "Sistema para registro de huéspedes y asignación de habitaciones",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <HotelProvider>
          <div className="min-h-screen bg-background">
            {/* Navigation Header */}
            <header className="border-b border-border bg-card">
              <div className="container mx-auto px-4 py-4">
                <nav className="flex items-center justify-between">
                  <div className="flex items-center space-x-8">
                    <Link 
                      href="/" 
                      className="text-xl font-bold text-foreground hover:text-primary transition-colors"
                    >
                      Hotel Management
                    </Link>
                    <div className="flex space-x-6">
                      <Link 
                        href="/" 
                        className="text-muted-foreground hover:text-foreground transition-colors font-medium"
                      >
                        Dashboard
                      </Link>
                      <Link 
                        href="/reservas" 
                        className="text-muted-foreground hover:text-foreground transition-colors font-medium"
                      >
                        Nueva Reserva
                      </Link>
                      <Link 
                        href="/habitaciones" 
                        className="text-muted-foreground hover:text-foreground transition-colors font-medium"
                      >
                        Habitaciones
                      </Link>
                      <Link 
                        href="/huespedes" 
                        className="text-muted-foreground hover:text-foreground transition-colors font-medium"
                      >
                        Huéspedes
                      </Link>
                    </div>
                  </div>
                </nav>
              </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
              {children}
            </main>
          </div>
        </HotelProvider>
      </body>
    </html>
  );
}
