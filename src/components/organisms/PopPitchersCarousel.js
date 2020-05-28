import React, {useState, useEffect} from 'react';
import {get_carousel_data} from '../../apis';
import CustomCarousel from '_organisms/CustomCarousel';

const PopPitchersCarousel = () => {
  const [popPitchers, setPopPitchers] = useState(0);
  useEffect(() => {
    async function get_pitchers() {
      const pitchers = await get_carousel_data(1224);
      setPopPitchers(pitchers);
    }
    get_pitchers();
  }, []);

  return <CustomCarousel items={popPitchers} title="Most Popular Pitchers >>>" />;
};

export default PopPitchersCarousel;
