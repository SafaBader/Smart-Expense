import GoalOverviewCard from "../goalOverviewCard/GoalOverviewCard";
import TimelineCard from "../timelineCard/TimelineCard";
import MonthlyPlanCard from "../monthlyPlanCard/MonthlyPlanCard";
import "./GoalGrid.css";

export default function GoalGrid({ goal, onApplyMonthlyUpdate }) {
    return (
        <section className="goalGrid">
            <GoalOverviewCard goal={goal} />
            <aside className="goalRightCol">
                <TimelineCard goal={goal} />
                <MonthlyPlanCard goal={goal} onApplyMonthlyUpdate={onApplyMonthlyUpdate} />
            </aside>
        </section>
    );
}