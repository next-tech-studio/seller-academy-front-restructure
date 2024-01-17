export function truncateText(text, maxLines) {
    if (!process.client) {
        return text;
    }

    const lineHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--line-height'), 10);
    const maxHeight = lineHeight * maxLines;
    const element = document.createElement('div');
    element.style.position = 'absolute';
    element.style.width = '100%';
    element.style.height = 'auto';
    element.style.fontSize = '16px'; // change this to match your text size
    element.style.lineHeight = lineHeight + 'px'; // change this to match your line height
    element.style.whiteSpace = 'pre-wrap';
    element.style.visibility = 'hidden';

    element.appendChild(document.createTextNode(text));
    document.body.appendChild(element);

    let truncatedText = text;
    if (element.offsetHeight > maxHeight) {
        let i = text.length - 1;
        while (element.offsetHeight > maxHeight && i >= 0) {
            i--;
            truncatedText = text.substring(0, i) + '...';
            element.textContent = truncatedText;
        }
    }

    document.body.removeChild(element);
    return truncatedText;
}