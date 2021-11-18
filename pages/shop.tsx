import type { NextPage } from 'next';
import Navbar from '../components/Navbar';
import ShopItem from '../components/ShopItem';
import ShopItemWrapper from '../components/wrapper/ShopItemWrapper';

const Shop: NextPage = () => {
    return (
        <div>
            <Navbar />
            <ShopItemWrapper>
                <ShopItem
                    title="HI"
                    time={2}
                    questions={2}
                    difficulty={'EASY'}
                />
                <ShopItem
                    title="HI"
                    time={2}
                    questions={2}
                    difficulty={'EASY'}
                />
            </ShopItemWrapper>
        </div>
    );
};

export default Shop;
