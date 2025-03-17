import Link from "next/link";

export default function AwardWidget({ data }) {
  return (
    <div className="award-widget">
      <span className="date">{data.year}</span>
      <h6 className="award-widget__title">{data.title}</h6>
      <p>{data.brief}</p>
      <Link href="/home-2" className="award-widget__link">
        <i className="fa-solid fa-arrow-right" />
      </Link>
    </div>
  );
}
