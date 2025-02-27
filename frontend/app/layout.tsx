import type { Metadata } from "next";
import NavbarYariv from "@/components/NavbarYariv/NavbarYariv";
import Background from "@/components/Background/Background";
import { ThemeProvider } from "./ThemeContext";
import 'notyf/notyf.min.css';
import './globals.scss';
import { DrawerProvider } from './DrawerContext';

export const metadata: Metadata = {
  title: "Roey's work",
  description: "My portfolio",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <DrawerProvider>
          <Background/>
            <NavbarYariv/>
            {children }
          </DrawerProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}