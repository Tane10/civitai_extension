import React from 'react';

interface IconProps {
  name: string;
}

const Icon: React.FC<IconProps> = ({ name }) => {
  switch (name) {
    case 'photo':
      return <span className="text-blue-500">📷</span>;
    case 'info':
      return <span className="text-blue-500">ℹ️</span>;
    case 'remix':
      return <span className="text-blue-500">🔄</span>;
    case 'bin':
      return <span className="text-red-500">🗑️</span>;
    default:
      return null;
  }
};

export default Icon;
