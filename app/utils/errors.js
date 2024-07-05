export function seiveErrorMsg(msg){
    let regex = /[({;:]/
    let message = msg.split(regex)
    return message[0]
}
