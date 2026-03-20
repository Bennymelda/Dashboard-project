import Skeleton from "./ui/Skeleton";


function BoardSkeleton() {

return (

<div className="p-6">

<Skeleton className="h-8 w-48 mb-6" />



<div className="flex gap-4 md:flex-row flex-col ">

{[1, 2, 3].map((col) => (

<div

key={col}

className="w-full rounded-lg bg-[var(--skeles)]"

>

<Skeleton className="h-6 w-32 mb-4" />



<div className="space-y-3">

{[1, 2, 3].map((card) => (

<div

key={card}

className="rounded-md flex flex-col bg-[var(--skele)] p-3 shadow"

>

<Skeleton className="h-4 w-3/4 mb-2" />

<Skeleton className="h-4 w-1/2 mb-2" />

<Skeleton className="h-3 w-1/3" />

</div>

))}

</div>

</div>

))}

</div>

</div>

);

}



export default BoardSkeleton;