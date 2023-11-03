

function formsumit(e){
    e.preventDefault();
    return fetch("http://localhost:9090/update",{
        method:"put",
        headers:{"content-type":'application/json'},
        body:JSON.stringify({
            id:document.querySelector("#myform input[name=id]").value,
            newname:document.querySelector( "#myform input[name=newname]").value,
        }),
    })
    .then((response)=>response.json())
    .then((data)=>alert("new updat"));
}
document.getElementById("myform").addEventListener("submit",formsumit)
function deleteuser(e){
    e.preventDefault();
    alert("new DELET");
    return fetch("http://localhost:9090/delete",{
        method:"DELETE",
        headers:{"content-type":'application/json'},
        body:JSON.stringify({
            did:document.querySelector("#didform input[name=did]").value,
           
        }),
    })
    
}
document.getElementById("didform").addEventListener("submit",deleteuser)