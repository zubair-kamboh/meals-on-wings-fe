import { useEffect, useState } from 'react'
import { CategoryTile } from '../../components/CategoryTile/CategoryTile'
import { Header } from '../../layouts/Header/Header'
import './menu.scss'
import { ItemsTile } from '../../components/ItemsTile/ItemsTile'
import { collection, getDocs } from 'firebase/firestore'
import { firestore } from '../../firebase'

export const Menu = () => {
  const [categories, setCategories] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  // const [items,setItems]=useState([1,2,3,4,5]);

  const [items, setItems] = useState([])

  useEffect(() => {
    localStorage.getItem('items')
      ? localStorage.getItem('items')
      : localStorage.setItem('items', JSON.stringify([]))

    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(firestore, 'items'))
      const itemsArray: any = []
      querySnapshot.forEach((doc) => {
        itemsArray.push({ id: doc.id, ...doc.data() })
      })
      console.log(itemsArray)
      setItems(itemsArray)
    }

    fetchData()
  }, [])

  return (
    <div>
      <Header />

      <div className="scrolling-wrapper">
        {categories &&
          categories.map((values, i) => (
            <CategoryTile index={i} values={values} />
          ))}
      </div>

      <div className="p-3 category-main-heading">Category 1</div>
      <div className="mt-3">
        <div className="row">
          {items &&
            items.map((values, i) => (
              <div className="col-6">
                <ItemsTile index={i} values={values} />
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
