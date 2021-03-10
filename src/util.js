const formatCurrency = (num) => {
    return `Rs. ${Number(num.toFixed(1)).toLocaleString()} `;
}

export default formatCurrency;