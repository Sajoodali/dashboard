"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, XCircle } from "lucide-react";

export default function BookingsTable({ bookings = [], loading = false, onSelect }) {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.3 },
    }),
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      className="space-y-4"
    >
      <h2 className="text-xl font-semibold">Recent Bookings</h2>

      {loading ? (
        <p className="text-gray-500">Loading bookings...</p>
      ) : (
        <div className="overflow-hidden rounded-xl border">
          <table className="min-w-full bg-white text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Booking ID</th>
                <th className="px-4 py-3 text-left font-medium">Customer</th>
                <th className="px-4 py-3 text-left font-medium">Email</th>
                <th className="px-4 py-3 text-left font-medium">Date</th>
                <th className="px-4 py-3 text-left font-medium">Status</th>
                <th className="px-4 py-3 text-right font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-500">
                    No bookings found.
                  </td>
                </tr>
              ) : (
                bookings.map((booking, index) => (
                  <motion.tr
                    key={booking._id}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={fadeUp}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-3 font-medium">{booking.bookingId}</td>
                    <td className="px-4 py-3">
                      {booking.formData?.firstName} {booking.formData?.lastName}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {booking.formData?.email || "N/A"}
                    </td>
                    <td className="px-4 py-3">
                      {new Date(booking.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={booking.status} />
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onSelect && onSelect(booking)}
                      >
                        View
                      </Button>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
}

function StatusBadge({ status }) {
  const base = "px-2 py-1 text-xs rounded-full flex items-center gap-1 w-fit";
  const colorMap = {
    confirmed: "bg-green-100 text-green-700",
    pending: "bg-yellow-100 text-yellow-700",
    cancelled: "bg-red-100 text-red-700",
  };

  const iconMap = {
    confirmed: <CheckCircle className="w-3.5 h-3.5" />,
    pending: <Clock className="w-3.5 h-3.5" />,
    cancelled: <XCircle className="w-3.5 h-3.5" />,
  };

  return (
    <span className={`${base} ${colorMap[status] || "bg-gray-100 text-gray-700"}`}>
      {iconMap[status]} <span className="capitalize">{status}</span>
    </span>
  );
}
