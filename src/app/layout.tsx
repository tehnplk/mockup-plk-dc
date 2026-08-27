import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Noto_Sans_Thai } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const notoThai = Noto_Sans_Thai({
  variable: "--font-thai",
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Plk SRRT Network Operating System | สสจ.พิษณุโลก",
  description:
    "Mockup ระบบปฏิบัติการเครือข่ายเฝ้าระวังสอบสวนเคลื่อนที่เร็ว จังหวัดพิษณุโลก",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="th"
      className={`${geistSans.variable} ${notoThai.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
