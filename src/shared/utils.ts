const formatter = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
})

export const toCurrency = (value: number) => formatter.format(value)