"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function DataTable({
  title,
  icon: Icon,
  columns,
  data = [],
  loading = false,
}) {
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
      className="space-y-4"
    >
      {title && (
        <h2 className="text-xl font-semibold flex items-center gap-2">
          {Icon && <Icon className="h-5 w-5 text-blue-600" />}
          {title}
        </h2>
      )}

      {loading ? (
        <p className="text-gray-500">Loading data...</p>
      ) : (
        <div className="overflow-hidden rounded-xl border">
          <table className="min-w-full bg-white text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                {columns.map((col, i) => (
                  <th
                    key={i}
                    className={`px-4 py-3 font-medium ${
                      col.align === "right" ? "text-right" : "text-left"
                    }`}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="text-center py-6 text-gray-800"
                  >
                    No data found.
                  </td>
                </tr>
              ) : (
                data.map((row, index) => (
                  <motion.tr
                    key={row._id || index}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={fadeUp}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    {columns.map((col, colIndex) => (
                      <td
                        key={colIndex}
                        className={`px-4 py-3 ${
                          col.align === "right" ? "text-right" : "text-left"
                        }`}
                      >
                        {col.render ? col.render(row) : row[col.key]}
                      </td>
                    ))}
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


