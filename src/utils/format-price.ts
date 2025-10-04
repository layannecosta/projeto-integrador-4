export function formatPrice(price: number) {
    if (!price) {
        return "";
    };

    const formattedPrice = new Intl.NumberFormat("pt-br", {
        style: "currency",
        currency: "BRL",
    }).format(price);

    return formattedPrice;
}