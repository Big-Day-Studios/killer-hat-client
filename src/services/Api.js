import axios from 'axios';


const ApiRequest =  {


        async login(userData, setState){ 
            try {
                
                const username = userData.username;
                const password = userData.password;

                
                console.log(uri);

                await axios.post(uri, {
                    CadastroUser:username, 
                    CadastroPass:password
                }).then(function (response) {
                    console.log(response.data);
                    setState(
                        response.data
                    );
                });    
            } catch (error) {
                setState(error)
            }
        },

        
  }

export default ApiRequest;