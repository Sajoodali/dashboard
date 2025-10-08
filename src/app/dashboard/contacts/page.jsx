"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Phone } from "lucide-react";

export default function ContactsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Contacts</h1>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5 text-green-600" />
            Contact Messages
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            View and respond to messages sent through the contact form.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
