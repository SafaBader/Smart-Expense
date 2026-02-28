import "../appHeader/AppHeader.css";

export default function AppHeader({ title, subtitle }) {
  return (
    <header className="appHeader">
      <section>
        <h1 className="appHeaderTitle">{title}</h1>
        {subtitle ? <p className="appHeaderSub">{subtitle}</p> : null}
      </section>
    </header>
  );
}