import React, { Component } from "react";
import Loading from "../components/Loading";
import styles from "./index.module.css";
import axios from 'axios';
import VideoCard from "../components/VideoCard";
import { statics } from "../statics";

export default class index extends Component {

  state={
    package_id : null,
    show : <Loading/>,
    package_title:"",
    list : [],
  }

  componentDidMount(){

    let search = location.search.substring(1);
    let params = {};

    if(search){
      params = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')
    }

    if(params.package_id){
      this.getList(params.package_id);
    }
  }

  getList = (package_id)=>{

    axios.get(statics.get_webplayer_packages+"?package_id="+package_id).then((res)=>{
      
      if(res.data["result_code"] === "1000"){

        let list = res.data["data"];
        this.state.package_title = res.data["title"];
        this.state.package_id = package_id;
        this.setState({list , show: null});

      }else if(res.data["result_code"] === "5001"){
        // package-channel not found
        window.location.href=statics.error_page+"?error=4";

      }else{
        // server error
        window.location.href=statics.error_page+"?error=12";
      }
    })
  }

  
  render(){
    return(
      <div className={styles.con}>

        {
          this.state.show
        }

        {
          this.state.list.length?
          <>
          <div className={styles.title}>{this.state.package_title}</div>
          <div className={styles.list_con}>
            
            {
              this.state.list.map((v,i)=>(
                <>
                <VideoCard package_id={this.state.package_id} key={i} data={v}/>
                </>
              ))
            }

          </div>
          </>
          :null
        }

      </div>
    )
  }
}
