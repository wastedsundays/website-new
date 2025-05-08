import { useParams } from 'react-router-dom';
import SinglePage from '../pages/SinglePage';

const SinglePageWrapper = () => {
  const { slug } = useParams();
  return <SinglePage key={slug} />;
};

export default SinglePageWrapper;
