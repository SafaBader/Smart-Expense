import Card from "../card/Card";
import "./StatTile.css";

export default function StatTile({ label, value, tone = "default" }) {
    return (
        <Card tone={tone} className="statTile">
            <section className="statLabel">{label}</section>
            <section className="statValue">{value}</section>
        </Card>
    );
}