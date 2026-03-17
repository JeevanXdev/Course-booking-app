import "./globals.css";
import Navbar from "@/components/navbar";
import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <AuthProvider>
          <Navbar />
          <main className="max-w-6xl mx-auto p-6">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}