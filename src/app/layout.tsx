import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "로켓콜-변호사 | 법률 상담이 필요한 확정 고객만 연결해드립니다",
  description: "98% 약속 성사율, 검증된 법률 상담 의뢰인만 변호사에게 연결합니다. 노쇼 시 100% 무료 재배정. 국내 최초 AS 보장 제도.",
  keywords: "변호사, 법률상담, 법률사무소, 의뢰인, 고객유치, 변호사마케팅, 법률마케팅, 로켓콜",
  openGraph: {
    title: "로켓콜-변호사 | 법률 상담이 필요한 확정 고객만 연결해드립니다",
    description: "98% 약속 성사율, 검증된 법률 상담 의뢰인만 변호사에게 연결합니다.",
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "로켓콜-변호사",
    description: "법률 상담이 필요한 확정 고객만 연결해드립니다",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
