import Card from "../card/Card";
import "./TimelineCard.css";

export default function TimelineCard({ goal }) {
    const targetDate = parseYYYYMMDD(goal?.targetDate);

    const daysRemaining =
        typeof goal?.daysRemaining === "number"
            ? goal.daysRemaining
            : calcDaysRemaining(targetDate);

    return (
        <Card className="timelineCard">
            <section className="tlTitle">📅 Timeline</section>

            <section className="tlBlock">
                <section className="tlLabel">Target Date</section>
                <section className="tlValue">{targetDate ? formatPrettyDate(targetDate) : "—"}</section>
            </section>

            <section className="tlDivider" />

            <section className="tlBlock">
                <section className="tlLabel">Days Remaining</section>
                <section className="tlDays">{Number.isFinite(daysRemaining) ? daysRemaining : "—"}</section>
            </section>
        </Card>
    );
}

function parseYYYYMMDD(value) {
    if (!value || typeof value !== "string") return null;
    const d = new Date(value + "T00:00:00");
    return Number.isNaN(d.getTime()) ? null : d;
}

function calcDaysRemaining(targetDate) {
    if (!targetDate) return null;
    const now = new Date();
    const ms = targetDate.getTime() - now.getTime();
    return Math.max(0, Math.ceil(ms / (1000 * 60 * 60 * 24)));
}

function formatPrettyDate(dateObj) {
    return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(dateObj);
}