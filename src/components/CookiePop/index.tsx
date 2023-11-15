import React, { useState, useEffect } from 'react';
import styles from './index.module.css'
import ErrorIcon from '@mui/icons-material/Error';
import { Button } from '@mui/material';
import { useTranslation } from 'next-i18next';


const CookieConsent: React.FC = () => {

    const { t } = useTranslation('common');
    const [showPopup, setShowPopup] = useState(false);
    const [fade,setFade] = useState(styles.cookieConsentPopup);
    useEffect(() => {
        const consent = localStorage.getItem('cookieConsent');
        if (consent !== 'true') {
            setShowPopup(true);
            setTimeout(() => {
              setFade(`${styles.cookieConsentPopup} ${styles.cookieConsentVisible}`)
              }, 3000);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookieConsent', 'true');
        setShowPopup(false);
    };

    if (!showPopup) {
        return null;
    }

    return (
        <div className={fade}>
            <div className={styles.title}>
                <ErrorIcon  className={styles.errorIcon} style={{
                    marginRight: '8px'
                }} />
                {t('We use cookies to improve your experience. By continuing to browse our site, you agree to our Cookie Policy.')}</div>
            <div className={styles.acceptButton}>
                <Button  onClick={handleAccept} disableElevation variant="contained">{t('Accept')}</Button>
            </div>
        </div>
    );
};

export default CookieConsent;