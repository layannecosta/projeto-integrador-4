export type product = {
    _id: string;
    name: string;
    manufacturer: string;
    price: number;
    url1: string;
    url2: string;
    description: string;
};


export type CardProps = {
    name: string;
    img: string;
    manufacturer: string;
    price: number;
    id: string;
    setMyProducts: React.Dispatch<React.SetStateAction<product[]>>;
};


