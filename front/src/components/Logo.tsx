import LogoAz from "../assets/images/logo-az.png";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "full";
  onClick?: () => void;
}

const sizeClasses = {
  full: "w-full",
  sm: "w-16", 
  md: "w-32",
  lg: "w-64",
};

const Logo: React.FC<LogoProps> = ({ size = "sm", onClick }) => {
  return (
    <div className={`mx-auto ${sizeClasses[size]}`} onClick={onClick}>
      <img src={LogoAz} alt="Logo" className="w-full h-auto" />
    </div>
  );
};

export default Logo;
