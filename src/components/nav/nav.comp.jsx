import { useEffect, useState } from 'react';

// context
import { useData } from '../../context';

// icons & assets
import { ReactComponent as SearchIcon } from '../../icons/search.svg';
import { ReactComponent as UserIcon } from '../../icons/user.svg';
import { ReactComponent as CartIcon } from '../../icons/cart.svg';
import FlipkartLogo from '../../shared/assets/flipkart_logo.png';

// styles
import './nav.comp.scss';

export const Nav = () => {
    const [_, dispatch] = useData();
    const [query, setQuery] = useState('');

    useEffect(() => {
        dispatch({ type: 'UPDATE_SEARCH_QUERY', payload: query });
    }, [query]);

    console.log('query => ', query);

    return (
        <nav>
            <img className='logo' src={FlipkartLogo} alt='flipkart logo' />
            <div className='search_bar'>
                <input
                    type='text'
                    placeholder='Search for products...'
                    value={query}
                    onChange={(event) => setQuery((prevState) => event?.target?.value)}
                />
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
