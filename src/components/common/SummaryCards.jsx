"use client";

import { motion } from "framer-motion";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

export default function SummaryCards({ cards = [] }) {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05, duration: 0.3 },
    }),
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6"
    >
      {cards.map((card, index) => (
        <motion.div key={index} custom={index} variants={fadeUp}>
          <Card
            className={`bg-gradient-to-br ${card.color} border-none shadow-lg hover:shadow-xl transition-all duration-300`}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {card.title}
              </CardTitle>
              {card.icon && <card.icon className="h-5 w-5 opacity-70" />}
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
    </motion.div>
  );
}