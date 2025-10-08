"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  CalendarDays,
  Plus,
  Search,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";

export default function BookingsPage() {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
    }),
  };

  const bookings = [
    {
      id: "BKG-001",
      name: "Ahmad Raza",
      email: "ahmad@example.com",
      date: "2025-10-08",
      status: "Confirmed",
    },
    {
      id: "BKG-002",
      name: "Zain Malik",
      email: "zain.malik@example.com",
      date: "2025-10-10",
      status: "Pending",
    },
    {
      id: "BKG-003",
      name: "Hina Shah",
      email: "hina.shah@example.com",
      date: "2025-10-09",
      status: "Cancelled",
    },
    {
      id: "BKG-004",
      name: "Bilal Ahmed",
      email: "bilal@example.com",
      date: "2025-10-12",
      status: "Confirmed",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="flex flex-col md:flex-row justify-between md:items-center gap-3"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <CalendarDays className="h-7 w-7 text-blue-600" /> Bookings Overview
          </h1>
          <p className="text-muted-foreground">
            Manage, track, and monitor all bookings in one place.
          </p>
        </div>

        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" /> New Booking
        </Button>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial="hidden"
        animate="visible"
        custom={1}
        variants={fadeUp}
        className="flex items-center gap-3 flex-wrap"
      >
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input placeholder="Search bookings..." className="pl-9" />
        </div>
        <Button variant="outline">Filter</Button>
      </motion.div>

      <Separator />

      {/* Summary Cards */}
      <motion.div
        initial="hidden"
        animate="visible"
        custom={2}
        variants={fadeUp}
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6"
      >
        <Card className="shadow-sm hover:shadow-md transition">
          <CardHeader>
            <CardTitle>Total Bookings</CardTitle>
            <CardDescription>All bookings to date</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">1,245</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition">
          <CardHeader>
            <CardTitle>Confirmed</CardTitle>
            <CardDescription>Active and approved</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">982</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition">
          <CardHeader>
            <CardTitle>Pending</CardTitle>
            <CardDescription>Awaiting confirmation</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-yellow-600">143</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition">
          <CardHeader>
            <CardTitle>Cancelled</CardTitle>
            <CardDescription>Declined or cancelled</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-red-600">120</p>
          </CardContent>
        </Card>
      </motion.div>

      <Separator />

      {/* Bookings Table */}
      <motion.div
        initial="hidden"
        animate="visible"
        custom={3}
        variants={fadeUp}
        className="space-y-4"
      >
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Clock className="h-5 w-5 text-blue-600" /> Recent Bookings
        </h2>

        <div className="overflow-hidden rounded-xl border">
          <table className="min-w-full bg-white text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="text-left px-4 py-3 font-medium">Booking ID</th>
                <th className="text-left px-4 py-3 font-medium">Customer</th>
                <th className="text-left px-4 py-3 font-medium">Email</th>
                <th className="text-left px-4 py-3 font-medium">Date</th>
                <th className="text-left px-4 py-3 font-medium">Status</th>
                <th className="text-right px-4 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <motion.tr
                  key={index}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  variants={fadeUp}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3 font-medium">{booking.id}</td>
                  <td className="px-4 py-3">{booking.name}</td>
                  <td className="px-4 py-3 text-gray-600">{booking.email}</td>
                  <td className="px-4 py-3">{booking.date}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 text-xs rounded-full flex items-center gap-1 w-fit ${
                        booking.status === "Confirmed"
                          ? "bg-green-100 text-green-700"
                          : booking.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {booking.status === "Confirmed" && (
                        <CheckCircle size={12} />
                      )}
                      {booking.status === "Pending" && <Clock size={12} />}
                      {booking.status === "Cancelled" && <XCircle size={12} />}
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
