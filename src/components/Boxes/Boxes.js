import './boxes.css'

export default function Boxes(props) {
    const styles = {
        backgroundColor: props.isPressed ? "orange" : "white"
    }
    return (
        <div 
        className='boxes' 
        style={styles}
        onClick={props.structureOfBox}
        >
            <h3 className='boxes--value'>{props.value}</h3>
        </div>
    )
}