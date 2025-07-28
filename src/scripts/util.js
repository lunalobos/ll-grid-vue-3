import { Value } from "./classes";
/**
 * https://stackoverflow.com/questions/7225407/convert-camelcasetext-to-title-case-text
 * @param {string} s 
 * @returns {string}
 */
export function camelCaseToWords(s) {
    const result = s.replace(/([A-Z])/g, ' $1');
    return result.charAt(0).toUpperCase() + result.slice(1);
}

/**
 * taked from https://stackoverflow.com/questions/22697936/binary-search-in-javascript
 * @param {Array<>} array
 * @param {Object} element
 * @returns {number} the index of the element or -1 if it not present
 */
export function binarySearch(arr, el, compare_fn) {
    let m = 0;
    let n = arr.length - 1;
    while (m <= n) {
        let k = (n + m) >> 1;
        let cmp = compare_fn(el, arr[k]);
        if (cmp > 0) {
            m = k + 1;
        } else if (cmp < 0) {
            n = k - 1;
        } else {
            return k;
        }
    }
    return ~m;
}

/**
 * 
 * @param {Value} value 
 * @param {string} str 
 */
export function like(value, str) {
    return value.formattedValue().includes(str);
}


/**
 * @param {Array<Value>} array
 * @param {Value} value
 * @returns {number} 
 */
export function indexOf(array, value) {

    for (let i = 0; i < array.length; i++) {
        if (value.equals(array[i])) {
            return i;
        }
    }
    return -1;
}

