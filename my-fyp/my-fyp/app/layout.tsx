// app/layout.tsx
import { Toaster } from "/Users/junxiangooi/FYP/my-fyp/components/ui/toaster"
import { AuthProvider } from "/Users/junxiangooi/FYP/my-fyp/contexts/AuthContext"
import "./globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  )
}


