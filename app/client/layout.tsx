import { ProtectedRoute } from "@/components/auth/protected-route";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute allowedRoles={["client"]}>
      <div className="min-h-screen bg-background">
        {children}
      </div>
    </ProtectedRoute>
  );
}