import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Navigation } from '@/components/navigation';
import { Toaster } from '@/components/ui/toaster';
import { FirebaseProvider } from '@/components/providers';
import Footer from '@/components/footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Bar Bus GR',
  description: 'Your Ultimate Party Ride in Grand Rapids',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <FirebaseProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <div className="min-h-screen bg-fixed bg-cover bg-center flex flex-col"
              style={{
                backgroundImage: "linear-gradient(to bottom, rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.9)), url('https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=2938&auto=format&fit=crop')"
              }}
            >
              <Navigation />
              <main className="flex-grow pt-16">
                {children}
              </main>
              <Footer />
              <Toaster />
            </div>
          </ThemeProvider>
        </FirebaseProvider>
      </body>
    </html>
  );
}