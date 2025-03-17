import ServiceCard from "@/components/ui/cards/service-card";
import { service3 } from "@/data/site";

export default function Service() {
  return (
    <div className="blog-section section-padding bg-sand">
      <div className="container">
        <div className="row gutter-y-default">
          {service3?.map((item, i) => (
            <div key={i} className="col-md-6">
              <div className="service-card__wrapper">
                <ServiceCard data={item} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
