import type { Metadata } from "next";
import { Bebas_Neue, League_Spartan, Cantarell } from "next/font/google";
import { QueryClientProvider } from "@/providers/queryProvider";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  weight: "400",
  subsets: ["latin"],
});

const leagueSpartan = League_Spartan({
  variable: "--font-league-spartan",
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const gecantarellistMono = Cantarell({
  variable: "--font-cantarell",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Erranters",
  description: "Get out!",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${leagueSpartan.variable} ${gecantarellistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <QueryClientProvider>{children}</QueryClientProvider>
      </body>
    </html>
  );
}