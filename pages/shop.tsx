import type { NextPage } from 'next';
import Navbar from '../components/Navbar';
import ShopItems from '../components/ShopItems';

const Shop: NextPage = () => {
    return (
        <div>
            <Navbar />
            <ShopItems />
        </div>
    );
};

export default Shop;
