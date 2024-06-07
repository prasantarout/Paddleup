import { PixelRatio, Platform, Dimensions } from "react-native";




export default RandomNumber = (len, arr) => {
    let ans = '';
    for (let i = len; i > 0; i--) {
        ans +=
            arr[(Math.floor(Math.random() * arr.length))];
    }
    return ans

}