"use client"

import { Card, CardContent } from "@/components/ui/card"
import { CreditCard } from "lucide-react"

export function CreditCardComponent() {
  return (
    <Card className="bg-gradient-to-br from-indigo-600 to-indigo-700 text-white">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-8">
          <div className="text-lg font-semibold">CREDIT</div>
          <CreditCard className="h-6 w-6" />
        </div>
        <div className="mb-8 text-xl tracking-widest">•••• •••• •••• 1234</div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-xs text-indigo-200">CARD NAME</div>
            <div className="font-medium">$15,595.35</div>
          </div>
          <div>
            <div className="text-xs text-indigo-200">EXPIRY</div>
            <div className="font-medium">05/25</div>
          </div>
          <div>
            <div className="text-xs text-indigo-200">LIMIT</div>
            <div className="font-medium">$20,000</div>
          </div>
          <div>
            <div className="text-xs text-indigo-200">CVV</div>
            <div className="font-medium">123</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

