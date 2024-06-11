import { useEffect, useState } from 'react';
import { routerPaths } from '@/routes/path';
import { PlusCircleIcon } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';

import CustomPagination from '@/components/common/custom-pagination/CustomPagination';
import LoadingPopup from '@/components/common/loading/loading-popup/LoadingPopup';
import SetItem from '@/components/home/newest-sets/SetItem';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import {
  deleteUserSetAction,
  getUserSetsListAction,
} from '@/redux/user-sets/slice';
import Constants from '@/lib/Constants';
import { replacePathWithId } from '@/lib/utils';

const MySetsList = () => {
  const { mySets, isLoading, pagination } = useSelector(
    (state: any) => state.UserSets,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getUserSetsList = () => {
    dispatch({
      type: getUserSetsListAction.type,
      payload: {
        onSuccess: () => {
          // console.log('success')
        },
        onError: (message: string) => {
          setErrorMessage(message || 'Something went wrong');
        },
      },
    });
  };
  useEffect(() => {
    getUserSetsList();
  }, []);
  const [pageNumber, setPageNumber] = useState(1);
  const [filter, setFilter] = useState(Constants.SORT_BY[0].key);
  let [searchParams, setSearchParams] = useSearchParams();
  const [errorMessage, setErrorMessage] = useState('');

  const onSelectFilter = (filter: any) => {
    setFilter(filter);
    const param: Record<string, string> = {
      page_index: pageNumber.toString(),
      filter: filter || '',
      name: searchParams.get('name') || '',
    };
    setSearchParams(param);
  };
  const onChangePageNumber = (pageNumber: number) => {
    setPageNumber(pageNumber);
    const param: Record<string, string> = {
      page_index: pageNumber.toString(),
      filter: filter || '',
      name: searchParams.get('name') || '',
    };
    setSearchParams(param);
  };
  const gotoCard = (id: string = '') => {
    navigate(replacePathWithId(routerPaths.LEARN_MY_SET, id));
  };

  const onDelete = (id: string) => {
    dispatch({
      type: deleteUserSetAction.type,
      payload: {
        id: id,
        onSuccess: () => {
          getUserSetsList();
          toast({
            title: 'Delete set success',
            variant: 'default',
          });
        },
        onError: (message: string) => {
          toast({
            title: 'Delete failed',
            description: message ? message : 'Please try again!',
            variant: 'destructive',
          });
        },
      },
    });
  };
  return (
    <div>
      <div className="my-4 flex justify-end">
        <Link to={routerPaths.CREATE_MY_SET}>
          <Button variant="outline" className="">
            <PlusCircleIcon size={20} />
            <span className="ml-2">Create New Set</span>
          </Button>
        </Link>
      </div>

      <LoadingPopup open={isLoading} />
      <div className="grid grid-rows-1 gap-10 md:grid-cols-6">
        {Array.isArray(mySets?.sets) &&
          mySets?.sets.map((set: any, index: number) => {
            const data = {
              ...set,
              totalCards: set.cards?.length || 0,
            };
            return (
              <div key={index} className="row-span-1 md:col-span-2">
                <SetItem
                  data={data}
                  onClick={gotoCard}
                  showEditBtn={true}
                  showDeleteBtn={true}
                  onEditBtn={(id: string) => {
                    navigate(replacePathWithId(routerPaths.EDIT_MY_SET, id));
                  }}
                  onDeleteBtn={(id: string) => {
                    onDelete(id);
                  }}
                />
              </div>
            );
          })}
      </div>

      {errorMessage && (
        <div className="row-span-1 md:col-span-6">
          <div className="text-center text-red-500">{errorMessage}</div>
        </div>
      )}

      <div className="mt-10 flex justify-center">
        <CustomPagination
          total={pagination?.total || 0}
          itemCount={1}
          siblingCount={1}
          limit={Constants.PAGINATION.LIMIT}
          onChange={(e: any) => {
            onChangePageNumber(e);
          }}
          page={pageNumber}
        />
      </div>
    </div>
  );
};

export default MySetsList;
