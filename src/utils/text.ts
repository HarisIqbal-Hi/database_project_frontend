export function capitalizeFirstWord(str: string): string {
    if (!str) return str;
    const words = str.split(" ");
    // Capitalize first word: first letter uppercase + rest lowercase
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1).toLowerCase();
    return words.join(" ");
}
