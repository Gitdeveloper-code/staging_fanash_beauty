"use client"
// components/StarButton.tsx
import React, { useState } from 'react';
import Link from "next/link"

type ButtonProps =
    {
        title: string
        icon?: string
        action?: () => void

    }

const StarButton = ({ title, icon, action }: ButtonProps) => {
    const [isHovered, setIsHovered] = useState(false);

    const buttonStyle: React.CSSProperties = {
        position: 'relative',
        cursor: 'pointer',
        fontWeight: 'bolder',
        transition: 'transform 150ms, box-shadow 150ms, background-color 150ms, border-color 150ms', // Added border-color transition
        boxShadow: isHovered ? '-.3em .3em #BFA75D' : '0 0 #999',
        transform: isHovered ? 'translate(.3em, -.3em)' : 'none',
        borderRadius: '0.5em', // Adjust the radius as needed
        borderTopLeftRadius: 0, // Only round the top right corner
        backgroundColor: 'transparent', // Set background color to transparent
        border: '2px solid #BFA75D', // Add white border
    };

    const starsStyle: React.CSSProperties = {
        position: 'absolute',
        opacity: isHovered ? 1 : 0,
        top: '-.3em',
        right: '-.3em',
        height: '100%',
        transition: 'transform 300ms, opacity 150ms',
        transform: isHovered ? 'translate(.2em, -.2em)' : 'none',
    };


    const starPathStyle: React.CSSProperties = {
        fill: isHovered ? '#fff' : '#999',
    };

    const handleHover = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <button
            style={buttonStyle}
            onMouseEnter={handleHover}
            onMouseLeave={handleMouseLeave}
            className='text-white font-mono  w-fit  font-medium  text-sm px-5 py-2.5 text-center inline-flex gap-3 items-center'
            onClick={action}
        >
            <label>{title}</label>
            <svg
                id="stars"
                viewBox="0 0 353 178"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={starsStyle}
            >
                <path
                    style={starPathStyle}
                    d="M271 37.9914C289.244 33.3118 295.91 27.0769 299.991 9C305.137 29.7552 312.313 36.1206 331.104 40.1127C312.194 43.8462 305.081 49.4282 302.113 69.1041C296.925 50.845 289.057 44.9589 271 37.9914Z"
                ></path>
                <path
                    style={starPathStyle}
                    d="M254.852 83.012C245.919 73.8857 239.998 72.0853 228 75.817C238.443 65.759 239.748 59.3874 235.721 47C244.325 56.8385 250.014 59.1225 262.574 54.195C253.611 63.4315 252.822 70.0469 254.852 83.012Z"
                ></path>
                <path
                    style={starPathStyle}
                    d="M275.626 97.3875C278.179 88.2512 277.138 83.7734 270.281 77.4407C280.63 80.423 285.214 78.8959 291.687 71.7049C288.553 80.8937 289.197 85.4019 297.032 91.6517C287.761 89.3164 283.212 91.2658 275.626 97.3875Z"
                ></path>
            </svg>
        </button>
    );
};

export default StarButton;
