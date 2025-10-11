// "use client";

// import { motion } from "framer-motion";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

// export default function SummaryCards({ cards = [] }) {
//   // 🎬 Animation Variants
//   const container = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.12,
//         delayChildren: 0.05,
//       },
//     },
//   };

//   const fadeUp = {
//     hidden: { opacity: 0, y: 30, scale: 0.98 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       scale: 1,
//       transition: {
//         type: "spring",
//         stiffness: 120,
//         damping: 14,
//         mass: 0.6,
//       },
//     },
//   };

//   return (
//     <motion.div
//       variants={container}
//       initial="hidden"
//       animate="visible"
//       className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6"
//       style={{
//         willChange: "transform, opacity", // 🧠 GPU hint for smoother motion
//       }}
//     >
//       {cards.map((card, index) => (
//         <motion.div
//           key={index}
//           variants={fadeUp}
//           whileHover={{
//             y: -5,
//             scale: 1.03,
//             boxShadow:
//               "0 10px 25px rgba(0,0,0,0.1), 0 4px 8px rgba(0,0,0,0.06)",
//           }}
//           transition={{ type: "spring", stiffness: 200, damping: 15 }}
//           className="transform-gpu"
//         >
//           <Card
//             className={`border border-gray-100/80 shadow-sm bg-white/95 backdrop-blur-sm hover:bg-white hover:shadow-md transition-all duration-300 rounded-2xl`}
//           >
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium tracking-wide text-gray-800 flex items-center gap-2">
//                 {card.title}
//                 <motion.span
//                   initial={{ rotate: -10, opacity: 0 }}
//                   animate={{ rotate: 0, opacity: 1 }}
//                   transition={{ type: "spring", delay: 0.15 * (index + 1) }}
//                 >
//                   <card.icon className={`h-5 w-5 ${card.iconColor || "text-gray-600"}`} />
//                 </motion.span>
//               </CardTitle>
//             </CardHeader>

//             <CardContent>
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{
//                   delay: 0.12 * (index + 1),
//                   duration: 0.4,
//                   ease: "easeOut",
//                 }}
//                 className="text-3xl font-bold text-gray-900"
//               >
//                 {card.value}
//               </motion.div>
//               <p className="text-sm text-muted-foreground mt-1">
//                 {card.description}
//               </p>
//             </CardContent>
//           </Card>
//         </motion.div>
//       ))}
//     </motion.div>
//   );
// }


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
