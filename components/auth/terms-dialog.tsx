"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"

interface TermsDialogProps {
  isOpen: boolean
  onAccept: () => void
  onDecline: () => void
}

export function TermsDialog({ isOpen, onAccept, onDecline }: TermsDialogProps) {
  const [accepted, setAccepted] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={() => !accepted && onDecline()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Terms and Conditions</DialogTitle>
          <DialogDescription>
            Please read and accept our terms and conditions to continue
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4 text-sm">
            <h3 className="font-semibold">1. Acceptance of Terms</h3>
            <p>
              By accessing and using Bar Bus GR services, you agree to be bound by these Terms and Conditions,
              all applicable laws and regulations, and agree that you are responsible for compliance with any
              applicable local laws.
            </p>

            <h3 className="font-semibold">2. Service Rules</h3>
            <p>
              - You must be 21 years or older to use our services
              - Valid ID is required for boarding
              - No illegal substances allowed on the bus
              - Management reserves the right to refuse service
              - Cancellations must be made 24 hours in advance
            </p>

            <h3 className="font-semibold">3. Safety and Conduct</h3>
            <p>
              - Follow all safety instructions from staff
              - Remain seated while bus is in motion
              - No disruptive behavior
              - Respect other passengers and staff
            </p>

            <h3 className="font-semibold">4. Liability</h3>
            <p>
              Bar Bus GR is not responsible for lost or stolen items, injuries resulting from inappropriate
              behavior, or incidents occurring outside our vehicles at partner establishments.
            </p>

            <h3 className="font-semibold">5. Privacy Policy</h3>
            <p>
              Your use of Bar Bus GR services is also governed by our Privacy Policy. Please review our Privacy
              Policy, which also governs the site and informs users of our data collection practices.
            </p>
          </div>
        </ScrollArea>
        <DialogFooter className="flex-col items-start space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="terms" 
              checked={accepted} 
              onCheckedChange={(checked) => setAccepted(checked as boolean)} 
            />
            <label htmlFor="terms" className="text-sm">
              I have read and agree to the terms and conditions
            </label>
          </div>
          <div className="flex w-full justify-end space-x-2">
            <Button variant="outline" onClick={onDecline}>Decline</Button>
            <Button onClick={onAccept} disabled={!accepted}>Accept</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}