import React from "react";

interface StatCardProps {
  image?: string;
  title: string;
  value: string | number;
}

const StatCard: React.FC<StatCardProps> = ({ image = null, title, value }) => {
  return (
<div className={`bg-white shadow-md rounded-lg p-10 flex flex-col items-start`}>
      {image ? <img src={image} alt={title} className="w-12 h-12 mb-3" /> : null}
      <div>
        <p className="text-gray-600 text-sm font-medium">{title}</p>
        <h2 className="text-xl font-semibold text-gray-900">{value}</h2>
      </div>
    </div>
  );
};

export default StatCard;
