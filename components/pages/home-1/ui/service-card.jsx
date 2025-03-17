import Image from "next/image";
import Link from "next/link";
import { Landmark, ClipboardCheck, BarChart3, Lightbulb } from "lucide-react";

export default function ServiceCard({ data }) {
  return (
    <div className="service-card h-100">
      <div className="service-card__icon">
        {data.icon === "Landmark" && <Landmark size={100} color="yellow " />}
        {data.icon === "ClipboardCheck" && (
          <ClipboardCheck size={100} color="yellow " />
        )}
        {data.icon === "BarChart3" && <BarChart3 size={100} color="yellow " />}
        {data.icon === "Lightbulb" && <Lightbulb size={100} color="yellow " />}
      </div>
      <div className="service-card__body">
        <h3 className="service-card__title">{data.title}</h3>
        <p>{data.description}</p>
      </div>
      <div className="service-card__footer">
        <Link
          href="/service-details"
          className="btn btn-primary btn-small w-100 space-between hvr-fill-black"
        >
          voir details
          <i className="fa-solid fa-arrow-right icon-arrow-corner" />
        </Link>
      </div>
    </div>
  );
}
