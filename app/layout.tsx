import type { Metadata } from "next";
import { Bebas_Neue, League_Spartan, Cantarell } from "next/font/google";
import { QueryClientProvider } from "@/providers/queryProvider";
import { UserProvider } from "@/context/userContext";
import { PostCategoryProvider } from "@/context/postCategoryContext";
import { ToastContainer } from "react-toastify";
import Footer from "@/components/Footer";
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
  title: "Erranters - Discover New Trails",
  description: "Join a community of outdoor enthusiasts. Share your hiking and cycling routes, discover new ones, and sell or buy they outdoor equipment.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${leagueSpartan.variable} ${gecantarellistMono.variable} min-h-full antialiased bg-mineral-green`}
    >
      <body className="min-h-screen h-full flex flex-col font-cantarell text-outer-space bg-mineral-green">
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
        <UserProvider>
          <QueryClientProvider>
            <PostCategoryProvider>{children}</PostCategoryProvider>
          </QueryClientProvider>
        </UserProvider>
        <Footer />
      </body>
    </html>
  );
}