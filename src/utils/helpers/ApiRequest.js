import axios from 'axios';
import constants from "./constants"
 

export async function getApi(url, header) {
    console.log("GetApi: ", `${constants.BASE_URL}/${url}`)
    return await axios.get(`${constants.BASE_URL}/${url}`, {
        headers: {
            'Accept': header.Accept,
            'Content-type': header.contenttype,
            'x-access-token': header.accesstoken,
            // Authorization: 'Bearer' + ' ' + header.accesstoken,
        }
    });
}

export async function postApi(url, payload, header) {
    console.log('postApi', `${constants.BASE_URL}/${url}`)
    return await axios.post(`${constants.BASE_URL}/${url}`, payload, {
        headers: {
            "Accept": header.Accept,
            'Content-Type': header.contenttype,
            'x-access-token': header.accesstoken
            // Authorization: 'Bearer' + ' ' + header.accesstoken,
        }
    });
}
