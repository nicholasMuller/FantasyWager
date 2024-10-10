import { useEffect } from 'react';
import Hero from '../components/Hero';
import {oddSliceNFL} from "../slices/NFL/oddsSliceNFL"

const HomeScreen = () => {
  // useEffect(async ()=>{
  //   const weekData = await oddSliceNFL();
  // },[]);


  return <Hero />;
};
export default HomeScreen;
