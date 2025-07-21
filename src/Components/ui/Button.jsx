import React from 'react';

const buttonStyles = {
    primary: "bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500",
    secondary: "bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500",
    blue: "bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
    purple: "bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
};

const Button = ({
    variant = 'primary',
    onClick,
    children,
    className = '',
    disabled = false,
    type = 'button'
}) => {
    const baseStyle = buttonStyles[variant] || buttonStyles.primary;
    const disabledStyle = disabled ? 'opacity-50 cursor-not-allowed' : '';

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyle} ${disabledStyle} ${className}`}
        >
            {children}
        </button>
    );
};

export default Button; 