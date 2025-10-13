"use client";

import { motion } from "framer-motion";
import PageHeader from "@/components/common/PageHeader";  
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
import { Phone, MessageSquare, UserPlus, Search } from "lucide-react";

export default function ContactsPage() {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
    }),
  };

  const contacts = [
    {
      name: "Ali Khan",
      email: "ali.khan@example.com",
      phone: "+92 300 1234567",
      message: "Need help with my booking.",
      status: "New",
    },
    {
      name: "Sara Ahmed",
      email: "sara.ahmed@example.com",
      phone: "+92 345 9876543",
      message: "Inquiry about payment options.",
      status: "In Progress",
    },
    {
      name: "Usman Malik",
      email: "usman.malik@example.com",
      phone: "+92 322 1112233",
      message: "Requesting callback tomorrow.",
      status: "Resolved",
    },
    {
      name: "Fatima Noor",
      email: "fatima.noor@example.com",
      phone: "+92 333 5557788",
      message: "General feedback about service.",
      status: "New",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}

      <PageHeader
              title="Contact Center"
              description="Manage customer inquiries, messages, and feedback."
              icon={Phone}
            />

      {/* Search & Filter */}
      <motion.div
        initial="hidden"
        animate="visible"
        custom={1}
        variants={fadeUp}
        className="flex items-center gap-3 flex-wrap"
      >
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input placeholder="Search contacts..." className="pl-9" />
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
            <CardTitle>Total Contacts</CardTitle>
            <CardDescription>All received messages</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">324</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition">
          <CardHeader>
            <CardTitle>New Contacts</CardTitle>
            <CardDescription>Unread messages</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-blue-600">112</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition">
          <CardHeader>
            <CardTitle>Resolved</CardTitle>
            <CardDescription>Handled successfully</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">178</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:shadow-md transition">
          <CardHeader>
            <CardTitle>In Progress</CardTitle>
            <CardDescription>Being managed</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-yellow-600">34</p>
          </CardContent>
        </Card>
      </motion.div>

      <Separator />

      {/* Contact Messages Table */}
      <motion.div
        initial="hidden"
        animate="visible"
        custom={3}
        variants={fadeUp}
        className="space-y-4"
      >
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-blue-600" /> Recent Messages
        </h2>

        <div className="overflow-hidden rounded-xl border">
          <table className="min-w-full bg-white text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="text-left px-4 py-3 font-medium">Name</th>
                <th className="text-left px-4 py-3 font-medium">Email</th>
                <th className="text-left px-4 py-3 font-medium">Phone</th>
                <th className="text-left px-4 py-3 font-medium">Message</th>
                <th className="text-left px-4 py-3 font-medium">Status</th>
                <th className="text-right px-4 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact, index) => (
                <motion.tr
                  key={index}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  variants={fadeUp}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3 font-medium">{contact.name}</td>
                  <td className="px-4 py-3 text-gray-600">{contact.email}</td>
                  <td className="px-4 py-3">{contact.phone}</td>
                  <td className="px-4 py-3 text-gray-600 truncate max-w-xs">
                    {contact.message}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        contact.status === "New"
                          ? "bg-blue-100 text-blue-700"
                          : contact.status === "In Progress"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {contact.status}
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
