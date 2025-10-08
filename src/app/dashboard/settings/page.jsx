"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings, Sun, Moon, Bell } from "lucide-react";
import { useState } from "react";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [notifications, setNotifications] = useState(true);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.6 },
    }),
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="flex flex-col md:flex-row justify-between md:items-center gap-3"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Settings className="h-7 w-7 text-blue-600" /> Settings
          </h1>
          <p className="text-muted-foreground">
            Manage your preferences, theme, and account information.
          </p>
        </div>
      </motion.div>

      <Separator />

      {/* Theme Mode */}
      <motion.div initial="hidden" animate="visible" custom={1} variants={fadeIn}>
        <Card className="shadow-sm hover:shadow-md transition">
          <CardHeader>
            <CardTitle>Theme Mode</CardTitle>
            <CardDescription>Switch between light and dark mode</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              {theme === "dark" ? (
                <Moon className="h-6 w-6 text-yellow-400" />
              ) : (
                <Sun className="h-6 w-6 text-blue-500" />
              )}
              <span className="font-medium capitalize">{theme} mode</span>
            </div>
            <Switch
              checked={theme === "dark"}
              onCheckedChange={(checked) =>
                setTheme(checked ? "dark" : "light")
              }
            />
          </CardContent>
        </Card>
      </motion.div>

      {/* Notifications */}
      <motion.div initial="hidden" animate="visible" custom={2} variants={fadeIn}>
        <Card className="shadow-sm hover:shadow-md transition">
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Control how you receive updates</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <Bell className="h-6 w-6 text-blue-500" />
              <span className="font-medium">Enable notifications</span>
            </div>
            <Switch
              checked={notifications}
              onCheckedChange={setNotifications}
            />
          </CardContent>
        </Card>
      </motion.div>

      {/* Profile Settings */}
      <motion.div initial="hidden" animate="visible" custom={3} variants={fadeIn}>
        <Card className="shadow-sm hover:shadow-md transition">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Update your personal details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="John Doe" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="john@example.com" />
              </div>
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="********" />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="ml-auto">Save Changes</Button>
          </CardFooter>
        </Card>
      </motion.div>

      {/* Danger Zone */}
      <motion.div initial="hidden" animate="visible" custom={4} variants={fadeIn}>
        <Card className="border-red-200 bg-red-50 dark:bg-red-950/40">
          <CardHeader>
            <CardTitle className="text-red-600">Danger Zone</CardTitle>
            <CardDescription>
              Irreversible actions — proceed with caution.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="destructive">Delete Account</Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
