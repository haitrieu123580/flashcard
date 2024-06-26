import CurrentLearning from '@/components/current-learning/CurrentLearning';
import Banner from '@/components/home/banner/Banner';
import NewsetSets from '@/components/home/newest-sets/NewsetSets';
import { homePageData } from '@/lib/Data';

const Home = () => {
  return (
    <div>
      <CurrentLearning />
      <NewsetSets />
      <div className="py-8">
        {homePageData.map((data, index) => (
          <div className="space-y-8 py-4" key={index}>
            {index % 2 === 0 ? (
              <>
                {' '}
                <Banner data={data} />
              </>
            ) : (
              <>
                <Banner isReverse={true} data={data} />{' '}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
