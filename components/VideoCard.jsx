import axios from "axios";
import React, { Component } from "react";
import { statics } from "../statics";
import styles from "./VideoCard.module.css";

export default class VideoCard extends Component {

    state={
        hovered:false,
    }

    onSelect = ()=>{
        window.open(statics.video_page+"?video_id="+this.props.data.id+"&package_id="+this.props.package_id);
    }

    onMouseEnter=()=>{
        this.setState({hovered:true})
    }

    onMouseLeave=()=>{
        this.setState({hovered:false})
    }
    
    render(){
        return(
            <div className={styles.con} onClick={this.onSelect} onMouseEnter={this.onMouseEnter}
            onMouseLeave={this.onMouseLeave}>

                <div className={styles.title}>{this.props.data.title}</div>
                <div className={styles.img} style={{backgroundImage:`url(${this.props.data.thumbnail_url})`}}>
                    {
                        this.state.hovered?
                        <div className={styles.hov_con}>

                            <img className={styles.play} src={statics.play_svg_file}/>

                        </div>:null
                    }

                </div>
                
            </div>
        )
    }
}