import React, {useState, useEffect} from 'react';
import {get_carousel_data} from '_apis';
import CustomCarousel from '_molecules/CustomCarousel';

const PopPitchersCarousel = ({navigation}) => {
  const [popPitchers, setPopPitchers] = useState(0);
  useEffect(() => {
    async function get_pitchers() {
      const pitchers = await get_carousel_data(1224);
      setPopPitchers(pitchers);
    }
    get_pitchers();
  }, []);

  return <CustomCarousel items={popPitchers} title="Most Popular Pitchers >>>" navigation={navigation} />;
};

export default PopPitchersCarousel;
