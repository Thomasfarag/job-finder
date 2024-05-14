// import { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { BiBriefcaseAlt2 } from "react-icons/bi";
// import { BsStars } from "react-icons/bs";
// import { MdOutlineKeyboardArrowDown } from "react-icons/md";
// import { apiRequest, updateURL } from "../utils";
// import Header from "../components/Header";
// import { experience, jobTypes, jobs } from "../utils/data";
// import { CustomButton, JobCard, ListBox } from "../components";
// import Loading from './../components/Loading';

// const FindJobs = () => {
//   const [sort, setSort] = useState("Newest");
//   const [expVal,setExpVal]=useState([])
//   const [page, setPage] = useState(1);
//   const [numPage, setNumPage] = useState(1);
//   const [recordCount, setRecordCount] = useState(0);
//   const [data, setData] = useState([]);

//   const [searchQuery, setSearchQuery] = useState("");
//   const [jobLocation, setJobLocation] = useState("");
//   const [filterJobTypes, setFilterJobTypes] = useState([]);
//   const [filterExp, setFilterExp] = useState([]);

//   const [isFetching, setIsFetching] = useState(false);

//   const location = useLocation();
//   console.log(location.pathname)
//   const navigate = useNavigate();
//   const fetchJobs= async()=>{
//     setIsFetching(true);
//     const newURL=updateURL({
//       pageNum:page,
//       query:searchQuery,
//       cmpLoc: jobLocation,
//       sort: sort,
//       navigate:navigate,
//       location:location,
//       jtype:filterJobTypes,
//       exp: filterExp
//     });
//     try {
//       const res = await apiRequest({
//         url : "/jobs"+ newURL,
//         method : "GET",
//       });
//       setNumPage(res?.numOfPage);
//       setRecordCount(res?.totalJobs);
//       setData(res?.data)

//       setIsFetching(false);
//     } catch (error) {
      
//     }
//   }

//   const filterJobs = (val) => {
//     if (filterJobTypes?.includes(val)) {
//       setFilterJobTypes(filterJobTypes.filter((el) => el != val));
//     } else {
//       setFilterJobTypes([...filterJobTypes, val]);
//     }
//   };

//   const filterExperience = async (e) => {
//     if(expVal?.includes(e)){
//      setExpVal(expVal?.filter((el)=> el != e))
//     }else{
//      setExpVal([...expVal,e])
//     }
//   };
//   const handleSearchSubmit =async(e)=>{
//     e.preventDefault();
//     await fetchJobs();
//    };
//    const handleShowMore= async (e)=>{
//     e.preventDefault();
//     setPage((prev)=>prev+1);
//    }
//   useEffect(() => {
//     if(expVal.length>0){
//      let newExpVal=[];
 
//      expVal?.map((el)=>{
//        const newEl = el?.split("-");
//        newExpVal.push(Number(newEl[0]),Number(newEl[1]));
//      });
//      newExpVal?.sort((a , b) => a - b);
//      setFilterExp(`${newExpVal[0]} - ${newExpVal[newExpVal?.length]}`)
//     }
//    }, [expVal]);
//    useEffect(() => {
//    fetchJobs();
//    }, [sort,filterJobTypes,filterExp,page] );
//   return (
//     <div className="bg-[#dddddd]">
//       <Header
//         title="Find Your Dream Job with Ease"
//         type="home"
//         handleClick={handleSearchSubmit}
//         searchQuery={searchQuery}
//         setSearchQuery={setSearchQuery}
//         location={jobLocation}
//         setLocation={setJobLocation}
//       />

//       <div className="container mx-auto flex gap-6 2xl:gap-10 md:px-5 py-0 md:py-6 bg-[#dddddd]">
//         <div className="hidden md:flex flex-col w-1/6 h-fit bg-black shadow-sm bg-[#dddddd]">
//           <p className="text-lg font-semibold text-black bg-[#dddddd]">
//             Filter Search
//           </p>

//           <div className="py-2 bg-[#dddddd]">
//             <div className="flex justify-between mb-3 bg-[#dddddd]">
//               <p className="flex items-center gap-2 font-semibold text-blue-700 bg-[#dddddd]">
//                 <BiBriefcaseAlt2 />
//                 Job Type
//               </p>

//               <button className="text-blue-700 bg-[#dddddd]">
//                 <MdOutlineKeyboardArrowDown />
//               </button>
//             </div>

