import { useEffect, useState } from "react";
import "./GoalFormModal.css";

export default function GoalFormModal({ open, onClose, initialGoal, onSave }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [current, setCurrent] = useState("");
    const [target, setTarget] = useState("");
    const [targetDate, setTargetDate] = useState(""); // YYYY-MM-DD

    useEffect(() => {
        if (!open) return;

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setName(initialGoal?.name ?? "");
        setDescription(initialGoal?.description ?? "Your savings journey");

        setCurrent(
            initialGoal?.current === 0 || initialGoal?.current
                ? String(initialGoal.current)
                : ""
        );

        setTarget(
            initialGoal?.target === 0 || initialGoal?.target
                ? String(initialGoal.target)
                : ""
        );

        setTargetDate(normalizeToYYYYMMDD(initialGoal?.targetDate) || "");
    }, [open, initialGoal]);

    if (!open) return null;

    const submit = (e) => {
        e.preventDefault();

        if (!String(name).trim()) return alert("Goal name is required.");
        if (!targetDate) return alert("Target date is required.");
        if (Number(target) <= 0) return alert("Target amount must be > 0.");

        if (typeof onSave !== "function") return;

        onSave({
            name: String(name).trim(),
            description: String(description).trim(),
            current: Number(current || 0),
            target: Number(target || 0),
            targetDate,
        });
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) onClose();
    };

    return (

        <section className="gfOverlay" onClick={handleOverlayClick}>
            <section className="gfModal" onClick={(e) => e.stopPropagation()}>
                <section className="gfHeader">
                    <section className="gfTitle">{initialGoal ? "Update Goal" : "Add Goal"}</section>
                    <button type="button" className="gfClose" onClick={onClose}>✕</button>
                </section>

                <form className="gfForm" onSubmit={submit}>
                    <label className="gfField">
                        <span>Name</span>
                        <input value={name || ""} onChange={(e) => setName(e.target.value)} placeholder="Your Goal" />
                    </label>

                    <label className="gfField">
                        <span>Description</span>
                        <input value={description || ""} onChange={(e) => setDescription(e.target.value)} />
                    </label>

                    <section className="gfRow">
                        <label className="gfField">
                            <span>Current</span>
                            <input type="number" value={current || ""} onChange={(e) => setCurrent(e.target.value)} />
                        </label>

                        <label className="gfField">
                            <span>Target</span>
                            <input type="number" value={target || ""} onChange={(e) => setTarget(e.target.value)} />
                        </label>
                    </section>

                    <label className="gfField">
                        <span>Target date</span>
                        <input type="date" value={targetDate || ""} onChange={(e) => setTargetDate(e.target.value)} />
                    </label>

                    <section className="gfActions">
                        <button type="button" className="gfBtn ghost" onClick={onClose}>Cancel</button>
                        <button type="submit" className="gfBtn primary">Save</button>
                    </section>
                </form>
            </section>
            /</section>
    );
}

function normalizeToYYYYMMDD(value) {
    if (!value) return "";
    if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) return value;

    const d = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(d.getTime())) return "";

    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
}