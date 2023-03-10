import { makeStyles } from '@material-ui/core/styles';
// import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
   paper:{
    marginTop:theme.spacing(8),
    display:"flex",
    flexDirection:"column",
    padding:theme.spacing(2),
    alignItems:"center"
   },
   root:{
    '& .MuiTextField-root':{
        margin:theme.spacing(1),
    }
   },
   avatar:{
     margin:theme.spacing(1),
     backgroundColor:theme.palette.secondary.main
   },
   form:{
    width:"100%",
    marginTop:theme.spacing(3)
   },
   submit:{
     margin:theme.spacing(3,0,2),
   },
   googleButton:{
    marginBottom:theme.spacing(2),
    display:"flex",
    alignItems:"center",
    justifyContent:"center"
   },
   error:{
    margin:"20px 0",
    textAlign:"center",
    color:"red",
   }
}));
