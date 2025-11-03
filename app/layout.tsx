export const metadata = {
  title: "Latin American Traders — Portal de mercados",
  description: "Información diaria: forex, cripto, commodities, índices sintéticos, noticias y academias.",
};

import "./globals.css";
import Image from "next/image";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
