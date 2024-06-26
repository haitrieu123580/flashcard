import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';

import LoadingPopup from '@/components/common/loading/loading-popup/LoadingPopup';
import NewsetSets from '@/components/home/newest-sets/NewsetSets';
import { Separator } from '@/components/ui/separator';
import LearningCards from '@/components/user-learning/learning-cards/LearningCards';
import RecommendList from '@/components/user-learning/recommend/RecommendList';
import UserNotStudiedCards from '@/components/user-learning/user-progress/UserLearningProgress';
import UserTestHistory from '@/components/user-learning/user-test-history/UserTestHistory';
import { getSetByIdAction } from '@/redux/set/slice';
import {
  getUserLearningSetProgressAction,
  updateUserProgressAction,
} from '@/redux/user-progress/slice';
import {
  addCardToMySetAction,
  getUserSetsListAction,
} from '@/redux/user-sets/slice';
import { getTestHistoryBySetIdAction } from '@/redux/user-tests/slice';

const LearnFlashcard = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [reset, setReset] = useState(false);
  const { data, isLoading } = useSelector((state: any) => state.Set);
  const { mySets } = useSelector((state: any) => state.UserSets);
  const { progress } = useSelector((state: any) => state.UserProgress);
  const { history } = useSelector((state: any) => state.UserTest);

  useEffect(() => {
    if (id) {
      getSetById(id);
    }
  }, [id]);

  const getSetById = (id: string) => {
    setReset(true);
    scrollTo(0, 0);
    dispatch({
      type: getSetByIdAction.type,
      payload: {
        id: id,
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
    dispatch({
      type: getUserSetsListAction.type,
      payload: {
        onSuccess: () => {},
      },
    });
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

  return (
    <div>
      <LoadingPopup open={isLoading} />
      <LearningCards
        data={data}
        progress={progress}
        onFlip={onFlip}
        id={id}
        reset={reset}
        setReset={setReset}
      />
      <UserNotStudiedCards data={data} progress={progress} />
      <UserTestHistory history={history} />
      <RecommendList id={id} />
    </div>
  );
};

export default LearnFlashcard;
