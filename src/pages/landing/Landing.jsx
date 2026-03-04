import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import "../landing/Landing.css";

export default function Landing() {
    return (
        <section className="landing">
            <span className="landing__bgGrid" aria-hidden="true" />
            <span className="landing__blob landing__blobA" aria-hidden="true" />
            <span className="landing__blob landing__blobB" aria-hidden="true" />

            <header className="landing__nav">
                <figure className="landing__brand">
                    <img className="landing__logo" src={logo} alt="Smart Expense" />
                    <figcaption className="landing__name">Smart Expense</figcaption>
                </figure>

                <nav aria-label="Main">
                    <ul className="landing__links">
                        <li><a href="#features">Features</a></li>
                        <li><a href="#preview">Why us</a></li>
                        <li><Link className="landing__login" to="/login">Login</Link></li>
                    </ul>
                </nav>
            </header>

            <main className="landing__main">
                <section className="landing__hero">
                    <p className="landing__pill">
                        <span className="landing__pillDot" aria-hidden="true" />
                        Budget • Track • Save
                    </p>

                    <h1 className="landing__title">
                        Your money.
                        <span className="landing__titleAccent"> Clear.</span>
                    </h1>

                    <p className="landing__sub">
                        One app that connects your saving goal with your daily spending.
                    </p>

                    <menu className="landing__ctaRow">
                        <li>
                            <Link className="landing__cta" to="/signup">
                                Get started
                            </Link>
                        </li>
                    </menu>

                    <ul className="landing__pills" id="features" aria-label="Features">
                        <li className="landing__pillItem">Quick add</li>
                        <li className="landing__pillItem">Live remaining</li>
                        <li className="landing__pillItem landing__pillAlert">Overspend alert</li>
                        <li className="landing__pillItem">Goal progress</li>
                    </ul>
                </section>

                <section className="landing__layout" id="preview" aria-label="Why Smart Expense">
                    <figure className="landing__phone">
                        <figcaption className="landing__phoneTop">
                            <span className="landing__dot landing__dotRed" />
                            <span className="landing__dot landing__dotYellow" />
                            <span className="landing__dot landing__dotGreen" />
                            <span className="landing__phoneTitle">Smart Flow</span>
                        </figcaption>

                        <section className="landing__phoneBody" aria-label="How it helps">
                            <h3 className="landing__flowTitle">One place. Full control.</h3>

                            <ul className="landing__flowLine" aria-label="User flow">
                                <li className="landing__flowStep">
                                    <span className="landing__flowIcon">🎯</span>
                                    Goal
                                </li>
                                <li className="landing__flowArrow" aria-hidden="true">→</li>
                                <li className="landing__flowStep">
                                    <span className="landing__flowIcon">💳</span>
                                    Budgets
                                </li>
                                <li className="landing__flowArrow" aria-hidden="true">→</li>
                                <li className="landing__flowStep">
                                    <span className="landing__flowIcon">🧾</span>
                                    Add expense
                                </li>
                                <li className="landing__flowArrow" aria-hidden="true">→</li>
                                <li className="landing__flowStep landing__flowStepAlert">
                                    <span className="landing__flowIcon">⚠</span>
                                    Alert
                                </li>
                            </ul>

                            <section className="landing__valueGrid" aria-label="Advantages">
                                <article className="landing__valueCard">
                                    <h4>Auto updates</h4>
                                    <p>Budgets refresh instantly after every transaction.</p>
                                </article>

                                <article className="landing__valueCard">
                                    <h4>Overspend warning</h4>
                                    <p>Clear red highlight when you exceed a limit.</p>
                                </article>

                                <article className="landing__valueCard">
                                    <h4>Goal + spending together</h4>
                                    <p>Most apps split these. Smart Expense connects them.</p>
                                </article>
                            </section>
                        </section>
                    </figure>

                    <section className="landing__side" aria-label="Call to action">
                        <h2 className="landing__sideTitle">Why users stay</h2>
                        <p className="landing__sideSub">Less thinking. More control.</p>

                        <ol className="landing__steps" aria-label="Highlights">
                            <li className="landing__step">
                                <span className="landing__stepNum">✓</span>
                                <span className="landing__stepText">One goal drives every decision</span>
                            </li>
                            <li className="landing__step">
                                <span className="landing__stepNum">✓</span>
                                <span className="landing__stepText">Instant remaining per category</span>
                            </li>
                            <li className="landing__step">
                                <span className="landing__stepNum">✓</span>
                                <span className="landing__stepText">Overspending is impossible to miss</span>
                            </li>
                        </ol>

                        <Link className="landing__cta landing__ctaWide" to="/signup">
                            Create account
                        </Link>
                    </section>
                </section>
            </main>

            <footer className="landing__footer">
                <p>© 2026 Smart Expense</p>
            </footer>
        </section>
    );
}