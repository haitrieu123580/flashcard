import { useEffect, useState } from 'react';
import { routerPaths } from '@/routes/path';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';

import SetItem from '@/components/admin/sets/SetItem';
import CustomPagination from '@/components/common/custom-pagination/CustomPagination';
import LoadingPopup from '@/components/common/loading/loading-popup/LoadingPopup';
import { CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import {
  getPendingSetsListAction,
  getSetByAdminAction,
} from '@/redux/approve-sets/slice';
import Constants from '@/lib/Constants';
import { replacePathWithId } from '@/lib/utils';

const PendingSetsListPage = () => {
  const { data, pagination, isLoading } = useSelector(
    (state: any) => state.ApproveSet,
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
      filter: searchParams.get('filter') || '',
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
      type: getPendingSetsListAction.type,
      payload: {
        page_size: Constants.DEFAULT_PAGESIZE,
        page_index: pageNumber,
        filter: filter,
        name: name || null,
        onSuccess: () => {},
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

  const GetSetById = (set: any) => {
    navigate(replacePathWithId(routerPaths.ADMIN_PENDING_SET, set.id));
  };

  return (
    <div>
      <div className="mt-6 flex justify-between">
        <CardTitle>Pending Sets</CardTitle>
      </div>
      <LoadingPopup open={isLoading} />
      {Array.isArray(data) &&
        data.map((set, index) => {
          return (
            <div key={index} className="row-span-1 md:col-span-2">
              <SetItem showAction={false} data={set} onClick={GetSetById} />
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
    </div>
  );
};

export default PendingSetsListPage;
