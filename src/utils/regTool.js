export function isEmail(str){
    let emiailReg = /^\w[\w\-]+@[\w\-]+\.[\w\-]+$/;
    return emiailReg.test(str);
}
export function isPwd(str){
    let pwdlReg = /^\w[\w\-]{4,8}$/;
    return pwdlReg.test(str);
}