import React, { Component } from "react";
import styles from "./player.module.css";
import axios from "axios";
import { statics } from "../statics";

export default class player extends Component {

  state={
    video_id:null,
    package_id:null,
    video_link:null,
    user_num:"",
    pos_h:"",
    pos_v:"",
    number_element:null,
  }

  componentDidMount(){
    let search = location.search.substring(1);
    let params = {};

    if(search){
      params = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')
    }

    if(params.video_id && params.package_id){
      this.state.video_id = params.video_id;
      this.state.package_id = params.package_id;
      this.getVideo();
    }

    window.addEventListener("resize", this.onResize);
  }

  componentWillUnmount(){
    window.removeEventListener("resize", this.onResize);
  }

  getVideo = ()=>{

    axios.get(statics.get_webplayer_video+"?package_id="+this.state.package_id+"&video_id="+this.state.video_id).then((res)=>{

      if(res.data["result_code"]==="1000"){

        let num1 = res.data["phone_number"];
        let num2 = '';
        if(num1[0]=="+"){
          num2="0"+num1.slice(3, num1.length);
        }else{
          num2 = num1;
        }
        this.state.user_num = num2;
        this.state.video_link = res.data["data"];
        this.random_element();
        this.internal = setInterval(this.random_element, 45000);
      
      }else if(res.data["result_code"]==="5003"){
        // user didn't own the package
        window.location.href=statics.error_page+"?error=1";

      }else if(res.data["result_code"]==="5002"){
        // video not found
        window.location.href=statics.error_page+"?error=2";

      }else if(res.data["result_code"]==="5004"){
        // phone_number not found
        window.location.href=statics.error_page+"?error=3";
      
      }else{
        // server error
        window.location.href=statics.error_page+"?error=12";
      }
    });
  }

  onResize = ()=>{

    if(!this.element){
      return;
    }
    let r = 1.78;
    let w = window.innerWidth;
    let h = window.innerHeight;
    let vertical_margin = 32;
    let horizontal_margin = 32;
    let x = h * r;
    let z = (x - w) / 2;
    if(z>=0){
      vertical_margin += (Math.abs(z)/2);
    }else{
      horizontal_margin += (Math.abs(z));
    }
    this.element.style.top="unset";
    this.element.style.right="unset";
    this.element.style.left="unset";
    this.element.style.bottom="unset";
    if(this.state.pos_v==="top"){
      this.element.style.top = `${Math.floor(vertical_margin)}px`;
    }else{
      this.element.style.bottom = `${Math.floor(vertical_margin)}px`;
    }
    if(this.state.pos_h==="left"){
      this.element.style.left = `${Math.floor(horizontal_margin)}px`;
    }else{
      this.element.style.right = `${Math.floor(horizontal_margin)}px`;
    }
  }

  random_element = ()=>{
    let s={
      position: "fixed",
      userSelect:"none",
      pointerEvents:"none",
      zIndex: 999,
      fontSize: "4vmin",
      fontWeight:700,
      //backgroundColor:"red",
      opacity: 0.7,
      width:"24vmin",
      display:"flex",
      justifyContent:"center",
      color: "#aaa",
    }
    let pos = random_position();
    console.log("wwww->"+JSON.stringify(pos));
    let element = <div ref={r=>this.element=r} className={styles.number} style={s}>{this.state.user_num}</div>;
    this.setState({number_element:element, pos_v:pos.v, pos_h:pos.h}, this.onResize);
  }
  
  render(){
    return(
      <div className={styles.con}>
        {
          this.state.video_link?
          <iframe className={styles.iframe} src={this.state.video_link}/>:null
        }
        {
          this.state.number_element
        }
      </div>
      
    )
  }
}

function random_position(){
  
  let s = {};
  let num = Math.floor(Math.random() * 4); // 0 - 3

  switch(num){
    case 0:
      s.v="top"; s.h="left";
      break;
    case 1:
      s.v="top"; s.h="right";
      break;
    case 2:
      s.v="bottom"; s.h="right";
      break;
    case 3:
      s.v="bottom"; s.h="left";
      break;
  }

  // let num = Math.floor(Math.random() * 6); // 0 - 9

  // switch(num){
  //   case 0:
  //     s.top="2vh";s.left="2vw";
  //     break;
  //   case 1:
  //     s.top="1.2vh";s.left="calc(50vw - 12vw)";
  //     break;
  //   case 2:
  //     s.top="2vh";s.right="2vw";
  //     break;
  //   case 3:
  //     s.bottom="2vh";s.right="2vw";
  //     break;
  //   case 4:
  //     s.bottom="1.2vh";s.left="calc(50vw - 12w)";
  //   case 5:
  //     s.bottom="2vh";s.left="2vw";
  //     break;
  //   default:
  //     s.bottom="2vh";s.left="2vw";
  //     break;
  // }

  return s;
}