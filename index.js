//Libraries (default)
var http = require('http');

//for templates
var bind = require('bind');
//express lib
var express = require('express');
//inspect
var util = require('util');

//instantiate express
var app = express();
var OnOff = false;


//POST
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/' , function(req,res){
    res.sendFile('client.html' , {root: __dirname})
    });

app.get('/style.css' , function(req,res){
    res.sendFile('style.css' , {root: __dirname})
    });
app.get('/index.js' , function(req,res){
    res.sendFile('index.js' , {root: __dirname})
    });
app.get('/control.js' , function(req,res){
    res.sendFile('control.js' , {root: __dirname})
    });
app.set('port', (process.env.PORT || 1337));

//variabili
var id;
var name;
var surname;
var salary;
var level;
//Array Utilizzati
var array0 = new Array();
var array1 = new Array();
//Variabile per l'incremento di id
var countid= parseInt(0);

app.use('/insert', function(request, response) 
{
    //set the headers of the responce
    var headers = {};
    var text = "";
    //answer
    headers["Content-Type"] = "text/html";
    response.writeHead(200, headers);
	var text = '';

	if ( typeof request.body !== 'undefined' && request.body){
    //if query is defined and not null
		if (typeof request.body.name !== 'undefined' && typeof request.body.surname !== 'undefined' &&
            typeof request.body.level !== 'undefined' && typeof request.body.salary !== 'undefined'){
            //save content of username
            
            if(typeof request.body.id !== 'undefined' && request.body.id=="" ){
                
                array1[0]=parseInt(countid)+1;
                
                countid=parseInt(array1[0]);
                array1[1]=request.body.name;
                array1[2]=request.body.surname;
                array1[3]=request.body.level;
                array1[4]=request.body.salary;
                array0.push({id: array1[0], name: array1[1], surname: array1[2], level: array1[3],
                                 salary: array1[4]});
            }
            else{
                
                for(i=0;i<array0.length;i++){
                    if(request.body.id==array0[i].id){
                    array1[0]=request.body.id;
                    countid=array1[0];
                    array1[1]=request.body.name;
                    array1[2]=request.body.surname;
                    array1[3]=request.body.level;
                    array1[4]=request.body.salary;
                    array0[i]=({id: array1[0], name: array1[1], surname: array1[2], level: array1[3],
                             salary: array1[4]});  
                    
                        
                    }
                    
                
                }
                if(typeof request.body.id !== 'undefined'){
                    
                    array1[0]=request.body.id;
                    countid=array1[0];
                    array1[1]=request.body.name;
                    array1[2]=request.body.surname;
                    array1[3]=request.body.level;
                    array1[4]=request.body.salary;
                    array0.push({id: array1[0], name: array1[1], surname: array1[2], level: array1[3],
                                 salary: array1[4]});
                    array0.sort();
                }
              }
                
                 
                response.end("<h1>Elemento aggiunto con successo</h1><p><form action=\"http://127.0.0.1:1337\"\"><input type=\"submit\"  value=\"Torna Indietro\"></form</p>");
        
        }
	
    }
	else{
		text = "body undefined";
	}
 
   
  
    
});
app.use('/search', function(request, response){
    //set the headers of the responce
    var headers = {};
    var valore = parseInt(0);
    var text = "";
    //answer
    headers["Content-Type"] = "text/html";
    response.writeHead(200, headers);
    var text = '';

	if ( typeof request.body !== 'undefined' && request.body)
	{
    //if query is defined and not null
		
	   if(typeof request.body.search_id !== 'undefined'){
        if(array0.length==0){
            bind.toFile('tpl/home.tpl', {
                        //set up parameters
                        id: "",
                        name: "",
                        surname :"",
                        level: "",
                        salary: ""
        
                    }, 
                            function(data) {
                                
                                response.end(data);
                                
                            });
            
        }
        else{
        for(i=0; i<array0.length;i++){
            if(request.body.search_id==array0[i].id){
                               
               bind.toFile('tpl/home.tpl', {
                        //set up parameters
                        id: array0[i].id,
                        name: array0[i].name,
                        surname : array0[i].surname,
                        level: array0[i].level ,
                        salary: array0[i].salary 
        
                    }, 
                            function(data) {
                                
                                response.end(data);
                                
                            });
            }
            else{
                
               valore=parseInt(valore)+1;
                
                 if(valore==array0.length){
                     valore=0;
                    
                     bind.toFile('tpl/home.tpl', {
                        //set up parameters
                        id: "",
                        name: "",
                        surname :"",
                        level: "",
                        salary: ""
        
                    }, 
                            function(data) {
                                
                                response.end(data);
                                
                            });
                    
           }
            }
        }
        }
       }

    }
	else
	{
		text = "body undefined";
	}
   
    
  
    
});
app.use('/delete', function(request, response) {
    //set the headers of the responce
    var headers = {};
    var valore = parseInt(0);
    var text ="";
    //answer
    headers["Content-Type"] = "text/html";
    response.writeHead(200, headers);
    

	if ( typeof request.body !== 'undefined' && request.body)
	{
    if(array0.length==0){
            response.end("<h1>DataBase Vuoto</h1><p><form action=\"http://127.0.0.1:1337\"\"><input type=\"submit\"  value=\"Torna Indietro\"></form</p>");
            
        }
    //if query is defined and not null
		
       
	   if(typeof request.body.delete_id !== 'undefined'){         
        for(i=0; i<array0.length;i++){            
            if(request.body.delete_id==array0[i].id){
                array0.splice(i,1);
                response.end("<h1>Elemento eliminato</h1><p><form action=\"http://127.0.0.1:1337\"\"><input type=\"submit\"  value=\"Torna Indietro\"></form</p>");
            }
            else{                
               valore=parseInt(valore)+1;                
                 if(valore==array0.length){
                     valore=0;                    
                     response.end("<h1>Elemento non presente</h1><p><form action=\"http://127.0.0.1:1337\"\"><input type=\"submit\"  value=\"Torna Indietro\"></form</p>");                    
           }
            }          
            
         }   
    }
 
    }
	else
	{
		text = "body undefined";
	}
   
 
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
 
function insertButton(){
    document.getElementById("id_id").style.display = 'block';
    document.getElementById("id_name").style.display = 'block';
    document.getElementById("id_surname").style.display = 'block';
    document.getElementById("id_level").style.display = 'block';
    document.getElementById("id_salary").style.display = 'block';
    document.getElementById("id_upload").style.display = 'block';
    
    document.getElementById("insert_button").addEventListener("click", OnOFF);
    
}
function OnOFF(){
    if(OnOff==false){
        document.getElementById("id_id").style.display = 'block';
        document.getElementById("id_name").style.display = 'block';
        document.getElementById("id_surname").style.display = 'block';
        document.getElementById("id_level").style.display = 'block';
        document.getElementById("id_salary").style.display = 'block';
        document.getElementById("id_upload").style.display = 'block';  
        OnOff=true;
        return;
        
    }
    if(OnOff=true){
        document.getElementById("id_id").style.display = 'none';
        document.getElementById("id_name").style.display = 'none';
        document.getElementById("id_surname").style.display = 'none';
        document.getElementById("id_level").style.display = 'none';
        document.getElementById("id_salary").style.display = 'none';
        document.getElementById("id_upload").style.display = 'none';   
        OnOff=false;
        return;
    }
    
}


