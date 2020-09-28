import React,{useState} from 'react';
import Formulaire from './Formulaire';
import AfficherMessage from './AfficherMessage';
import SpaceMembre from './SpaceMembre';
import 'bootstrap/dist/css/bootstrap.min.css';

function Controler(){
    const [pageNumber, setPageNumber] = useState(1);
    const membres = [
        {emailDataBase:"pepito@gmail.com", passwordDataBase:"pepito",name:"Pepito",lastName:"Perez",photo:"", status:"membre",
            adresse:"4657 Boulevard Saint Denis", codePostal: "H2J 2L5", ville: "Montreal", province:"Quebec",pays:"Canada"},
        {emailDataBase:"lolita@gmail.com",passwordDataBase:"lolita",name:"Lolita",lastName:"Flores", photo:"", status:"benevole",}
    ];
    const [memberSpecific, setMemberSpecific]=useState('');
    switch(pageNumber){
        case 1:
            return(
                <Formulaire membres={membres} setPageNumber={setPageNumber} setMemberSpecific={setMemberSpecific}/>
            );
        case 2:
            return(
                <div>
                    <AfficherMessage setPageNumber={setPageNumber} memberSpecific={memberSpecific}/>

                </div>
            );
        case 3:
            return(
                <SpaceMembre setPageNumber={setPageNumber} memberSpecific={memberSpecific}/>
            );
        }

}

export default Controler;