import React, { useState, useEffect } from 'react';
import styles from './index.module.css'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
const BackToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 800) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);

        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <div className={styles.scrollToTop}>
            {isVisible &&
                <button onClick={scrollToTop}>
                    <KeyboardArrowUpIcon />
                    <div className={styles.scrollText}>Top</div>
                </button>}
        </div>
    );
};

export default BackToTopButton;
