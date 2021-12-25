import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {KeyboardTimePicker,MuiPickersUtilsProvider} from '@material-ui/pickers';
import '../styles/Alerts.css'
import DateFnsUtils from '@date-io/date-fns';
import NumericInput from 'react-numeric-input';

export default function BasicAlerts(props:any) {

  return (
    <div className="root">
      <Accordion className="accordion" defaultExpanded >
        <AccordionSummary
         
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header">
        <Typography className="heading">Basic</Typography>
        </AccordionSummary>
        <AccordionDetails className="accordionDetails">
          <p>Daily health report</p>
          <FormControlLabel 
             control={<Checkbox checked={props.isChecked} onChange={e => props.dailyChanged(e.target.checked)} name="checkedA" />}
              label="Send daily health report at: "/>
            <MuiPickersUtilsProvider utils={DateFnsUtils} >
            <KeyboardTimePicker 
             className="timePicker"
             id="time-picker"
             value={props.time} 
             onChange={props.basicDateChange}
             KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
         </MuiPickersUtilsProvider>
            <p>Monitor service</p>
            Wait <NumericInput min={0} max={60} value={props.monitorTime} onChange={props.monitorserviceTime} className="numericInput"/> minutes before sending repetitive email alerts
        </AccordionDetails>
        </Accordion> 
    </div>
  );
}
