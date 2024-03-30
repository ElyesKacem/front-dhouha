import React, { useState } from "react";
import NavBar from "../components/layout/NavBar";
import ConcertForm from "../features/concert/ConcertForm"; 
import ConcertUForm from "../features/concert/ConcertUForm"; 
import SideBar from "../components/layout/SideBar";
import { useQuery } from "react-query";
import { getConcerts, deleteConcert, updateConcert } from "../api/concertApi"; 
import ConcertTableLine from "../features/concert/LineTable"; 
import { toast } from "react-hot-toast";

function ConcertPage(props) {
  const {
    data: concerts,
    isFetching,
    isSuccess,
    refetch,
    ...rest
  } = useQuery(["getConcerts", 1], () => getConcerts(), {});
  const [concert, setConcert] = useState(null);

  const [concertToUpdate, setConcertToUpdate] = useState(null); 

  /*const updateConcerts = async (updatedConcert) => {
    try {
      await updateConcert(updatedConcert._id, updatedConcert);
      toast.success("Concert successfully updated!");
      setConcertToUpdate(null); 
      refetch();
    } catch (error) {
      toast.error(error.response.data.errors[0].msg);
    }
  };*/
  const handleConcertAdded = (newConcert) => {
    refetch(); 
  };
  const deleteConcerts = async (id) => {
    deleteConcert(id)
      .then((res) => {
        toast.success("Concert successfully deleted!");
        refetch();
      })
      .catch((err) => {
        toast.error(err.response.data.errors[0].msg);
      });
  };
  return (
    <div className="flex w-screen">
      <SideBar />
      <div className="w-full">
        <NavBar />
        <div className="flex gap-6 h-full bg-gray-200 p-10">
        {concertToUpdate ? ( 
            <ConcertUForm
              concert={concertToUpdate}
              refetch={refetch}
            />
          ) : (
            <ConcertForm refetch={refetch} onConcertAdded={handleConcertAdded} />
          )}
          <div className=" bg-white w-3/4  p-8 pb-0 shadow-md">
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase  dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Nom
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Lieu
                    </th>
                    
                    <th scope="col" className="px-6 py-3">
                      Description
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Oeuvres
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Liste candidats
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {concerts &&
                    concerts?.data.data.map((concert, index) => (
                      <ConcertTableLine
                        key={index}
                        concert={concert}
                        editFun={setConcertToUpdate}
                        deleteFun={() => deleteConcerts(concert._id)}
                      />
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConcertPage;
