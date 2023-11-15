

export function absoluteDecimal(num: number, n: number): number {
    if (isNaN(num) || isNaN(n) || n < 0) {
        throw new Error("Invalid input");
    }
    let factor = Math.pow(10, n);
    return Math.round(Math.abs(num) * factor) / factor;
}

export function toThousands(num: any) {
    var num = (num || 0).toString(), result = '';
    while (num.length > 3) {
        result = ',' + num.slice(-3) + result;
        num = num.slice(0, num.length - 3);
    }
    if (num) { result = num + result; }
    return result;
}

export function convertToMillion(str: string) {
    if (str.length < 7) {
        throw new Error("The number is too small to convert to millions.");
    }

    const millions = Number(str.slice(0, -23));

    const roundingPart = Number(str.slice(-23, -25));

    const roundedMillions = roundingPart >= 50 ? millions + 1 : millions;

    return (roundedMillions / 10).toFixed(1) + 'M';
}
export function convertToMillion1(str: string) {
    if (str.length < 7) {
        throw new Error("The number is too small to convert to millions.");
    }

    const millions = Number(str.slice(0, -23));

    const roundingPart = Number(str.slice(-23, -25));

    const roundedMillions = roundingPart >= 50 ? millions + 1 : millions;

    return (roundedMillions / 10).toFixed(1);
}
export function formatToMillionDollars(amount: string): string {
    const number = parseFloat(amount);
    const millions = number / 1e6;
    return `$${millions.toFixed(0)}M`;
}


export function shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


export function randomRotateArray(arr: number[]) {
    const randomRotationCount = Math.floor(Math.random() * arr.length);
    for (let i = 0; i < randomRotationCount; i++) {
        const firstElement = arr.shift();
        arr.push(firstElement as number);
    }
    arr.push(arr[0], arr[1])
    return arr
} 