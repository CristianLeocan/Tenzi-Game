import './header.css';
import Tenzi from '../../Images/tenzi.jpg'

export default function Header() {
    return (
        <div className='section--title'>
            <img src={Tenzi} alt="Tenzi" className='title'/>        
        </div> 
    )
}