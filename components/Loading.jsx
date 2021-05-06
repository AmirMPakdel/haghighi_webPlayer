import React, { Component } from "react";
import styles from "./Loading.module.css";

export default class Loading extends Component {
    
    render(){
        return(
            <div className={styles.con}>

                <div className={styles.lds_facebook}>
                    <div></div><div></div><div></div>
                </div>
                
            </div>
        )
    }
}