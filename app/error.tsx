"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <AlertCircle className="h-12 w-12 text-red-500" />
        <h2 className="text-2xl font-bold">Something went wrong!</h2>
        <p className="text-gray-400 mb-4">
          An error occurred while loading this page.
        </p>
        <Button
          onClick={reset}
          className="bg-purple-600 hover:bg-purple-700"
        >
          <RefreshCcw className="mr-2 h-4 w-4" />
          Try again
        </Button>
      </div>
    </div>
  );
}