import React from 'react';

interface IProps {
  message: string;
  photos: {
    id: string;
    title: string;
    url: string;
  }[];
}

function PerformanceTest1({ message = '', photos = [] }: IProps) {
  return (
    <div>
      <h1>PhotoOne</h1>
      <p>{message}</p>
      <ul>
        {photos.map((photo) => {
          return (
            <li key={photo.id}>
              <img src={photo.url} alt={photo.title} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// export default PerformanceTest1;
export default React.memo(PerformanceTest1);
