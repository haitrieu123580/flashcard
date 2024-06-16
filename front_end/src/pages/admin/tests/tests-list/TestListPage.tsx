import { useEffect, useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';

import TestCard from '@/components/admin/tests/TestCard/TestCard';
import CustomPagination from '@/components/common/custom-pagination/CustomPagination';
import LoadingPopup from '@/components/common/loading/loading-popup/LoadingPopup';
import LoadingSpinner from '@/components/common/loading/loading-spinner/LoadingSpinner';
import CommonPopup from '@/components/common/popup/CommonPopup';
import { Button } from '@/components/ui/button';
import { CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { getAllSetsAction } from '@/redux/public-sets/slice';
import {
  createSetAction,
  deleteSetAction,
  getSetByIdAction,
} from '@/redux/set/slice';
import Constants from '@/lib/Constants';
import { objectToFormData } from '@/lib/utils';

const TestListPage = () => {
  const { data, pagination, isLoading } = useSelector(
    (state: any) => state.Sets,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [defaultValues, setDefaultValues] = useState({} as any);
  const [pageNumber, setPageNumber] = useState(1);
  let [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    getSets({
      pageNumber: searchParams.get('page_index')
        ? parseInt(searchParams.get('page_index')!)
        : 1,
      filter: searchParams.get('filter') || Constants.SORT_BY[0].key,
      name: searchParams.get('name') || '',
    });
  }, [searchParams]);

  const getSets = ({
    pageNumber,
    filter,
    name,
  }: {
    pageNumber: number;
    filter: string;
    name: string;
  }) => {
    setPageNumber(pageNumber);
    dispatch({
      type: getAllSetsAction.type,
      payload: {
        page_size: Constants.DEFAULT_PAGESIZE,
        page_index: pageNumber,
        filter: filter,
        name: name || null,
        onSuccess: () => { },
        onError: (message: string) => {
          toast({
            title: 'Error',
            description: message,
            variant: 'destructive',
          });
        },
      },
    });
  };

  const onChangePageNumber = (pageNumber: number) => {
    setPageNumber(pageNumber);
    const param: Record<string, string> = {
      page_index: pageNumber.toString(),
      name: searchParams.get('name') || '',
    };
    setSearchParams(param);
  };
  return (
    <div>
      <div className="mt-6 flex justify-between">
        <CardTitle>Test kits</CardTitle>
      </div>
      {/* {
                isLoading
                    ? <div className='w-full h-full flex justify-center items-center'><LoadingSpinner /></div>
                    : <> */}
      <LoadingPopup open={isLoading} />
      {Array.isArray(data) &&
        data.map((set, index) => {
          return (
            <div key={index} className="row-span-1 md:col-span-2">
              <TestCard data={set} />
            </div>
          );
        })}
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
      {/* </>
            } */}
    </div>
  );
};

export default TestListPage;
