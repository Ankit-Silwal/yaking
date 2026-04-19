
import SocketProvider from "@/hooks/socketProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
})
{
  return (
        <SocketProvider>
          {children}
        </SocketProvider>
  );
}