import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/axios';

const RankPage = () => {
  const [stores, setStores] = useState([]);
  const [adStore, setAdStore] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await api.get('/api/v1/store/top10');
        setStores(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('데이터를 불러올 수 없습니다.');
      }
    };

    const fetchAdStore = async () => {
      try {
        const response = await api.get('/api/v1/store/ad');
        setAdStore(response.data);
      } catch (error) {
        console.error('Error fetching ad data:', error);
        setError('광고 데이터를 불러올 수 없습니다.');
      }
    };

    fetchStores();
    fetchAdStore();
  }, []);

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const getGradientClass = (index) => {
    if (index === 0) {
      return 'bg-gradient-to-r from-[#E3F2FD] to-[#90CAF9]';
    } else if (index === 1) {
      return 'bg-gradient-to-r from-[#F0F4F8] to-[#E3F2FD]';
    } else if (index === 2) {
      return 'bg-gradient-to-r from-[#FFFFFF] to-[#F0F4F8]';
    } else {
      return 'bg-white';
    }
  };

  const getHoverGradientClass = (index) => {
    if (index === 0) {
      return 'hover:bg-gradient-to-l hover:from-[#90CAF9] hover:to-[#64B5F6]';
    } else if (index === 1) {
      return 'hover:bg-gradient-to-l hover:from-[#E3F2FD] hover:to-[#BBDEFB]';
    } else if (index === 2) {
      return 'hover:bg-gradient-to-l hover:from-[#F0F4F8] hover:to-[#E3F2FD]';
    } else {
      return 'hover:bg-gray-100';
    }
  };

  const truncateStoreName = (name) => {
    if (name.length > 15) {
      return name.slice(0, 10) + '...';
    }
    return name;
  };

  return (
    <div className="mx-auto max-w-lg p-4">
      <div className="flex items-center justify-between">
        <div className="inline-flex h-8 items-center justify-start gap-3 rounded-[10px] p-2.5">
          <svg
            onClick={handleGoBack}
            width="8"
            height="14"
            viewBox="0 0 8 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 13L1 7L7 1"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <div className="stores space-y-4 pb-20">
        {error && <p className="text-red-500">{error}</p>}

        {adStore && (
          <div
            className="store-item relative flex cursor-pointer items-center space-x-4 rounded-lg p-4 shadow-md transition"
            style={{
              borderImage:
                'linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet) 1',
              borderWidth: '4px',
              borderStyle: 'solid',
            }}
            onClick={() => navigate(`/detail/${adStore.storeId}`)}
          >
            <div
              className="store-rank text-mb font-bold text-gray-800"
              style={{ width: '15px' }} // 숫자가 차지하는 공간만큼의 너비로 설정
            ></div>
            <div className="absolute left-2 top-2 rounded-full border border-gray-300 bg-white px-2 py-1 text-xs text-gray-500">
              <span className="text-[10px] font-extrabold uppercase tracking-wide text-indigo-600 drop-shadow-sm">
                AD
              </span>
            </div>
            <img
              src={adStore.storeThumbnailUrl}
              alt={adStore.storeName}
              className="store-image rounded-lg object-cover"
              style={{ width: '220px', height: '112px' }}
            />
            <div className="store-summary flex-1">
              <h4 className="truncate text-xs font-semibold text-gray-800">
                {truncateStoreName(adStore.storeName)}
              </h4>
            </div>
            <div className="absolute right-2 top-2 text-xs font-bold text-blue-600">
              신한은행 연계 팝업
            </div>
          </div>
        )}

        {stores.map((store, index) => (
          <div
            key={store.storeId}
            className={`store-item relative flex items-center space-x-4 p-4 ${getGradientClass(index)} shadow-md ${getHoverGradientClass(index)} cursor-pointer rounded-lg transition`}
            onClick={() => navigate(`/detail/${store.storeId}`)}
          >
            <div className="store-rank text-mb font-bold text-gray-800">
              #{index + 1}
            </div>
            <img
              src={store.storeThumbnailUrl}
              alt={store.storeName}
              className="store-image rounded-lg object-cover"
              style={{ width: '220px', height: '112px' }}
            />
            <div className="store-summary flex-1">
              <h4 className="truncate text-xs font-semibold text-gray-800">
                {truncateStoreName(store.storeName)}
              </h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(RankPage);
