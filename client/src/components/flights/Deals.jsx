import {
  BiBadgeCheck,
  BiHeadphone,
  BiStreetView,
  BiTag,
  BiUser,
} from "react-icons/bi";

const Deals = () => {
  return (
    <div className="pt-8 pb-10">
      <div className="flex flex-wrap gap-8">
        <div className="flex-1 basis-[18rem]">
          <img
            style={{scale:'1.3'}}
            src="/src/assets/10.png"
            alt=""
            className="sm:h-[600px] sm:w-[600px] object-contain mx-auto"
          />
        </div>


        <div className="flex-1 basis-[18rem]">
          <div className="pb-3 border-b dark:border-b-dark">
            <h1 className="heading">
              feel the best exprience <br /> with our umrah deals
            </h1>
          </div>
          <div className="mt-5 flex-1">
            <div className="flex gap-x-3">
              <div className="icon-box !rounded-md bg-slate-200 dark:bg-dark-light border dark:border-dark">
                <BiStreetView />
              </div>
              <div>
                <h1 className="text-lg font-semibold">
                  Pilgrimage Preparation 
                </h1>
                <p>
                  Organize documents, health check, and spiritual readiness.
                </p>
              </div>
            </div>

            <div className="flex gap-x-3 mt-8">
              <div className="icon-box !rounded-md bg-slate-200 dark:bg-dark-light border dark:border-dark">
                <BiHeadphone />
              </div>
              <div>
                <h1 className="text-lg font-semibold">
                Travel Logistics
                </h1>
                <p>
                Book accommodations, plan transportation, and pack essentials.
                </p>
              </div>
            </div>

            <div className="flex gap-x-3 mt-8">
              <div className="icon-box !rounded-md bg-slate-200 dark:bg-dark-light border dark:border-dark">
                <BiTag />
              </div>
              <div>
                <h1 className="text-lg font-semibold">Understanding Rituals</h1>
                <p>
                Rituals: Learn and follow Hajj/Umrah rituals, seek knowledge.
                </p>
              </div>
            </div>

            <div className="flex gap-x-3 mt-8">
              <div className="icon-box !rounded-md bg-slate-200 dark:bg-dark-light border dark:border-dark">
                <BiBadgeCheck />
              </div>
              <div>
                <h1 className="text-lg font-semibold">Cultural Sensitivity:</h1>
                <p>
                Respect local customs, learn basic Arabic, practice tolerance.
                </p>
              </div>
            </div>

            <div className="flex gap-x-3 mt-8">
              <div className="icon-box !rounded-md bg-slate-200 dark:bg-dark-light border dark:border-dark">
                <BiUser />
              </div>
              <div>
                <h1 className="text-lg font-semibold">Safety and Security:</h1>
                <p>
                Stay informed, prioritize personal safety, and be prepared for emergencies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deals;
