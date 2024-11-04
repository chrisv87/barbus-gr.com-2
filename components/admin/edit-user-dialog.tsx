"use client";

// ... (previous imports remain the same)

interface User {
  id: string;
  name: string;
  email: string;
  status: string;
  role: string;
  joinDate: string;
  rewardLevel?: number;
  xp?: number;
  notes?: Note[];
  noteSeverity?: "red" | "yellow" | "green";
  profile?: {
    agreedToTerms: boolean;
    termsAgreedDate?: string;
  };
}

// ... (rest of the interfaces remain the same)

export function EditUserDialog({ 
  user, 
  open, 
  onOpenChange, 
  currentUser 
}: EditUserDialogProps) {
  // ... (previous state declarations remain the same)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit User: {user?.name}</DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">User Details</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
            <TabsTrigger value="terms">Terms</TabsTrigger>
          </TabsList>

          {/* ... (previous tabs content remains the same) */}

          <TabsContent value="terms" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg border border-purple-800/30">
                <div>
                  <h3 className="font-semibold text-purple-300">Terms Agreement Status</h3>
                  <p className="text-sm text-gray-400">
                    {user?.profile?.agreedToTerms 
                      ? `Agreed on ${new Date(user.profile.termsAgreedDate || '').toLocaleDateString()}`
                      : 'Has not agreed to terms'}
                  </p>
                </div>
                <Badge variant={user?.profile?.agreedToTerms ? "success" : "destructive"}>
                  {user?.profile?.agreedToTerms ? "Accepted" : "Not Accepted"}
                </Badge>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}