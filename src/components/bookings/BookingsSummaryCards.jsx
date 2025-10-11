"use client";

import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function BookingsSummaryCards({ stats = [] }) {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" },
    }),
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6"
    >
      {stats.map((card, index) => (
        <motion.div key={index} custom={index} variants={fadeUp}>
          <Card
            className={`bg-gradient-to-br ${card.color} border-none shadow-md hover:shadow-lg transition`}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              {card.icon && <card.icon className="h-5 w-5 opacity-70" />}
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{card.value}</div>
              <p className="text-sm text-muted-foreground">{card.description}</p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}


// import { CalendarDays, CheckCircle, Clock, XCircle } from "lucide-react";
// import BookingsSummaryCards from "@/components/bookings/BookingsSummaryCards";

// <BookingsSummaryCards
//   stats={[
//     {
//       title: "Total Bookings",
//       description: "All bookings to date",
//       value: 125,
//       icon: CalendarDays,
//       color: "from-blue-500/10 to-blue-500/5 text-blue-700",
//     },
//     {
//       title: "Confirmed",
//       description: "Active and approved",
//       value: 65,
//       icon: CheckCircle,
//       color: "from-green-500/10 to-green-500/5 text-green-700",
//     },
//     {
//       title: "Pending",
//       description: "Awaiting confirmation",
//       value: 35,
//       icon: Clock,
//       color: "from-yellow-500/10 to-yellow-500/5 text-yellow-700",
//     },
//     {
//       title: "Cancelled",
//       description: "Declined or cancelled",
//       value: 25,
//       icon: XCircle,
//       color: "from-red-500/10 to-red-500/5 text-red-700",
//     },
//   ]}
// />
