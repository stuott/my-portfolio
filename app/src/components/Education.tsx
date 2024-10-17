// import jsonData from "../data/education.json";
import { Badges, Section } from "./SectionUtils";

export default function Education() {
  return (
    <Section id="education" title="Education">
      <div className="flex flex-col md:flex-row w-full gap-6">
        <a
          className="transition max-w-xs hover:scale-[1.02] p-4 bg-cyan-900 hover:bg-cyan-700"
          href="https://www.mtu.edu/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            alt="Michigan Techological University Logo"
            src={process.env.PUBLIC_URL + "/MTU_Logo.png"}
          />
        </a>
        <div className="md:max-w-xs">
          <p className="text-zinc-200 font-bold">BS Computer Engineering</p>
          <p className="text-zinc-400 italic">3.93 GPA | Dean's List</p>
          <Badges
            captions={[
              "Triangle Fraternity - President",
              "Blue Marble Security Enterprise",
            ]}
          />
        </div>
      </div>
    </Section>
  );
}

// interface educationCategory {
//   title: string;
//   courses: string[];
// }

// interface grade {
//   title: string;
//   years: string;
//   categories: educationCategory[];
// }

// function EducationCard(props: { data: grade }) {
//   const { data } = props;

//   return (
//     <div className="flex flex-col md:flex-row w-full gap-4 text-white ">
//       <div className="w-full md:w-1/4">
//         <h1 className="text-2xl font-serif ">{data.title}</h1>
//         <h2 className="italic">{data.years}</h2>
//       </div>
//       <div className="grid p-6 gap-6 w-full md:w-3/4 bg-cyan-900">
//         {data.categories.map((category) => {
//           return (
//             <div className="flex flex-col">
//               <h2 className="font-bold">{category.title}</h2>
//               <ul className="list-disc list-inside">
//                 {category.courses.map((course, index) => (
//                   <li key={index}>{course}</li>
//                 ))}
//               </ul>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
