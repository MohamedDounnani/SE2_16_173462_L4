//SCRIPT CHE CONTROLLA LA VALIDAZIONE DEI FORM PRIMA DI INVIARLI AL SERVER

function Controllo() {
    // Variabili associate ai campi del modulo
    var id = document.FormInsert.id.value;
    var level = document.FormInsert.level.value;
    var salary = document.FormInsert.salary.value;
    var name = document.FormInsert.name.value;
    var surname = document.FormInsert.surname.value;
   
      
    //Effettua il controllo sul campo ID
    if (isNaN(id)) {
        if(id=!""){
        alert("Il campo ID deve essere di tipo numerico");
        document.FormInsert.id.focus();
        return false;
        }
    }
     //Effettua il controllo sul campo NAME
    else if (!isNaN(name)) {        
        alert("Il campo NAME deve essere di tipo stringa");
        document.FormInsert.surname.focus();
        return false;
        }
     //Effettua il controllo sul campo SURNAME
    else if (!isNaN(surname)) {        
        alert("Il campo SURNAME deve essere di tipo stringa");
        document.FormInsert.surname.focus();
        return false;
        }
    //Effettua il controllo sul campo LEVEL
    else if (isNaN(level)) {        
        alert("Il campo LEVEL deve essere di tipo numerico");
        document.FormInsert.level.focus();
        return false;
        }
    //Effettua il controllo sul campo SALARY
    else if (isNaN(salary)) {        
        alert("Il campo SALARY deve essere di tipo numerico");
        document.FormInsert.salary.focus();
        return false;
        }
    
    
    //INVIA IL MODULO
    else {
        document.FormInsert.action = "http://127.0.0.1:1337/insert";
        document.FormInsert.submit();
    }
}
                      