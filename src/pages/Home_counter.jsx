import { useEffect } from "react";

const countersData = [
  { target:800 , label: "Publications" },
  { target: 2508, label: "Alumini" },
  { target:4573, label: "Students" },
  { target: 2847, label: "Placements" },
];

const HomeCounter = () => {
  useEffect(() => {
    const counts = document.querySelectorAll(".count");
    const speed = 97;

    // Function to update the counter
    function upDate(counter) {
      const target = Number(counter.getAttribute("data-target"));
      const count = Number(counter.innerText);
      const inc = target / speed;
      if (count < target) {
        counter.innerText = Math.floor(inc + count);
        setTimeout(() => upDate(counter), 65);
      } else {
        counter.innerText = target;
      }
    }

    // Intersection Observer to trigger counters when in view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            upDate(entry.target);
            observer.unobserve(entry.target); // Stop observing after starting
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of the element is in view
    );

    // Observe each counter element
    counts.forEach((counter) => observer.observe(counter));

    return () => {
      // Cleanup observer on component unmount
      observer.disconnect();
    };
  }, []);

  return (
    <div className="h-screen/2 flex items-center justify-center bg-cover bg-center relative px-8 py-20" style={{ backgroundImage: "url('home/main-gate.jpg')" }}>
      <div className="absolute inset-0 bg-black bg-opacity-70"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-16 md:gap-20 lg:gap-24 xl:gap-24 relative z-10 text-white text-center">

        {countersData.map((counter, index) => (
          <div key={index} className="counter">
            <h1 className="count text-5xl font-bold" data-target={counter.target}>0</h1>
            <p className="text-lg font-semibold">{counter.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeCounter;
