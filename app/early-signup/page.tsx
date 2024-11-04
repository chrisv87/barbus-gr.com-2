"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { TermsDialog } from "@/components/auth/terms-dialog"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export default function EarlySignUpPage() {
  const [showTerms, setShowTerms] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setShowTerms(true)
  }

  function handleAcceptTerms() {
    setShowTerms(false)
    toast({
      title: "Registration successful!",
      description: "Redirecting to your dashboard...",
    })
    // TODO: Implement actual registration and authentication
    router.push("/client/dashboard")
  }

  function handleDeclineTerms() {
    setShowTerms(false)
    toast({
      variant: "destructive",
      title: "Terms Declined",
      description: "You must accept the terms to create an account.",
    })
  }

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-3.5rem)] py-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Early Access Sign Up</CardTitle>
          <CardDescription>
            Be among the first to experience Bar Bus GR
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="john@example.com" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="(616) 555-0123" type="tel" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="********" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input placeholder="********" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">Get Early Access</Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <TermsDialog 
        isOpen={showTerms}
        onAccept={handleAcceptTerms}
        onDecline={handleDeclineTerms}
      />
    </div>
  )
}