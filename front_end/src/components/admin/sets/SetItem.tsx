import { routerPaths } from '@/routes/path';
import { Pencil, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

import DeletePopup from '@/components/common/popup/DeletePopup';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Constants from '@/lib/Constants';
import {
  convertDateToString,
  isFunction,
  replacePathWithId,
  setColorLevel,
} from '@/lib/utils';

const SetItem = (props: any) => {
  const {
    data,
    onEdit,
    onDelete,
    onCreate,
    showAction = true,
    onClick,
  } = props;

  return (
    <Card
      className="my-6"
      onClick={() => {
        isFunction(onClick) && onClick(data);
      }}
    >
      <CardHeader className={''}>
        <CardTitle className="flex items-center justify-between">
          <span>{data?.name}</span>
          {showAction && (
            <div className="flex items-center gap-2">
              <Button variant={'secondary'}>
                <Link
                  to={replacePathWithId(routerPaths.ADMIN_SETS_EDIT, data?.id)}
                >
                  <Pencil />
                </Link>
              </Button>
              <DeletePopup
                onConfirmDelete={() => {
                  isFunction(onDelete) && onDelete(data?.id);
                }}
                TriggerComponent={
                  <Button variant={'destructive'}>
                    <Trash2 />
                  </Button>
                }
              />
            </div>
          )}
        </CardTitle>
        <CardDescription>
          <Badge variant="default">{`${data?.totalCards} cards`}</Badge>
          {data?.level && (
            <Badge
              className={setColorLevel(
                Constants.LEVEL[
                  data?.level as number as 0 | 1 | 2 | 3
                ].toString(),
              )}
            >
              {Constants.LEVEL[
                data?.level as number as 0 | 1 | 2 | 3
              ]?.toString()}
            </Badge>
          )}{' '}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-12 gap-6 overflow-hidden">
        <div className="col-span-8 grid grid-rows-2">
          <CardDescription className="row-span-1">
            {data?.description}
          </CardDescription>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between">
            <div>
              <p>
                <b>Created at: </b>
                {convertDateToString(data?.created_at)}
              </p>
              <p>
                <b>Created by: </b>
                {data?.created_by}
              </p>
            </div>
            <div>
              {data?.updated_at && (
                <p>
                  <b>Updated at: </b>
                  {convertDateToString(data?.updated_at)}
                </p>
              )}
              {data?.updated_by && (
                <p>
                  <b>Updated by: </b>
                  {data?.updated_by}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="col-span-4">
          {data?.image && (
            <>
              <img
                className="m-auto h-52 w-52 max-w-full rounded-lg object-cover"
                src={data?.image}
                alt="set"
              />
            </>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex gap-6"></CardFooter>
    </Card>
  );
};

export default SetItem;
