import './style.css';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Header from '../../components/header';
import LeftHome from '../../components/home/left';
import RightHome from '../../components/home/right';
import News from '../../components/news';
export default function Home() {
  const { user } = useSelector((state) => ({ ...state }));
  const middle = useRef(null);
  const [height, setHeight] = useState();
  useEffect(() => {
    setHeight(middle.current.clientHeight);
  }, []);

  return (
    <div className='home' style={{ height: `${height + 150}px` }}>
      <Header page='home' />
      <LeftHome user={user} />
      <div className='home_middle' ref={middle}>
        <News user={user} />
      </div>
      <RightHome user={user} />
    </div>
  );
}
