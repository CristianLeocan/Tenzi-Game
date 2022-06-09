import './timer.css';

export default function Timer(props) { 
   return (
    <div className='section--timer'>
        <span className='timer'>
            {props.minutes < 10 ? `0${props.minutes}` : props.minutes}:{props.seconds < 10 ? `0${props.seconds}` : props.seconds}            
        </span> 
        <span>
            <button onClick={props.startStop} className="startStop">
                 {props.intervalId ? "Stop" : "Start"}
            </button>    
        </span>        
     </div>     
   )
}