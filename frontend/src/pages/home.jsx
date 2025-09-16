import BestCollection from "../components/bestCollection";
import HeroSection from "../components/heroSection";
import LatestCollection from "../components/latestCollection";

const Home = () => {
    return (
        <div className="home-page bg-white font-['Prata'] serif py-8 lg:py-12 pb-20">
           <HeroSection/>
           <LatestCollection/>
           <BestCollection/>
        </div>
    )
}

export default Home;