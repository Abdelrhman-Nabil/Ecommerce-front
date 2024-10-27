import { useContext } from 'react';
import { CartContext } from '../../../context/cart.context';
import './cart-item.css'
import { toast } from 'react-toastify';

const CartItem=({cartItem})=>{
    const{title,quantity,image,price}=cartItem;
    const {clearItemFromCart } = useContext(CartContext);
    const clearItemToHandler=()=>{
        clearItemFromCart(cartItem)
        toast(`${title} remove From Cart `);

    };

    return(
        <div className='cart-item-container'>
              <img  src={`${process.env.REACT_APP_BACKEND_URL}/${image[0]}`} alt={title}/>
            <div className='item-details'>
                <span className='name'>{title}</span>
                <span className='price'>{quantity} x {price} $</span>
            </div>
            <span className='cart-item-remove-button' onClick={clearItemToHandler}>&#10005;</span>
        </div>
    )
}
export default CartItem;