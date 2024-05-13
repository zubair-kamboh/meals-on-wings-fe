import './Header.scss';
import logo from '../../Assets/logo.png';
import { BsCart4, BsFillHouseFill } from "react-icons/bs";
export const Header = ()=>{

    return(
        <div className='d-flex justify-content-around'>
                   <div className='mt-3'><div className='logo-img-style pt-1 pb-2 ps-2 pe-2'><BsFillHouseFill /></div></div>

            <div>
            <div className='d-flex justify-content-center mt-3'>   <img className='logo-img-style' src={logo} width={100}/></div>
         
            <div  className='d-flex justify-content-center logo-txt'>Meals & Wings</div>
            </div>
            <div className='mt-3'><div className='logo-img-style pt-1 pb-2 ps-2 pe-2 position-relative'><BsCart4 />
            
            
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
    5
  </span>
            </div></div>
        </div>
    )
}