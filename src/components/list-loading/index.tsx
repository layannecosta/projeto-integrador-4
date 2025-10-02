import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { array } from 'yup';

export default function ListLoading() {
    return (
        <div className='flex gap-6 flex-wrap'>
            {Array.from({ length: 8 }).map(() => (
                <div className="group relative flex flex-col justify-between rounded-xl">

                    <Skeleton width={150} height={150} />
                    <Skeleton width={150} height={25} />
                    <Skeleton width={150} height={15} />
                    <Skeleton width={150} height={15} />
                </div>
            ))}

        </div>
    );
}