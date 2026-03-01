import "./ProgressBar.css";

export default function ProgressBar({ value = 0 }) {
    const v = Math.max(0, Math.min(100, value));
    return (
        <section className="progressTrack">
            <section className="progressFill" style={{ width: `${v}%` }} />
        </section>
    );
}