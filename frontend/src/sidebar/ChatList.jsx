import {

useEffect,

useState

} from "react";


import ChatItem from "./ChatItem";


import SearchBox from "./SearchBox";


import {

getChats

} from "../services/chatService";








function ChatList({

onSelectChat,

activeChat

}){





const [chats,setChats]=useState([]);

const [search,setSearch]=useState("");









const loadChats=async()=>{


try{


const data = await getChats();


setChats(data);



}


catch(error){


console.log(

"CHAT LOAD ERROR",

error

);



}


};









useEffect(()=>{


loadChats();





window.addEventListener(

"chatUpdated",

loadChats

);





return()=>{


window.removeEventListener(

"chatUpdated",

loadChats

);



};



},[]);









const filteredChats = chats.filter(chat=>


chat.title

.toLowerCase()

.includes(

search.toLowerCase()

)


);










const pinned = filteredChats.filter(

chat=>chat.pinned

);







const important = filteredChats.filter(

chat=>chat.important

);








const archived = filteredChats.filter(

chat=>chat.archived

);








const recent = filteredChats.filter(chat=>


!chat.pinned &&

!chat.important &&

!chat.archived


);









const renderChats=(items)=>{


return items.map(chat=>(



<ChatItem


key={chat._id}


chat={chat}


onSelect={onSelectChat}


activeChat={activeChat}


/>



));


};












return(



<div className="chat-list">







<SearchBox


value={search}


onChange={setSearch}



/>









{

pinned.length>0 &&


<>



<div className="chat-section-title">


📌 Pinned


</div>



{renderChats(pinned)}



</>



}









{

important.length>0 &&


<>



<div className="chat-section-title">


⭐ Important


</div>




{renderChats(important)}



</>



}









<div className="chat-section-title">


💬 Recent Chats


</div>





{

renderChats(recent)

}









{

archived.length>0 &&


<>



<div className="chat-section-title">


📦 Archived


</div>





{renderChats(archived)}



</>



}









</div>



);



}





export default ChatList;