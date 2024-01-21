export function toSlug(str) {
    return str.split(' ').join('-').split('&zwnj;').join('-');
}