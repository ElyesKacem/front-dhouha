import React, { useState } from "react";
import NavBar from "../components/layout/NavBar";
import MusicalForm from "../features/musical/MusicalForm";
import MusicalUForm from "../features/musical/MusicalUForm";
import SideBar from "../components/layout/SideBar";
import { deleteMusicals } from "../api/musicalApi";
import LineTable from "../features/musical/LineTable";
import { toast } from "react-hot-toast";
import { usePaginatedData } from "../hooks/apiHooks/useGetData";
import { Pagination } from "../components/table/Pagination";

function MusicalPage(props) {
  const [music, setMusic] = useState(null);
  const updateMusic = (music) => {
    setMusic(music);
  };

  const {
    data: musicals,
    loadMore,
    selectPage,
  } = usePaginatedData("/musical", "getMusicals");
  console.log();
  const deleteMusic = async (id) => {
    deleteMusicals(id)
      .then((res) => {
        toast.success("Successfully deleted!");
        refetch();
      })
      .catch((err) => {
        toast.error(err.response.data.errors[0].msg);
      });
  };

  return (
    <div className="flex w-screen">
      <button onClick={loadMore}>next</button>
      <SideBar />
      <div className="w-full">
        <NavBar />
        <div className="flex gap-6 h-full bg-gray-200 p-10">
          {music ? (
            <MusicalUForm
              music={music}
              setMusic={setMusic}
              refetch={() => refetch()}
            />
          ) : (
            <MusicalForm />
          )}
          <div className=" bg-white w-3/4  p-8 pb-0 shadow-md">
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase  dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      title
                    </th>
                    <th scope="col" className="px-6 py-3">
                      genre
                    </th>
                    <th scope="col" className="px-6 py-3">
                      lyrics
                    </th>
                    <th scope="col" className="px-6 py-3">
                      arrangeurs
                    </th>
                    <th scope="col" className="px-6 py-3">
                      date_composition
                    </th>
                    <th scope="col" className="px-6 py-3">
                      action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {musicals &&
                    musicals.data.map((music, key) => {
                      return (
                        <LineTable
                          key={key}
                          musical={music}
                          editFun={() => updateMusic(music)}
                          deleteFun={() => deleteMusic(music._id)}
                        />
                      );
                    })}
                </tbody>
              </table>{" "}
              <div className="w-full flex justify-end mt-4">
                <Pagination
                  selectPage={selectPage}
                  nbPages={musicals?.paginationResult.numberOfPages}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MusicalPage;



  // const {
  //   data: musicals,
  //   isFetching,
  //   isSuccess,
  //   refetch,
  //   ...rest
  // } = useQuery(["getMusicals", 1], () => getMusicals(), {});