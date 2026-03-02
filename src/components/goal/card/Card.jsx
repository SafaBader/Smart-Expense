import "../card/Card.css";

export default function Card({ children, tone = "default", className = "" }) {
    return <section className={`card card--${tone} ${className}`}>{children}</section>;
}