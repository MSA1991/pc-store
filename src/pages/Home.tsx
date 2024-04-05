import { Banner } from '../components/Banner';
import { CategorySlider } from '../components/CategorySlider';
import { AnimatedPage } from './AnimatedPage';

export const Home = () => {
  return (
    <AnimatedPage>
      <div className="flex flex-col gap-5">
        <CategorySlider />
        <Banner />
      </div>
    </AnimatedPage>
  );
};
