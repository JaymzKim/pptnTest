export default function ListingData({ value }: { value: string }) {
    return value?.replace(/(\d{4})-(\d{2})-(\d{2})/, "$1.$2.$3").slice(2);
}