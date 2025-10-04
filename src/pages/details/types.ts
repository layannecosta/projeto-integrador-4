export type Product = {
    category: string;
    _id: string;
    name: string;
    manufacturer: string;
    price: number;
    url1: string;
    url2: string;
    description: string;
    user: {
        name: string;
        email: string;
        phone: string;
        city: string;
        state: string;
    };
};
