import { Footer, Navbar } from "@/components";
import "./globals.css";

export const metadata = {
  title: "Auto-Showroom",
  description: "find,book or rent a car",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="relative">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
