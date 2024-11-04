"use client";

import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";

export default function ShareQR() {
  const [isOpen, setIsOpen] = useState(false);
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Share2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Bar Bus GR</DialogTitle>
        </DialogHeader>
        <div className="flex items-center justify-center p-4">
          <QRCodeSVG
            value={currentUrl}
            size={256}
            level="H"
            includeMargin
            className="w-full h-auto"
          />
        </div>
        <p className="text-center text-sm text-muted-foreground">
          Scan this QR code to share Bar Bus GR with your friends
        </p>
      </DialogContent>
    </Dialog>
  );
}