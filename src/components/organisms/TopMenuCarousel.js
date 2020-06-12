import React, {useState, useEffect} from 'react';
import {get_carousel_data} from '_apis';
import CustomCarousel from '_molecules/CustomCarousel';

const TopMenuCarousel = ({navigation}) => {
  const [topMenu, setTopMenu] = useState(0);
  useEffect(() => {
    async function get_menu() {
      const menus = await get_carousel_data(1235);
      setTopMenu(menus);
    }
    get_menu();
  }, []);

  return <CustomCarousel items={topMenu} navigation={navigation}/>;
};

export default TopMenuCarousel;
