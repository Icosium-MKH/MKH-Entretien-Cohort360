import './Footer.css'

export default function Footer() {
    return(
        <footer>
            <section className="footer-container">
                <div className="footer-logo">
                    {/*<img src={companyLogo} alt="Indep Learn logo"></img>*/}
                    <h4>COHORT 360</h4>
                </div>
                <div className="footer-copyright">
                    <p>Copyright 2026 - All rights reserved</p>
                </div>
            </section>
        </footer>
    );
}