import { ReactComponent as SearchIcon } from '../../icons/search.svg';
import { ReactComponent as UserIcon } from '../../icons/user.svg';
import { ReactComponent as CartIcon } from '../../icons/cart.svg';

import './nav.comp.scss';
import FlipkartLogo from '../../shared/assets/flipkart_logo.png';

export const Nav = () => {
    return (
        <nav>
            <img className='logo' src={FlipkartLogo} alt='flipkart logo' />
            <div className='search_bar'>
                <input type='text' placeholder='Search for products...' />
                <SearchIcon />
            </div>
            <div className='action_buttons'>
                <button className='login'>
                    <UserIcon />
                </button>
                <button className='cart'>
                    <CartIcon />
                </button>
            </div>
        </nav>
    );
};
