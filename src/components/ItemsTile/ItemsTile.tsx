import './ItemsTile.scss';
import image1 from '../../Assets/image1.jpg';
import image2 from '../../Assets/image2.jpg';
import image3 from '../../Assets/image3.jpeg';
import image4 from '../../Assets/image4.jpg';
import image5 from '../../Assets/image5.jpeg';
import { categoryProps } from '../../types/types';
import { BsPlusLg } from 'react-icons/bs';

export const ItemsTile = ({index}:categoryProps) =>{

    const imageMap:any = {
        1: image1,
        2: image2,
        3: image3,
        4: image4,
        5: image5,
        // Add more mappings as needed
    };

    return (
        <div className='shadowstyle2 mb-3 d-flex'  style={{height:"100px",width:"98%",borderRadius:"8px"}}>

<div className="col-lg-2 col-md-2 col-3 d-flex justify-content-start p-2">
            <img className='img-fluid item-img' src={imageMap[index+1]} />
            </div>

<div className='col-7'>
    <div className='item-name'>Sample Item {index+1}</div>
    <div className='item-price'>LKR 600</div>
</div>

<div className='col-2 d-flex align-items-center justify-content-center'>
<div className='add-btn-style pt-1 pb-2 ps-2 pe-2'><BsPlusLg /></div>
</div>
        </div>
    )
}