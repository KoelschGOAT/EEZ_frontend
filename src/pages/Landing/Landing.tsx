import { useQuery } from "@tanstack/react-query";
import { BiArrowBack } from "react-icons/bi";
import { BsFillPlayFill } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import LanguageDisplay from "../../components/Language/LanguageDisplay";
import { LanguageSwitch } from "../../components/Language/LanguageSwitch";
import enercon_logo from "../../Images/enercon_logo.png";
import Harald from "../../Images/Harald3.png";
import { clientVideosQuery } from "../../services/Querys";
import { Video } from "../../services/types";
import Title from "./Title";

type Props = {};

const Landing = ({}: Props) => {
  const { data, error, isLoading } = useQuery(clientVideosQuery());
  const location = useLocation();
  console.log(data);
  if (data)
    return (
      <>
        {/**Navbar */}
        <nav className="sticky top-0 left-0 z-[1000] flex h-16 flex-1 items-center justify-center bg-white p-4 shadow-lg">
          {/**left Navbar Item */}
          <div className="mr-auto">
            {" "}
            <img src={enercon_logo} width={150} height="auto"></img>
          </div>
          {/**Middle navbar Item */}
          <div className="text-xl text-primary lg:text-2xl ">
            <Title />
          </div>
          {/**Right Navbar Item */}
          <div className="ml-auto flex flex-row items-center gap-5">
            <LanguageSwitch className="flex cursor-pointer flex-row items-center gap-2 p-4" />
            {location.pathname !== "/" && (
              <button className="flex h-12 flex-row items-center  gap-2 rounded bg-primary py-2 px-10 text-white hover:bg-opacity-90">
                <BiArrowBack size="1.5em" />
                <span className="hidden lg:flex">
                  <LanguageDisplay de="Zurück" en="Back" />
                </span>
              </button>
            )}
          </div>
        </nav>{" "}
        <div className="mirror  fixed bottom-0 right-0  mb-1 h-auto w-[4rem] rounded border-b-2 border-primary">
          <img src={Harald}></img>
        </div>
        <LandingHelper Videos={data as Video[]} />
      </>
    );
  return <div>Loading</div>;
};

export default Landing;
type PropsLandingHelper = {
  Videos: Video[];
};
export const LandingHelper = ({ Videos }: PropsLandingHelper) => {
  return (
    <div
      className="background-image scrollbarContainer
    flex justify-center bg-slate-100"
    >
      <div className="m-8 grid w-full grid-cols-1 justify-center gap-24 opacity-100   lg:grid-cols-3 ">
        {Videos.map((video) => (
          <CardLanding video={video} key={video.id} />
        ))}
      </div>
    </div>
  );
};

interface CardLandingProps {
  video: Video;
}
const CardLanding = ({ video }: CardLandingProps) => {
  const navigate = useNavigate();
  return (
    <div className="text-md card bg-base-100 shadow-xl hover:shadow-2xl ">
      <figure>
        <img
          className="transition  duration-500 ease-in-out hover:scale-110 "
          src={`http://${import.meta.env.VITE_SERVER_ADDRESS}${
            video.screenshot
          }`}
          alt={video.title_de}
        />
      </figure>
      <div className="card-body rounded-b-[1rem] bg-white">
        <h2 className="card-title">
          <LanguageDisplay de={video.title_de} en={video.title_en} />
        </h2>

        <p>
          {" "}
          <LanguageDisplay de={video.text_de} en={video.text_en} />
        </p>

        <div className="card-actions mt-2 justify-end ">
          <button
            className="transition-animation btn-primary btn w-full  gap-2"
            onClick={() => {
              navigate("/video", {
                replace: false,
                state: { video: video },
              });
            }}
          >
            <BsFillPlayFill size="2.5em" />

            <LanguageDisplay
              de={video.video.endsWith(".svg") ? "Mehr erfahren" : "Abspielen"}
              en={video.video.endsWith(".svg") ? "Learn more" : "Play"}
            />
          </button>
        </div>
      </div>
    </div>
  );
};