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

const TestCard = (props: any) => {
  const { data, onEdit, onDelete, onCreate } = props;

  return (
    <Card className="my-6">
      <CardHeader className={''}>
        <CardTitle className="flex items-center justify-between">
          <span>{data?.name}</span>
          <div className="flex items-center gap-2">
            <Button variant={'secondary'}>
              <Link
                to={replacePathWithId(
                  routerPaths.ADMIN_TEST_KITS_IN_SET,
                  data?.id,
                )}
              >
                <Pencil />
              </Link>
            </Button>
          </div>
        </CardTitle>
        <CardDescription>
          <Badge variant="default">{`${data?.totalTestKits} kits`}</Badge>
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
        </div>
      </CardContent>
    </Card>
  );
};

export default TestCard;
