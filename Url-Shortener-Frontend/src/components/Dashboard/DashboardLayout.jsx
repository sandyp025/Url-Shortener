import React, { useState } from 'react';
import Graph from './Graph';
import { dummyData } from '../../dummyData/data';
import { useStoreContext } from '../../contextApi/ContextApi';
import { useFetchMyShortUrls, useFetchTotalClicks } from '../../hooks/useQuery';
import ShortenPopUp from './ShortenPopUp';
import ShortenUrlList from './ShortenUrlList';

const DashboardLayout = () => {
  const { token } = useStoreContext();
  const [shortenPopUp, setShortenPopUp] = useState(false);

  function onError() {
    console.log('ERROR');
  }

  const { isLoading: urlsLoading, data: myShortUrls, refetch } =
    useFetchMyShortUrls(token, onError);

  const { isLoading: clicksLoading, data: totalClicks } =
    useFetchTotalClicks(token, onError);

  const graphData = totalClicks && totalClicks.length ? totalClicks : dummyData;

  return (
    <div className="lg:px-14 sm:px-8 px-4 min-h-[calc(100vh-64px)]">
      <div className="lg:w-[90%] w-full mx-auto py-16">
        <div className="h-96 relative">
          <Graph graphData={graphData} />
        </div>

        <div className="py-5 sm:text-end text-center">
          <button
            className="bg-custom-gradient px-4 py-2 rounded-md text-white"
            onClick={() => setShortenPopUp(true)}
          >
            Create a New Short URL
          </button>
        </div>

        {/* ▼ Added list rendering */}
        <div className="mt-6">
          {urlsLoading ? (
            <div className="text-center text-slate-600">Loading your links…</div>
          ) : !myShortUrls || myShortUrls.length === 0 ? (
            <div className="text-center text-slate-600">
              You haven’t created any short links yet.
            </div>
          ) : (
            <ShortenUrlList data={myShortUrls} />
          )}
        </div>
      </div>

      <ShortenPopUp
        open={shortenPopUp}
        setOpen={setShortenPopUp}
        refetch={refetch}
      />
    </div>
  );
};

export default DashboardLayout;
