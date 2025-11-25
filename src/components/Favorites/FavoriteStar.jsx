export default function FavoriteStar({ isFavorite }) {
  return <span>{isFavorite ? "★" : "☆"}</span>;
}
