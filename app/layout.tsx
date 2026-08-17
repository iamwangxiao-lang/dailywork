import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "向上学习｜我的一日计划",
  description: "学生专属的学习、运动、音乐与阅读日程安排。",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
