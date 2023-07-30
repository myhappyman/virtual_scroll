import { useEffect, useMemo, useRef, useState } from 'react';
import { generate8DigitRandomNumber, moneyFomatter } from './utils';

import './App.scss';

type State_Type = 'order' | 'ready' | 'delivery' | 'complete';
interface IDemo {
  order_id: number;
  name: number;
  date: string;
  state: State_Type;
  price: number;
}

function getState() {
  const STATE_ARR: State_Type[] = ['order', 'ready', 'delivery', 'complete'];
  return STATE_ARR[Math.floor(Math.random() * 4)];
}

function getStateStr(str: State_Type) {
  const STATE_STR = {
    order: '주문 완료',
    ready: '준비 중',
    delivery: '배송 중',
    complete: '배송 완료',
  };
  return STATE_STR[str];
}

const DEMO_LIST: IDemo[] = [];
for (let i = 1; i <= 2000; i++) {
  DEMO_LIST.push({
    order_id: i,
    date: '23.07.26',
    name: generate8DigitRandomNumber(),
    state: getState(),
    price: 30000,
  });
}

function App() {
  const demo = useMemo(() => DEMO_LIST, []);
  // const TOTAL_SIZE = demo.length * 30;
  const PAGE_SIZE = 20;
  const nowPageRef = useRef(0);
  const [list, setList] = useState<IDemo[]>([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const targetElementRef = useRef<HTMLDivElement | null>(null);
  const divHeight = useRef(0);
  const onScroll = () => {
    if (targetElementRef.current) {
      const targetHeight = divHeight.current;
      const { scrollTop, scrollHeight } = targetElementRef.current;
      setScrollPosition(scrollTop);
      // console.log(
      //   'scrollHeight:',
      //   scrollHeight,
      //   'scrollTop:',
      //   scrollTop,
      //   'targetHeight:',
      //   targetHeight,
      // );
      // console.log('nowPageRef.current', nowPageRef.current);
      const num1 = scrollHeight - scrollTop - targetHeight / 10;
      const num2 = targetHeight;
      if (num1 < num2 && demo.length / PAGE_SIZE > nowPageRef.current) {
        nowPageRef.current++;
        const { current: nowPage } = nowPageRef;
        setList(demo.slice(0, PAGE_SIZE * nowPage + PAGE_SIZE));
      }
    }
  };

  useEffect(() => {
    const { current: nowPage } = nowPageRef;
    setList(demo.slice(0, PAGE_SIZE * nowPage + PAGE_SIZE));
  }, [demo]);

  useEffect(() => {
    const targetElement = targetElementRef.current;
    if (targetElement) {
      divHeight.current = targetElement.offsetHeight;
      targetElement.addEventListener('scroll', onScroll);
      // Remove the event listener when the component unmounts
      return () => {
        targetElement.removeEventListener('scroll', onScroll);
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
                <col width="15%" />
                <col width="25%" />
                <col width="20%" />
                <col width="25%" />
                <col width="15%" />
              </colgroup>
              <thead>
                <tr>
                  <th scope="col">NO.</th>
                  <th scope="col">상태</th>
                  <th scope="col">주문일</th>
                  <th scope="col">주문번호</th>
                  <th scope="col">가격</th>
                </tr>
              </thead>
              {/* <tbody>
                {list.map((data, i) => (
                  <tr key={data.order_id}>
                    <td>{i}</td>
                    <td className={`state ${data.state}`}>
                      {getStateStr(data.state)}
                    </td>
                    <td>{data.date}</td>
                    <td>{data.name}</td>
                    <td>{moneyFomatter(data.price)}원</td>
                  </tr>
                ))}
              </tbody> */}
              <tbody>
                {list.map((data, i) =>
                  i * (32 + nowPageRef.current) + 42 < scrollPosition ||
                  scrollPosition > i * 30 + divHeight.current ? (
                    <tr key={data.order_id} />
                  ) : (
                    <tr key={data.order_id}>
                      <td>{i}</td>
                      <td className={`state ${data.state}`}>
                        {getStateStr(data.state)}
                      </td>
                      <td>{data.date}</td>
                      <td>{data.name}</td>
                      <td>{moneyFomatter(data.price)}원</td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
