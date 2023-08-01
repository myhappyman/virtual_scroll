import { useMemo } from 'react';

interface IDemo {
  order_id: number;
  name: string;
  path: string;
}

const sample_img = [
  { name: '아메리카노', path: '/images/아메리카노.jpg' },
  { name: '에스프레소', path: '/images/에스프레소.jpg' },
];

const DEMO_LIST: IDemo[] = [];
for (let i = 1; i <= 200; i++) {
  DEMO_LIST.push({
    order_id: i,
    ...sample_img[(i - 1) % 2],
  });
}

function Picture() {
  const demo = useMemo(() => DEMO_LIST, []);
  return (
    <section>
      <div className="inner">
        <div className="list">
          {demo.map((x) => (
            <div key={x.order_id}>
              <div className="img_wrap">
                <img src={x.path} alt={x.name} />
              </div>
              <div>
                <span className="img_name">{x.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Picture;
