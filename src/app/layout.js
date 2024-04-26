import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Provider from "@/components/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PromptPedia",
  description: "Get some useful prompt for AI",
};

function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <div className="relative z-13">
            <Nav />
          </div>
          <main className="app">{children}</main>
        </Provider>
      </body>
    </html>
  );
}
export default RootLayout;
