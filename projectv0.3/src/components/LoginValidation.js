function Validation(values){
    let error = {}


if(values.username ===""){
    error.username = "กรุณาใส่บัญชีที่ลงทะเบียน"
}
else {
    error.name =""
}
if(values.password===""){
    error.password = "กรุณาใส่ password"
}
else{
    error.password = ""
}
return error;
}

export default Validation;