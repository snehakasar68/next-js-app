"use client";

import styles from "./about.module.css"

const About=()=>{
    return (
        <div className="container">
            <h1 className={styles.title}>This is about page</h1>
           
            <style jsx>
                {`
                    p{
                        color:orange;
                    }
                `}
                
            </style>
            <p>This is for test text</p>
        </div>
    )
}
export default About