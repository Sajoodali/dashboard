"use client";

import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, XCircle } from "lucide-react";

export default function BookingCard({ booking, index = 0, onView }) {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: index * 0.08, duration: 0.4, ease: "easeOut" },
    },
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-red-100 text-red-700";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="w-3.5 h-3.5" />;
      case "pending":
        return <Clock className="w-3.5 h-3.5" />;
      case "cancelled":
        return <XCircle className="w-3.5 h-3.5" />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="w-full"
    >
      <Card className="shadow-md hover:shadow-lg transition border border-blue-100 hover:scale-[1.02] duration-300">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>
              {booking.formData?.firstName} {booking.formData?.lastName}
            </span>
            <span
              className={`px-2 py-1 text-xs rounded-full flex items-center gap-1 ${getStatusStyle(
                booking.status
              )}`}
            >
              {getStatusIcon(booking.status)}
              <span className="capitalize">{booking.status}</span>
            </span>
          </CardTitle>
          <CardDescription>Booking ID: {booking.bookingId}</CardDescription>
        </CardHeader>

        <CardContent className="space-y-2 text-sm">
          <p>
            <strong>Email:</strong> {booking.formData?.email || "N/A"}
          </p>
          <p>
            <strong>Phone:</strong> {booking.formData?.phone || "N/A"}
          </p>
          <p>
            <strong>Date:</strong>{" "}
            {new Date(booking.createdAt).toLocaleDateString()}
          </p>
          <Button
            className="w-full mt-2"
            variant="outline"
            onClick={() => onView?.(booking)}
          >
            View Details
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
