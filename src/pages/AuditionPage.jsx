import React, { useState } from "react";
import NavBar from "../components/layout/NavBar";
import AuditionForm from "../features/audition/AuditionForm";
import AuditionLineTable from "../features/audition/AuditionLineTable";
import SideBar from "../components/layout/SideBar";
import { deleteAuditions } from "../api/auditionApi";
import { toast } from "react-hot-toast";
import { Pagination } from "../components/table/Pagination";
import { usePaginatedData } from "../hooks/apiHooks/useGetData";

function AuditionPage() {
  const [selectedAudition, setSelectedAudition] = useState(null);

  const {
    data: auditions,
    loadMore,
    selectPage,
  } = usePaginatedData("/audition", "getAuditions");

  const deleteAuditionHandler = async (id) => {
    try {
      await deleteAuditions(id);
      toast.success("Audition deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete audition.");
    }
  };

  const updateAudition = (audition) => {
    setSelectedAudition(audition);
  };

  return (
    <div className="flex w-screen">
      <button onClick={loadMore}>Load More</button>
      <SideBar />
      <div className="w-full">
        <NavBar />
        <div className="flex gap-6 h-full bg-gray-200 p-10">
          {selectedAudition ? (
            <AuditionForm
              audition={selectedAudition}
              setSelectedAudition={setSelectedAudition}
            />
          ) : (
            <AuditionForm />
          )}
          <div className=" bg-white w-3/4  p-8 pb-0 shadow-md">
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase  dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Season
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Audition Starting Date
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Starting Date
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Ending Date
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Number of Candidates per Day
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {auditions &&
                    auditions.data.map((audition, key) => {
                      return (
                        <AuditionLineTable
                          key={key}
                          audition={audition}
                          editFun={() => updateAudition(audition)}
                          deleteFun={() => deleteAuditionHandler(audition._id)}
                        />
                      );
                    })}
                </tbody>
              </table>
              <div className="w-full flex justify-end mt-4">
                <Pagination
                  selectPage={selectPage}
                  nbPages={auditions?.paginationResult.numberOfPages}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuditionPage;
