import type { Letter } from "../models/Letter";
import { motion } from "framer-motion";

const TileComponent = ({ letter, status }: Letter) => {
  const statuses = {
    correct: "bg-green-300 border-green-300",
    present: "bg-yellow-200 border-yellow-200",
    absent: "bg-gray-400 border-gray-400",
    new: "bg-gray-300 border-gray-300",
  };

  return (
    <motion.div
      className={`w-14 h-14 border-2 rounded flex items-center justify-center text-xl font-bold uppercase ${
        status ? statuses[status] : "bg-gray-300"
      }`}
      animate={{ scale: letter ? 1.05 : 1 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {letter}
    </motion.div>
  );
};

export default TileComponent;
