import React, {useState, useEffect} from 'react';
import {get_carousel_data} from '_apis';
import CustomCarouselSplit from '_molecules/CustomCarouselSplit';

const SchoolLevelCarousel = ({navigation}) => {
  const [schoolLevel, setSchoolLevel] = useState(0);
  useEffect(() => {
    async function get_slevel() {
      const slevel = await get_carousel_data(1228);
      setSchoolLevel(slevel);
    }
    get_slevel();
  }, []);

  return (
    <CustomCarouselSplit
      items={schoolLevel}
      title="College & Highschool Level >>>"
      navigation={navigation}
    />
  );
};

export default SchoolLevelCarousel;
