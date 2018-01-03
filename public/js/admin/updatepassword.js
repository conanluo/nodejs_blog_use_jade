function _$(name){
	return $("input[name='"+name+"']")
}
$("#submit").click(function(){
	var flag = false;
	if(_$("newPassword").val()!=_$("confirmPassword").val()){
		$("#error").text("2次密码不正确")
	}else if(_$("newPassword").val().length<6){
		$("#error").text("密码太短了,至少为6位")
//	}else if(){
	}else{
		flag=true
	}
	return flag
})