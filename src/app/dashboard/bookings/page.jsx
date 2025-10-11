"use client";

import { useEffect, useState } from "react";
import DataTable from "@/components/common/DataTable";
import SummaryCards from "@/components/common/SummaryCards";
import PageHeader from "@/components/common/PageHeader";
import BookingSearchBar from "@/components/SearchBar";
import BookingDetailsDialog from "@/components/BookingDetailsDialog";
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CalendarDays, CheckCircle, Clock, XCircle } from "lucide-react";
import { fetchBookings } from "@/action/bookingActions";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" },
    }),
  };

  // 🧠 Fetch bookings
  useEffect(() => {
    async function loadBookings() {
      try {
        const res = await fetchBookings();
        setBookings(res.data || []);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      } finally {
        setLoading(false);
      }
    }
    loadBookings();
  }, []);

  // 🔍 Search handler
  const handleSearch = (query) => setSearch(query);

  // 🔎 Filter bookings
  const filteredBookings = bookings.filter((b) =>
    b.formData?.firstName?.toLowerCase().includes(search.toLowerCase())
  );

  const isSearching = search.trim().length > 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      {/* <motion.div
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
      </motion.div> */}
      <PageHeader
        title="Bookings Overview"
        description="Manage, track, and monitor all bookings in one place."
        icon={CalendarDays}
      />

      {/* Search Bar */}
      <motion.div
        initial="hidden"
        animate="visible"
        custom={1}
        variants={fadeUp}
        className="flex items-center gap-3 flex-wrap"
      >
        <BookingSearchBar onSearch={handleSearch} />
      </motion.div>

      <Separator />

      {/* If searching → show search results */}
     {isSearching ? (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 justify-center items-center py-6"
        >
          {filteredBookings.length === 0 ? (
            <p className="text-center text-gray-500 col-span-full">
              No results found for <strong>{search}</strong>.
            </p>
          ) : (
            filteredBookings.map((booking, index) => (
              <motion.div
                key={booking._id}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
              >
                <Card className="shadow-md hover:shadow-lg transition border border-blue-100">
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      {booking.formData?.firstName} {booking.formData?.lastName}
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          booking.status === "confirmed"
                            ? "bg-green-100 text-green-700"
                            : booking.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </CardTitle>
                    <CardDescription>
                      Booking ID: {booking.bookingId}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p>
                      <strong>Email:</strong> {booking.formData?.email}
                    </p>
                    <p>
                      <strong>Phone:</strong> {booking.formData?.phone}
                    </p>
                    <p>
                      <strong>Date:</strong>{" "}
                      {new Date(booking.createdAt).toLocaleDateString()}
                    </p>
                    <Button
                      className="w-full mt-2"
                      variant="outline"
                      onClick={() => {
                        setSelectedBooking(booking);
                        setDialogOpen(true);
                      }}
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </motion.div>
      ) : (
        <>
          {/* Summary Cards */}
          {/* <motion.div
            initial="hidden"
            animate="visible"
            custom={2}
            variants={fadeUp}
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6"
          >
            {[
              {
                title: "Total Bookings",
                description: "All bookings to date",
                value: bookings.length,
                icon: CalendarDays,
                color: "from-blue-500/10 to-blue-500/5 text-blue-700",
              },
              {
                title: "Confirmed",
                description: "Active and approved",
                value: bookings.filter((b) => b.status === "confirmed").length,
                icon: CheckCircle,
                color: "from-green-500/10 to-green-500/5 text-green-700",
              },
              {
                title: "Pending",
                description: "Awaiting confirmation",
                value: bookings.filter((b) => b.status === "pending").length,
                icon: Clock,
                color: "from-yellow-500/10 to-yellow-500/5 text-yellow-700",
              },
              {
                title: "Cancelled",
                description: "Declined or cancelled",
                value: bookings.filter((b) => b.status === "cancelled").length,
                icon: XCircle,
                color: "from-red-500/10 to-red-500/5 text-red-700",
              },
            ].map((card, index) => (
              <motion.div key={index} custom={index} variants={fadeUp}>
                <Card
                  className={`bg-gradient-to-br ${card.color} border-none shadow-lg hover:shadow-xl transition-all duration-300`}
                >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {card.title}
                    </CardTitle>
                    <card.icon className="h-5 w-5 opacity-70" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{card.value}</div>
                    <p className="text-sm text-muted-foreground">
                      {card.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div> */}
          <SummaryCards
            cards={[
              {
                title: "Total Bookings",
                description: "All bookings to date",
                value: bookings.length,
                icon: CalendarDays,
                color: "from-blue-500/10 to-blue-500/5 text-blue-700",
              },
              {
                title: "Confirmed",
                description: "Active and approved",
                value: bookings.filter((b) => b.status === "confirmed").length,
                icon: CheckCircle,
                color: "from-green-500/10 to-green-500/5 text-green-700",
              },
              {
                title: "Pending",
                description: "Awaiting confirmation",
                value: bookings.filter((b) => b.status === "pending").length,
                icon: Clock,
                color: "from-yellow-500/10 to-yellow-500/5 text-yellow-700",
              },
              {
                title: "Cancelled",
                description: "Declined or cancelled",
                value: bookings.filter((b) => b.status === "cancelled").length,
                icon: XCircle,
                color: "from-red-500/10 to-red-500/5 text-red-700",
              },
            ]}
          />

          <Separator />

          {/* Normal Table (only visible when not searching) */}
          {/* <motion.div
            initial="hidden"
            animate="visible"
            custom={3}
            variants={fadeUp}
            className="space-y-4"
          >
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-600" /> Recent Bookings
            </h2>

            {loading ? (
              <p className="text-gray-500">Loading bookings...</p>
            ) : (
              <div className="overflow-hidden rounded-xl border">
                <table className="min-w-full bg-white text-sm">
                  <thead className="bg-gray-50 text-gray-600">
                    <tr>
                      <th className="text-left px-4 py-3 font-medium">
                        Booking ID
                      </th>
                      <th className="text-left px-4 py-3 font-medium">
                        Customer
                      </th>
                      <th className="text-left px-4 py-3 font-medium">Email</th>
                      <th className="text-left px-4 py-3 font-medium">Date</th>
                      <th className="text-left px-4 py-3 font-medium">
                        Status
                      </th>
                      <th className="text-right px-4 py-3 font-medium">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.length === 0 ? (
                      <tr>
                        <td
                          colSpan="6"
                          className="text-center py-6 text-gray-500"
                        >
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
                          <td className="px-4 py-3 font-medium">
                            {booking.bookingId}
                          </td>
                          <td className="px-4 py-3">
                            {booking.formData?.firstName}{" "}
                            {booking.formData?.lastName}
                          </td>
                          <td className="px-4 py-3 text-gray-600">
                            {booking.formData?.email || "N/A"}
                          </td>
                          <td className="px-4 py-3">
                            {new Date(booking.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`px-2 py-1 text-xs rounded-full flex items-center gap-1 w-fit ${
                                booking.status === "confirmed"
                                  ? "bg-green-100 text-green-700"
                                  : booking.status === "pending"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-red-100 text-red-700"
                              }`}
                            >
                              {booking.status === "confirmed" && (
                                <CheckCircle className="w-3.5 h-3.5" />
                              )}
                              {booking.status === "pending" && (
                                <Clock className="w-3.5 h-3.5" />
                              )}
                              {booking.status === "cancelled" && (
                                <XCircle className="w-3.5 h-3.5" />
                              )}
                              <span className="capitalize">
                                {booking.status}
                              </span>
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSelectedBooking(booking);
                                setDialogOpen(true);
                              }}
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
          </motion.div> */}
          <DataTable
            title="Recent Bookings"
            icon={Clock}
            loading={loading}
            data={bookings}
            columns={[
              { key: "bookingId", label: "Booking ID" },
              {
                label: "Customer",
                render: (b) =>
                  `${b.formData?.firstName || ""} ${
                    b.formData?.lastName || ""
                  }`,
              },
              { label: "Email", render: (b) => b.formData?.email || "N/A" },
              {
                label: "Date",
                render: (b) => new Date(b.createdAt).toLocaleDateString(),
              },
              {
                label: "Status",
                render: (b) => (
                  <span
                    className={`px-2 py-1 text-xs rounded-full flex items-center gap-1 w-fit ${
                      b.status === "confirmed"
                        ? "bg-green-100 text-green-700"
                        : b.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {b.status === "confirmed" && (
                      <CheckCircle className="w-3.5 h-3.5" />
                    )}
                    {b.status === "pending" && (
                      <Clock className="w-3.5 h-3.5" />
                    )}
                    {b.status === "cancelled" && (
                      <XCircle className="w-3.5 h-3.5" />
                    )}
                    <span className="capitalize">{b.status}</span>
                  </span>
                ),
              },
              {
                label: "Action",
                align: "right",
                render: (b) => (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSelectedBooking(b);
                      setDialogOpen(true);
                    }}
                  >
                    View
                  </Button>
                ),
              },
            ]}
          />
        </>
      )}

      {/* Dialog */}
      <BookingDetailsDialog
        booking={selectedBooking}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onStatusChange={(updatedBooking) => {
          setBookings((prev) =>
            prev.map((b) =>
              b._id === updatedBooking._id
                ? { ...b, status: updatedBooking.status }
                : b
            )
          );
        }}
      />
    </div>
  );
}
