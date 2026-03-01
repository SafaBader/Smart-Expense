import "./GoalTopBar.css";

export default function GoalTopBar({ hasGoal, onAddGoal, onUpdateGoal }) {
  return (
    <section className="goalTopBar">
      <button
        className={`goalBtn ${hasGoal ? "update" : "add"}`}
        onClick={hasGoal ? onUpdateGoal : onAddGoal}
      >
        {hasGoal ? "✏️ Update Goal" : "+ Add Goal"}
      </button>
    </section>
  );
}