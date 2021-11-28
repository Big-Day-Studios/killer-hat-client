import { Platform } from 'react-native';
import config from '../../variable.json';

const UrlGenerator =  {

    async login(){
        let url = "";
        if(Platform.OS !== 'web' ){
            url = config.protocol + "://" + config.host
        }
        console.log(url + config.login_path)
        return url + config.login_path;
    },
    async username(){
        let url = "";
        if(Platform.OS !== 'web' ){
            url = config.protocol + "://" + config.host
        }
        console.log(url + config.username_path)
        return url + config.username_path;
    },
    async email(){
        let url = "";
        if(Platform.OS !== 'web' ){
            url = config.protocol + "://" + config.host
        }
        console.log(url + config.email_path)
        return url + config.email_path;
    },
}

export default UrlGenerator;