import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';

import LoadingPopup from '@/components/common/loading/loading-popup/LoadingPopup';
import NewsetSets from '@/components/home/newest-sets/NewsetSets';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import LearningCards from '@/components/user-learning/learning-cards/LearningCards';
import RecommendList from '@/components/user-learning/recommend/RecommendList';
import UserNotStudiedCards from '@/components/user-learning/user-progress/UserLearningProgress';
import UserTestHistory from '@/components/user-learning/user-test-history/UserTestHistory';
import {
  getUserLearningSetProgressAction,
  updateUserProgressAction,
} from '@/redux/user-progress/slice';
import {
  addCardToMySetAction,
  getUserSetByIdAction,
  getUserSetsListAction,
  requestToApproveSetAction,
} from '@/redux/user-sets/slice';
import { getTestHistoryBySetIdAction } from '@/redux/user-tests/slice';
import Constants from '@/lib/Constants';

const LearnFlashcard = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentCard, setCurrentCard] = useState(0);
  const { mySets, set, isLoading } = useSelector(
    (state: any) => state.UserSets,
  );
  const { progress } = useSelector((state: any) => state.UserProgress);
  const { history } = useSelector((state: any) => state.UserTest);

  useEffect(() => {
    if (id) {
      getSetById(id);
    }
  }, [id]);

  const getSetById = (id: string) => {
    setCurrentCard(0);
    scrollTo(0, 0);
    dispatch({
      type: getUserSetByIdAction.type,
      payload: {
        id: id,
        // onSuccess: () => {
        // },
        // onError: (error: string) => {
        // }
      },
    });
    dispatch({
      type: getUserLearningSetProgressAction.type,
      payload: {
        data: {
          setId: id,
        },
      },
    });
    dispatch({
      type: getTestHistoryBySetIdAction.type,
      payload: {
        setId: id,
      },
    });
  };
  const getUserSetsList = () => {
    dispatch({
      type: getUserSetsListAction.type,
    });
  };
  useEffect(() => {
    if (mySets.length === 0) {
      getUserSetsList();
    }
  }, [mySets]);

  const showCard = (index: number) => {
    if (index >= set?.cards?.length || index < 0) {
      return;
    }
    setCurrentCard(index);
  };
  const onFlip = (card: any) => {
    dispatch({
      type: updateUserProgressAction.type,
      payload: {
        data: {
          setId: id,
          cardId: card?.id,
        },
      },
    });
  };

  const buttonColor = (status: string) => {
    switch (status) {
      case Constants.SET_STATUS.APPROVED:
        return 'default';
      case Constants.SET_STATUS.PENDING:
        return 'secondary';
      case Constants.SET_STATUS.REJECTED:
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const onRequestToApproveSet = () => {
    dispatch({
      type: requestToApproveSetAction.type,
      payload: {
        setId: id,
        onSuccess: (message: string) => {
          toast({
            title: 'Success',
            description: message ? message : 'Your set is pending',
            variant: 'default',
          });
        },
        onError: (message: string) => {
          toast({
            title: 'Error',
            description: message ? message : 'Failed :(',
            variant: 'destructive',
          });
        },
      },
    });
  };
  return (
    <div>
      <LoadingPopup open={isLoading} />
      <div className="flex w-full justify-end">
        {set?.status ? (
          <>
            <Button onClick={() => {}} variant={buttonColor(set.status)}>
              {set?.status.toUpperCase()}
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={() => {
                onRequestToApproveSet();
              }}
              variant={buttonColor(set.status)}
            >
              {'Publish your set'}
            </Button>
          </>
        )}
      </div>
      <LearningCards data={set} onFlip={onFlip} id={id} progress={progress} />
      <UserNotStudiedCards data={set} progress={progress} />

      <UserTestHistory history={history} />
      <RecommendList id={id} />
      {/* 
      <div className="mt-10">
        <NewsetSets />
      </div> */}
    </div>
  );
};

export default LearnFlashcard;
