exports.discount = (price, percentage) => {
    return price * (1 - percentage / 100);
}
