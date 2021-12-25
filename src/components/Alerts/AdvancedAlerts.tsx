import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {KeyboardDatePicker,MuiPickersUtilsProvider} from '@material-ui/pickers';
import '../styles/Alerts.css'
import DateFnsUtils from '@date-io/date-fns';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';

export default function AdvancedAlerts(props :any) {

  return (
    <div className="root">
      <Accordion className="accordion" defaultExpanded >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header">
        <Typography className="heading">Advanced</Typography>
        </AccordionSummary>
        <AccordionDetails className="accordionDetails">
          <p>Server data disk space</p>
          <FormControlLabel
             control={<Checkbox checked={props.isWeeklyChecked} onChange={e => props.WeeklyChecked(e.target.checked)} name="checkedA" />}
              label="Send weekly disk space alert at "/>
              
            <MuiPickersUtilsProvider utils={DateFnsUtils} >
              
          <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"  
          className="timePicker"
          id="date-picker-inline"
          value={props.diskSpaceDate}
          onChange={props.diskSpaceDataChanged}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
         </MuiPickersUtilsProvider>

         <TextField
            id="time"
            className="timePicker"
            type="time"
            value={props.diskSpaceTime}
            onChange={e => props.diskSpaceTimeChanged(e.target.value)}
            defaultValue="07:30"
            InputLabelProps={{
            shrink: true,}} 
            inputProps={{ step: 300, // 5 min
             }}/> 
           when disk space has droped below:
           <div> 
           <Checkbox checked={props.GBChecked} onChange={e => props.GBCheckedChanged(e.target.checked)} name="checkedA" />     
            <TextField onChange={e => props.GBValueChanged(e.target.value)} value={props.GBValue}
             id="standard-start-adornment"
             InputProps={{endAdornment: <InputAdornment position="end">GB</InputAdornment>,}}/>   <br/>

           <Checkbox checked={props.PercentageChecked} onChange={e => props.PercentageCheckedChanged(e.target.checked)} name="checkedA" />
           <TextField onChange={e => props.PercentageValueChanged(e.target.value)} value={props.precentegeValue}
             id="standard-start-adornment"
             InputProps={{endAdornment: <InputAdornment position="end">%</InputAdornment>,}}/>
           </div>
        </AccordionDetails>
        </Accordion> 
    </div>
  );
}
