import "./GoalEmptyState.css";

export default function GoalEmptyState({ onAdd }) {
    return (
        <section className="goalEmpty">
            <h2 className="goalEmptyTitle">No goal yet</h2>
            <p className="goalEmptySub">Create a savings goal to start tracking progress.</p>
            <button className="goalEmptyBtn" onClick={onAdd}>+ Add Goal</button>
        </section>
    );
}