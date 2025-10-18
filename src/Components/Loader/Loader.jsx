import { Oval } from 'react-loader-spinner';
import './Loader.scss';

function Loader() {
  return (
    <div className="loader">
      <Oval color="#3f51b5" height={80} width={80} />
    </div>
  );
}

export default Loader;