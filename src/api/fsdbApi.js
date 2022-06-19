import ApiConfig from './ApiConfig'
import axios from 'axios'

const fsdmApi = {
    async getCategory(){
        try {
            const category = await axios.get('https://localhost:44366/api/Categories')
            return category
        } catch (err) {
            console.log(err);
        }
    }

}

export default fsdmApi;