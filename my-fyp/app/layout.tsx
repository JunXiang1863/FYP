// app/layout.tsx
import { ReactNode } from 'react';
import './globals.css'; // Make sure global styles are included

export const metadata = {
  title: 'DeliTrack',
  description: 'Choose your role and manage deliveries',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children} {/* This will render the page content */}
      </body>
    </html>
  );
}
