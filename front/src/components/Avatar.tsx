interface AvatarProps {
  initials: string;
  onClick?: () => void;  // Adiciona a prop onClick como opcional
}

const Avatar: React.FC<AvatarProps> = ({ initials, onClick }) => {
  return (
    <div 
      className="avatar bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center cursor-pointer"
      onClick={onClick}  // Adiciona a funcionalidade de click
    >
      {initials}
    </div>
  );
};

export default Avatar;
