let currentPage=1; 
let totalPages; 

function getUsers (page){
    fetch('https:/reqres.in/api/users?pages=' +page, {
        method:'GET' 
    })
    
    .then(function(responseText){
       
        if (responseText.status !==200){
            throw 'responseText.status'; 
        }
        return responseText.json();
         
    }) 
   
    .then(function(responseData){
        console.log (responseData);
        
    
        const fragment = document.createDocumentFragment(); 

           
        responseData.data.forEach(element => {
            let li=document.createElement('li');
            li.textContent=`${element.email}  ${element.last_name}`;  
            
            fragment.appendChild(li);
        });


document.getElementById('list').innerHTML=" ";

        
        document.getElementById('list').appendChild(fragment);

        totalPages=responseData.total_pages; 
    })
    .catch (function(error){
        if (error==404){
        let p=document.createElement('p');
        p.textContent="Page Not Found";
        p.style.color='red';
    
        document.getElementById('apiUsers').appendChild(p);
    
        }else if(error==500){
        let p=document.createElement('p');
        p.textContent="server error";
        p.style.color='blue';
    
    
        }else{
            console.log (error);
          }    
        
        
       
    })     

}
document.getElementById('preview').addEventListener('click', function(){
    if(currentPage==1){
return;

    }
 currentPage -= 1;   
 getUsers(currentPage); 
})         
document.getElementById('next').addEventListener('click', function(){
    if(currentPage==totalPages){
        return;
    }
    currentPage += 1;   
    getUsers(currentPage); 
   })         

getUsers(currentPage);


//second div

function renderlogic(){


    let returnedResponse=this.responseText;
    let responseDataAsObject=JSON.parse(returnedResponse);


    let ul=document.createElement('ul');

    responseDataAsObject.data.forEach(item => {
        let li=document.createElement('li');

        let img= document.createElement('img');
        img.src=item.avatar;
    
        li.appendChild(img);
        
    
        

        li.textContent=`${item.id} ${item.first_name} ${item.avatar}`


        ul.appendChild(li);

    })   

    document.getElementById('apiUsers2').appendChild(ul);

    } 
 
    let requist=new XMLHttpRequest();
    requist.addEventListener('load', renderlogic);
    requist.open('GET','https:/reqres.in/api/users?pages=1');
    requist.send();



  

           
    
    
    