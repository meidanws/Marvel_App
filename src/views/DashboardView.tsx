import * as React from 'react'
import SearchBar from "material-ui-search-bar";
import './styles/DashboardView.css'; 
import {getCharacterByName } from '../api/api';
import CharacterCard from '../components/cards/CharacterCard'
import Button from '@material-ui/core/Button';
import { useNavigate,useLocation  } from "react-router-dom";
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import Alert from '@material-ui/lab/Alert';


const Dashboard = () => {

const [SearchValue, setState] = React.useState<string>("");
const [CharactersList, setCharactersList] = React.useState<any>("");
const [ShowItems, setShowItems] = React.useState<number>(3);
const navigate = useNavigate();
const {state} = useLocation();
const [openPopup, setOpenPopup] = React.useState(false);


 React.useEffect( () => {  
    if(state != null){
      const {searchData} = state; // Read values passed on state
     
      // set the previus data as search text value
      setState(searchData);
      }
    },[state])

  // use effect for SearchValue
  React.useEffect(() => {
    handleSearchEvent(); // This is be executed when the state changes
    }, [SearchValue]);

// Search event
const handleSearchEvent = async () => { 
  // initalize the showed items
  setShowItems(3);
  // get character by search name
  if(SearchValue !== ""){
  await getCharacterByName(SearchValue)
    .then((data) => {
       
      setCharactersList(data);
      // show popup if there is no results
      if(data.length === 0){
        handleOpenPopout();
      }
    })
    .catch((err) => {
     console.log("Error!")
    });}else{
      setCharactersList([])

    }
}

const HandleClickCharacter = (id : any) =>{
  localStorage.setItem('searchField', SearchValue);
  var searchData = SearchValue;
  navigate('/views/CharacterView', { state: {id,searchData} }) ;
}

const handleShowMore = () => {
  setShowItems(
    ShowItems + 3
  )
}

const handleOpenPopout = () => {
  setOpenPopup(true);
};

const handleClosePopout = () => {
  setOpenPopup(false);
};
  
    return (
        <div > 
         {/* Search bar...  */}   
         <div className="SearchBar-container">
          <div className="SearchBar">
           <SearchBar 
            value = {SearchValue}
            placeholder={'Search character name...'}
            onChange={(newValue) => {setState(newValue) } }
            onRequestSearch={() => handleSearchEvent()}
           />
          </div>
          </div>

           {/* Result Area... */}
           
          {CharactersList.length > 0 ? (
            CharactersList.filter((item: any, index: number) => index < ShowItems).map((character: any) => (
              <div className="characters_list" onClick={() => { HandleClickCharacter(character.id)}}> 
                <CharacterCard
                  key={character.id}
                  name={character.name}
                  thumb={character.thumbnail}
                  description ={character.description }   
                /> </div>
              ))    
            )
             : null
          }     
         
        

          {/* show more results button */}
        <div className="ShowMoreButton">
            {CharactersList.length > ShowItems ? 
             <Button variant="contained" color="secondary" onClick={() => { handleShowMore() }}>
                Show More...
             </Button> : null}
        </div>
           
           {/* no results popoup */}
        <Snackbar open={openPopup} autoHideDuration={6000} onClose={handleClosePopout}>
        <Alert onClose={handleClosePopout} severity="error">
         There is no results for this search!
        </Alert>
      </Snackbar>
       </div>
      );
    }
  
export default Dashboard;