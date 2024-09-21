export default function Image({ src, ...rest }) {
  src =
    typeof src === "string" && src.includes("https://")
      ? src
      : "http://localhost:3000/uploads/" + src;
  return <img {...rest} src={src} alt={""} />;
}
