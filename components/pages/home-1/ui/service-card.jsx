import Image from "next/image";
import Link from "next/link";
import { Ruler, ClipboardCheck, Fireplace, Lightbulb } from "lucide-react";
import { Flame, Rocket } from "lucide-react";

export default function ServiceCard({ data }) {
  return (
    <div className="service-card h-100">
      <div className="service-card__icon">
        {data.icon === "Flame" && (
          <Image
            src="/image/AFEC/fire.jpg"
            alt="fire "
            width={100}
            height={100}
          />
        )}
        {data.icon === "outil" && (
          <Image
            src="/image/AFEC/outil.png"
            alt="fire "
            width={100}
            height={100}
          />
        )}{" "}
        {data.icon === "Lightbulb" && <Lightbulb size={100} color="yellow " />}
        {data.icon === "Rocket" && <Rocket size={100} color="yellow " />}
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
