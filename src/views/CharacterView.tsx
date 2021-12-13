import * as React from 'react'
import { getCharacterById,getComicsByCharacterId } from '../api/api';
import { useLocation  } from "react-router-dom";
import CharacterCard from '../components/cards/CharacterCard';
import { Button, IconButton ,Tooltip} from '@material-ui/core';
import ComicsCard from '../components/cards/ComicsCard';
import KeyboardTabIcon from '@material-ui/icons/KeyboardTab';
import { useNavigate  } from "react-router-dom";
import './styles/CharacterView.css'; 

const CharacterView = () => {
    const {state} = useLocation();
    const { id,searchData } = state; // Read values passed on state
    const [Character, setCharacter] = React.useState<any>("");
    const [Comics, setComics] = React.useState<any>("");
    const [ShowComicsButton, setShowComics] = React.useState<boolean>(true);
    const [Description, setDescription] = React.useState<any>("");
    const navigate = useNavigate();
   

     React.useEffect(() => {    
        (async () => {  
            await getCharacterById(id)
            .then((data) => {      
                // set charecters list 
                setCharacter(data[0]);    
               
              })
              .catch((err) => {
               console.log("Error!")
              });;})();
    }, [id]);

  // use effect for Character
  React.useEffect(() => {
    var desc = Character.description ? Character.description : "Missing description";
    setDescription(desc); // This is be executed when the state changes
    }, [Character]);

    

    const getComics = () =>{
        getComicsByCharacterId(id)
        .then((data) => {    
            // set comics list   
            setComics((data))
            // show the comics cards
            setShowComics(false)
          })
          .catch((err) => {
           console.log("Error!")
          });;
    }

    if(Character != null){
    return(
         <div>
             <div className="grid-container">
             <Tooltip title="backward" >                                            
               <IconButton color="secondary" aria-label="backward" className="backwardBtn" onClick={() => { navigate('/app/dashboard', {state:{searchData}}) }}>
               <KeyboardTabIcon />
             </IconButton>
             </Tooltip>
             </div>

             <div className="CharacterCard-Container">
                 <div className="CharacterCard">
                 <CharacterCard
                  key={Character.id}
                  name={Character.name}
                  thumb={(Character.thumbnail)}
                  description = {Character?.description || "meida" }  />
                </div>
                <div className="DescriptionCard">
                <h4>{Description}</h4>
                </div>
              </div>

               <div className="comicsBtns-container">     
                {ShowComicsButton ?( 
                <Button variant="contained" color="secondary" className="ComicsBtn" onClick={() => { getComics() }}>
                    Show Comics...
                </Button>) : 
                <Button variant="contained" color="secondary" className="ComicsBtn" onClick={() => { setComics("") ; setShowComics(true) }}>
                  Hide Comics
               </Button>}
               </div>

                {Comics.length > 0 ? (
                    Comics.map((comic: any) => (
                <ComicsCard
                  key={comic.id}
                  title={comic.title}
                  thumb={comic.thumbnail}
                  description ={comic.description }   
                />))) : ''}      
         </div>
    )}
    else{ return(<div></div>)}
}

export default CharacterView;