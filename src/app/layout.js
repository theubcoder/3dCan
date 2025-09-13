import "./globals.css";

export const metadata = {
  title: "Pepsi Landing",
  description: "Pepsi landing page",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}