
import { Link } from "react-router-dom";

export const Logo = () => {
  return (
    <Link to="/" className="relative z-20 flex items-center justify-center px-4 py-1">
      <span className="font-medium text-white text-lg">STRIKE LAB</span>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link to="/" className="relative z-20 flex items-center justify-center py-1">
      <span className="font-medium text-white text-lg">SL</span>
    </Link>
  );
};
