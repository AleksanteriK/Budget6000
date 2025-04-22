import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { FaSpinner } from 'react-icons/fa';

interface LoadingSpinnerProps {
    message: string;
    countdown?: number | null;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message, countdown }) => {
    const navigate = useNavigate();
    const [currentCountdown, setCurrentCountdown] = useState(countdown);

    useEffect(() => {
        if (currentCountdown === null || currentCountdown === undefined) return;

        const interval = setInterval(() => {
            setCurrentCountdown(prev => {
                if (prev !== null && prev !== undefined && prev > 0) {
                    return prev - 1;
                } else {
                    clearInterval(interval);
                    navigate('/login');
                    return null;
                }
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [navigate, currentCountdown]);

    return (
        <div className="loading-spinner">
            <FaSpinner className="spinner" />
            <p>{message}</p>
            {currentCountdown !== null && currentCountdown !== undefined && (
                <p>Siirrytään kirjautumissivulle {currentCountdown} sekunnin päästä...</p>
            )}
        </div>
    );
};

export default LoadingSpinner;
