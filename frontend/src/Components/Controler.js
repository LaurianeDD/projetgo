import React,{useState} from 'react';
import Formulaire from './Formulaire';
import AfficherMessage from './AfficherMessage';
import SpaceMembre from './SpaceMembre';
import 'bootstrap/dist/css/bootstrap.min.css';
import AjouterProjet from "./AjouterProjet";

function Controler(){
    const [pageNumber, setPageNumber] = useState(1);
    const [memberSpecific, setMemberSpecific]=useState('');
    switch(pageNumber){
        case 1:
            return(
                <Formulaire setPageNumber={setPageNumber} setMemberSpecific={setMemberSpecific}/>
            );
        case 2:
            return(
                <div>
                    <AfficherMessage setPageNumber={setPageNumber} setMemberSpecific={setMemberSpecific}memberSpecific={memberSpecific}/>

                </div>
            );
        case 3:
            return(
                <div>
                    <SpaceMembre setPageNumber={setPageNumber} memberSpecific={memberSpecific}/>
                    <AjouterProjet memberSpecific={memberSpecific}/>
                </div>
            );
        }

}

export default Controler;