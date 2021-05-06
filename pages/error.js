import React, { Component } from "react";
import { statics } from "../statics";
import styles from "./error.module.css";

export default class error extends Component {

    state={
        error:null
    }

    componentDidMount(){
        let search = location.search.substring(1);
        let params = {};
    
        if(search){
          params = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')
        }
    
        switch(params.error){
            case "1":
                this.state.error="لطفا ابتدا پکیج آموزشی را خریداری نمایید";
                break;
            case "2":
                this.state.error="ویدیو مورد نظر یافت نشد";
                break;
            case "3":
                this.state.error="شماره همراه کاربر یافت نشد";
                break;
            case "4":
                this.state.error="پکیج مورد نظر یافت نشد";
                break;
            default:
                this.state.error="مشکل در سرور برای یافتن و نمایش ویدیو";
        }
        this.setState(this.state);
      }
    
    render(){
        return(
            <div className={styles.con}>
                <img className={styles.img} src={statics.error_img_file}/>
                <div style={{fontSize:"1.2rem"}}>{"خطا"}</div>
                {
                    this.state.error?
                    <div>{this.state.error}</div>:null
                }
                <a href="/" style={{marginTop:"1rem"}}>{"بازگشت"}</a>
            </div>
        )
    }
}