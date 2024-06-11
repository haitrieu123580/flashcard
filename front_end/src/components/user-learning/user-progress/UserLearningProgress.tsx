import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const UserNotStudiedCards = (props: any) => {
  const { data, progress } = props;
  return (
    <div>
      {data?.cards?.length - progress?.studiedCards?.length > 0 && (
        <>
          <div className="m-6">
            <CardTitle className="text-blue-400">
              {`Not studied (
                        ${
                          typeof (
                            data?.cards?.length - progress?.studiedCards?.length
                          ) === 'number' && progress?.studiedCards?.length
                            ? data?.cards?.length -
                              progress?.studiedCards?.length
                            : data?.cards?.length
                        })`}
            </CardTitle>
            <div className="flex flex-wrap items-start justify-center space-x-4">
              {data?.cards
                ?.filter(
                  (card: any) => !progress?.studiedCards?.includes(card.id),
                )
                .map((card: any) => {
                  return (
                    <Card className="col-span-1 my-4 w-fit">
                      <CardTitle></CardTitle>
                      <CardContent className="mt-4 w-fit">
                        <div className="flex h-5 w-fit items-center space-x-4">
                          <div>{card?.term}</div>
                          <Separator orientation="vertical" />
                          <div>{card?.define}</div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserNotStudiedCards;
