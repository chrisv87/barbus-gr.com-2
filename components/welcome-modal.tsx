"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PartyPopper } from "lucide-react";

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
}

export function WelcomeModal({ isOpen, onClose, userName }: WelcomeModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-black/95 border-purple-800/30 max-w-md">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center">
              <PartyPopper className="h-8 w-8 text-purple-400" />
            </div>
          </div>
          <DialogTitle className="text-2xl text-center text-purple-300">
            Welcome to Bar Bus GR, {userName}!
          </DialogTitle>
        </DialogHeader>
        <div className="text-center space-y-4 py-4">
          <p className="text-gray-300">
            Thank you for joining our community! Get ready for amazing experiences and exclusive rewards.
          </p>
          <div className="space-y-2 text-sm text-gray-400">
            <p>🎉 Earn XP with every ride</p>
            <p>🎁 Unlock special rewards</p>
            <p>🎫 Get early access to events</p>
          </div>
        </div>
        <DialogFooter>
          <Button 
            onClick={onClose}
            className="w-full bg-purple-600 hover:bg-purple-700"
          >
            Let&apos;s Get Started
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}