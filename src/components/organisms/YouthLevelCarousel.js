import React, {useState, useEffect} from 'react';
import {get_carousel_data} from '../../apis';
import CustomCarouselSplit from '_organisms/CustomCarouselSplit';

const YouthLevelCarousel = ({navigation}) => {
  const [youthLevel, setYouthLevel] = useState(0);
  useEffect(() => {
    async function get_ylevel() {
      const ylevel = await get_carousel_data(1864);
      setYouthLevel(ylevel);
    }
    get_ylevel();
  }, []);

  return (
    <CustomCarouselSplit items={youthLevel} title="Youth Level Pitchers >>>" navigation={navigation}/>
  );
};

export default YouthLevelCarousel;
