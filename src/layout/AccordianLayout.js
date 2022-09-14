import React from "react";
import { Accordion } from "react-bootstrap";
import styles from './AccordianLayout.module.css';

export const AccordianLayout = (props) =>{

    return(
        <>
            <Accordion className={styles.accordion} >
                <Accordion.Item className={styles['accordion-item']} eventKey={props.accordianKey}>
                    <Accordion.Header className={styles['accordion-headers']} >{props.accordianTitle}</Accordion.Header>
                    <Accordion.Body>
                        {props.children}
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </>
    );
};