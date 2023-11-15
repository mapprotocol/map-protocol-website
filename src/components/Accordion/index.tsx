


import * as React from 'react';
import Image from 'next/image'
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from './index.module.css'

interface TextComponentProps {
    data: Array<any>;
}

const accordionSx = {
    marginBottom: '10px',
    backgroundColor: '#F7F7F7',
    borderRadius: '10px',
    borderStyle: 'none',
    boxShadow: 'none',
    overflow: 'hidden'
}


export const AccordionMap: React.FC<TextComponentProps> = ({ data }) => {
    const [expanded, setExpanded] = React.useState<number | false>(false);
    const handleChange =
        (panel: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };
    return (
        <>
            {data.map((item, index) => (

                <Accordion
                    key={index}
                    expanded={expanded === index}
                    onChange={handleChange(index)}
                    sx={accordionSx}
                >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <div style={{
                            color: '#000',
                            fontSize: '18px',
                            fontWeight: '500'
                        }}>{item.title}</div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div style={{
                            lineHeight:'24px',
                        }}
                        className={styles.content}>
                        {item.content}
                        {/* {item.content.map((contentItem, index) => (
                           <div key={index} className={styles.accordionP}>
                               {t(contentItem)}
                               </div>
                        ))} */}
                        </div>
                    </AccordionDetails>
                </Accordion>
            ))}</>
    )

}