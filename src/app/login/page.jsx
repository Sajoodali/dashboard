"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff, LogIn } from "lucide-react";

export default function FancyLoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 dark:from-gray-900 dark:via-gray-800 dark:to-black">
      {/* 🌀 Floating Animated Circles */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1.5, opacity: 0.2 }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
        className="absolute w-72 h-72 rounded-full bg-blue-400 blur-3xl top-20 left-10"
      />
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1.2, opacity: 0.15 }}
        transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
        className="absolute w-96 h-96 rounded-full bg-pink-400 blur-3xl bottom-20 right-10"
      />

      {/* ✨ Glass Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Card className="w-[400px] bg-white/20 dark:bg-gray-900/40 backdrop-blur-xl border border-white/30 shadow-2xl text-white">
          <CardHeader className="text-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <CardTitle className="text-4xl font-extrabold bg-gradient-to-r from-blue-300 to-pink-300 bg-clip-text text-transparent">
                Welcome Back 👋
              </CardTitle>
              <p className="text-sm text-gray-200 mt-2">
                Login to your account and continue your journey
              </p>
            </motion.div>
          </CardHeader>

          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-100">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="bg-white/20 border-white/30 text-white placeholder:text-gray-300 focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-100">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="bg-white/20 border-white/30 text-white placeholder:text-gray-300 focus:ring-2 focus:ring-pink-400"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-2.5 text-gray-200 hover:text-white"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              <Button className="w-full mt-2 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-pink-500 hover:from-pink-500 hover:to-blue-500 text-white font-semibold shadow-lg">
                <LogIn size={18} />
                Sign In
              </Button>
            </motion.div>
          </CardContent>

          <Separator className="bg-white/20" />

          <CardFooter className="text-center text-sm text-gray-200">
            Don’t have an account?{" "}
            <a href="/register" className="text-pink-300 hover:underline ml-1">
              Create one
            </a>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
