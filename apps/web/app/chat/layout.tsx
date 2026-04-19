import SocketProvider from "@/hooks/socketProvider";
import ChatProvider  from "./components/chatProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SocketProvider>
      <ChatProvider>{children}</ChatProvider>
    </SocketProvider>
  );
}