import axios from 'axios';
import UrlGenerator from './UrlGenerator';
const publicIp = require('public-ip');

const ApiRequest =  {

    async login(email, pass){ 
        try {
            const IPv4 = await publicIp.v4();
            const uri = await UrlGenerator.login();
            const { data } = await axios.post(uri, {
                email: email, 
                password: pass,
                ip_address: IPv4
            });
            return data; 
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}

export default ApiRequest;