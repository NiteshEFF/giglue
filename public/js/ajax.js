/**
 * Created by niteshkumar on 04/03/17.
 */
window.addEventListener("load",(e)=>{
    Ajax.main();
});
let Ajax = {
    main()
    {
        let submit = document.querySelector('input[type="submit"]');
            submit.addEventListener("click",(e)=>{
            e.preventDefault();
            this.sendRequest();
       });
    },
    sendRequest()
    {
        let name = document.querySelector('input[value="Name"]').value;
        let email = document.querySelector('input[value="Email"]').value;
        let mob = document.querySelector('input[value="Telephone"]').value;
        let message = document.querySelector('textarea').value;
        this.ajaxRequest(name,email,mob,message);

    },
    ajaxRequest(name,email,mob,message)
    {
        let xhr=new XMLHttpRequest();
        xhr.addEventListener("load",(e)=>{

        });
        xhr.addEventListener("progress",(e)=>{

        });
        console.log(xhr);
        xhr.open("POST","http://localhost:3000/sendMessage",true);
        xhr.setRequestHeader("Content-type","application/json");
        xhr.setRequestHeader("X-Requested-With","XMLHttpRequest");
        xhr.send(JSON.stringify({name,email,mob,message}));
    }
};
let Request=
    {
        req:'',
        url:'',
        method:'',
        out:{},
        encoding:'',
        timeOut:2000,
        encType:{
            urlEncode:"application/x-www-form-urlencoded",json:"application/json",form:"multipart/form-data"
                },
        createRequest(callback)
         {
          let xhr=new XMLHttpRequest();
             xhr.onreadystatechange=(e)=>{
                 switch(xhr.readyState)
                        {
                            case 0:callback.open(xhr);
                            break;
                            case 1:callback.loading(xhr);
                            break;
                            case 2:callback.progress(xhr);
                            break;
                            case 3:callback.progress(xhr);
                            break;
                            case 4:callback.load(xhr);
                            break;
                            default:callback.error(-1);
                            break;
                        }
             };
             xhr.ontimeout=(e)=>{
                 alert("Timed out");
             };
             xhr.open(this.method,this.url,true);
             xhr.timeout=this.timeOut;
             if(this.encoding=="")
             {
                 xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
                 xhr.setRequestHeader("X-Requested-With","XMLHttpRequest");
                 xhr.send(this.req);
             }
            else if(this.encoding=="json")
            {
                xhr.setRequestHeader("Content-type",this.encType.json);
                xhr.setRequestHeader("X-Requested-With","XMLHttpRequest");
                xhr.send(JSON.stringify(this.req));
            }
            else if(this.encoding=="form")
            {
                xhr.setRequestHeader("X-Requested-With","XMLHttpRequest");
                xhr.send(this.req);
            }
         },
        setRequest()
        {
            let string='';
            for(let i=1;i<=arguments.length;i++)
            {
                string+='request'+i+'='+arguments[i-1]+'&'
            }
        this.req=string.substr(0,string.length-1);
        }
    };
