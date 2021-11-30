import axios  from 'axios';
import UrlGenerator from './UrlGenerator';
const publicIp = require('public-ip');

const ApiRequest =  {
    async login(userData, setResponse){ 
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
                setResponse(response.data)
            }).catch(error =>{
                if(error.response.status === 400){
                    console.log(error.response.data);  
                    setResponse(error.response.data) 
                }else{
                    console.log({error:true, msg: "Something went wrong. Please try again later."})
                    setResponse({error:true, msg: "Something went wrong. Please try again later."});
                }
            });
    },
    async username(username, setResponse){ 

            const IPv4 = await publicIp.v4();
            const uri = await UrlGenerator.username();
            axios.post(uri, 
            {
                username: username
            }).then((response) => {
                console.log(response.data);  
                setResponse(response.data)
            }).catch(error =>{
                if(error.response.status === 400){
                    console.log(error.response.data);  
                    setResponse(error.response.data) 
                }else{
                    console.log({error:true, msg: "Something went wrong. Please try again later."})
                    setResponse({error:true, msg: "Something went wrong. Please try again later."});
                }
            });
    },
    async email(email, setResponse){ 

        const IPv4 = await publicIp.v4();
        const uri = await UrlGenerator.email();
        axios.post(uri, 
        {
            email: email
        }).then((response) => {
            console.log(response.data);  
            setResponse(response.data)
        }).catch(error =>{
            if(error.response.status === 400){
                console.log(error.response.data);  
                setResponse(error.response.data) 
            }else{
                console.log({error:true, msg: "Something went wrong. Please try again later."})
                setResponse({error:true, msg: "Something went wrong. Please try again later."});
            }
        });
    },
    async signup(data, setResponse){ 
        
        const { name, username, email, password, birthday } = data;
        
        const IPv4 = await publicIp.v4();
        const uri = await UrlGenerator.signup();
        axios.post(uri, 
        {
            name : name,
            username : username,
            email : email,
            password : password,
            birthday : birthday,
            ip_address : IPv4
        }).then((response) => {
            console.log(response.data);  
            setResponse(response.data)
        }).catch(error =>{
            if(error.response.status === 400){
                console.log(error.response.data);  
                setResponse(error.response.data) 
            }else{
                console.log({error:true, msg: "Something went wrong. Please try again later."})
                setResponse({error:true, msg: "Something went wrong. Please try again later."});
            }
        });
    },
    async code(code, email, setResponse){ 
        
        const uri = await UrlGenerator.code();
        axios.post(uri, 
        {
            email: email,
            code: code,
        }).then((response) => {
            console.log(response.data.response);  
            setResponse(response.data.response)
        }).catch(error =>{
            if(error.response.status === 400){
                console.log(error.response.data.response);  
                setResponse(error.response.data.response) 
            }else{
                console.log({error:true, msg: "Something went wrong. Please try again later."})
                setResponse({error:true, msg: "Something went wrong. Please try again later."});
            }
        });
    }
}

export default ApiRequest;