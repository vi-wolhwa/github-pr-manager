import { useEffect, useState } from 'react';

/**
 * 테스트를 위한 Sample 컴포넌트
 */
const SampleNaverComponent = () => {
  const [text, setText] = useState('익스텐션 동작 검증 : 업데이트 전');
  const [color, setColor] = useState('lightblue');

  useEffect(() => {
    setTimeout(() => {
      setText('익스텐션 동작 검증 : 업데이트 후');
      setColor('lightgreen');
    }, 1000);
  }, []);

  return <div style={{ width: '100%', height: '100%', background: color }}>{text}</div>;
};

export default SampleNaverComponent;
