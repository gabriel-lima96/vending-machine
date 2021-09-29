
export const centsToDollar = (cents: string): string => {
    const dollar = parseInt(cents) / 100
    return dollar.toFixed(2);
}

export const dollarToCents = (dollar: string): string => {
    const cents = Math.floor(parseFloat(dollar) * 100)
    return cents.toString();
}