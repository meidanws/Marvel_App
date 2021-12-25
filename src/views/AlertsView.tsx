import * as React from 'react'
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import BasicAlerts from '../components/Alerts/BasicAlerts';
import AdvancedAlerts from '../components/Alerts/AdvancedAlerts';
import './styles/AlertsView.css'
import { useEffect } from 'react';
import ConfigData from '../data/alertsConfigData.json'
import User from '../data/User';

const AlertsView = () => {
// Alerts view states
const [openPopup, setOpenPopup] = React.useState(false);
const userId = localStorage.getItem("user");
const [isSaveDisabled, setSaveDisabled] = React.useState(true);
const localData = localStorage.getItem('configData');

// basic states 
const [dailyHealthTime, setDailyHealthTime] = React.useState<Date>(new Date(),);
const [dailyReportCheckd, setDailyReportCheckd] = React.useState<boolean>(false);
const [monitorserviceTime, setMonitorserviceTime] = React.useState<number>(0);

// advanced states 
const [weeklyDiskSpacechecked, setWeeklyDiskSpace] = React.useState<boolean>(false);
const [diskSpaceTime, setDiskSpaceTime] = React.useState<string >("07:00");
const [diskSpaceDate, setSDiskSpaceDate] = React.useState<Date>(new Date());
const [GBChecked, setGBChecked] = React.useState<boolean>(false);
const [percentageChecked, setPercentageChecked] = React.useState<boolean>(false);
const [GBValue, setGBValue] = React.useState<number>(0);
const [precentegeValue, setPrecentegeValue] = React.useState<number>(0);

useEffect(() => {  
  // update last settings from "server"
    getDataFromServer();
}, [localData]);

const getDataFromServer = () => {
  if(User.userId.toString() === userId){  
    // get data from configuration or from localhost
  var data = localData != null ? JSON.parse(localData) : ConfigData;  
   data.map(function(config : any){
        if(config.userId === User.userId){    
          // set basic config
          if(User.permissions.includes(1)){    
           setDailyHealthTime(getDateFromHours(config.basicSettings.time))
           setDailyReportCheckd(config.basicSettings.dailyHealth)
           setMonitorserviceTime(config.basicSettings.monitorTime)
          }
          // set advanced config
          if(User.permissions.includes(2)){   
            setDailyReportCheckd(config.advancedSettings.weeklyDiskSpace)
            setDiskSpaceTime(config.advancedSettings.time)
            setSDiskSpaceDate(new Date(config.advancedSettings.date))
            setGBChecked(config.advancedSettings.GB)
            setGBValue(config.advancedSettings.GBValue)
            setPercentageChecked(config.advancedSettings.precentege)
            setPrecentegeValue(config.advancedSettings.precentegeValue)
           }
        }
    })   
  }  
}

function getDateFromHours(time: any) {
  time = time.split(':');
  let now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate(), ...time);
}

 const handleDailyChanged = (newValue:boolean) =>{
  setDailyReportCheckd(newValue)
  setSaveDisabled(false)
 } 

const handleBasicDateChange = (date: Date) => {
  setDailyHealthTime(date);
  setSaveDisabled(false)
};

const handleMonitorserviceTime = (value:number) => {
  setMonitorserviceTime(value);
  setSaveDisabled(false)
};

const handleWeeklyChecked =(newValue:boolean) =>{
  setWeeklyDiskSpace(newValue)
  setSaveDisabled(false)
}

const handleDiskSpaceDataChanged =(date: Date) =>{
  setSDiskSpaceDate(new Date(date))
  setSaveDisabled(false)
}

const handleDiskSpaceTimeChanged =(date: string) =>{
  console.log(date)
  setDiskSpaceTime(date)
  setSaveDisabled(false)
}


const handleGBCheckedChanged =(newValue:boolean) =>{
  setGBChecked(newValue)
  setPercentageChecked(!newValue)
  setSaveDisabled(false)
}

const handlePercentageCheckedChanged =(newValue:boolean) =>{
  setPercentageChecked(newValue)
  setGBChecked(!newValue)
  setSaveDisabled(false)
}

const handleGBValueChanged =(newValue:number) =>{
  if(newValue != null){
  setGBValue(newValue)
  setSaveDisabled(false)
}
}


const handlePercentageValueChanged =(newValue:number) =>{
  setPrecentegeValue(newValue)
  setSaveDisabled(false)
}

const handleSaveButton = () => {
  // save all changes into server
  SaveChangesToDB();
  // open success popup message
  handleOpenPopout();
};

const SaveChangesToDB = async() => {
  ConfigData.map(function(config){
    if(config.userId === User.userId){  
      // save basic data
      if(User.permissions.includes(1)){    
      config.basicSettings.dailyHealth = dailyReportCheckd;
      config.basicSettings.monitorTime = monitorserviceTime;
      config.basicSettings.time = dailyHealthTime.getHours().toString();
      }
      // save advanced data
      if(User.permissions.includes(2)){
        config.advancedSettings.weeklyDiskSpace = weeklyDiskSpacechecked;
        config.advancedSettings.time =  diskSpaceTime
        config.advancedSettings.date =  diskSpaceDate.toString()
        config.advancedSettings.GB = GBChecked
        config.advancedSettings.precentege = percentageChecked 
        config.advancedSettings.GBValue = GBValue
        config.advancedSettings.precentegeValue = precentegeValue
      }
    }
})   
  // save new data into localstorage 
  localStorage.setItem('configData', JSON.stringify(ConfigData));
};

const handleDiscardlButton = () => {
  // reverte all changes
  getDataFromServer();
  // disable save button
  setSaveDisabled(true)
};

const handleOpenPopout = () => {
  setOpenPopup(true);
};

const handleClosePopout = () => {
  setOpenPopup(false);
};

    return (
        <div > 
         {/* Basic section area...  */}   
         {User?.permissions.includes(1)? (
            <BasicAlerts
             dailyChanged={handleDailyChanged} basicDateChange={handleBasicDateChange} monitorserviceTime={handleMonitorserviceTime}
             isChecked={dailyReportCheckd} time={dailyHealthTime} monitorTime={monitorserviceTime}/>  
            )  : null }     

        {/* Advanced section area... */}
        {User?.permissions.includes(2)? (
           <AdvancedAlerts
            WeeklyChecked={handleWeeklyChecked} diskSpaceDataChanged={handleDiskSpaceDataChanged} diskSpaceTimeChanged={handleDiskSpaceTimeChanged} 
            GBCheckedChanged={handleGBCheckedChanged} PercentageCheckedChanged={handlePercentageCheckedChanged} GBValueChanged={handleGBValueChanged} PercentageValueChanged={handlePercentageValueChanged}
            isWeeklyChecked={weeklyDiskSpacechecked} diskSpaceDate={diskSpaceDate} diskSpaceTime={diskSpaceTime} GBChecked={GBChecked} PercentageChecked={percentageChecked}
            GBValue={GBValue} precentegeValue={precentegeValue}
           />
            )  : null }     
        
          
        {/* buttons */}
        <div className="buttons-container">
        <Button variant="contained" color="secondary" onClick={handleSaveButton} disabled={isSaveDisabled}>Save</Button>
        <Button variant="contained" color="secondary" onClick={handleDiscardlButton} disabled={isSaveDisabled}>Discard</Button>
        </div>


        {/* popoup */}

        <Snackbar open={openPopup} autoHideDuration={5000} onClose={handleClosePopout}>
          <Alert onClose={handleClosePopout} severity="success">
           Alerts settings saved
          </Alert>
         </Snackbar>

       </div>
      );
    }
  
export default AlertsView;


