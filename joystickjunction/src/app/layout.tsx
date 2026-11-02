import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JoystickJunction | PS5 & Game Rentals in Jaipur",
  description: "Rent a PS5 console and games in Jaipur. Choose your dates, build your gaming bundle and request doorstep delivery.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
