export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-50 min-h-screen text-gray-800">
      {children}
    </div>
  );
}
