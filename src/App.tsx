import { useEffect, useRef, useState } from 'react';

import './App.scss';

interface IDemo {
  order_id: number;
  name: number;
  date: string;
  state: string;
  price: number;
}
function generate8DigitRandomNumber() {
  const min = 10000000; // Minimum value with 8 digits (10^7)
  const max = 99999999; // Maximum value with 8 digits (10^8 - 1)

  // Generate a random number between min and max (inclusive)
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getState() {
  const STATE_ARR = ['주문 완료', '준비 중', '배송 중', '배송 완료'];
  return STATE_ARR[Math.floor(Math.random() * 4)];
}

const demo_list: IDemo[] = [];
for (let i = 1; i <= 100; i++) {
  demo_list.push({
    order_id: i,
    date: '23.07.26',
    name: generate8DigitRandomNumber(),
    state: getState(),
    price: 30000,
  });
}

function App() {
  const [list, setList] = useState<IDemo[]>([]);
  const targetElementRef = useRef<HTMLDivElement | null>(null);
  const [divHeight, setDivHeight] = useState<number>(0);
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const updateScrollPosition = () => {
    if (targetElementRef.current) {
      const { scrollTop } = targetElementRef.current;
      setScrollPosition(scrollTop);
    }
  };
  useEffect(() => {
    setList(demo_list.slice(0, 20));
  }, []);
  console.log(divHeight, scrollPosition);
  useEffect(() => {
    const targetElement = targetElementRef.current;
    if (targetElement) {
      setDivHeight(targetElement.offsetHeight);
      targetElement.addEventListener('scroll', updateScrollPosition);
      // Remove the event listener when the component unmounts
      return () => {
        targetElement.removeEventListener('scroll', updateScrollPosition);
      };
    }
  }, []);
  return (
    <div>
      <section className="main_section">
        <div className="inner">
          <div className="data_table" ref={targetElementRef}>
            <table className="order_table">
              <colgroup>
                <col width="25%" />
                <col width="25%" />
                <col width="30%" />
                <col width="20%" />
              </colgroup>
              <thead>
                <tr>
                  <th>상태</th>
                  <th>주문일</th>
                  <th>주문번호</th>
                  <th>가격</th>
                </tr>
              </thead>
              <tbody>
                {list.map((data) => (
                  <tr key={data.order_id}>
                    <td>{data.state}</td>
                    <td>{data.date}</td>
                    <td>{data.name}</td>
                    <td>{data.price.toLocaleString('ko-KR')}원</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
