/*
* CookieManager.js
* Store endings in cookies, when start over again, load endings
* from cookies.
*
* 2018.7.30
*
 */



function cookieManager(){
    this.flag = 1
}

// format: Ending1=true
cookieManager.prototype.setCookie = function (ending, flag) {
    if(flag=="true"){
        document.cookie = ending + "=true";
    }
    else if(flag=="false"){
        document.cookie = ending + "=false";
    }
}

cookieManager.prototype.getCookie = function (cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');

    for(var i=0; i<ca.length; i++){
        var c = ca[i];
        while(c.charAt(0) == ' '){
            c = c.substring(1);
        }
        if(c.indexOf(name)==0){
            return c.substring(name.length, c.length);
        }
    }

    return "";
}