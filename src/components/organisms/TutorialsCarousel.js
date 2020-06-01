import React, {useState, useEffect} from 'react';
import {get_carousel_data} from '../../apis';
import CustomCarouselSplit from '_organisms/CustomCarouselSplit';

const TutorialsCarousel = ({navigation}) => {
  const [tutorialImages, setTutorialImages] = useState(0);
  useEffect(() => {
    async function get_tutorials() {
      const tutorials = await get_carousel_data(1935);
      setTutorialImages(tutorials);
    }
    get_tutorials();
  }, []);

  return <CustomCarouselSplit items={tutorialImages} title="Tutorials >>>" navigation={navigation}/>;
};

export default TutorialsCarousel;
