import { useState } from 'react';
import { CategoryTile } from '../../components/CategoryTile/CategoryTile'
import { Header } from '../../layouts/Header/Header'
import './menu.scss'
import { ItemsTile } from '../../components/ItemsTile/ItemsTile';

export const Menu=()=>{

    const [categories,setCategories]=useState([1,2,3,4,5,6,7,8,9,10]);
    const [items,setItems]=useState([1,2,3,4,5]);

    return(
        <div>
                <Header />

        <div className='scrolling-wrapper'>
    {categories && categories.map((values,i)=>(
        <CategoryTile index={i} />
    ))}
        </div>

        <div className='mt-3'>
        {items && items.map((values,i)=>(
        <ItemsTile index={i} />
    ))}
        </div>

        </div>
    )
}