const point = (price, percentage) => {
    return price * (1 - percentage / 100);
}
export { point };