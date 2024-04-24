import { CircleLoader } from 'react-spinners';
import './Loading.css';


function Loading() {
  return (
    <div className="Loading">
      <div className="overlay"></div>
      <div className='loadingContent'>
        <CircleLoader
          color={"#ffffff"}
          loading={true}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
          speedMultiplier={0.5}
        />
        Loading...
      </div>

    </div>
  );
}

export default Loading;