import { motion } from "framer-motion";
import { Link } from "react-router-dom";
export const Logo = () => {
  return <Link to="/" className="relative z-20 flex items-center space-x-2 px-4 py-1 text-sm font-normal text-black">
      <motion.span initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} className="whitespace-pre font-medium text-black dark:text-white">
        STRIKE LAB
      </motion.span>
    </Link>;
};
export const LogoIcon = () => {
  return <Link to="/" className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black">
      
    </Link>;
};