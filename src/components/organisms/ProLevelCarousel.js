import React, {useState, useEffect} from 'react';
import {get_carousel_data} from '../../apis';
import CustomCarouselSplit from '_organisms/CustomCarouselSplit';

const ProLevelCarousel = ({navigation}) => {
  const [proLevel, setProLevel] = useState(0);
  useEffect(() => {
    async function get_plevel() {
      const plevel = await get_carousel_data(1226);
      setProLevel(plevel);
    }
    get_plevel();
  }, []);

  return <CustomCarouselSplit items={proLevel} title="Pro Level >>>" navigation={navigation}/>;
};

export default ProLevelCarousel;
