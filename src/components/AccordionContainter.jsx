import * as React from 'react';
import './App.css'
import SingleAccordion from "./SingleAccordion";

export default function AccordionContainer({ads, onAdDeleted, onAdUpdated}) {

    const renderAccordion = (ad) => {
        return (
            <SingleAccordion ad={ad}
                             key={ad.title}
                             onAdDeleted={onAdDeleted}
                             onAdUpated={onAdUpdated}
            />
        )
    }

    return (
        <div id="acc-container">
            {
                ads.map(ad => renderAccordion(ad))
            }
        </div>
    );
}
