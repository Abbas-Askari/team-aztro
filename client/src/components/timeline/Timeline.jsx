import "./Timeline.css";
import SchoolIcon from "./school.svg";
import WorkIcon from "./work.svg";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

function Timeline({timelineElements}) {
  let workIconStyles = { background: "#06D6A0" };
  let schoolIconStyles = { background: "#f9c74f" };
  console.log(timelineElements)
  return (
    <div>
      <h1 className="text-5xl sm:text-[10rem] lg:text-[15rem] md:text-center">Timeline</h1>
      <VerticalTimeline>
        {timelineElements.map((element) => {
          let isWorkIcon = element.icon === "work";
          let showButton =
            element.buttonText !== undefined &&
            element.buttonText !== null &&
            element.buttonText !== "";

          return (
            <VerticalTimelineElement
              key={element.key}
              date={element.date}
              dateClassName="date"
              iconStyle={isWorkIcon ? workIconStyles : schoolIconStyles}
              icon={isWorkIcon ? <img src={WorkIcon} alt="Work" /> : <img src={SchoolIcon} alt="School" />}
            >
              <h3 className="vertical-timeline-element-title font-bold text-2xl">
                {element.title}
              </h3>
              <h5 className="vertical-timeline-element-subtitle opacity-50 text-lg">
                {element.location}
              </h5>
              <div className="flex flex-col" id="descriptions">
                {element.descriptions.map(desc => <p className="pb-4">{desc}</p>)}
              </div>
              {showButton && (
                <a
                  className={`button 
                  ${isWorkIcon ? "workButton" : "schoolButton"}`}
                  href={element.buttonLink}
                >
                  {element.buttonText}
                </a>
              )}
            </VerticalTimelineElement>
          );
        })}
      </VerticalTimeline>
    </div>
  );
}

export default Timeline;
