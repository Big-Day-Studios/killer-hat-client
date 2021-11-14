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

}

export default UrlGenerator;