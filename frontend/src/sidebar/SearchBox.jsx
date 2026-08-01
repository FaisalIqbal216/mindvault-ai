import {Search} from "lucide-react";


function SearchBox({value,onChange}){


return(

<div className="search-box">


<Search size={18}/>


<input

value={value}

onChange={(e)=>onChange(e.target.value)}

placeholder="Search conversations"

/>


</div>

);


}


export default SearchBox;