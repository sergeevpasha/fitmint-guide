export default function cutStringInTheMiddle(string: string) {
    if (string.length > 10) {
        return `${string.substring(0, 7)}...${string.substring(string.length - 3, string.length)}`;
    }
    return string;
}
