import companyLogo from 'assets/logos/cohort360-logo.jpeg'
import './Header.css'

export default function Header() {
    return(
        <header>
            <section className="header-container">
                <div className="header-logo">
                    <img src={companyLogo} alt="Indep Learn logo"></img>
                </div>
                <nav className="header-nav">
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/prescription">Prescriptions</a></li>
                    </ul>
                </nav>
            </section>
        </header>
    );
}