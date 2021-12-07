window.onload = checkcookieset();
function validate(){
    var mailval = document.loginform.email.value;
    if(document.loginform.email.value==""){
        // document.getElementById('error').style.display="grid";
        document.loginform.email.style.border="2px solid red";
        document.loginform.email.focus();
        return false;
    }
    else{
        document.loginform.email.style.border="0";
    }
    if(document.loginform.pass.value==""){
        // document.getElementById('error').style.display="grid";
        document.loginform.pass.style.border="2px solid red";
        document.loginform.pass.focus();
        return false;
    }
    else{
        document.loginform.pass.style.border="0";
    }
    if(document.loginform.email.value.includes('@')){
        if(!document.loginform.email.value.includes("khath.com")){
            document.loginform.email.style.border="2px solid red";
            document.getElementById('warndiv').style.display="grid";
            document.getElementById('warn').title = "Must end with @khath.com";
            document.loginform.email.focus();
            return false;
        }
    }
    else{
        mailval = mailval + "@khath.com"
        document.getElementById('warndiv').style.display="none";
        document.loginform.email.style.border="0";
    }
    var params = "email=" + mailval+"&pass="+document.loginform.pass.value;
    fetch('loginreq.php',{
        method : 'POST',
        headers : {
             'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        body : params
    }).then(response => response.text()).then(data => {
        if(data=="Passnotmatch"){
            document.loginform.pass.style.border="2px solid red";
        document.loginform.pass.focus();
        document.getElementById('passwarndiv').style.display="grid";
        document.getElementById('passwarn').title = "Password Not Matched";
        return false;
        }
        else if(data=="wrongmail"){
        document.loginform.email.style.border="2px solid red";
        document.getElementById('warndiv').style.display="grid";
        document.getElementById('warn').title = "Invalid Email. Try again!";
        document.loginform.email.focus();
        return false;
        }
        else if(data=="1"){
            window.location.replace("main.html");
        }
        console.log(data);
       });
    return false;
}
function checkcookieset(){
    fetch('checkloggedin.php',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
       }
    }).then(response => response.text()).then(data =>{
        if(data=='1'){
            window.location.replace("main.html");
        }
    })
}
function forgotpassmodal(){
    var modal = document.getElementById('forgpassmodal');
    modal.style.display="grid";
    modal.style.zIndex = 3;
}
function closeforgmodal(){
    var modal = document.getElementById('forgpassmodal');
    modal.style.display='none';
    modal.style.zIndex= -2;
}
function changeforgpasscont(){

        if($('#mobileno').css('display')!='none'){
        $('#recemail').show();
        $('#mobileno').hide();
        }else if($('#recemail').css('display')!='none'){
            $('#mobileno').show();
            $('#recemail').hide();
        }
}