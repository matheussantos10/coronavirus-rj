const toCompareString = (str) => {
    return str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
};

const formatDecimal = (number) => {
    return new Intl.NumberFormat("pt-BR", { style: "decimal" }).format(number);
};

export { formatDecimal, toCompareString };
