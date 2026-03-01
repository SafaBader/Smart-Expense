import Card from "../card/Card";
import StatTile from "../statTile/statTile";
import ProgressBar from "../progressBar/ProgressBar";
import "./GoalOverviewCard.css";

const money = (n) =>
    new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
    }).format(Number(n || 0));

export default function GoalOverviewCard({ goal }) {
    const current = Number(goal?.current || 0);
    const target = Number(goal?.target || 0);
    const remaining = Math.max(target - current, 0);
    const percent = target ? (current / target) * 100 : 0;

    const statusLabel =
        percent >= 100
            ? "Completed 🎉"
            : percent >= 75
                ? "Almost there 🔥"
                : percent >= 40
                    ? "On track ✅"
                    : "Getting started 🚀";

    return (
        <Card className="goalCard">
            <section className="goalCardHeader">
                <section className="goalIcon">
                    💰
                </section>
                <section className="goalHeaderText">
                    <section className="goalTitle">{goal?.name || "My Goal"}</section>
                    <section className="goalSub">{goal?.description || "Your savings journey"}</section>
                </section>

                <section className="goalStatusPill">{statusLabel}</section>
            </section>

            <section className="goalHeroRow">
                <section className="goalHeroLabel">Remaining</section>
                <section className="goalHeroValue">{money(remaining)}</section>
                <section className="goalHeroMeta">
                    Target {money(target)} • Saved {money(current)}
                </section>
            </section>

            <section className="goalCardBody">
                <section className="statsRow">
                    <StatTile label="Current Savings" value={money(current)} tone="success" />
                    <StatTile label="Target Amount" value={money(target)} />
                    <StatTile label="Remaining" value={money(remaining)} tone="warn" />
                </section>

                <section className="progressWrap">
                    <ProgressBar value={percent} />
                    <section className="progressMeta">
                        <span className="complete">{percent.toFixed(1)}% Complete</span>
                        <span className="toGo">{Math.max(0, 100 - percent).toFixed(1)}% to go</span>
                    </section>
                </section>

            </section>
        </Card>
    );
}