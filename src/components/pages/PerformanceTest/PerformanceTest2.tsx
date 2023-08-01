import React from 'react';

interface IProps {
  message: string;
  photos: IPhoto[];
}
interface IPhoto {
  id: string;
  title: string;
  url: string;
}

interface IListItem {
  photo: IPhoto;
}

const List = React.memo(({ photos }: Pick<IProps, 'photos'>) => {
  return (
    <ul>
      {photos.map((photo) => (
        <ListItem key={photo.id} photo={photo} />
      ))}
    </ul>
  );
});

const ListItem = React.memo(({ photo }: IListItem) => {
  return (
    <li key={photo.id}>
      <img src={photo.url} alt={photo.title} />
    </li>
  );
});

const Message = React.memo(({ message }: { message: string }) => {
  return <p>{message}</p>;
});

function PerformanceTest2({ message = '', photos = [] }: IProps) {
  return (
    <div>
      <h1>PhotoTwo</h1>
      <Message message={message} />
      <List photos={photos} />
    </div>
  );
}

// export default PerformanceTest2;
export default React.memo(PerformanceTest2);
