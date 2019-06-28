export function validaLance(loan, lance) {
    return lance >= loan.minPrice;
}