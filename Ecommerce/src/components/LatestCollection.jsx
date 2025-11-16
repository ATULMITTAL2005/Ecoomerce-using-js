import React ,{useContext, useState, useEffect}from 'react'
import { ShopContext } from '../context/ShopContext'
import ProductItem from './ProductItem';
import Title from './Title';


const LatestCollection = () => {
    const { products } = useContext(ShopContext);
 const [LatestProducts,setLatestProducts] = useState([]);

  useEffect(()=>{
   setLatestProducts(products.slice(0,10));
}, [products])
  return (
   <div className="my-10">
    <div className="text-center py-8 text-3xl">
    <Title text1={'LATEST'} text2={'COLLECTIONS'}/>
    <p className='w-3/4 m-auto text-xs sm:text-'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos voluptatum harum maxime recusandae incidunt nesciunt delectus ratione aut, consequatur reprehenderit dolorem consequuntur, omnis libero asperiores quidem voluptates cupiditate fugit iste.</p></div>
    {/* rendering products */}

    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
      {
        LatestProducts.map((item,index)=>(
          <ProductItem key ={index} id={item._id} image={item.image} name={item.name}  price = {item.price}/>

        ))
      }
    </div>
   </div>
  )
}

export default LatestCollection