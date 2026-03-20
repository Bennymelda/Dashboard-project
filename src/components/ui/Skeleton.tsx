type SkeletonProps = {

className?: string;

};



function Skeleton({ className = "" }: SkeletonProps) {

return (

<div

className={`animate-pulse rounded bg-gray-300 dark:bg-gray-700 ${className}`}

/>

);

}



export default Skeleton;