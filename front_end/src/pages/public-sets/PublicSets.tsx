import { useEffect, useState } from 'react';
import { routerPaths } from '@/routes/path';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';

import { FormInput } from '@/components/common/custom_input/CustomInput';
import CustomPagination from '@/components/common/custom-pagination/CustomPagination';
import LoadingPopup from '@/components/common/loading/loading-popup/LoadingPopup';
import LoadingSpinner from '@/components/common/loading/loading-spinner/LoadingSpinner';
import SetItem from '@/components/home/newest-sets/SetItem';
import { Form } from '@/components/ui/form';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from '@/components/ui/use-toast';
import { getAllSetsAction } from '@/redux/public-sets/slice';
import Constants from '@/lib/Constants';
import { replacePathWithId } from '@/lib/utils';

const PublicSets = () => {
  const form = useForm({
    defaultValues: {
      sort_by: Constants.SORT_BY[0].key,
    },
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, pagination, isLoading } = useSelector(
    (state: any) => state.Sets,
  );
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
    navigate(replacePathWithId(routerPaths.LEARN_FLASHCARD, id));
  };
  const getSets = ({
    pageNumber,
    filter,
    name,
  }: {
    pageNumber: number;
    filter: string;
    name: string;
  }) => {
    dispatch({
      type: getAllSetsAction.type,
      payload: {
        page_size: Constants.DEFAULT_PAGESIZE,
        page_index: pageNumber,
        filter: filter || Constants.SORT_BY[0].key,
        name: name || null,
        onSuccess: () => {},
        onError: (message: string) => {
          setErrorMessage(message);
          toast({
            title: 'Error',
            description: message,
            variant: 'destructive',
          });
        },
      },
    });
  };

  useEffect(() => {
    getSets({
      pageNumber: searchParams.get('page_index')
        ? parseInt(searchParams.get('page_index')!)
        : 1,
      filter: searchParams.get('filter') || '',
      name: searchParams.get('name') || '',
    });
  }, [searchParams]);

  return (
    <div>
      <div className="flex justify-end">
        <Form {...form}>
          <form className="w-fit">
            <FormInput
              control={form.control}
              fieldName="sort_by"
              type={Constants.INPUT_TYPE.SELECT}
              options={Constants.SORT_BY}
              placeholder="Sort by"
              onChangeSelect={onSelectFilter}
            />
          </form>
        </Form>
      </div>

      <LoadingPopup show={isLoading} />
      <div className="grid grid-rows-1 gap-10 md:grid-cols-6">
        {Array.isArray(data) &&
          data.map((set, index) => {
            return (
              <div key={index} className="row-span-1 md:col-span-2">
                <SetItem data={set} onClick={gotoCard} />
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

export default PublicSets;
