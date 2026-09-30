import type { Metadata } from "next";
import { Bebas_Neue, League_Spartan, Cantarell, Geist } from "next/font/google";
import { QueryClientProvider } from "@/providers/queryProvider";
import Footer from "@/components/Footer";
import { ToastContainer } from "react-toastify";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

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
      className={cn("h-full", "antialiased", bebasNeue.variable, leagueSpartan.variable, gecantarellistMono.variable, "font-sans", geist.variable)}
    >
      <body className="h-full flex flex-col font-cantarell text-outer-space">
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
          theme="colored"
        />
        <QueryClientProvider>
          {children}
        </QueryClientProvider>
        <Footer />
      </body>
    </html>
  );
}