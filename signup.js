$(document).ready(function(){

    fetch('validatesignup.php',{
        method: 'GET',
        headers :{
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    }).then(response => response.text()).then(data => {
        if(data=='1'){
            window.location.replace("main.html");
        }
    });
});




function next_page(){
    var check = 0;
    var lowerCaseLetters = /[a-z]/g;
    var upperCaseLetters = /[A-Z]/g;
    var numbers = /[0-9]/g;
    var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/; 
    var fnameval = document.createaccount.firstname.value;
    var lnameval = document.createaccount.lastname.value;
    var emailval = document.createaccount.email.value;
    var passval = document.createaccount.pass.value;
    var validlower = passval.match(lowerCaseLetters);
    var validupper = passval.match(upperCaseLetters);
    var validnum = passval.match(numbers);
    var validform = passval.match(format);
    var confpassval = document.createaccount.confpass.value;
    if(fnameval=="" || fnameval.includes(" ") || numbers.test(fnameval) || format.test(fnameval)){
        document.getElementById('fname').style.border = "2px solid red";
        document.createaccount.firstname.focus();
        return;
    }
    else{
        document.getElementById('fname').style.border = "1px solid #dddddd";
        check = 1;
    }
    
    if(lnameval=="" || lnameval.includes(" ") || numbers.test(lnameval) || format.test(lnameval)){
        document.getElementById('lname').style.border = "2px solid red";
        document.createaccount.lastname.focus();
        return;
    }
    else{
        document.getElementById('lname').style.border = "1px solid #dddddd";
        check = 1;
    }
    
    if(emailval.length>0){
        if(!emailval.includes("@")){
            emailval = emailval + "@khath.com";
        }      
    }
    
    if(emailval == "" || emailval.includes(" ") || (!emailval.includes("@khath.com"))){
        document.getElementById('email').style.border = "2px solid red";
        document.createaccount.email.focus();
        return;
    }
    else{
        document.getElementById('email').style.border = "1px solid #dddddd";
        check=1;
    }
    
    if(passval.length < 7){
        document.getElementById('pass').style.border = "2px solid red";
        document.createaccount.pass.focus();
        return;
    }
    else{
        document.getElementById('pass').style.border = "1px solid #dddddd"
        check = 1;
    }
    
    if(validlower != null){
        if(!validlower.length>2){
            document.getElementById('pass').style.border = "2px solid red";
            document.createaccount.pass.focus();
            return;
        }
        else{
            document.getElementById('pass').style.border = "1px solid #dddddd"
            check==1;
        }
    }
    else{
        document.getElementById('pass').style.border = "2px solid red";
        document.createaccount.pass.focus();
        return;
    }
    
    if(validupper != null){
        if(!validupper.length>0){
            document.getElementById('pass').style.border = "2px solid red";
            document.createaccount.pass.focus();
            return;
        }
        else{
            document.getElementById('pass').style.border = "1px solid #dddddd"
            check==1;
        }
    }
    else{
        document.getElementById('pass').style.border = "2px solid red";
        document.createaccount.pass.focus();
       return;
    }

    if(validnum != null){
        if(!validnum.length>0){
            document.getElementById('pass').style.border = "2px solid red";
            document.createaccount.pass.focus();
            return;
        }
        else{
            document.getElementById('pass').style.border = "1px solid #dddddd"
            check==1;
        }
    }
    else{
        document.getElementById('pass').style.border = "2px solid red";
       document.createaccount.pass.focus();
       return;
    }
    if(validform != null){
        if(!validform.length>0){
            document.getElementById('pass').style.border = "2px solid red";
            document.createaccount.pass.focus();
            return;
        }
        else{
            document.getElementById('pass').style.border = "1px solid #dddddd"
            check = 1;
        }
    }
    else{
        document.getElementById('pass').style.border = "2px solid red";
        document.createaccount.pass.focus();
        return;
    }
    if(passval != confpassval){
        document.getElementById('confpass').style.border = "2px solid red";
        document.createaccount.confpass.focus();
        return;
    }
    else{
        document.getElementById('confpass').style.border = "1px solid #dddddd"
        check = 1;
    }
    
    if(check==1){
        step2animation();
    }
}

function step2animation(){
    document.getElementById('step2').classList.remove('notactivestep');
    document.getElementById('step1').classList.add('notactivestep');
    document.getElementById('step2').classList.add('activestep');
    document.getElementsByClassName('loaderdiv')[0].style.animation="stepanimate .6s forwards";
    document.getElementById("1st_page").style.display="none";
    document.getElementById("2nd_page").style.display="grid";
    document.getElementById('step1').classList.remove('activestep');
}
function step1animation(){
    document.getElementById('step2').classList.remove('activestep');
    document.getElementById('step1').classList.add('activestep');
    document.getElementById('step2').classList.add('notactivestep');
    document.getElementsByClassName('loaderdiv')[0].style.animation="stepanimateback .6s forwards";
    document.getElementById("1st_page").style.display="grid";
    document.getElementById("2nd_page").style.display="none";
    document.getElementById('step1').classList.remove('notactivestep');
}

function validate()
{
    var fnameval = document.createaccount.firstname.value;
    var lnameval = document.createaccount.lastname.value;
    var emailval = document.createaccount.email.value;
    if(!emailval.includes("@")){
        emailval = emailval + "@khath.com";
    } 
    var passval = document.createaccount.pass.value;
    var pnumval = document.createaccount.phone.value;
    var remailval = document.createaccount.remail.value;
    var dobval = document.createaccount.dob.value;
    var yearvalc = new Date(dobval);
    yearvalc = yearvalc.getFullYear()
    const d = new Date();
    var yearvalt = d.getFullYear();
    if(pnumval.length < 10)
    {
        document.getElementById('phone').style.border = "2px solid red";
        document.createaccount.phone.focus();
        return false;
    }
    else
    {
        document.getElementById('phone').style.border = "1px solid #dddddd";
    }

    if(remailval == "" || remailval.includes(" ") || (!remailval.includes("@khath.com")))
    {
        document.getElementById('remail').style.border = "2px solid red";
        document.createaccount.remail.focus();
        return false;
    }
    else
    {
        document.getElementById('remail').style.border = "1px solid #dddddd";
    }
    
    if((yearvalt - yearvalc) < 18)
    {
        document.getElementById('dob').style.border = "2px solid red";
        document.createaccount.dob.focus();
        return false;
    }
    else
    {
        document.getElementById('dob').style.border = "1px solid #dddddd";
    }
    var params = "fname="+fnameval+"&lname="+lnameval+"&email="+emailval+"&pass="+passval+"&phone="+pnumval+"&recemail="+remailval+"&dob="+dobval;
    fetch('signupreq.php',{
        method: 'POST',
        headers :{
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        body: params
    }).then(response => response.text()).then(data => {
        console.log(data);
        if(data=='mailexist'){
            step1animation();
            document.getElementById('email').style.border = "2px solid red";
            document.createaccount.email.focus();
            return false;
        }
        else{
            document.getElementById('email').style.border = "1px solid #dddddd";
        }
        if(data=='1'){
            window.location.reload();
        }
    });
    return false;
}