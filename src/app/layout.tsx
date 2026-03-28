import "./globals.css";
import { AudioProvider } from "../context/AudioContext"; // ตรวจสอบ Path ให้ถูกต้อง

export const metadata = {
  title: "Can I Have 5 Minutes",
  description: "Spend 5 minutes with yourself.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body>
        {/* 🔊 หุ้มด้วย AudioProvider เพื่อให้เพลงเล่นต่อเนื่องทุกหน้า */}
        <AudioProvider>
          <main className="min-h-screen flex flex-col justify-center relative overflow-hidden bg-bg">
            {children}
          </main>
        </AudioProvider>
      </body>
    </html>
  );
}