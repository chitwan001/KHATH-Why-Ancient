
var countlabel = 0;
$(document).ready(function(){


    fetch('validatelogin.php',{
        method: 'GET',
        headers :{
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    }).then(response => response.text()).then(data => {
        if(data=='0'){
            window.location.replace("index.html");
        }
    });
    // fetch('getmails.php',{
    //     method : 'GET',
    //     headers : {
    //          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    //     },
    // }).then(response => response.text()).then(data => document.getElementById('emaildisp').innerHTML = data);
    
  
    fetch('loaduserdata.php',{
        method : 'GET',
        headers : {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
       }
    }).then(response => response.json()).then(data => {
        var greet = "Welcome, "+ data['fname'];
        document.getElementById('usergreet').innerHTML = greet;
    });
    var inbox = document.getElementById('primary');
    loademails(inbox);
    getnotifications();
    setInterval(function(){getnotifications();}, 5000);
    setInterval(function(){loademails(inbox);}, 5000);
    add15newcolors('newcolorscontent','writesamplelabel');
    add15newcolorsforcontent('ccdivcontmaincont','changetypecolor');
    add15newcolorsforbackground('changebackgroundmain','changebackgroundcolor')
    add40labelicons();
  });
  gettime();


  function gettime(){
    var date = new Date();
    var h = date.getHours(); 
    var m = date.getMinutes(); 
    // var s = date.getSeconds();
    var session = "AM";
    if (h < 12) {
        session = 'AM';
    }   
    if (h == 0){
        h = 12;
        session = 'AM';
    }
    else if (h > 12){
        h = h - 12;
        session = 'PM';
    }
    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    // s = (s < 10) ? "0" + s : s;
    
    var time = h + ":" + m + " "+ session;
    switchtime(time);
    setTimeout(gettime, 60000);
  }

  function switchtime(time){
    document.getElementById('disptime').style.opacity = 0;
    setTimeout(function(){
        document.getElementById('disptime').innerHTML = time;
        document.getElementById('disptime').style.opacity = 1;
    },500);
  }

  function resizefilters(){
      var body = document.getElementById('bodycont');
      if(body.style.gridTemplateColumns=="1fr 4fr"){
        body.style.gridTemplateColumns = "1fr 20fr";
      }
      else{
        body.style.gridTemplateColumns = "1fr 4fr";
      }
  }
  function usersearch(){
      if(!document.getElementsByName('search')[0].value==""){
          document.getElementById('cscont').style.display="grid";
        }
        else{
          document.getElementById('cscont').style.display="none";
      }
  }
  function showdropdown(){
      var ddwn = document.getElementById('ddwn').classList.toggle('show');
  }
  function inputchangeonfocus(){
      document.getElementById('inputsearch').style.border="2px solid #1a73e8";
      document.getElementById('inputsearch').style.borderRight="0";
      document.getElementById('inputsearch').style.borderLeft="0";
      document.getElementById('inputsearch').style.borderBottom="0";
      document.getElementsByClassName('advancearrow')[0].style.border="2px solid #1a73e8";
      document.getElementsByClassName('advancearrow')[0].style.borderRight="0";
      document.getElementsByClassName('advancearrow')[0].style.borderBottom="0";
      document.getElementsByClassName('advancearrow')[0].style.borderBottomLeftRadius = "0";
      document.getElementsByClassName('searchicon')[0].style.border="2px solid #1a73e8";
      document.getElementsByClassName('searchicon')[0].style.borderLeft="0";
      document.getElementsByClassName('searchicon')[0].style.borderBottom="0";
      document.getElementsByClassName('searchicon')[0].style.borderBottomRightRadius="0";
      document.getElementById('searchcontent').style.display="grid";
      document.getElementById('searchcontent').style.borderBottomLeftRadius="10px";
      document.getElementById('searchcontent').style.borderBottomRightRadius="10px";
      
      document.getElementById('searchcontent').style.border="2px solid #1a73e8";      
      document.getElementById('searchcontent').style.borderTop="0";      
      
    }
    function outfocusinput(){
        document.getElementById('searchcontent').style.display ="none";
        document.getElementById('inputsearch').style.border="0";
        document.getElementsByClassName('advancearrow')[0].style.border="0";
        document.getElementsByClassName('advancearrow')[0].style.borderBottomLeftRadius = "10px";
        document.getElementsByClassName('searchicon')[0].style.border="0";
        document.getElementsByClassName('searchicon')[0].style.borderBottomRightRadius="10px";
}
window.onclick = function(event){
    if(!(event.target.matches(".drpdwnarr")) && !(this.event.target.matches(".ddwnusershort")) && !(this.event.target.matches(".ddwnlogout"))){
        document.getElementById('ddwn').classList.remove("show");
    }
    if(!(event.target.matches(".addlabelicon")) && !(this.event.target.matches(".existlabels")) && !(this.event.target.matches(".createnewlabel"))){
        document.getElementById('openlabeldiv').style.display = "none";
    }
    if(!(event.target.matches(".toareamaintext"))){
        document.getElementById('receipentsdisplay').style.display = "none";
    }
}
function changegreet(){
    document.getElementById('usergreet').style.color = "#1a73e8";
    document.getElementById('usergreet').style.fontWeight = "600";
}
function originalgreet(){
    document.getElementById('usergreet').style.color = "black";
    document.getElementById('usergreet').style.fontWeight = "normal";
}

function getlabels(){
    fetch('getlabels.php',{
        method: 'GET',
        headers :{
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    }).then(response => response.json()).then(data => {
        var labeldropdown = document.getElementById('openlabeldiv');
        labeldropdown.innerHTML = "";
        var labeldiv = document.getElementById('emailcontent');
        var count = 0;
        for(label in data){
            var currlabel = data[label];
            //ForOpenLabelModal
            
            var labelicon1 = document.createElement('div');
            var labeliconclass1 = document.createAttribute('class');
            labeliconclass1.value = 'labelicon1';
            labelicon1.setAttributeNode(labeliconclass1);
            
            
            var iconelem1 = document.createElement('i');
            var iconelemclass1 = document.createAttribute('class');
            iconelemclass1.value = "material-icons";
            iconelem1.setAttributeNode(iconelemclass1);
            iconelem1.innerHTML = currlabel[2];
            
            labelicon1.appendChild(iconelem1);
            
            var existlabel = document.createElement('div');
            var existlabelclass = document.createAttribute('class');
            var existlabelid = document.createAttribute('id');
            var existlabeldatalid = document.createAttribute('data-lid');
            var existlabeldatacolor = document.createAttribute('data-color');
            var existlabeliconname = document.createAttribute('data-iconname');
            var existlabelonclick = document.createAttribute('onclick');
            existlabelonclick.value = "createlabel(this)";
            existlabeldatalid.value = currlabel[0];
            existlabeliconname.value = currlabel[2];
            existlabeldatacolor.value = currlabel[3];
            existlabelclass.value="existlabels";
            existlabelid.value = "exist"+currlabel[1];
            existlabel.setAttributeNode(existlabelclass);
            existlabel.setAttributeNode(existlabelid);
            existlabel.setAttributeNode(existlabeldatalid);
            existlabel.setAttributeNode(existlabeldatacolor);
            existlabel.setAttributeNode(existlabelonclick);
            existlabel.setAttributeNode(existlabeliconname);
            existlabel.style.color=currlabel[3];
            
            
            var existlabelname = document.createElement('div');
            var existlabelnameclass = document.createAttribute('class');
            existlabelnameclass.value="existlabelname";
            existlabelname.setAttributeNode(existlabelnameclass);
            existlabelname.innerHTML=currlabel[1];
            existlabel.appendChild(labelicon1);
            existlabel.appendChild(existlabelname);
            labeldropdown.appendChild(existlabel);



            count++;
        }
        //FOr create label
        // console.log(count);
        var createlabel = document.createElement('div');
        var createlabelclass = document.createAttribute('class');
        var createlabelonclick = document.createAttribute('onclick');
        createlabelclass.value="createnewlabel";
        createlabelonclick.value="createlabelfunc()";
        createlabel.setAttributeNode(createlabelclass);
        createlabel.setAttributeNode(createlabelonclick);
        createlabel.innerHTML="Create new label";

        labeldropdown.appendChild(createlabel);


        var labelwidth = Math.ceil(count/8);
        if(labelwidth==0){
            labelwidth=1;
        }
        var finalwidth = (labelwidth*100);
        labeldiv.style.width = finalwidth+"%";
        var labelcolumns = finalwidth/12.5;
        var columnstring = '';
        for(var column = 0 ; column<labelcolumns ; column++){
            columnstring = columnstring + "1fr ";
        }
        labeldiv.style.gridTemplateColumns = columnstring;

        var rowstring = '';
        for(var row=0; row<count+1;row++){
            rowstring = rowstring + "1fr ";
        }
        var openlabelwidth = (count)*140;
        openlabelwidth  = openlabelwidth+140;
        labeldropdown.style.height= openlabelwidth+"%";
        labeldropdown.style.gridTemplateRows = rowstring;
    });
}
function changelabel(elem){
    var datalid = elem.getAttribute('data-lid');
    if(datalid==0){
        emaildisp = datalid+ "primary";
    }
    else if(datalid == "composelabel"){
        emaildisp = "composeemailmain";
    }
    else if(datalid == "selectedemaillabels"){
         var emaildisp = "selected"+elem.id;
    }
    else if(datalid.includes('filter')){
        var emaildisp = "filtertypecontentmaindiv"+datalid.split('filter')[1];
    }
    else{
        var emaildisp = datalid + "emaildisp";
    }
    document.getElementsByClassName('activelabel')[0].classList.add('notactivelabel');
    document.getElementsByClassName('activelabel')[0].classList.remove('activelabel');
    elem.classList.remove('notactivelabel');
    document.body.style.setProperty("--selectedlabel",elem.getAttribute("data-lcolor"));
    elem.classList.add('activelabel');

    //for the emails display div

    var allemailscontentdiv = document.getElementsByClassName('emailscontent');
    var composeemailmaindiv = document.getElementsByClassName('composeemailmaindiv');
    var selectedemaildispdiv = document.getElementsByClassName('selectedemailmaindiv');
    var filtertypecontentmaindiv = document.getElementsByClassName('filtertypecontentmaindiv');
    if(datalid != "composelabel"){
        composeemailmaindiv[0].classList.remove('emaildivdisp');
    }
    for(var i = 0; i<allemailscontentdiv.length;i++){
        allemailscontentdiv[i].classList.remove('emaildivdisp');
    }
    for(var j = 0; j<selectedemaildispdiv.length;j++){
        selectedemaildispdiv[j].classList.remove('emaildivdisp');
    }
    for(var k = 0; k<filtertypecontentmaindiv.length;k++){
        filtertypecontentmaindiv[k].classList.remove('emaildivdisp');
    }
    var showemailcontentdiv = document.getElementById(emaildisp);
    showemailcontentdiv.classList.add('emaildivdisp');
    if(datalid != "composelabel" && datalid!="selectedemaillabels" && (!datalid.includes('filter'))){
        loademails(elem);
    }
    if(datalid=="selectedemaillabels"){
        var getemailid = elem.id.split("dispemail");
        getindemail(getemailid[1]);
    }
    if(datalid.includes('filter')){
        var thetype = datalid.split('filter')[1];
        getfilteredmails(thetype);
    }
}
function openlabel(){
    getlabels();
    if(document.getElementsByClassName('openlabeldiv')[0].style.display == "grid"){
        document.getElementsByClassName('openlabeldiv')[0].style.display = "none";
    }
    else{
        document.getElementsByClassName('openlabeldiv')[0].style.display = "grid";
    }
}
$('.existlabels').Lazy({
    source: function(element){
        element.html('Element loded');
    }
});

function getemailtime(time,eid){
    const currd = new Date();
    // console.log(currd);
    var currenttime = currd.getTime();
    var emaild = new Date(time);
    // console.log(emaild);
    var emailtime = emaild.getTime();
    var remaintime = currenttime - emailtime;
    var remaintimemin = Math.floor(remaintime/60000);
    // console.log(remaintime);
    // console.log(remaintimemin);
    var finalres = "";
    if(1>remaintimemin){
        finalres = "Just now";
    }
    else if(remaintimemin==1){
        finalres = "A min ago";
    }
    else if(59>remaintimemin && remaintimemin>1){
        finalres = remaintimemin+" mins ago";
    }
    else if(remaintimemin==60){
        finalres = "An hour ago";
    }
    else if(1440>remaintimemin){
        var hrs = Math.floor(remaintimemin/60);
        finalres = hrs+" hrs ago";
    }
    else if(2880>remaintimemin && 1440<=remaintimemin){
        finalres = "a day ago";
    }
    else{
        var hrs = Math.floor(remaintimemin/1440);
        finalres = hrs+ " days ago";
    }
    if((eid.includes("thismailsenttime")) || (eid.includes("notitime"))){
        return finalres;
    }
    else{
        document.getElementById(eid).innerHTML = finalres;
    }
}

function loademails(elem){
    var labelid = elem.getAttribute('data-lid');
    var params = "labelid="+labelid;
    fetch('getmails.php',{
        method: 'POST',
        headers :{
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        body : params
    }).then(response => response.json()).then(data => {
        var showemailsid = labelid+"showemails";
        var showemails = document.getElementById(showemailsid);
        showemails.innerHTML = "";
            // console.log(data);
            for(indemail in data){
                var indemaildata = data[indemail];

                var indemialdiv = document.createElement('div');
                var indemaildivclass = document.createAttribute('class');
                var indemaildivdata = document.createAttribute('data-thisisanindimail');
                indemaildivclass.value = "inboxnolabel";
                indemaildivdata.value = indemaildata['eid'];
                indemialdiv.setAttributeNode(indemaildivclass);
                indemialdiv.setAttributeNode(indemaildivdata);
                if(indemaildata['eread']==0){
                    indemaildivclass.value = "inboxnolabel notread";
                }


                var indemaildivcontent = document.createElement('div');
                var indemaildivcontentclass = document.createAttribute('class');
                indemaildivcontentclass.value = "inboxnolabelcontent";
                indemaildivcontent.setAttributeNode(indemaildivcontentclass);
                
                var mailtitle = document.createElement('div');
                var mailtitleclass = document.createAttribute('class');
                mailtitleclass.value = "mailtitle";
                mailtitle.setAttributeNode(mailtitleclass);

                var sendericon = document.createElement('div');
                var sendericonclass = document.createAttribute('class');
                sendericonclass.value = "sendericon";
                sendericon.setAttributeNode(sendericonclass);

                var sendericoncontent = document.createElement('div');
                var sendericoncontentclass = document.createAttribute('class');
                sendericoncontentclass.value = "sendericoncontent";
                sendericoncontent.setAttributeNode(sendericoncontentclass);

                var imgsender = document.createElement('img');
                var imgsendersrc = document.createAttribute('src');
                
                imgsendersrc.value = "assets/propic/"+indemaildata['ppicsender'];
                imgsender.setAttributeNode(imgsendersrc);

                sendericoncontent.appendChild(imgsender);
                sendericon.appendChild(sendericoncontent);
                mailtitle.appendChild(sendericon);

                var sendername = document.createElement('div');
                var sendernameclass = document.createAttribute('class');
                sendernameclass.value = "sendername";
                sendername.setAttributeNode(sendernameclass);
                
                var sendernamecontent = document.createElement('div');
                var sendernamecontentclass = document.createAttribute('class');
                sendernamecontentclass.value = "sendernamecontent";
                sendernamecontent.setAttributeNode(sendernamecontentclass);
                sendernamecontent.innerHTML = indemaildata['senderfname']+" "+indemaildata['senderlname'];

                sendername.appendChild(sendernamecontent);
                mailtitle.appendChild(sendername);

                var mailcontent = document.createElement('div');
                var mailcontentclass = document.createAttribute('class');
                 mailcontentclass.value = "mailcontent";
                 mailcontent.setAttributeNode(mailcontentclass);
                 
                 var mailsubject = document.createElement('div');
                 var mailsubjectclass = document.createAttribute('class');
                 mailsubjectclass.value = "mailsubject";
                 mailsubject.setAttributeNode(mailsubjectclass);
                 
                 var mailsubjectcontent = document.createElement('div');
                 var mailsubjectcontentclass = document.createAttribute('class');
                 var mailsubjectcontentdata = document.createAttribute('data-indiemailsubject');
                 mailsubjectcontentclass.value = "mailsubjectcontent";
                 mailsubjectcontentdata.value = "indiemailsubject"+indemaildata['eid'];
                 mailsubjectcontent.setAttributeNode(mailsubjectcontentclass);
                 mailsubjectcontent.setAttributeNode(mailsubjectcontentdata);
                 if(indemaildata['title']==""){
                    mailsubjectcontent.innerHTML = "&lt;No Subject&gt;";
                 }
                 else{
                     mailsubjectcontent.innerHTML = indemaildata['title'];
                    }
                 
                 mailsubject.appendChild(mailsubjectcontent);
                 mailcontent.appendChild(mailsubject);
                 
                 var mailbody = document.createElement('div');
                 var mailbodyclass = document.createAttribute('class');
                  mailbodyclass.value = "mailbody";
                  mailbody.setAttributeNode(mailbodyclass);
                  
                  var mailbodycontent = document.createElement('div');
                  var mailbodycontentclass = document.createAttribute('class');
                  mailbodycontentclass.value = "mailbodycontent";
                  mailbodycontent.setAttributeNode(mailbodycontentclass);
                  var bodycontent = indemaildata['body'];

                  var samplebody = document.createElement('div');
                  samplebody.innerHTML = bodycontent;
                  var contentchilds = samplebody.childNodes;
                   gettextonlybody(contentchilds);
                    // console.log(textonlybody);
                    var textonly = "";
                    for(var i=0;i<textonlybody.length;i++){
                       textonly = textonly + textonlybody[i].data + "<br>"
                    }
                  mailbodycontent.innerHTML = textonly;
                  textonlybody = [];
                  textonlyindex = 0;
                  mailbody.appendChild(mailbodycontent);
                  mailcontent.appendChild(mailbody);
                  
                  var mailcontrols = document.createElement('div');
                  var mailcontrolsclass = document.createAttribute('class');
                   mailcontrolsclass.value = "mailcontrols";
                   mailcontrols.setAttributeNode(mailcontrolsclass);

                   var timelapse = document.createElement('div');
                   var timelapseclass = document.createAttribute('class');
                   var timelapseid = document.createAttribute('id');
                   timelapseclass.value = "timeelaps";
                   timelapseid.value = "timeid"+indemaildata['eid'];
                   timelapse.setAttributeNode(timelapseclass);
                   timelapse.setAttributeNode(timelapseid);
                   
                   var openmailbtn = document.createElement('div');
                   var openmailbtnclass = document.createAttribute('class');
                   openmailbtnclass.value = "openmailbtn";
                   openmailbtn.setAttributeNode(openmailbtnclass);
                   
                   var openmailbtnbtn = document.createElement('div');
                   var openmailbtnbtnclass = document.createAttribute('class');
                   var openmailbtnonclick = document.createAttribute('onclick');
                   openmailbtnbtnclass.value = "openmailbtnbtn";
                   openmailbtnonclick.value = "openmail("+indemaildata['eid']+")";
                   openmailbtnbtn.setAttributeNode(openmailbtnbtnclass);
                   openmailbtnbtn.setAttributeNode(openmailbtnonclick);
                   openmailbtnbtn.innerHTML = "Open Mail";
                   
                   openmailbtn.appendChild(openmailbtnbtn);
                   mailcontrols.appendChild(timelapse);
                   mailcontrols.appendChild(openmailbtn);
                   
                   var threedot = document.createElement('div');
                   var threedotclass = document.createAttribute('class');
                   threedotclass.value = "threedotcontrol";
                   threedot.setAttributeNode(threedotclass);
                   
                   var checkbox = document.createElement('div');
                   var checkboxclass = document.createAttribute('class');
                   var checkboxonclick = document.createAttribute('onclick');
                   var checkboxdata = document.createAttribute('data-selectedemailcheckbox');
                   checkboxclass.value = "selectedemailcheckbox";
                   checkboxonclick.value = "selectthemailforcontrols(this)";
                   checkboxdata.value = indemaildata['eid'];
                   checkbox.setAttributeNode(checkboxclass);
                   checkbox.setAttributeNode(checkboxonclick);
                   checkbox.setAttributeNode(checkboxdata);

                   var checkboxtickmark = document.createElement('div');
                   var checkboxtickmarkclass = document.createAttribute('class');
                   checkboxtickmarkclass.value="selectedemailcheckboxtickmark";
                   checkboxtickmark.setAttributeNode(checkboxtickmarkclass);

                   checkbox.appendChild(checkboxtickmark);

                   threedot.appendChild(checkbox);
                   mailcontrols.appendChild(threedot);
                   
                   indemaildivcontent.appendChild(mailtitle);
                   indemaildivcontent.appendChild(mailcontent);
                   indemaildivcontent.appendChild(mailcontrols);
                   indemialdiv.appendChild(indemaildivcontent);
                   showemails.appendChild(indemialdiv);
                //    console.log(indemaildata['time']);
                   
                }
                for(var fortime=0;fortime<Object.keys(data).length;fortime++){
                (function(fortime){
                    var fortimedata = data[fortime];
                    getemailtime(fortimedata['time'],"timeid"+fortimedata['eid']);
                    setInterval(function(){
                        getemailtime(fortimedata['time'],"timeid"+fortimedata['eid']);
                    },60000)
                })(fortime);
                
            }
    });
}
var textonlybody = [];
var textonlyindex = 0;
function gettextonlybody(contentchilds){
    
    if(contentchilds.length == 0){
        return;
    }
    else{
        // console.log(contentchilds);
    }
    
    for(var i=0; i<contentchilds.length;i++){
        // console.log(contentchilds.length);
        if(contentchilds[i].nodeName!="#text"){
           gettextonlybody(contentchilds[i].childNodes);
        }
        else{
            var text = contentchilds[i];
            // if(i+1>=contentchilds.length){
                textonlybody[textonlyindex] = text;
                textonlyindex++;
            // }  
        }
    }
}


function createdivforemaildisp(type,id){
    var emaildisp = document.getElementById('emaildisp');
    if(type == "composeemaildiv"){
    }
    else if(type == "emailsdiv"){
        var emailscontent = document.createElement('div');
    var emailscontentclass = document.createAttribute('class');
    var emailscontentid = document.createAttribute('id');
    emailscontentclass.value = "selectedemailmaindiv";
    emailscontentid.value = "selecteddispemail"+id;
    emailscontent.setAttributeNode(emailscontentclass);
    emailscontent.setAttributeNode(emailscontentid);
    emaildisp.appendChild(emailscontent);
}
else if(type.includes('filter')){
    var thetype = id.split('filter');
    // console.log(thetype);
        var emailscontent = document.createElement('div');
        var emailscontentclass = document.createAttribute('class');
        var emailscontentid = document.createAttribute('id');
        emailscontentclass.value = "filtertypecontentmaindiv";
        emailscontentid.value = "filtertypecontentmaindiv"+thetype[1];
        emailscontent.setAttributeNode(emailscontentclass);
        emailscontent.setAttributeNode(emailscontentid);
        emaildisp.appendChild(emailscontent);

    var emailsdispcontent = document.createElement('div');
    var emailsdispcontentclass = document.createAttribute('class');
    var emailsdispcontentid = document.createAttribute('id');
    emailsdispcontentclass.value = "emailsdispcontent";
    emailsdispcontentid.value = "emaildispcontent";
    emailsdispcontent.setAttributeNode(emailsdispcontentclass);
    emailsdispcontent.setAttributeNode(emailsdispcontentid);

    var showemails = document.createElement('div');
    var showemailsclass = document.createAttribute('class');
    var showemailsid = document.createAttribute('id');
    showemailsclass.value = "showemails";
    showemailsid.value = type+"showemails"+thetype[1];
    showemails.setAttributeNode(showemailsclass);
    showemails.setAttributeNode(showemailsid);

    emailsdispcontent.appendChild(showemails);

    var pageno = document.createElement('div');
    var pagenoclass = document.createAttribute('class');
    var pagenoid = document.createAttribute('id');
    pagenoclass.value = "pageno";
    pagenoid.value = type+"pageno";
    pageno.setAttributeNode(pagenoclass);
    pageno.setAttributeNode(pagenoid);

    emailscontent.appendChild(emailsdispcontent);
    emailscontent.appendChild(pageno);
    emaildisp.appendChild(emailscontent);
    }
    else{
    var emailscontent = document.createElement('div');
    var emailscontentclass = document.createAttribute('class');
    var emailscontentid = document.createAttribute('id');
    emailscontentclass.value = "emailscontent";
    emailscontentid.value = type+"emaildisp";
    emailscontent.setAttributeNode(emailscontentclass);
    emailscontent.setAttributeNode(emailscontentid);

    var emailsdispcontent = document.createElement('div');
    var emailsdispcontentclass = document.createAttribute('class');
    var emailsdispcontentid = document.createAttribute('id');
    emailsdispcontentclass.value = "emailsdispcontent";
    emailsdispcontentid.value = "emaildispcontent";
    emailsdispcontent.setAttributeNode(emailsdispcontentclass);
    emailsdispcontent.setAttributeNode(emailsdispcontentid);

    var showemails = document.createElement('div');
    var showemailsclass = document.createAttribute('class');
    var showemailsid = document.createAttribute('id');
    showemailsclass.value = "showemails";
    showemailsid.value = type+"showemails";
    showemails.setAttributeNode(showemailsclass);
    showemails.setAttributeNode(showemailsid);

    emailsdispcontent.appendChild(showemails);

    var pageno = document.createElement('div');
    var pagenoclass = document.createAttribute('class');
    var pagenoid = document.createAttribute('id');
    pagenoclass.value = "pageno";
    pagenoid.value = type+"pageno";
    pageno.setAttributeNode(pagenoclass);
    pageno.setAttributeNode(pagenoid);

    emailscontent.appendChild(emailsdispcontent);
    emailscontent.appendChild(pageno);
    emaildisp.appendChild(emailscontent);
}
}












function createlabel(element){
    var labeldivdiv = document.getElementById('emailcontent');
    var data = [];
    data[0] = element.getAttribute("data-lid");
    var elemid = element.id;
    data[1] = elemid.split('exist')[1];
    data[2] = element.getAttribute("data-iconname");
    data[3] = element.getAttribute("data-color");
    var currlabel = data;
    
    if(!(document.querySelector(`[data-closelid="${data[0]}"]`))){

    var labeldiv  =document.createElement('div');
            var labeldivclass = document.createAttribute('class');
            var labeldivlid = document.createAttribute('data-closelid');
            labeldivclass.value="labeldiv";
            labeldivlid.value=currlabel[0];
            labeldiv.setAttributeNode(labeldivclass);
            labeldiv.setAttributeNode(labeldivlid);
            
            var labelelem = document.createElement('div');
            var labelclass= document.createAttribute('class');
            var labelid= document.createAttribute('id');
            var labeldatalid = document.createAttribute('data-lid');
            var labelcolorattr = document.createAttribute('data-lcolor');
            var onclick = document.createAttribute('onclick');
            labeldatalid.value = currlabel[0];
            labelcolorattr.value = currlabel[3];
            labelclass.value = "label notactivelabel";
            labelid.value = currlabel[1];
            onclick.value="changelabel(this)";
            labelelem.setAttributeNode(labeldatalid);
            labelelem.setAttributeNode(labelclass);
            labelelem.setAttributeNode(labelid);
            labelelem.setAttributeNode(labelcolorattr);
            labelelem.setAttributeNode(onclick);
            
            
            var labelname = document.createElement('div');
            var labelnameclass = document.createAttribute('class');
            labelnameclass.value="labellabelname";
            labelname.setAttributeNode(labelnameclass);
            labelname.innerHTML = currlabel[1];
            
            
            var iconelem = document.createElement('i');
            var iconelemclass = document.createAttribute('class');
            iconelemclass.value = "material-icons";
            iconelem.setAttributeNode(iconelemclass);
            iconelem.innerHTML = currlabel[2];
            
            
            var labelprop = document.createElement('div');
            var labelpropclass = document.createAttribute('class');
            labelpropclass.value = 'labelname';
            labelprop.setAttributeNode(labelpropclass);
            
            var labelicon = document.createElement('div');
            var labeliconclass = document.createAttribute('class');
            labeliconclass.value = 'labelicon';
            labelicon.setAttributeNode(labeliconclass);

            
            
            var newelem = document.createElement('div');
            var newelemclass = document.createAttribute('class');
            newelemclass.value="newart";
            newelem.setAttributeNode(newelemclass);
            
            var mainname = document.createElement('div');
            var mainnameclass = document.createAttribute('class');
            mainnameclass.value = 'mainname';
            mainname.setAttributeNode(mainnameclass);
            
            var newcont = document.createElement('div');
            var newcontclass = document.createAttribute('class');
            newcontclass.value = "newcont";
            newcont.setAttributeNode(newcontclass);
            
            
            var sectionwhere = document.createElement('div');
            var sectionwhereclass = document.createAttribute('class');
            var sectionwhereid = document.createAttribute('id');
            sectionwhereclass.value = "sectionwhere";
            sectionwhereid.value = "sectionwhere";
            sectionwhere.setAttributeNode(sectionwhereclass);
            sectionwhere.setAttributeNode(sectionwhereid);
            
            var closetab = document.createElement('div');
            var closetabclass = document.createAttribute('class');
            var closetabid = document.createAttribute('id');
            closetabclass.value = "closetab";
            closetabid.value = "closetab";
            closetab.setAttributeNode(closetabclass);
            closetab.setAttributeNode(closetabid);
            
            var closeicon = document.createElement('div');
            var closeiconclass = document.createAttribute('class');
            var closeicononclick = document.createAttribute('onclick');
            var closeicondataid= document.createAttribute('data-closeiconlid');
            closeicononclick.value = "closelabel(this)";
            closeicondataid.value = currlabel[0];
            closeiconclass.value = "icon closelabel";
            closeicon.setAttributeNode(closeiconclass);
            closeicon.setAttributeNode(closeicononclick);
            closeicon.setAttributeNode(closeicondataid);
            
            var materialelem = document.createElement('i');
            var materialelemclass = document.createAttribute('class');
            materialelemclass.value="material-icons closelabel";
            materialelem.setAttributeNode(materialelemclass);
            materialelem.innerHTML="close";
            
            var tooltip = document.createElement('div');
            var tooltipclass = document.createAttribute('class');
            tooltipclass.value = "tooltip";
            tooltip.setAttributeNode(tooltipclass);
            tooltip.innerHTML = "Close";
            
            
            mainname.appendChild(labelname);
            labelprop.appendChild(mainname);
            labelprop.appendChild(newcont);
            labelicon.appendChild(iconelem);
            closeicon.appendChild(materialelem);
            closeicon.appendChild(tooltip);
            closetab.appendChild(closeicon);
            labelelem.appendChild(labelicon);
            labelelem.appendChild(labelprop);
            labelelem.appendChild(sectionwhere);
            labelelem.appendChild(newelem);
            labeldiv.appendChild(labelelem);
            labeldiv.appendChild(closetab);
            labeldivdiv.appendChild(labeldiv);
            var paramforfunc = data[0]+"emaildisp";
            createdivforemaildisp(data[0],0);
}
        }
function closelabel(element){
            document.getElementsByClassName('notactivelabel')[0].classList.add('activelabel');
            document.getElementsByClassName('notactivelabel')[0].classList.remove('notactivelabel');
            document.body.style.setProperty("--selectedlabel","#d93025");
            var rootelem = document.querySelector(`[data-closelid="${element.getAttribute('data-closeiconlid')}"]`);
            var  datalid = element.getAttribute('data-closeiconlid');
            if(datalid.includes("closeemail")){
                var theid = datalid.split("closeemail");
                var emaildispelem = document.getElementById("selecteddispemail"+theid[1]);
            }
            else if(datalid.includes('closefiltertype')){
                var thetype = datalid.split('closefiltertype');
                var emaildispelem = document.getElementById("filtertypecontentmaindiv"+thetype[1])
            }
            else{
                var emaildispelem = document.getElementById(datalid+"emaildisp");
            }
            if(element.getAttribute('data-closeiconlid')!="currlabel"){
                emaildispelem.remove();
                rootelem.remove();
            }
            else{
                document.querySelector(`[data-closelid="composelabel"]`).remove();
                document.getElementById('composeemailmain').classList.remove('emaildivdisp');
            }
            document.getElementById('0primary').classList.add('emaildivdisp');
}
function getemails(element){
        alert(element.id);
}
function createlabelfunc(){
    // console.log('here!');
    document.getElementsByClassName('createlabelmodal')[0].style.display = "grid";
}
function closecreatelabelmodal(){
    document.getElementsByClassName('createlabelmodal')[0].style.display = "none";
}
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    // console.log(color);
    return color;
  }
function add15newcolors(type,where){
    var colorsdiv = document.getElementById(type);
    colorsdiv.innerHTML = "";
    var check=0;
    for(var i=1;i<16;i++){
        var randomColor = getRandomColor();
        if(randomColor==000000){
            var randomColor = getRandomColor();
        }
        var finalcolor = randomColor;

        var indcolordiv = document.createElement('div');
        var colordivclass = document.createAttribute('class');
        colordivclass.value="indcolor";
        indcolordiv.setAttributeNode(colordivclass);

        var indcolordivdiv = document.createElement('div');
        var indcolordivdivclass = document.createAttribute('class');
        indcolordivdivclass.value="indcolordiv";
        indcolordivdiv.setAttributeNode(indcolordivdivclass);

        var indcolor = document.createElement('input');
        var indcolorattr = document.createAttribute('type');
        var indcolorvalue = document.createAttribute('value');
        var indcolornameattr = document.createAttribute('name');
        var indcoloronclick = document.createAttribute('onclick');
        var indcolorifchecked = document.createAttribute('checked');
        indcolorattr.value = "radio";
        indcolorvalue.value = finalcolor;
        indcolornameattr.value = "newlabelcolor";
        indcoloronclick.value = where + "()";
        indcolor.setAttributeNode(indcolorattr);
        indcolor.setAttributeNode(indcolornameattr);
        indcolor.setAttributeNode(indcolorvalue);
        indcolor.setAttributeNode(indcoloronclick);
        if(check==0){
            indcolor.setAttributeNode(indcolorifchecked);
            document.body.style.setProperty('--selectednewlabelcolor',finalcolor);
            check=1;
        }
        
        var colorrep = document.createElement('div');
        var colorrepclass = document.createAttribute('class');
        colorrepclass.value="colorrep";
        colorrep.setAttributeNode(colorrepclass);
        var colorrepstyle = document.createAttribute('style');
        colorrepstyle.value = "background-color: "+finalcolor+";";
        colorrep.setAttributeNode(colorrepstyle);
        
        indcolordivdiv.appendChild(indcolor);
        indcolordivdiv.appendChild(colorrep);
        indcolordiv.appendChild(indcolordivdiv);
        colorsdiv.appendChild(indcolordiv);
    }
    
}
function add15newcolorsforcontent(type,where){
    var colorsdiv = document.getElementById(type);
    colorsdiv.innerHTML = "";
    var check=0;
        var indcolordiv = document.createElement('div');
        var colordivclass = document.createAttribute('class');
        colordivclass.value="indcolor";
        indcolordiv.setAttributeNode(colordivclass);

        var indcolordivdiv = document.createElement('div');
        var indcolordivdivclass = document.createAttribute('class');
        indcolordivdivclass.value="indcolordiv";
        indcolordivdiv.setAttributeNode(indcolordivdivclass);

        var indcolor = document.createElement('input');
        var indcolorattr = document.createAttribute('type');
        var indcolorvalue = document.createAttribute('value');
        var indcolornameattr = document.createAttribute('name');
        var indcoloronclick = document.createAttribute('onclick');
        var indcolorifchecked = document.createAttribute('checked');
        indcolorattr.value = "radio";
        indcolorvalue.value = "#000000";
        indcolornameattr.value = "contentcolor";
        indcoloronclick.value = where +"()";
        indcolor.setAttributeNode(indcolorattr);
        indcolor.setAttributeNode(indcolornameattr);
        indcolor.setAttributeNode(indcolorvalue);
        indcolor.setAttributeNode(indcoloronclick);
        indcolor.setAttributeNode(indcolorifchecked);
            document.body.style.setProperty('--selectednewlabelcolor',finalcolor);
        
        var colorrep = document.createElement('div');
        var colorrepclass = document.createAttribute('class');
        colorrepclass.value="colorrep";
        colorrep.setAttributeNode(colorrepclass);
        var colorrepstyle = document.createAttribute('style');
        colorrepstyle.value = "background-color: "+"#000000"+";";
        colorrep.setAttributeNode(colorrepstyle);
        
        indcolordivdiv.appendChild(indcolor);
        indcolordivdiv.appendChild(colorrep);
        indcolordiv.appendChild(indcolordivdiv);
        colorsdiv.appendChild(indcolordiv);
    for(var i=1;i<15;i++){
        var randomColor = getRandomColor();
        if(randomColor==000000){
            var randomColor = getRandomColor();
        }
        var finalcolor = randomColor;

        var indcolordiv = document.createElement('div');
        var colordivclass = document.createAttribute('class');
        colordivclass.value="indcolor";
        indcolordiv.setAttributeNode(colordivclass);

        var indcolordivdiv = document.createElement('div');
        var indcolordivdivclass = document.createAttribute('class');
        indcolordivdivclass.value="indcolordiv";
        indcolordivdiv.setAttributeNode(indcolordivdivclass);

        var indcolor = document.createElement('input');
        var indcolorattr = document.createAttribute('type');
        var indcolorvalue = document.createAttribute('value');
        var indcolornameattr = document.createAttribute('name');
        var indcoloronclick = document.createAttribute('onclick');
        var indcolorifchecked = document.createAttribute('checked');
        indcolorattr.value = "radio";
        indcolorvalue.value = finalcolor;
        indcolornameattr.value = "contentcolor";
        indcoloronclick.value = where +"()";
        indcolor.setAttributeNode(indcolorattr);
        indcolor.setAttributeNode(indcolornameattr);
        indcolor.setAttributeNode(indcolorvalue);
        indcolor.setAttributeNode(indcoloronclick);
            document.body.style.setProperty('--selectednewlabelcolor',finalcolor);
        
        var colorrep = document.createElement('div');
        var colorrepclass = document.createAttribute('class');
        colorrepclass.value="colorrep";
        colorrep.setAttributeNode(colorrepclass);
        var colorrepstyle = document.createAttribute('style');
        colorrepstyle.value = "background-color: "+finalcolor+";";
        colorrep.setAttributeNode(colorrepstyle);
        
        indcolordivdiv.appendChild(indcolor);
        indcolordivdiv.appendChild(colorrep);
        indcolordiv.appendChild(indcolordivdiv);
        colorsdiv.appendChild(indcolordiv);
    }   
}
function add15newcolorsforbackground(type,where){
    var colorsdiv = document.getElementById(type);
    colorsdiv.innerHTML = "";
    var check=0;
        var indcolordiv = document.createElement('div');
        var colordivclass = document.createAttribute('class');
        colordivclass.value="indcolor";
        indcolordiv.setAttributeNode(colordivclass);

        var indcolordivdiv = document.createElement('div');
        var indcolordivdivclass = document.createAttribute('class');
        indcolordivdivclass.value="indcolordiv";
        indcolordivdiv.setAttributeNode(indcolordivdivclass);

        var indcolor = document.createElement('input');
        var indcolorattr = document.createAttribute('type');
        var indcolorvalue = document.createAttribute('value');
        var indcolornameattr = document.createAttribute('name');
        var indcoloronclick = document.createAttribute('onclick');
        var indcolorifchecked = document.createAttribute('checked');
        indcolorattr.value = "radio";
        indcolorvalue.value = "none";
        indcolornameattr.value = "backgroundcolor";
        indcoloronclick.value = where +"()";
        indcolor.setAttributeNode(indcolorattr);
        indcolor.setAttributeNode(indcolornameattr);
        indcolor.setAttributeNode(indcolorvalue);
        indcolor.setAttributeNode(indcoloronclick);
        indcolor.setAttributeNode(indcolorifchecked);
            document.body.style.setProperty('--selectednewlabelcolor',finalcolor);
        
        var colorrep = document.createElement('div');
        var colorrepclass = document.createAttribute('class');
        colorrepclass.value="colorrep";
        colorrep.setAttributeNode(colorrepclass);
        var colorrepstyle = document.createAttribute('style');
        colorrepstyle.value = "background-color: "+"transparent"+";";
        colorrep.setAttributeNode(colorrepstyle);
        
        indcolordivdiv.appendChild(indcolor);
        indcolordivdiv.appendChild(colorrep);
        indcolordiv.appendChild(indcolordivdiv);
        colorsdiv.appendChild(indcolordiv);
    for(var i=1;i<15;i++){
        var randomColor = getRandomColor();
        if(randomColor==000000){
            var randomColor = getRandomColor();
        }
        var finalcolor = randomColor;

        var indcolordiv = document.createElement('div');
        var colordivclass = document.createAttribute('class');
        colordivclass.value="indcolor";
        indcolordiv.setAttributeNode(colordivclass);

        var indcolordivdiv = document.createElement('div');
        var indcolordivdivclass = document.createAttribute('class');
        indcolordivdivclass.value="indcolordiv";
        indcolordivdiv.setAttributeNode(indcolordivdivclass);

        var indcolor = document.createElement('input');
        var indcolorattr = document.createAttribute('type');
        var indcolorvalue = document.createAttribute('value');
        var indcolornameattr = document.createAttribute('name');
        var indcoloronclick = document.createAttribute('onclick');
        var indcolorifchecked = document.createAttribute('checked');
        indcolorattr.value = "radio";
        indcolorvalue.value = finalcolor;
        indcolornameattr.value = "backgroundcolor";
        indcoloronclick.value = where +"()";
        indcolor.setAttributeNode(indcolorattr);
        indcolor.setAttributeNode(indcolornameattr);
        indcolor.setAttributeNode(indcolorvalue);
        indcolor.setAttributeNode(indcoloronclick);
            document.body.style.setProperty('--selectednewlabelcolor',finalcolor);
        
        var colorrep = document.createElement('div');
        var colorrepclass = document.createAttribute('class');
        colorrepclass.value="colorrep";
        colorrep.setAttributeNode(colorrepclass);
        var colorrepstyle = document.createAttribute('style');
        colorrepstyle.value = "background-color: "+finalcolor+";";
        colorrep.setAttributeNode(colorrepstyle);
        
        indcolordivdiv.appendChild(indcolor);
        indcolordivdiv.appendChild(colorrep);
        indcolordiv.appendChild(indcolordivdiv);
        colorsdiv.appendChild(indcolordiv);
    }   
}
function add40labelicons(){
    
    var iconarray = ['search', 'home', 'done', 'delete', 'shopping_cart', 'favorite', 'schedule', 'event', 'shopping_bag', 'account_balance', 'credit_card', 'account_balance_wallet', 'work', 'code', 'pets', 'note_add', 'bookmark', 'supervisor_account', 'leaderboard', 'assignment_ind', 'card_giftcard', 'flight_takeoff', 'tips_and_updates', 'schedule_send', 'home_work', 'school', 'travel_explore', 'health_and_safety', 'whatsapp', 'science', 'sentiment_very_satisfied', 'sports_soccer', 'sports', 'real_estate_agent', 'interests', 'timer', 'business', 'sentiment_satisfied_alt', 'place', 'directions_subway', 'local_hotel', 'support_agent', 'podcasts'];
    var iconmainelem = document.getElementById('iconlabelscontent');
    var check = 0;
    for(icon in iconarray){
        var indicon = document.createElement('div');
        var indiconclass = document.createAttribute('class');
        indiconclass.value="selectediconnewlabel";
        indicon.setAttributeNode(indiconclass);
        
        var indicondiv = document.createElement('div');
        var indicondivdiv = document.createAttribute('class');
        indicondivdiv.value = "selectediconnewlabeldiv";
        indicondiv.setAttributeNode(indicondivdiv);

        var indiconradio = document.createElement('input');
        var indiconradioattr = document.createAttribute('type');
        var indiconradioavalue = document.createAttribute('value');
        var indiconradioname = document.createAttribute('name');
        var indiconradioonclick = document.createAttribute('onclick');
        var indiconradioifcheck = document.createAttribute('checked');
        indiconradioattr.value = "radio";
        indiconradioavalue.value = iconarray[icon];
        indiconradioname.value = "newlabelicon";
        indiconradioonclick.value = "writesamplelabel()";
        indiconradio.setAttributeNode(indiconradioattr);
        indiconradio.setAttributeNode(indiconradioavalue);
        indiconradio.setAttributeNode(indiconradioname);
        indiconradio.setAttributeNode(indiconradioonclick);
        if(check==0){
            indiconradio.setAttributeNode(indiconradioifcheck);
            document.getElementById('selectedlabeliconid').innerHTML = iconarray[icon];
            check =1;
        }
        
        var iconrep = document.createElement('div');
        var iconrepclass = document.createAttribute('class');
        iconrepclass.value = "selectediconnewlabelclass";
        iconrep.setAttributeNode(iconrepclass);
        
        var iconelem = document.createElement('i');
        var iconelemclass = document.createAttribute('class');
        iconelemclass.value = "material-icons createlabeliconicon";
        iconelem.setAttributeNode(iconelemclass);
        iconelem.innerHTML = iconarray[icon];

        iconrep.appendChild(iconelem)
        indicondiv.appendChild(indiconradio);
        indicondiv.appendChild(iconrep);
        indicon.appendChild(indicondiv);
        iconmainelem.appendChild(indicon);
    }
}
function writesamplelabel(){
    var labelname = document.newlabelform.newlabelname.value;
    var selectedlabelcolor = document.newlabelform.newlabelcolor.value;
    var selectedlabelicon = document.newlabelform.newlabelicon.value;
    if(labelname==""){
        document.getElementById('selectedlabelname').innerHTML = "Label Name Here";
    }
    else{
        document.getElementById('selectedlabelname').innerHTML = labelname;
    }
    document.body.style.setProperty('--selectednewlabelcolor',selectedlabelcolor);
    document.getElementById('selectedlabeliconid').innerHTML = selectedlabelicon;
}
function logoutuser(){
    fetch('logoutreq.php',{
        method : 'GET',
        headers :{
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    }).then(response => response.text()).then(data => {
        if(data=="0"){
            location.reload();
        }
    });
}
function addnewlabelreq(){
    var labelname = document.newlabelform.newlabelname.value;
    var selectedlabelcolor = document.newlabelform.newlabelcolor.value;
    var selectedlabelicon = document.newlabelform.newlabelicon.value;
    var check = 0;
    if(labelname=="" || labelname.includes(' ')){
        document.newlabelform.newlabelname.style.border = "2px solid red";
        document.newlabelform.newlabelname.style.boxShadow= "none";
        document.newlabelform.newlabelname.focus();
        check = 0;
    }
    else{
        document.newlabelform.newlabelname.style.border = "none";
        document.newlabelform.newlabelname.style.boxShadow= "rgb(0 0 0 / 2%) 0px 1px 3px 0px, rgb(27 31 35 / 15%) 0px 0px 0px 1px";
        check = 1;
    }
    var params = "lname="+labelname+"&lcolor="+selectedlabelcolor+"&licon="+selectedlabelicon;
    if(check==1){
        fetch('addnewlabel.php',{
            method: 'POST',
            headers :{
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            body : params
        }).then(response => response.text()).then(data =>{
                document.getElementById('successcreatinglabel').style.display = "grid";
                closecreatelabelmodal();
        });
    }
}
var str = "The content of the mail will appear here and it will take this space only no scrolling. The content that will come in this will be displayed only.";
// console.log(str.length)
//146
// var sendernamerotate = document.getElementById('sendername');
// var sendernamerotatewidth = sendernamerotate.scrollWidth;
// window.addEventListener('load',()=>{
//     self.setInterval(() => {
//         console.log(sendernamerotate.scrollLeft);
//         if(sendernamerotate.scrollLeft != sendernamerotatewidth){
//             sendernamerotate.scrollTo(sendernamerotate.scrollLeft+1,0);
//         }
//         else{
//             sendernamerotate.scrollTo(sendernamerotate.scrollLeft-1,0);
//             console.log('here!');
//         }
//     }, 15);
// });

function showcomposeemail(){
    if(!(document.querySelector(`[data-closelid="composelabel"]`))){
    var emailcontent = document.getElementById('emailcontent');
    var composelabel = document.createElement('div');
    var composelabelclass = document.createAttribute('class');
    var composelabelid = document.createAttribute('id');
    var composelabeldatalid = document.createAttribute('data-lid');
    var composelabeldatalcolor = document.createAttribute('data-lcolor');
    var composelabelonclick = document.createAttribute('onclick');
    composelabelclass.value = "label";
    composelabelid.value = "composelabel";
    composelabeldatalid.value = "composelabel";
    composelabelonclick.value = "changelabel(this)";
    composelabeldatalcolor.value = "#000000";
    composelabel.setAttributeNode(composelabelclass);
    composelabel.setAttributeNode(composelabelid);
    composelabel.setAttributeNode(composelabeldatalid);
    composelabel.setAttributeNode(composelabeldatalcolor);
    composelabel.setAttributeNode(composelabelonclick);
    
    var labeldiv  =document.createElement('div');
            var labeldivclass = document.createAttribute('class');
            var labeldivlid = document.createAttribute('data-closelid');
            labeldivclass.value="labeldiv";
            labeldivlid.value="composelabel";
            labeldiv.setAttributeNode(labeldivclass);
            labeldiv.setAttributeNode(labeldivlid);


            var labelname = document.createElement('div');
            var labelnameclass = document.createAttribute('class');
            labelnameclass.value="labellabelname";
            labelname.setAttributeNode(labelnameclass);
            labelname.innerHTML = "Compose";
            
            
            var iconelem = document.createElement('i');
            var iconelemclass = document.createAttribute('class');
            iconelemclass.value = "material-icons composeicon";
            iconelem.setAttributeNode(iconelemclass);
            iconelem.innerHTML = "send";
            
            
            var labelprop = document.createElement('div');
            var labelpropclass = document.createAttribute('class');
            labelpropclass.value = 'labelname';
            labelprop.setAttributeNode(labelpropclass);
            
            var labelicon = document.createElement('div');
            var labeliconclass = document.createAttribute('class');
            labeliconclass.value = 'labelicon';
            labelicon.setAttributeNode(labeliconclass);
            var mainname = document.createElement('div');
            var mainnameclass = document.createAttribute('class');
            mainnameclass.value = 'mainname';
            mainname.setAttributeNode(mainnameclass);
            
            var newcont = document.createElement('div');
            var newcontclass = document.createAttribute('class');
            newcontclass.value = "newcont";
            newcont.setAttributeNode(newcontclass);

            var sectionwhere = document.createElement('div');
            var sectionwhereclass = document.createAttribute('class');
            var sectionwhereid = document.createAttribute('id');
            sectionwhereclass.value = "sectionwhere";
            sectionwhereid.value = "sectionwhere";
            sectionwhere.setAttributeNode(sectionwhereclass);
            sectionwhere.setAttributeNode(sectionwhereid);
            
            var closetab = document.createElement('div');
            var closetabclass = document.createAttribute('class');
            var closetabid = document.createAttribute('id');
            closetabclass.value = "closetab";
            closetabid.value = "closetab";
            closetab.setAttributeNode(closetabclass);
            closetab.setAttributeNode(closetabid);
            
            var closeicon = document.createElement('div');
            var closeiconclass = document.createAttribute('class');
            var closeicononclick = document.createAttribute('onclick');
            var closeicondataid= document.createAttribute('data-closeiconlid');
            closeicononclick.value = "closelabel(this)";
            closeicondataid.value = "currlabel";
            closeiconclass.value = "icon closelabel";
            closeicon.setAttributeNode(closeiconclass);
            closeicon.setAttributeNode(closeicononclick);
            closeicon.setAttributeNode(closeicondataid);
            
            var materialelem = document.createElement('i');
            var materialelemclass = document.createAttribute('class');
            materialelemclass.value="material-icons closelabel";
            materialelem.setAttributeNode(materialelemclass);
            materialelem.innerHTML="close";
            
            var tooltip = document.createElement('div');
            var tooltipclass = document.createAttribute('class');
            tooltipclass.value = "tooltip";
            tooltip.setAttributeNode(tooltipclass);
            tooltip.innerHTML = "Close";

            labelicon.appendChild(iconelem);
            mainname.appendChild(labelname);
            labelprop.appendChild(mainname);
            labelprop.appendChild(newcont);
            composelabel.appendChild(labelicon);
            composelabel.appendChild(labelprop);
            composelabel.appendChild(sectionwhere);
            closeicon.appendChild(materialelem);
            closeicon.appendChild(tooltip);
            closetab.appendChild(closeicon);
            labeldiv.appendChild(composelabel);
            labeldiv.appendChild(closetab);

            emailcontent.appendChild(labeldiv);

            createdivforemaildisp("composeemaildiv",0);
            var composelabel = document.getElementById('composelabel');
            changelabel(composelabel);
}
}
function retreivetoreceipt(elem){
    var value = elem.value;
    if(value==""){
        document.getElementsByClassName('receipentsdisplay')[0].style.display = "none";
    }else{
        document.getElementsByClassName('receipentsdisplay')[0].style.display = "grid";
        var params = "senders="+value;
        fetch('retreivetoreceipents.php',{
            method: 'POST',
            headers :{
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            body : params
        }).then(response => response.json()).then(data =>{
            // console.log(data);
                var elem = document.getElementById('receipentsdisplay');
                elem.innerHTML = "";
            for(datain in data){
                var eachdata = data[datain];
                
                var indreceiptto = document.createElement('div');
                var indreceipttoclass = document.createAttribute('class');
                var indreceipttotoid = document.createAttribute('data-toid');
                indreceipttoclass.value = "indreceiptto";
                indreceipttotoid.value = eachdata['id'];
                var indreceipttoonclick = document.createAttribute('onclick');
                indreceipttoonclick.value = "addcctodiv(this,'to')";
                indreceiptto.setAttributeNode(indreceipttoclass);
                // indreceiptto.setAttributeNode(indreceipttotoid);
                // indreceiptto.setAttributeNode(indreceipttoonclick);

                var topic = document.createElement('div');
                var topicclass = document.createAttribute('class');
                topicclass.value = "topic";
                topic.setAttributeNode(topicclass);

                var topicpic = document.createElement('div');
                var topicpicclass = document.createAttribute('class');
                topicpicclass.value = "topicpic";
                topicpic.setAttributeNode(topicpicclass);

                var imgto = document.createElement('img');
                var imgtosrc = document.createAttribute('src');
                imgtosrc.value = "assets/propic/"+eachdata['ppic'];
                imgto.setAttributeNode(imgtosrc);

                topicpic.appendChild(imgto);
                topic.appendChild(topicpic);

                var tosendername = document.createElement('div');
                var tosendernameclass = document.createAttribute('class');
                tosendernameclass.value = "tosendername";
                tosendername.setAttributeNode(tosendernameclass);

                var sendersinfo = document.createElement('div');
                var sendersinfoclass = document.createAttribute('class');
                sendersinfoclass.value = "sendersinfo";
                sendersinfo.setAttributeNode(sendersinfoclass);
                sendersinfo.setAttributeNode(indreceipttoonclick);
                sendersinfo.setAttributeNode(indreceipttotoid);

                var tosendernamemain = document.createElement('div');
                var tosendernamemainclass = document.createAttribute('class');
                var tosendernamemaindatatosendername = document.createAttribute('data-tosendernamemain');
                tosendernamemainclass.value = "tosendernamemain";
                tosendernamemaindatatosendername.value = eachdata['id'];
                tosendernamemain.setAttributeNode(tosendernamemainclass);
                tosendernamemain.setAttributeNode(tosendernamemaindatatosendername);
                tosendernamemain.innerHTML = eachdata['firstname']+" "+eachdata['lastname'];

                var tosenderemail = document.createElement('div');
                var tosenderemailclass = document.createAttribute('class');
                tosenderemailclass.value = "tosenderemail";
                tosenderemail.setAttributeNode(tosenderemailclass);
                tosenderemail.innerHTML = eachdata['email'];
                
                sendersinfo.appendChild(tosendernamemain);
                sendersinfo.appendChild(tosenderemail);

                var tosendercontrols = document.createElement('div');
                var tosendercontrolsclass = document.createAttribute('class');
                tosendercontrolsclass.value = "tosendercontrols";
                tosendercontrols.setAttributeNode(tosendercontrolsclass);

                var extrainfoto = document.createElement('div');
                var extrainfotoclass = document.createAttribute('class');
                extrainfotoclass.value = "extrainfoto";
                extrainfoto.setAttributeNode(extrainfotoclass);

                var ccbcc = document.createElement('div');
                var ccbccclass = document.createAttribute('class');
                ccbccclass.value ="ccbcc";
                ccbcc.setAttributeNode(ccbccclass);

                var cc = document.createElement('div');
                var ccclass = document.createAttribute('class');
                var cctoid = document.createAttribute('data-toid');
                var cctoonclick = document.createAttribute('onclick');
                ccclass.value = "cc";
                cctoid.value = eachdata['id'];
                cctoonclick.value = "addcctodiv(this,'ccdisp')";
                cc.setAttributeNode(ccclass);
                cc.setAttributeNode(cctoid);
                cc.setAttributeNode(cctoonclick);
                cc.innerHTML = "Add as CC";
                
                var bcc = document.createElement('div');
                var bccclass = document.createAttribute('class');
                var bcctoid = document.createAttribute('data-toid');
                var bcctoonclick = document.createAttribute('onclick');
                bccclass.value = "bcc";
                bcctoid.value = eachdata['id'];
                bcctoonclick.value = "addcctodiv(this,'bccdisp')";
                bcc.setAttributeNode(bccclass);
                bcc.setAttributeNode(bcctoid);
                bcc.setAttributeNode(bcctoonclick);
                bcc.innerHTML = "Add as BCC";
                
                ccbcc.appendChild(cc);
                ccbcc.appendChild(bcc);

                tosendercontrols.appendChild(extrainfoto);
                tosendercontrols.appendChild(ccbcc);

                tosendername.appendChild(sendersinfo);
                tosendername.appendChild(tosendercontrols);

                indreceiptto.appendChild(topic);
                indreceiptto.appendChild(tosendername);
                elem.appendChild(indreceiptto);
            }
        });
    }
}
function addcctodiv(elem,type){
    var toid = elem.getAttribute('data-toid');
    var getthename = document.querySelectorAll(`[data-tosendernamemain = "${toid}"]`);
    var displayrecep = document.getElementById('toreceipents');
    var countchilds = displayrecep.children.length;
    // alert(countchilds);
    var finalchilds = countchilds+1;
    var finalwidth = finalchilds*9;
    var columns = "";
    for(var i=0;i<finalchilds;i++){
        columns+="1fr "; 
    }
    displayrecep.style.width = finalwidth+"vw";
    displayrecep.style.gridTemplateColumns = columns;

    var indivrecep = document.createElement('div');
    var indivrecepclass = document.createAttribute('class');
    var indivreceptoid = document.createAttribute('data-toid');
    var indivreceptype = document.createAttribute('data-type');
    indivreceptoid.value = toid;
    indivrecepclass.value = "indivrecep"+" "+type;
    indivreceptype.value = type;
    indivrecep.setAttributeNode(indivrecepclass);
    indivrecep.setAttributeNode(indivreceptoid);
    indivrecep.setAttributeNode(indivreceptype);

    var indivrecepcont = document.createElement('div');
    var indivrecepcontclass = document.createAttribute('class');
    indivrecepcontclass.value = "indivrecepcont";
    indivrecepcont.setAttributeNode(indivrecepcontclass);

    var tooltip = document.createElement('div');
            var tooltipclass = document.createAttribute('class');
            tooltipclass.value = "tooltip";
            tooltip.setAttributeNode(tooltipclass);
            tooltip.innerHTML = "Added as CC";
    
    var indivrecepcontname = document.createElement('div');
    var indivrecepcontnameclass = document.createAttribute('class');
    indivrecepcontnameclass.value = "indrecepcontname";
    indivrecepcontname.setAttributeNode(indivrecepcontnameclass);
    indivrecepcontname.innerHTML = getthename[0].innerHTML;
    
    indivrecepcont.appendChild(indivrecepcontname);
    
    var indivrecepcontclose = document.createElement('div');
    var indivrecepcontcloseclass = document.createAttribute('class');
    indivrecepcontcloseclass.value = "indrecepcontclose";
    indivrecepcontclose.setAttributeNode(indivrecepcontcloseclass);

    var icon = document.createElement('div');
    var iconclass = document.createAttribute('class');
    var icononclick = document.createAttribute('onclick');
    var icondatatoid = document.createAttribute('data-todeleteid');
    iconclass.value ="icon";
    icononclick.value ="deleterecep(this)";
    icondatatoid.value =toid;
    icon.setAttributeNode(iconclass);
    icon.setAttributeNode(icononclick);
    icon.setAttributeNode(icondatatoid);
                   
    var materialelem = document.createElement('i');
    var materialelemclass = document.createAttribute('class');
    materialelemclass.value="material-icons tolabelsclosebtn";
    materialelem.setAttributeNode(materialelemclass);
    materialelem.innerHTML="close";
    icon.appendChild(materialelem);
    indivrecepcontclose.appendChild(icon);
    indivrecepcont.appendChild(indivrecepcontclose);
    indivrecep.appendChild(indivrecepcont);
    indivrecep.appendChild(tooltip);
    displayrecep.appendChild(indivrecep);
    document.getElementById('toarea').value = "";
    document.getElementById('toinputvalue').value += toid+" ";
}
document.getElementsByClassName('bodyinput')[0].designMode = "on";
function altertext(event){
    
}
function altertextonclick(type){
    if(type.getAttribute('data-controltype')=='bold'){
    document.execCommand('Bold',false);
}
    else if(type.getAttribute('data-controltype')=='italic'){
    document.execCommand('Italic',false);
}
    else if(type.getAttribute('data-controltype')=='underline'){
    document.execCommand('Underline',false);
}
else if(type.getAttribute('data-controltype')=='colourchange'){
    document.getElementById('changecolourcontentdiv').style.display = "grid";
}
else if(type.getAttribute('data-controltype')=='strikeThrough'){
        document.execCommand('strikeThrough',false);
    }
}
function changetypecolor(){
    var color = document.changecontentform.contentcolor.value;
    document.getElementsByClassName('colourcontollerrep')[0].style.backgroundColor = color;
    document.execCommand('styleWithCSS', false, true);
    document.execCommand('foreColor', false, color);
    document.getElementById('changecolourcontentdiv').style.display = "none";
    
}
function openfontdropdown(){
    document.getElementById('dropdownforfont').classList.toggle('show');
}
function changefontfamily(elem){
    var family = elem.innerHTML;
    document.getElementsByClassName('selected')[0].classList.remove('selected');
    elem.classList.add('selected');
    document.getElementById('dropdownforfont').classList.remove('show');
    document.getElementById('fontmain').innerHTML = family;
    document.getElementById('fontmain').style.fontFamily = family;
    document.execCommand('styleWithCSS', false, true);
    document.execCommand('fontName', false, family);
    
}
function changetextsize(elem){
    document.getElementsByClassName('selected')[0].classList.remove('selectedsize');
    elem.classList.add('selectedsize');
    var size = elem.getAttribute('data-sizeid');
    document.execCommand('styleWithCSS', false, true);
        document.execCommand('fontSize', false, size);
}
function changetextalign(elem){
    var align = elem.getAttribute('data-aligntype');
    document.execCommand(align,false,"");
}
function addlists(elem){
    var list = elem.getAttribute('data-listtype');
    document.execCommand(list,false,"");

}
function removeformat(){
    document.execCommand( "removeFormat", false, "" );
}
function changebackgroundcolortext(){
    document.getElementById('textbackmain').style.display = "grid";
}
function changebackgroundcolor(){
    var color = document.changebackgroundform.backgroundcolor.value;
    document.getElementsByClassName('textbackcolor')[0].style.backgroundColor = color;
    document.execCommand('styleWithCSS', false, true);
    document.execCommand('hiliteColor', false, color);
    // document.execCommand('usebackColor', false, color);
    document.getElementById('textbackmain').style.display = "none";
}
function undo(){
    document.execCommand("undo", false, "" );
}
function redo(){
    document.execCommand("redo", false, "" );
}
function linkatext(){
    document.getElementById('pastelink').classList.toggle('show');
}
function unlinkatext(){
    document.execCommand( "unlink", false, "" );
}
function addalink(){
    var link = document.linkcontent.linkname.value;
    document.execCommand( "createLink", false, link );
    document.getElementById('pastelink').style.display = "none";
}
function inserthr(){
    document.execCommand( "insertHorizontalRule", false, "" ); 
}
function resizeobj(){
    document.execCommand( "enableObjectResizing", false, "" );
}
function addimage(){
    document.getElementById('addimagediv').classList.toggle('show');
}
function appendimageintomail(){
    var link = document.imagelinkform.imagelink.value;
    document.execCommand( "insertImage", false, link ); 
}
function addtoinput(){
        var sub = document.getElementsByClassName('subjectofmail')[0].value;
        var cont = document.getElementsByClassName('bodyinput')[0].innerHTML;
        var toreceps = document.getElementsByClassName('indivrecep');
        var cccount = 0;
        var bcccount = 0;
        var tocount = 0;
        for(var i=0;i<toreceps.length;i++){
            if(toreceps[i].getAttribute('data-type')=="ccdisp"){
                cccount++;
            }
            else if(toreceps[i].getAttribute('data-type')=="bccdisp"){
                bcccount++;
            }
            else if(toreceps[i].getAttribute('data-type')=="to"){
                tocount++;
            }
        }
        if(cccount+bcccount+tocount == 0){
                document.getElementById('norecepdefined').style.display = "grid";
        }
        else if(cont == "" || sub==""){
            document.getElementById('blanksuborcont').style.display = "grid";
        }
        else{
            sendtheemail();
        }
}
function deleterecep(elem){
    var theid = elem.getAttribute('data-todeleteid');
    var element = document.getElementsByClassName('toreceipents');
        var selectelem = element[0].querySelectorAll(`[data-toid="${theid}"]`);
        selectelem[0].remove();
        var getwidth = element[0].style.width;
        var numberwidth = getwidth.split("vw");
        var tonumberwidth = Number(numberwidth[0]);
        var finalwidth = tonumberwidth - 9;
        element[0].style.width = finalwidth+"vw";

        var grid = element[0].style.gridTemplateColumns;
        var gridnum = grid.split(' ');
        var gridnumnum = gridnum.length;
        var finalgridnum = "";
        for(var i=0;i<gridnumnum-1;i++){
            finalgridnum+="1fr ";
        }
        element[0].style.gridTemplateColumns = finalgridnum;
}
function closediv(elem){
    document.getElementById(elem).style.display = "none";
}
function sendtheemail(){
    var sub = document.getElementsByClassName('subjectofmail')[0].value;
    var cont = document.getElementsByClassName('bodyinput')[0].innerHTML;
    var toreceps = document.getElementsByClassName('indivrecep');
    var cccount = 0;
    var bcccount = 0;
    var tocount = 0;
    var ccelem = "";
    var bccelem="";
    var toelem="";
    for(var i=0;i<toreceps.length;i++){
        if(toreceps[i].getAttribute('data-type')=="ccdisp"){
            ccelem=ccelem+(toreceps[i].getAttribute('data-toid')+",");
            cccount++;
        }
        else if(toreceps[i].getAttribute('data-type')=="bccdisp"){
            bccelem=bccelem+(toreceps[i].getAttribute('data-toid')+",");
            bcccount++;
        }
        else if(toreceps[i].getAttribute('data-type')=="to"){
            toelem=toelem+(toreceps[i].getAttribute('data-toid')+",");
            tocount++;
        }
    }
    params = "sub="+sub+"&cont="+cont+"&toelem="+toelem+"&ccelem="+ccelem+"&bccelem="+bccelem;
    fetch('sendemail.php',{
        method: 'POST',
        headers :{
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        body : params
    }).then(response => response.text()).then(data =>{
            if(data=="1"){
                console.log('here');
                var getcomposeelem = document.querySelector(`[data-closeiconlid="currlabel"]`);
                closelabel(getcomposeelem);
                var inbox = document.getElementById('primary');
                changelabel(inbox);
                var indivreceps = document.getElementsByClassName('indivrecep');
                for(var i=0;i<indivreceps.length;i++){
                    indivreceps[i].remove();
                }
                sub.value = "";
                document.getElementsByClassName('bodyinput')[0].innerHTML = "";
            }
    });
}
function openmail(eid){
    var emailcontent = document.getElementById('emailcontent');
    var composelabel = document.createElement('div');
    var composelabelclass = document.createAttribute('class');
    var composelabelid = document.createAttribute('id');
    var composelabeldatalid = document.createAttribute('data-lid');
    var composelabeldatalcolor = document.createAttribute('data-lcolor');
    var composelabelonclick = document.createAttribute('onclick');
    composelabelclass.value = "selectedemaillabel";
    composelabelid.value = "dispemail"+eid;
    composelabeldatalid.value = "selectedemaillabels";
    composelabelonclick.value = "changelabel(this)";
    composelabeldatalcolor.value = "#000000";
    composelabel.setAttributeNode(composelabelclass);
    composelabel.setAttributeNode(composelabelid);
    composelabel.setAttributeNode(composelabeldatalid);
    composelabel.setAttributeNode(composelabeldatalcolor);
    composelabel.setAttributeNode(composelabelonclick);
    
    var labeldiv  =document.createElement('div');
            var labeldivclass = document.createAttribute('class');
            var labeldivlid = document.createAttribute('data-closelid');
            labeldivclass.value="labeldiv";
            labeldivlid.value="closeemail"+eid;
            labeldiv.setAttributeNode(labeldivclass);
            labeldiv.setAttributeNode(labeldivlid);


            var labelname = document.createElement('div');
            var labelnameclass = document.createAttribute('class');
            labelnameclass.value="labellabelname";
            labelname.setAttributeNode(labelnameclass);
            var gettile = document.querySelector(`[data-indiemailsubject = "indiemailsubject${eid}"]`).innerHTML;
            var only30chars = gettile.slice(0,30);
            labelname.innerHTML = only30chars;
            
            
            
            
            var labelprop = document.createElement('div');
            var labelpropclass = document.createAttribute('class');
            labelpropclass.value = 'labelname';
            labelprop.setAttributeNode(labelpropclass);
            
            var labelicon = document.createElement('div');
            var labeliconclass = document.createAttribute('class');
            labeliconclass.value = 'labelicon';
            labelicon.setAttributeNode(labeliconclass);
            var mainname = document.createElement('div');
            var mainnameclass = document.createAttribute('class');
            mainnameclass.value = 'mainname';
            mainname.setAttributeNode(mainnameclass);
            
            var newcont = document.createElement('div');
            var newcontclass = document.createAttribute('class');
            newcontclass.value = "newcont";
            newcont.setAttributeNode(newcontclass);

            var sectionwhere = document.createElement('div');
            var sectionwhereclass = document.createAttribute('class');
            var sectionwhereid = document.createAttribute('id');
            sectionwhereclass.value = "sectionwhere";
            sectionwhereid.value = "sectionwhere";
            sectionwhere.setAttributeNode(sectionwhereclass);
            sectionwhere.setAttributeNode(sectionwhereid);
            
            var closetab = document.createElement('div');
            var closetabclass = document.createAttribute('class');
            var closetabid = document.createAttribute('id');
            closetabclass.value = "closetab";
            closetabid.value = "closetab";
            closetab.setAttributeNode(closetabclass);
            closetab.setAttributeNode(closetabid);
            
            var closeicon = document.createElement('div');
            var closeiconclass = document.createAttribute('class');
            var closeicononclick = document.createAttribute('onclick');
            var closeicondataid= document.createAttribute('data-closeiconlid');
            closeicononclick.value = "closelabel(this)";
            closeicondataid.value = "closeemail"+eid;
            closeiconclass.value = "icon closelabel";
            closeicon.setAttributeNode(closeiconclass);
            closeicon.setAttributeNode(closeicononclick);
            closeicon.setAttributeNode(closeicondataid);
            
            var materialelem = document.createElement('i');
            var materialelemclass = document.createAttribute('class');
            materialelemclass.value="material-icons closelabel";
            materialelem.setAttributeNode(materialelemclass);
            materialelem.innerHTML="close";
            
            var tooltip = document.createElement('div');
            var tooltipclass = document.createAttribute('class');
            tooltipclass.value = "tooltip";
            tooltip.setAttributeNode(tooltipclass);
            tooltip.innerHTML = "Close";
            mainname.appendChild(labelname);
            labelprop.appendChild(mainname);
            labelprop.appendChild(newcont);
            composelabel.appendChild(labelprop);
            composelabel.appendChild(sectionwhere);
            closeicon.appendChild(materialelem);
            closeicon.appendChild(tooltip);
            closetab.appendChild(closeicon);
            labeldiv.appendChild(composelabel);
            labeldiv.appendChild(closetab);

            emailcontent.appendChild(labeldiv);

            createdivforemaildisp('emailsdiv',eid);
            var labelselect = document.getElementById('dispemail'+eid);
            changelabel(labelselect);
}
function getindemail(eid){
    fetch('getindmail.php',{
        method: 'POST',
        headers :{
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        body : "eid="+eid
    }).then(response => response.json()).then(data => {
    var selecteddispemail = document.getElementById('selecteddispemail'+eid);
    selecteddispemail.innerHTML = "";
    var maildisptitle = document.createElement('div');
    var maildisptitleclass = document.createAttribute('class');
    maildisptitleclass.value = "maildisptitle";
    maildisptitle.setAttributeNode(maildisptitleclass);

    var mailtextcontent = document.createElement('div');
    var mailtextcontentclass = document.createAttribute('class');
    mailtextcontentclass.value = "mailtextcontent";
    mailtextcontent.setAttributeNode(mailtextcontentclass);
    mailtextcontent.innerHTML = data['title'];
    
    var mailtextcontrols = document.createElement('div');
    var mailtextcontrolsclass = document.createAttribute('class');
    mailtextcontrolsclass.value = "mailtextcontrols";
    mailtextcontrols.setAttributeNode(mailtextcontrolsclass);
    maildisptitle.appendChild(mailtextcontent);
    maildisptitle.appendChild(mailtextcontrols);

    var maildispcontrols = document.createElement('div');
    var maildispcontrolsclass = document.createAttribute('class');
    maildispcontrolsclass.value = "maildispcontrols";
    maildispcontrols.setAttributeNode(maildispcontrolsclass);

    var mailcontrolssenderdetails = document.createElement('div');
    var mailcontrolssenderdetailsclass = document.createAttribute('class');
    mailcontrolssenderdetailsclass.value = "mailcontrolssenderdetails";
    mailcontrolssenderdetails.setAttributeNode(mailcontrolssenderdetailsclass);

    var mailcontrolssendername = document.createElement('div');
    var mailcontrolssendernameclass = document.createAttribute('class');
    mailcontrolssendernameclass.value ="mailcontrolssendername";
    mailcontrolssendername.setAttributeNode(mailcontrolssendernameclass);

    var mailsenderindpic = document.createElement('div');
    var mailsenderindpicclass = document.createAttribute('class');
    mailsenderindpicclass.value = "mailsenderindpic";
    mailsenderindpic.setAttributeNode(mailsenderindpicclass);

    var img = document.createElement('img');
    var imgsrc = document.createAttribute('src');
    imgsrc.value ="assets/propic/"+data['ppic'];
    img.setAttributeNode(imgsrc);

    mailsenderindpic.appendChild(img);
    mailcontrolssendername.appendChild(mailsenderindpic);
    mailcontrolssenderdetails.appendChild(mailcontrolssendername);

    var mailcontrolssenderothers = document.createElement('div');
    var mailcontrolssenderothersclass = document.createAttribute('class');
    mailcontrolssenderothersclass.value = "mailcontrolssenderothers";
    mailcontrolssenderothers.setAttributeNode(mailcontrolssenderothersclass);

    var mailsenderdetails = document.createElement('div');
    var mailsenderdetailsclass = document.createAttribute('class');
    mailsenderdetailsclass.value = "mailsenderdetails";
    mailsenderdetails.setAttributeNode(mailsenderdetailsclass);

    var dispsendername = document.createElement('div');
    var dispsendernameclass = document.createAttribute('class');
    dispsendernameclass.value = "dispsendername";
    dispsendername.setAttributeNode(dispsendernameclass);
    dispsendername.innerHTML = data['first_name']+" "+data['last_name'];

    var dispsenderemailid = document.createElement('div');
    var dispsenderemailidclass = document.createAttribute('class');
    dispsenderemailidclass.value = "dispsenderemailid";
    dispsenderemailid.setAttributeNode(dispsenderemailidclass);
    dispsenderemailid.innerHTML = data['email'];
    
    mailsenderdetails.appendChild(dispsendername);
    mailsenderdetails.appendChild(dispsenderemailid);
    mailcontrolssenderothers.appendChild(mailsenderdetails);
    mailcontrolssenderdetails.appendChild(mailcontrolssenderothers);

    var mailcontrolsothers = document.createElement('div');
    var mailcontrolsothersclass = document.createAttribute('class');
    mailcontrolsothersclass.value = "mailcontrolsothers";
    mailcontrolsothers.setAttributeNode(mailcontrolsothersclass);

    var mailcontrolsotherscontent = document.createElement('div');
    var mailcontrolsotherscontentclass = document.createAttribute('class');
    mailcontrolsotherscontentclass.value = "mailcontrolsotherscontent";
    mailcontrolsotherscontent.setAttributeNode(mailcontrolsotherscontentclass);

    var mailcontrolothersmaincontent = document.createElement('div');
    var mailcontrolothersmaincontentclass = document.createAttribute('class');
    mailcontrolothersmaincontentclass.value = "mailcontrolothersmaincontent";
    mailcontrolothersmaincontent.setAttributeNode(mailcontrolothersmaincontentclass);

    var thismailsenttime = document.createElement('div');
    var thismailsenttimeclass = document.createAttribute('class');
    var thismailsenttimedata = document.createAttribute('data-thismailsenttime');
    thismailsenttimeclass.value = "thismailsenttime";
    thismailsenttimedata.value = "thismailsenttime"+eid;
    thismailsenttime.setAttributeNode(thismailsenttimeclass);
    thismailsenttime.setAttributeNode(thismailsenttimedata);
    var emailtime = new Date(data['stime']);
    var emaildate = emailtime.getDate();
    var emailmonth = emailtime.getMonth();
    var emailyear = emailtime.getFullYear();
    var emailhrs = emailtime.getHours();
    var emailmins = emailtime.getMinutes();
    thismailsenttime.innerHTML = emaildate+"-"+emailmonth+"-"+emailyear+"-"+emailhrs+":"+emailmins+"("+getemailtime(data['stime'],'thismailsenttime') +")";
    var thismailadditionalcontrols = document.createElement('div');
    var thismailadditionalcontrolsclass =document.createAttribute('class');
    thismailadditionalcontrolsclass.value = "thismailadditionalcontrols";
    thismailadditionalcontrols.setAttributeNode(thismailadditionalcontrolsclass);

    var additionalcontrolsmain = document.createElement('div');
    var additionalcontrolsmainclass = document.createAttribute('class');
    additionalcontrolsmainclass.value = "additionalcontrolsmain";
    additionalcontrolsmain.setAttributeNode(additionalcontrolsmainclass);

    var underlabelthisdiv = document.createElement('div');
    var underlabelthisdivclass = document.createAttribute('class');
    underlabelthisdivclass.value = "underlabelthisdiv";
    underlabelthisdiv.setAttributeNode(underlabelthisdivclass);

    var icon = document.createElement('div');
    var iconclass = document.createAttribute('class');
    iconclass.value = "icon thisemaillabel";
    icon.setAttributeNode(iconclass);

    var material = document.createElement('i');
    var materialclass = document.createAttribute('class');
    materialclass.value = "material-icons";
    material.setAttributeNode(materialclass);
        material.innerHTML = "label";

    var tooltip = document.createElement('div');
    var tooltipclass = document.createAttribute('class');
    tooltipclass.value = "tooltip";
    tooltip.setAttributeNode(tooltipclass);
    tooltip.innerHTML ="In "+data['underlabel'];

    icon.appendChild(material);
    icon.appendChild(tooltip);
    underlabelthisdiv.appendChild(icon);

    var replyforwardthis = document.createElement('div');
    var replyforwardthisclass = document.createAttribute('class');
    replyforwardthisclass.value ="replyforwardthis";
    replyforwardthis.setAttributeNode(replyforwardthisclass);

    var replythis = document.createElement('div');
    var replythisclass = document.createAttribute('class');
    replythisclass.value ="replythis";
    replythis.setAttributeNode(replythisclass);

    var iconreply = document.createElement('div');
    var iconreplyclass = document.createAttribute('class');
    iconreplyclass.value = "icon";
    iconreply.setAttributeNode(iconreplyclass);

    var materialreply = document.createElement('i');
    var materialreplyclass = document.createAttribute('class');
    materialreplyclass.value = "material-icons";
    materialreply.setAttributeNode(materialreplyclass);
    materialreply.innerHTML = "reply";
    var tooltipreply = document.createElement('div');
    var tooltipreplyclass = document.createAttribute('class');
    tooltipreplyclass.value = "tooltip";
    tooltipreply.setAttributeNode(tooltipreplyclass);
    tooltipreply.innerHTML ="Reply";
    iconreply.appendChild(materialreply);
    iconreply.appendChild(tooltipreply);
    replythis.appendChild(iconreply);
    replyforwardthis.appendChild(replythis);



    var forwardthis = document.createElement('div');
    var forwardthisclass = document.createAttribute('class');
    forwardthisclass.value ="forwardthis";
    forwardthis.setAttributeNode(forwardthisclass);

    var iconforward = document.createElement('div');
    var iconforwardclass = document.createAttribute('class');
    iconforwardclass.value = "icon";
    iconforward.setAttributeNode(iconforwardclass);

    var materialforward = document.createElement('i');
    var materialforwardclass = document.createAttribute('class');
    materialforwardclass.value = "material-icons";
    materialforward.setAttributeNode(materialforwardclass);
    materialforward.innerHTML = "forward";
    var tooltipforward = document.createElement('div');
    var tooltipforwardclass = document.createAttribute('class');
    tooltipforwardclass.value = "tooltip";
    tooltipforward.setAttributeNode(tooltipforwardclass);
    tooltipforward.innerHTML ="Forward";

    iconforward.appendChild(materialforward);
    iconforward.appendChild(tooltipforward);
    forwardthis.appendChild(iconforward);
    replyforwardthis.appendChild(forwardthis);

    additionalcontrolsmain.appendChild(underlabelthisdiv);
    additionalcontrolsmain.appendChild(replyforwardthis);
    thismailadditionalcontrols.appendChild(additionalcontrolsmain);
    mailcontrolothersmaincontent.appendChild(thismailsenttime);
    mailcontrolothersmaincontent.appendChild(thismailadditionalcontrols);
    mailcontrolsotherscontent.appendChild(mailcontrolothersmaincontent);
    mailcontrolsothers.appendChild(mailcontrolsotherscontent);
    maildispcontrols.appendChild(mailcontrolssenderdetails);
    maildispcontrols.appendChild(mailcontrolsothers);
    
    var maildispbody = document.createElement('div');
    var maildispbodyclass = document.createAttribute('class');
    maildispbodyclass.value = "maildispbody";
    maildispbody.setAttributeNode(maildispbodyclass);

    var displaybodycontent = document.createElement('div');
    var displaybodycontentclass = document.createAttribute('class');
    displaybodycontentclass.value = "displaybodycontent";
    displaybodycontent.setAttributeNode(displaybodycontentclass);
    displaybodycontent.innerHTML = data['body'];
    maildispbody.appendChild(displaybodycontent);

    selecteddispemail.appendChild(maildisptitle);
    selecteddispemail.appendChild(maildispcontrols);
    selecteddispemail.appendChild(maildispbody);


    });
}
var getallids = [];
function selectthemailforcontrols(elem){
    elem.classList.toggle('selectedemailcheckboxischecked');
    if(elem.getElementsByClassName('selectedemailcheckboxtickmark')[0].style.display == "grid"){
        elem.getElementsByClassName('selectedemailcheckboxtickmark')[0].style.display = "none";
    }
    else{
        elem.getElementsByClassName('selectedemailcheckboxtickmark')[0].style.display = "grid";
    }
    var getemailid = elem.getAttribute('data-selectedemailcheckbox');
    // console.log(getemailid);
    var getinputbox = document.getElementsByName('selectedemailsforproperties')[0];
    if(getinputbox.value.includes(getemailid)){
        // getinputbox.value = getinputbox.value - (getemailid+",");
        var cpyallids= getinputbox.value;
        getinputbox.value = "";
        var getallids = cpyallids.split(",");
        // console.log(getallids);
        for(var i=0;i<(getallids.length)-1;i++){
            if(getallids[i]!=getemailid){
                getinputbox.value = getinputbox.value+(getallids[i]+",");
            }
        }


        if(getinputbox.value == "NaN"){
            getinputbox.value = "";
        }
    }
    else{
        getinputbox.value = getinputbox.value+(getemailid+",");
    }
    // console.log(getinputbox.value);
}

function changeselectedmailprops(type){
    var gettheids = document.getElementsByName('selectedemailsforproperties')[0].value;
    var idarrays = gettheids.split(',');
    var params = "func="+type+"&ids="+gettheids;
    // console.log(gettheids);
    if(type == "read"){
        fetch('changeread.php',{
            method: 'POST',
            headers :{
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            body : params
        }).then(response => response.text()).then(data =>{
                        for(var i=0;i<((idarrays.length) - 1);i++){
                                // console.log(`[data-thisisanindimail = "${idarrays[i]}"]`);
                                document.querySelector(`[data-thisisanindimail = "${idarrays[i]}"]`).classList.remove('notread');
                        }
        });
    }
    else if(type == "unread"){
        fetch('changeunread.php',{
            method: 'POST',
            headers :{
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            body : params
        }).then(response => response.text()).then(data =>{
                        for(var i=0;i<((idarrays.length) - 1);i++){
                                // console.log(`[data-thisisanindimail = "${idarrays[i]}"]`);
                                document.querySelector(`[data-thisisanindimail = "${idarrays[i]}"]`).classList.add('notread');
                        }
        });
    }
    else if(type == "fav"){
        fetch('changestar.php',{
            method: 'POST',
            headers :{
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            body : params
        }).then(response => response.text()).then(data =>{
                        // for(var i=0;i<((idarrays.length) - 1);i++){
                        //         // console.log(`[data-thisisanindimail = "${idarrays[i]}"]`);
                        //         document.querySelector(`[data-thisisanindimail = "${idarrays[i]}"]`).classList.add('notread');
                        // }
        });
    }
    else if(type == "archive"){
        fetch('addtoarchive.php',{
            method: 'POST',
            headers :{
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            body : params
        }).then(response => response.text()).then(data =>{
            console.log(data);
                        for(var i=0;i<((idarrays.length) - 1);i++){
                                // console.log(`[data-thisisanindimail = "${idarrays[i]}"]`);
                                document.querySelector(`[data-thisisanindimail = "${idarrays[i]}"]`).classList.add('addedtoarchive');
                                setTimeout(function(){}, 450);
                                document.querySelector(`[data-thisisanindimail = "${idarrays[i]}"]`).remove();
                        }
        });
    }
    else if(type == "bin"){
        fetch('addtobin.php',{
            method: 'POST',
            headers :{
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            body : params
        }).then(response => response.text()).then(data =>{
            console.log(data);
                        for(var i=0;i<((idarrays.length) - 1);i++){
                                // console.log(`[data-thisisanindimail = "${idarrays[i]}"]`);
                                document.querySelector(`[data-thisisanindimail = "${idarrays[i]}"]`).classList.add('addedtoarchive');
                                setTimeout(function(){}, 450);
                                document.querySelector(`[data-thisisanindimail = "${idarrays[i]}"]`).remove();
                        }
        });
    }
}
function getnotifications(){

    fetch('getnotifications.php',{
        method: 'GET',
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    }).then(response => response.json()).then(data =>{
        // console.log(data);
        var countnoti = 0;
        for(j in data){
            countnoti++;
        }
        var notimaindivheight = "";
        var notimaindivrows = "";
        if(countnoti<=6){
            notimaindivheight = "100%";
            notimaindivrows = "1fr 1fr 1fr 1fr 1fr 1fr";
        }
        else{
            var widthfrac = Math.ceil(countnoti/6);
            for(var fracs =0; fracs<widthfrac;fracs++){
                notimaindivrows+="1fr 1fr 1fr 1fr 1fr 1fr";
            }
           var notimaindivheightno = widthfrac*100;
           notimaindivheight = notimaindivheightno+"%";
        }
        var indinotimain = document.getElementById('notimaindivcont');
        indinotimain.innerHTML = "";
        indinotimain.style.width = notimaindivheight;
        indinotimain.style.gridTemplateRows = notimaindivrows;
        if(countnoti>9){
            document.getElementById('notificationnumber').innerHTML = "9+";
        }
        else{
            document.getElementById('notificationnumber').innerHTML = countnoti;
        }
        for(i in data){
            // console.log(data);
            var currdata = data[i];
            var idninoti = document.createElement('div');
            var idninoticlass = document.createAttribute('class');
            idninoticlass.value = "indinoti";
            idninoti.setAttributeNode(idninoticlass);
            idninoti.innerHTML = currdata['content'];

            var notitime = document.createElement('div');
            var notitimeclass = document.createAttribute('class');
            notitimeclass.value = "notitime";
            notitime.setAttributeNode(notitimeclass);
            notitime.innerHTML = getemailtime(currdata['timesent'],'notitime');
            idninoti.appendChild(notitime);
            indinotimain.appendChild(idninoti);
        }
        

    })
}
function opennotimaindiv(){
    document.getElementById('notimaindiv').classList.toggle('show');
}
function openthefilters(type){
    var emailcontent = document.getElementById('emailcontent');
    var composelabel = document.createElement('div');
    var composelabelclass = document.createAttribute('class');
    var composelabelid = document.createAttribute('id');
    var composelabeldatalid = document.createAttribute('data-lid');
    var composelabeldatalcolor = document.createAttribute('data-lcolor');
    var composelabelonclick = document.createAttribute('onclick');
    composelabelclass.value = "selectedemaillabel";
    composelabelid.value = "filter"+type;
    composelabeldatalid.value = "filter"+type;
    composelabelonclick.value = "changelabel(this)";
    composelabeldatalcolor.value = "#000000";
    composelabel.setAttributeNode(composelabelclass);
    composelabel.setAttributeNode(composelabelid);
    composelabel.setAttributeNode(composelabeldatalid);
    composelabel.setAttributeNode(composelabeldatalcolor);
    composelabel.setAttributeNode(composelabelonclick);
    
    var labeldiv  = document.createElement('div');
            var labeldivclass = document.createAttribute('class');
            var labeldivlid = document.createAttribute('data-closelid');
            labeldivclass.value="labeldiv";
            labeldivlid.value="closefiltertype"+type;
            labeldiv.setAttributeNode(labeldivclass);
            labeldiv.setAttributeNode(labeldivlid);

            var labelname = document.createElement('div');
            var labelnameclass = document.createAttribute('class');
            labelnameclass.value="labellabelname";
            labelname.setAttributeNode(labelnameclass);
            labelname.innerHTML = type;
            
            
            
            
            var labelprop = document.createElement('div');
            var labelpropclass = document.createAttribute('class');
            labelpropclass.value = 'labelname';
            labelprop.setAttributeNode(labelpropclass);
            
            var labelicon = document.createElement('div');
            var labeliconclass = document.createAttribute('class');
            labeliconclass.value = 'labelicon';
            labelicon.setAttributeNode(labeliconclass);
            var mainname = document.createElement('div');
            var mainnameclass = document.createAttribute('class');
            mainnameclass.value = 'mainname';
            mainname.setAttributeNode(mainnameclass);
            
            var newcont = document.createElement('div');
            var newcontclass = document.createAttribute('class');
            newcontclass.value = "newcont";
            newcont.setAttributeNode(newcontclass);

            var sectionwhere = document.createElement('div');
            var sectionwhereclass = document.createAttribute('class');
            var sectionwhereid = document.createAttribute('id');
            sectionwhereclass.value = "sectionwhere";
            sectionwhereid.value = "sectionwhere";
            sectionwhere.setAttributeNode(sectionwhereclass);
            sectionwhere.setAttributeNode(sectionwhereid);
            
            var closetab = document.createElement('div');
            var closetabclass = document.createAttribute('class');
            var closetabid = document.createAttribute('id');
            closetabclass.value = "closetab";
            closetabid.value = "closetab";
            closetab.setAttributeNode(closetabclass);
            closetab.setAttributeNode(closetabid);
            
            var closeicon = document.createElement('div');
            var closeiconclass = document.createAttribute('class');
            var closeicononclick = document.createAttribute('onclick');
            var closeicondataid= document.createAttribute('data-closeiconlid');
            closeicononclick.value = "closelabel(this)";
            closeicondataid.value = "closefiltertype"+type;
            closeiconclass.value = "icon closelabel";
            closeicon.setAttributeNode(closeiconclass);
            closeicon.setAttributeNode(closeicononclick);
            closeicon.setAttributeNode(closeicondataid);
            
            var materialelem = document.createElement('i');
            var materialelemclass = document.createAttribute('class');
            materialelemclass.value="material-icons closelabel";
            materialelem.setAttributeNode(materialelemclass);
            materialelem.innerHTML="close";
            
            var tooltip = document.createElement('div');
            var tooltipclass = document.createAttribute('class');
            tooltipclass.value = "tooltip";
            tooltip.setAttributeNode(tooltipclass);
            tooltip.innerHTML = "Close";
            mainname.appendChild(labelname);
            labelprop.appendChild(mainname);
            labelprop.appendChild(newcont);
            composelabel.appendChild(labelprop);
            composelabel.appendChild(sectionwhere);
            closeicon.appendChild(materialelem);
            closeicon.appendChild(tooltip);
            closetab.appendChild(closeicon);
            labeldiv.appendChild(composelabel);
            labeldiv.appendChild(closetab);

            emailcontent.appendChild(labeldiv);

            createdivforemaildisp('filtertype',"filter"+type);
            var labelselect = document.getElementById('filter'+type);
            changelabel(labelselect);
}
function getfilteredmails(type){
    if(type=="Starred"){
        fetch('getstarredmails.php',{
            method: 'GET',
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
        }).then(response => response.json()).then(data =>{
            // console.log(data);
            appendfiltermails(data,type);
        });
    }
    else if(type == "Sent"){
        fetch('getsentmails.php',{
            method: 'GET',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }).then(response => response.json()).then(data =>{
            // console.log(data);
            appendfiltermails(data,type);
        });
    }
    else if(type == "All mails"){
        fetch('getallthemails.php',{
            method: 'GET',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }).then(response => response.json()).then(data =>{
            // console.log(data);
            appendfiltermails(data,type);
        });
    }
    else if(type == "Spam"){
        fetch('getspammails.php',{
            method: 'GET',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }).then(response => response.json()).then(data =>{
            // console.log(data);
            appendfiltermails(data,type);
        });
    }
    else if(type == "Bin"){
        fetch('getbinmails.php',{
            method: 'GET',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }).then(response => response.json()).then(data =>{
            // console.log(data);
            appendfiltermails(data,type);
        });
    }
}
function appendfiltermails(data,type){
    var showemails = document.getElementById("filtertypeshowemails"+type);
            showemails.innerHTML = "";
                for(indemail in data){
                    var indemaildata = data[indemail];
                    var indemialdiv = document.createElement('div');
                    var indemaildivclass = document.createAttribute('class');
                    var indemaildivdata = document.createAttribute('data-thisisanindimail');
                    indemaildivclass.value = "inboxnolabel";
                    indemaildivdata.value = indemaildata['eid'];
                    indemialdiv.setAttributeNode(indemaildivclass);
                    indemialdiv.setAttributeNode(indemaildivdata);
                    if(indemaildata['eread']==0){
                        indemaildivclass.value = "inboxnolabel notread";
                    }
    
    
                    var indemaildivcontent = document.createElement('div');
                    var indemaildivcontentclass = document.createAttribute('class');
                    indemaildivcontentclass.value = "inboxnolabelcontent";
                    indemaildivcontent.setAttributeNode(indemaildivcontentclass);
                    
                    var mailtitle = document.createElement('div');
                    var mailtitleclass = document.createAttribute('class');
                    mailtitleclass.value = "mailtitle";
                    mailtitle.setAttributeNode(mailtitleclass);
    
                    var sendericon = document.createElement('div');
                    var sendericonclass = document.createAttribute('class');
                    sendericonclass.value = "sendericon";
                    sendericon.setAttributeNode(sendericonclass);
    
                    var sendericoncontent = document.createElement('div');
                    var sendericoncontentclass = document.createAttribute('class');
                    sendericoncontentclass.value = "sendericoncontent";
                    sendericoncontent.setAttributeNode(sendericoncontentclass);
    
                    var imgsender = document.createElement('img');
                    var imgsendersrc = document.createAttribute('src');
                    
                    imgsendersrc.value = "assets/propic/"+indemaildata['ppicsender'];
                    imgsender.setAttributeNode(imgsendersrc);
    
                    sendericoncontent.appendChild(imgsender);
                    sendericon.appendChild(sendericoncontent);
                    mailtitle.appendChild(sendericon);
    
                    var sendername = document.createElement('div');
                    var sendernameclass = document.createAttribute('class');
                    sendernameclass.value = "sendername";
                    sendername.setAttributeNode(sendernameclass);
                    
                    var sendernamecontent = document.createElement('div');
                    var sendernamecontentclass = document.createAttribute('class');
                    sendernamecontentclass.value = "sendernamecontent";
                    sendernamecontent.setAttributeNode(sendernamecontentclass);
                    sendernamecontent.innerHTML = indemaildata['senderfname']+" "+indemaildata['senderlname'];
    
                    sendername.appendChild(sendernamecontent);
                    mailtitle.appendChild(sendername);
    
                    var mailcontent = document.createElement('div');
                    var mailcontentclass = document.createAttribute('class');
                     mailcontentclass.value = "mailcontent";
                     mailcontent.setAttributeNode(mailcontentclass);
                     
                     var mailsubject = document.createElement('div');
                     var mailsubjectclass = document.createAttribute('class');
                     mailsubjectclass.value = "mailsubject";
                     mailsubject.setAttributeNode(mailsubjectclass);
                     
                     var mailsubjectcontent = document.createElement('div');
                     var mailsubjectcontentclass = document.createAttribute('class');
                     var mailsubjectcontentdata = document.createAttribute('data-indiemailsubject');
                     mailsubjectcontentclass.value = "mailsubjectcontent";
                     mailsubjectcontentdata.value = "indiemailsubject"+indemaildata['eid'];
                     mailsubjectcontent.setAttributeNode(mailsubjectcontentclass);
                     mailsubjectcontent.setAttributeNode(mailsubjectcontentdata);
                     if(indemaildata['title']==""){
                        mailsubjectcontent.innerHTML = "&lt;No Subject&gt;";
                     }
                     else{
                         mailsubjectcontent.innerHTML = indemaildata['title'];
                        }
                     
                     mailsubject.appendChild(mailsubjectcontent);
                     mailcontent.appendChild(mailsubject);
                     
                     var mailbody = document.createElement('div');
                     var mailbodyclass = document.createAttribute('class');
                      mailbodyclass.value = "mailbody";
                      mailbody.setAttributeNode(mailbodyclass);
                      
                      var mailbodycontent = document.createElement('div');
                      var mailbodycontentclass = document.createAttribute('class');
                      mailbodycontentclass.value = "mailbodycontent";
                      mailbodycontent.setAttributeNode(mailbodycontentclass);
                      var bodycontent = indemaildata['body'];
    
                      var samplebody = document.createElement('div');
                      samplebody.innerHTML = bodycontent;
                      var contentchilds = samplebody.childNodes;
                       gettextonlybody(contentchilds);
                        // console.log(textonlybody);
                        var textonly = "";
                        for(var i=0;i<textonlybody.length;i++){
                           textonly = textonly + textonlybody[i].data + "<br>"
                        }
                      mailbodycontent.innerHTML = textonly;
                      textonlybody = [];
                      textonlyindex = 0;
                      mailbody.appendChild(mailbodycontent);
                      mailcontent.appendChild(mailbody);
                      
                      var mailcontrols = document.createElement('div');
                      var mailcontrolsclass = document.createAttribute('class');
                       mailcontrolsclass.value = "mailcontrols";
                       mailcontrols.setAttributeNode(mailcontrolsclass);
    
                       var timelapse = document.createElement('div');
                       var timelapseclass = document.createAttribute('class');
                       var timelapseid = document.createAttribute('id');
                       timelapseclass.value = "timeelaps";
                       timelapseid.value = "timeid"+indemaildata['eid'];
                       timelapse.setAttributeNode(timelapseclass);
                       timelapse.setAttributeNode(timelapseid);
                       
                       var openmailbtn = document.createElement('div');
                       var openmailbtnclass = document.createAttribute('class');
                       openmailbtnclass.value = "openmailbtn";
                       openmailbtn.setAttributeNode(openmailbtnclass);
                       
                       var openmailbtnbtn = document.createElement('div');
                       var openmailbtnbtnclass = document.createAttribute('class');
                       var openmailbtnonclick = document.createAttribute('onclick');
                       openmailbtnbtnclass.value = "openmailbtnbtn";
                       openmailbtnonclick.value = "openmail("+indemaildata['eid']+")";
                       openmailbtnbtn.setAttributeNode(openmailbtnbtnclass);
                       openmailbtnbtn.setAttributeNode(openmailbtnonclick);
                       openmailbtnbtn.innerHTML = "Open Mail";
                       
                       openmailbtn.appendChild(openmailbtnbtn);
                       mailcontrols.appendChild(timelapse);
                       mailcontrols.appendChild(openmailbtn);
                       
                       var threedot = document.createElement('div');
                       var threedotclass = document.createAttribute('class');
                       threedotclass.value = "threedotcontrol";
                       threedot.setAttributeNode(threedotclass);
                       
                       var checkbox = document.createElement('div');
                       var checkboxclass = document.createAttribute('class');
                       var checkboxonclick = document.createAttribute('onclick');
                       var checkboxdata = document.createAttribute('data-selectedemailcheckbox');
                       checkboxclass.value = "selectedemailcheckbox";
                       checkboxonclick.value = "selectthemailforcontrols(this)";
                       checkboxdata.value = indemaildata['eid'];
                       checkbox.setAttributeNode(checkboxclass);
                       checkbox.setAttributeNode(checkboxonclick);
                       checkbox.setAttributeNode(checkboxdata);
    
                       var checkboxtickmark = document.createElement('div');
                       var checkboxtickmarkclass = document.createAttribute('class');
                       checkboxtickmarkclass.value="selectedemailcheckboxtickmark";
                       checkboxtickmark.setAttributeNode(checkboxtickmarkclass);
    
                       checkbox.appendChild(checkboxtickmark);
    
                       threedot.appendChild(checkbox);
                       mailcontrols.appendChild(threedot);
                       
                       indemaildivcontent.appendChild(mailtitle);
                       indemaildivcontent.appendChild(mailcontent);
                       indemaildivcontent.appendChild(mailcontrols);
                       indemialdiv.appendChild(indemaildivcontent);
                       showemails.appendChild(indemialdiv);
                    //    console.log(indemaildata['time']);
                       
                    }
                    for(var fortime=0;fortime<Object.keys(data).length;fortime++){
                    (function(fortime){
                        var fortimedata = data[fortime];
                        getemailtime(fortimedata['time'],"timeid"+fortimedata['eid']);
                        setInterval(function(){
                            getemailtime(fortimedata['time'],"timeid"+fortimedata['eid']);
                        },60000)
                    })(fortime);
                    
                }
}
function modifyexistlabel(){
    document.getElementsByClassName('createmodal')[0].style.display = "none";
    document.getElementsByClassName('modifylabelmodal')[0].style.display = "grid";
}