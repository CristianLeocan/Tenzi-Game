import './raking.css';

export default function Ranking(props) { 
  return (
    <div className="records">
        <div className="recordsinfo">
            <div>Best time:</div>
            <div className="bold">{props.bestTime ? `${props.record} moves in ${props.bestTime} seconds` : "No Games played"}</div>
        </div>
        <div className="recordsinfo">
            <div>Current moves and timer:</div>
            <div className="bold">{`${props.trys} moves in ${props.seconds} seconds`}</div>
        </div>
        <button className='deletestorage' onClick={props.removeStorage}>
          Delete history
        </button>
    </div>
  )
}  