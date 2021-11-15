import axios  from 'react-native-axios';
import UrlGenerator from './UrlGenerator';
const publicIp = require('public-ip');

const ApiRequest =  {

    async login(userData){ 

        const {email, password} = userData;

            const IPv4 = await publicIp.v4();
            const uri = await UrlGenerator.login();
            axios.post(uri, 
            {
                email: email, 
                password: password,
                ip_address: IPv4
            }).then((response) => {
                console.log(response.data);  
                return response;
            }).catch(error =>{
                if(error.response.status === 400){
                    console.log(error.response);  

                    return error.response.data;
                }
            });
    }
}

export default ApiRequest;