import Cookies from "universal-cookie";
export interface Ioptions {
    path: string;
    expires: Date;
}

const cookies = new Cookies();


class CookieService {

    //Get
    get(name:string){
        return cookies.get(name);
    }
    //set 
    set(name:string,value:string,options:Ioptions){
        return cookies.set(name,value,options)
    }

    //Remove 
    remove(name:string){
        return cookies.remove(name);
    }
}

export default new CookieService();