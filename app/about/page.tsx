"use client";

import styles from "./about.module.css"

const About:React.FC=()=>{
    return (
        <div className="container">
            <h1 className={styles.title}>This is about page</h1>
            <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
            </p>
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