import './HomePage.css'
import welcomeVideo from "assets/videos/welcome-video.mp4"

const HomePage = () => {
    return(
        <section className="homepage-container">
            <div className="welcome-part">
                <video
                    className="bg-video"
                    src={welcomeVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                />
                <div className="welcome-content">
                    <p className="welcome-message">Prescription API</p>
                    <p className="indep-text">
                        Test technique APHP -  Malik KHETIM<br/>
                        Poste : Développeur Full-Stack
                    </p>
                    <a className="start-journey" href="/prescription">Par ici !</a>
                </div>
            </div>
        </section>
    );
}

export default HomePage;