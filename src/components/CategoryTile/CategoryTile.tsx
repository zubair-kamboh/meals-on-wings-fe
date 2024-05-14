import './CategoryTile.scss';
import logo from '../../Assets/logo.png';
import image1 from '../../Assets/image1.jpg';
import image2 from '../../Assets/image2.jpg';
import image3 from '../../Assets/image3.jpeg';
import image4 from '../../Assets/image4.jpg';
import image5 from '../../Assets/image5.jpeg';
import { categoryProps } from '../../types/types';
import { useState } from 'react';


// Create a mapping of indices to images
const imageMap:any = {
    1: image1,
    2: image2,
    3: image3,
    4: image4,
    5: image5,
    6: image1,
    7: image2,
    8: image3,
    9: image4,
    10: image5,
    // Add more mappings as needed
};


export const CategoryTile = ({index}:categoryProps) => {

    const [selectedIndex,setSelectedIndex] = useState();

    const categoryClicked=(index:any)=>{
        setSelectedIndex(index)
    }
    return (
        <div className='category-tile' onClick={()=>categoryClicked(index)} style={{borderBottomColor:selectedIndex==index?'green':'transparent'}}>
        <div className='bg d-flex align-items-end justify-content-center'  style={{backgroundImage: `url(${imageMap[index+1]})`, width: "100%", height: "95px", borderRadius: "15px", backgroundRepeat: 'no-repeat', backgroundSize: "cover"}}>

        <div className='text-center cat-txt'>Category {index+1}</div>
        </div>

        </div>
    )
}
