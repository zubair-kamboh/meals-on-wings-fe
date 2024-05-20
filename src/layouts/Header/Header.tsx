import './Header.scss';
import logo from '../../Assets/logo.png';
import { BsCart4, BsFillHouseFill } from "react-icons/bs";
import ReusableModal from '../../components/Modal/Modal';
import { useState } from 'react';
import { CartView } from '../../components/Cart/CartView';
export const Header = ()=>{
    const [propertyModalShow, setPropertyModalShow] = useState(false);
    const togglePropertyModal = () => setPropertyModalShow(!propertyModalShow);
    return(
        <div className='d-flex justify-content-around'>
                   <div className='mt-3'><div className='logo-img-style pt-1 pb-2 ps-2 pe-2'><BsFillHouseFill /></div></div>

            <div>
            <div className='d-flex justify-content-center mt-3'>   <img className='logo-img-style' src={logo} width={100}/></div>
         
            <div  className='d-flex justify-content-center logo-txt'>Meals & Wings</div>
            </div>
            <div onClick={()=>togglePropertyModal()} className='mt-3'><div className='logo-img-style pt-1 pb-2 ps-2 pe-2 position-relative'><BsCart4 />
            
            
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          {  (JSON.parse(localStorage.getItem('items') ?? '[]') ?? '').length}
  </span>
            </div></div>


            <ReusableModal
        show={propertyModalShow}
        toggleModal={togglePropertyModal}
        title={"View Cart"}
        is_title={true}
      >
<CartView/> </ReusableModal>

        </div>
    )
}