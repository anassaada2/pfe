import CardDash from "@/components/dashboard/card/CardDash";
import ChartDash from "@/components/dashboard/chart/ChartDash";
import styles from "@/components/dashboard/dashboard.module.scss";
import HeroDash from "@/components/dashboard/hero/HeroDash";
import { cards } from "@/data/site";
function page() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.cards}>
          {cards.map((item) => (
            <CardDash item={item} key={item.id} />
          ))}
        </div>
        <HeroDash />
        <ChartDash />
      </div>
    </div>
  );
}

export default page;
