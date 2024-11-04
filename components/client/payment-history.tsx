"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard, CheckCircle2, XCircle } from "lucide-react";

const mockPayments = [
  {
    id: 1,
    date: "2024-01-15",
    amount: 30,
    status: "completed",
    method: "**** 1234",
    description: "Weekend Route - All Night Pass",
  },
  {
    id: 2,
    date: "2023-12-24",
    amount: 45,
    status: "completed",
    method: "**** 5678",
    description: "Christmas Light Tour",
  },
];

export function PaymentHistory() {
  return (
    <div className="space-y-4">
      {mockPayments.map((payment) => (
        <Card key={payment.id} className="bg-black/40 border-purple-800/30">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h4 className="font-semibold text-purple-300">{payment.description}</h4>
                <div className="flex items-center text-sm text-gray-400 space-x-2">
                  <CreditCard className="h-4 w-4" />
                  <span>{payment.method}</span>
                </div>
                <div className="text-sm text-gray-400">{payment.date}</div>
              </div>
              <div className="text-right space-y-2">
                <Badge
                  variant={payment.status === "completed" ? "success" : "destructive"}
                  className="flex items-center gap-1"
                >
                  {payment.status === "completed" ? (
                    <CheckCircle2 className="h-3 w-3" />
                  ) : (
                    <XCircle className="h-3 w-3" />
                  )}
                  {payment.status}
                </Badge>
                <div className="text-lg font-semibold">${payment.amount}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}