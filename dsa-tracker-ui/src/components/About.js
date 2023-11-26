import React from "react";

function About() {
  return (
    <div className="flex flex-col justify-center h-90v">
      <div className="flex flex-col justify-center h-full text-center mx-auto">
        <span className="text-3xl font-bold">About DSA Tracker 1.0</span>
      </div>

      <p className="mt-9 mx-auto text-justify w-1/3 max-md:w-3/4">
        The primary goal of DSA Tracker is to empower users in their journey to
        master data structures and algorithms. Acting as a centralized hub, the
        app facilitates the logging, solving, and reflection on problems, aiming
        to enhance users' problem-solving skills, monitor progress, and
        cultivate a sense of achievement in DSA. Serving as a personalized
        learning companion, DSA Tracker encourages consistent practice and
        provides a valuable resource for enthusiasts at various skill levels. It
        fosters a sense of community by allowing users to share progress and
        insights, creating a collaborative environment for mutual learning and
        growth within the DSA community.
      </p>

      <div className="flex flex-col mx-auto mt-10 text-sm">
        <span className="mx-auto max-md:w-3/4">
          This project was developed purely out of a passion for web development
          and personal interest
        </span>
        <div className="flex flex-row justify-center mt-9">
          <div className="card p-3">
            <div className="mb-2">
              <span
                className="text-white px-2 py-1 w-fit text-xs rounded-md"
                style={{ backgroundColor: "#019031" }}
              >
                Developer
              </span>

              <span
                className="text-white px-2 py-1 w-fit text-xs rounded-md ml-1 bg-indigo-700 cursor-pointer"
                onClick={() => window.open("https://github.com/scode24")}
              >
                GitHub
              </span>

              <span
                className="text-white px-2 py-1 w-fit text-xs rounded-md ml-1 bg-indigo-700 cursor-pointer"
                onClick={() =>
                  window.open("https://www.linkedin.com/in/soumyabrata-sarkar")
                }
              >
                LinkedIn
              </span>
            </div>

            <div className="flex flex-row mt-3">
              <img className="w-10 h-10 rounded-md mr-3" src="my_pic.jpg" />
              <div className="flex flex-col">
                <span className="font-bold">Soumyabrata Sarkar</span>
                {/* <span>soumyabrata024@gmail.com</span> */}
                <span>Software Developer</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
