import React, {useState, useEffect} from 'react';
import {get_carousel_data} from '../../apis';
import CustomCarouselSplit from '_organisms/CustomCarouselSplit';

const DrillsCarousel = ({navigation}) => {
  const [specializedDrills, setSpecializedDrills] = useState(0);
  useEffect(() => {
    async function get_drills() {
      const drills = await get_carousel_data(1218);
      setSpecializedDrills(drills);
    }
    get_drills();
  }, []);

  return (
    <CustomCarouselSplit
      items={specializedDrills}
      title="Specialized Drills >>>"
      navigation={navigation}
    />
  );
};

export default DrillsCarousel;
