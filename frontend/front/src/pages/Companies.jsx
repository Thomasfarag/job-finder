// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { CompanyCard, CustomButton, Header, ListBox } from "../components";
// // import { companies } from "../utils/data";
// import Loading from './../components/Loading';
// import { apiRequest, updateURL } from "../utils";

// const Companies = () => {
//   const [page, setPage] = useState(1);
//   const [numPage, setNumPage] = useState(1);
//   const [recordsCount, setRecordsCount] = useState(0);
//   const [data, setData] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [cmpLocation, setCmpLocation] = useState("");
//   const [sort, setSort] = useState("Newest");
//   const [isFetching, setIsFetching] = useState(false);

//   const location = useLocation();
//   const navigate = useNavigate();
//   console.log(location)


// const fetchCompanies = async () => {
//   setIsFetching(true);
//   const newURL = updateURL({
//     pageNum: page,
//     query: searchQuery,
//     cmpLoc: cmpLocation,
//     sort: sort,
//     navigate: navigate,
//     location: location,  // Make sure location is correctly passed
//   });
// console.log(newURL, "this URL")
//   try {
//     const res = await apiRequest({
//       url: newURL,
//       method: "GET",
//     });

//     console.log(res);
//     setNumPage(res?.numOfPage);
//     setRecordsCount(res?.total);
//     setData(res?.data);
//     setIsFetching(false);
//   } catch (e) {
//     console.log(e);
//   }
//   console.log(newURL, "this URL")

// };



//   const handleSearchSubmit = async(e) => {
//     e.preventDefault();
//     await fetchCompanies();
//   };
//   const handleShowMore = () => {};
// useEffect(() => {
// fetchCompanies()  


// }, [page,sort])

//   return (
//     <div className="w-full bg-[#bbbbbb] ">
//       <Header
//         title="Find Your Dream Company"
//         handleClick={handleSearchSubmit}
//         searchQuery={searchQuery}
//         setSearchQuery={setSearchQuery}
//         location={cmpLocation}
//         setLocation={setCmpLocation}
//       />

//       <div className="container mx-auto flex flex-col gap-5 2xl:gap-10 px-5  py-6   bg-[#bbbbbb]">
//         <div className="flex items-center justify-between mb-4 ">
//           <p className="text-sm md:text-base text-gray-700">
//             Shwoing: <span className="font-semibold">{recordsCount}</span>{" "}
//              Companies Available
//           </p>

//           <div className="flex flex-col md:flex-row gap-0 md:gap-2 md:items-center">
//             <p className="text-sm md:text-base text-gray-700">Sort By:</p>

//             <ListBox sort={sort} setSort={setSort} />
//           </div>
//         </div>

//         <div className="w-full flex flex-col gap-6 text-gray-600">
//           {data?.map((cmp, index) => (
//             <CompanyCard cmp={cmp} key={index} />
//           ))}

//           {isFetching && (
//             <div className="mt-10 text-gray-600">
//               <Loading />
//             </div>
//           )}

//           <p className="text-sm text-right text-black">
//             {data?.length} records out of {recordsCount}
//           </p>
//         </div>

//         {numPage > page && !isFetching && (
//           <div className="w-full flex items-center justify-center pt-16 text-gray-600 ">
//             <CustomButton
//               onClick={handleShowMore}
//               title="Load More"
//               containerStyles={`text-blue-600 py-1.5 px-5 focus:outline-none hover:bg-blue-700 hover:text-white rounded-full text-base border border-blue-600`}
//             />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Companies;



import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CompanyCard, CustomButton, Header, ListBox } from "../components";
import Loading from './../components/Loading';
import { apiRequest } from "../utils";

const Companies = () => {
  const [page, setPage] = useState(1);
  const [numPage, setNumPage] = useState(1);
  const [recordsCount, setRecordsCount] = useState(0);
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [cmpLocation, setCmpLocation] = useState("");
  const [sort, setSort] = useState("Newest");
  const [isFetching, setIsFetching] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  console.log(location);

  const fetchCompanies = async () => {
    setIsFetching(true);
    const queryString = `page=${page}&query=${searchQuery}&cmpLoc=${cmpLocation}&sort=${sort}`;

    try {
      const res = await apiRequest({
        url: `/companies?${queryString}`,
        method: "GET",
      });

      console.log(res);
      setNumPage(res?.numOfPage);
      setRecordsCount(res?.total);
      setData(res?.data);
      setIsFetching(false);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    await fetchCompanies();
  };

  const handleShowMore = () => {
    // Implement logic for loading more companies
  };

  useEffect(() => {
    fetchCompanies();
  }, [page, sort]);

  return (
    <div className="w-full bg-[#bbbbbb]">
      <Header
        title="Find Your Dream Company"
        handleClick={handleSearchSubmit}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        location={cmpLocation}
        setLocation={setCmpLocation}
      />

      <div className="container mx-auto flex flex-col gap-5 2xl:gap-10 px-5 py-6 bg-[#bbbbbb]">
        <div className="flex items-center justify-between mb-4 ">
          <p className="text-sm md:text-base text-gray-700">
            Showing: <span className="font-semibold">{recordsCount}</span> Companies Available
          </p>

          <div className="flex flex-col md:flex-row gap-0 md:gap-2 md:items-center">
            <p className="text-sm md:text-base text-gray-700">Sort By:</p>
            <ListBox sort={sort} setSort={setSort} />
          </div>
        </div>

        <div className="w-full flex flex-col gap-6 text-gray-600">
          {data?.map((cmp, index) => (
            <CompanyCard cmp={cmp} key={index} />
          ))}

          {isFetching && (
            <div className="mt-10 text-gray-600">
              <Loading />
            </div>
          )}

          <p className="text-sm text-right text-black">
            {data?.length} records out of {recordsCount}
          </p>
        </div>

        {numPage > page && !isFetching && (
          <div className="w-full flex items-center justify-center pt-16 text-gray-600 ">
            <CustomButton
              onClick={handleShowMore}
              title="Load More"
              containerStyles={`text-blue-600 py-1.5 px-5 focus:outline-none hover:bg-blue-700 hover:text-white rounded-full text-base border border-blue-600`}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Companies;
