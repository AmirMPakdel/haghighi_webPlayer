const Developer_mode = false;

function setStatics(){
    
    if(Developer_mode){

        statics = {
            get_webplayer_packages : "http://arabikonkoori.ir/hagh_player/WebPlayerPackage.php",
            get_webplayer_video : "http://arabikonkoori.ir/hagh_player/WebPlayerVideo.php",
            error_page : "/error",
            video_page : "/player",
            play_svg_file : "./assets/play.svg",
            error_img_file : "./assets/img1.png",
        }

    }
}

let statics = {
    get_webplayer_packages : "/hagh_player/WebPlayerPackage.php",
    get_webplayer_video : "/hagh_player/WebPlayerVideo.php",
    error_page : "/webplayer/error.html",
    video_page : "/webplayer/player.html",
    play_svg_file : "/webplayer/assets/play.svg",
    error_img_file : "/webplayer/assets/img1.png",
};

export {setStatics, statics};