//             <div className="flex flex-col gap-2 bg-[#dddddd] text-black">
//               {jobTypes.map((jtype, index) => (
//                 <div
//                   key={index}
//                   className="flex gap-2 text-sm md:text-base  text-blue-600 bg-[#dddddd]"
//                 >
//                   <input
//                     type="checkbox"
//                     value={jtype}
//                     className="w-4 h-4  "
//                     onChange={(e) => filterJobs(e.target.value)}
//                   />
//                   <span>{jtype}</span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="py-2 mt-4 bg-[#dddddd]">
//             <div className="flex justify-between mb-3 text-blue-700 bg-[#dddddd]">
//               <p className="flex items-center gap-2 font-semibold text-blue-700 bg-[#dddddd]">
//                 <BsStars />
//                 Experience
//               </p>

//               <button>
//                 <MdOutlineKeyboardArrowDown />
//               </button>
//             </div>

//             <div className="flex flex-col gap-2 text-blue-600  bg-[#dddddd]">
//               {experience.map((exp) => (
//                 <div key={exp.title} className="flex gap-3 bg-[#dddddd]">
//                   <input
//                     type="checkbox"
//                     value={exp?.value}
//                     className="w-4 h-4 "
//                     onChange={(e) => filterExperience(e.target.value)}
//                   />
//                   <span>{exp.title}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         <div className="w-full md:w-5/6 px-5 md:px-0 bg-[#dddddd]">
//           <div className="flex items-center justify-between mb-4 ">
//             <p className="text-sm md:text-base text-black bg-[#dddddd]">
//               Showing: <span className="font-semibold">{recordCount}</span> Jobs
//               Available
//             </p>

//             <div className="flex flex-col md:flex-row gap-0 md:gap-2 md:items-center bg-[#dddddd]">
//               <p className="text-sm md:text-base text-black">Sort By:</p>

//               <ListBox sort={sort} setSort={setSort} />
//             </div>
//           </div>

//           <div className="w-full flex flex-wrap gap-4">
//           {data?.map((job, index) => {
//               const newJob={
//                 name: job?.company?.name,
//                 logo: job?.company?.profileUrl,
//                 ...job,
//               };

//               return <JobCard job={newJob} key={index} />
//             })}
//           </div>
//           {isFetching && (
//             <div className="py-10">
//               <Loading/>
//             </div>
//           )}

//           {numPage > page && !isFetching && (
//             <div className="w-full flex items-center justify-center pt-16 ">
//               <CustomButton
//               onClick={handleShowMore}
//                 title="Load More"
//                 containerStyles={`text-blue-600 py-1.5 px-5 focus:outline-none hover:bg-blue-700 hover:text-black rounded-full text-base border border-blue-600`}
//               />
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FindJobs;


import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BiBriefcaseAlt2 } from "react-icons/bi";
import { BsStars } from "react-icons/bs";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { apiRequest } from "../utils";
import Header from "../components/Header";
import { experience, jobTypes } from "../utils/data";
import { CustomButton, JobCard, ListBox } from "../components";
import Loading from './../components/Loading';

const FindJobs = () => {
  const [sort, setSort] = useState("Newest");
  const [expVal, setExpVal] = useState([]);
  const [page, setPage] = useState(1);
  const [numPage, setNumPage] = useState(1);
  const [recordCount, setRecordCount] = useState(0);
  const [data, setData] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [filterJobTypes, setFilterJobTypes] = useState([]);
  const [filterExp, setFilterExp] = useState([]);

  const [isFetching, setIsFetching] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const fetchJobs = async () => {
    setIsFetching(true);
    const params = new URLSearchParams();
    // console.log(params)

    if (page > 1) {
      params.set("page", page);
    }
    if (searchQuery) {
      params.set("search", searchQuery);
    }
    if (jobLocation) {
      params.set("location", jobLocation);
    }
    if (sort) {
      params.set("sort", sort);
    }
    if (filterJobTypes.length > 0) {
      params.set("jType", filterJobTypes.join(","));
    }
    if (expVal.length > 0) {
      params.set("exp", expVal.join(","));
    }

    const queryString = params.toString();

    try {
      const res = await apiRequest({
        url: `/jobs/find-jobs?${queryString}`,
        method: "GET",
      });
      setNumPage(res?.numOfPage);
      setRecordCount(res?.totalJobs);
      setData(res?.data);
      setIsFetching(false);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setIsFetching(false);
      // Handle the error, e.g., show an error message to the user
    }
  };

  const filterJobs = (val) => {
    if (filterJobTypes.includes(val)) {
      setFilterJobTypes(filterJobTypes.filter((el) => el !== val));
    } else {
      setFilterJobTypes([...filterJobTypes, val]);
    }
  };

  const filterExperience = (e) => {
    if (expVal.includes(e)) {
      setExpVal(expVal.filter((el) => el !== e));
    } else {
      setExpVal([...expVal, e]);
    }
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    await fetchJobs();
  };

  const handleShowMore = async (e) => {
    e.preventDefault();
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    if (expVal.length > 0) {
      let newExpVal = [];

      expVal.forEach((el) => {
        const newEl = el.split("-");
        newExpVal.push(Number(newEl[0]), Number(newEl[1]));
      });

      newExpVal.sort((a, b) => a - b);
      setFilterExp(`${newExpVal[0]} - ${newExpVal[newExpVal.length - 1]}`);
    }
  }, [expVal]);

  useEffect(() => {
    fetchJobs();
  }, [sort, filterJobTypes, filterExp, page]);

  return (
<>
<div className="bg-[#dddddd]">
     <Header
         title="Find Your Dream Job with Ease"
         type="home"
         handleClick={handleSearchSubmit}
         searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        location={jobLocation}
        setLocation={setJobLocation}
       />
       <div className="container mx-auto flex gap-6 2xl:gap-10 md:px-5 py-0 md:py-6 bg-[#dddddd]">
        <div className="hidden md:flex flex-col w-1/6 h-fit bg-black shadow-sm bg-[#dddddd]">
          <p className="text-lg font-semibold text-black bg-[#dddddd]">
            Filter Search
          </p>

         <div className="py-2 bg-[#dddddd]">
           <div className="flex justify-between mb-3 bg-[#dddddd]">
              <p className="flex items-center gap-2 font-semibold text-blue-700 bg-[#dddddd]">
                <BiBriefcaseAlt2 />
               Job Type
            </p>
              <button className="text-blue-700 bg-[#dddddd]">                <MdOutlineKeyboardArrowDown />
              </button>
            </div>

             <div className="flex flex-col gap-2 bg-[#dddddd] text-black">
              {jobTypes.map((jtype, index) => (
                <div
                 key={index}
                 className="flex gap-2 text-sm md:text-base  text-blue-600 bg-[#dddddd]"                >
                  <input                    type="checkbox"                    value={jtype}
                    className="w-4 h-4  "
                     onChange={(e) => filterJobs(e.target.value)}
                  />
                  <span>{jtype}</span>
                </div>               ))}
             </div>
           </div>

           <div className="py-2 mt-4 bg-[#dddddd]">
             <div className="flex justify-between mb-3 text-blue-700 bg-[#dddddd]">
               <p className="flex items-center gap-2 font-semibold text-blue-700 bg-[#dddddd]">
                <BsStars />
                Experience
               </p>

              <button>
                 <MdOutlineKeyboardArrowDown />
               </button>
             </div>

            <div className="flex flex-col gap-2 text-blue-600  bg-[#dddddd]">
            {experience.map((exp) => (
                 <div key={exp.title} className="flex gap-3 bg-[#dddddd]">
                   <input
                     type="checkbox"
                    value={exp?.value}
                    className="w-4 h-4 "
                    onChange={(e) => filterExperience(e.target.value)}
                  />
                  <span>{exp.title}</span>
               </div>
             ))}
           </div>
         </div>
        </div>

       <div className="w-full md:w-5/6 px-5 md:px-0 bg-[#dddddd]">
          <div className="flex items-center justify-between mb-4 ">
            <p className="text-sm md:text-base text-black bg-[#dddddd]">
              Showing: <span className="font-semibold">{recordCount}</span> Jobs
              Available
            </p>

<div className="flex flex-col md:flex-row gap-0 md:gap-2 md:items-center bg-[#dddddd]">
              <p className="text-sm md:text-base text-black">Sort By:</p>

              <ListBox sort={sort} setSort={setSort} />
            </div>          </div>

          <div className="w-full flex flex-wrap gap-4">
          {data?.map((job, index) => {
              const newJob={
                 name: job?.company?.name,
                 logo: job?.company?.profileUrl,
                 ...job,
               };

               return <JobCard job={newJob} key={index} />             })}
           </div>
           {isFetching && (
             <div className="py-10">
               <Loading/>
            </div>
           )}

           {numPage > page && !isFetching && (
           <div className="w-full flex items-center justify-center pt-16 ">
               <CustomButton
             onClick={handleShowMore}
                 title="Load More"
                 containerStyles={`text-blue-600 py-1.5 px-5 focus:outline-none hover:bg-blue-700 hover:text-black rounded-full text-base border border-blue-600`}
              />
            </div>
           )}
         </div>
       </div>
     </div>
</>
  );
};

export default FindJobs;
