"use client"

export default function UpvoteBtn(){
    return (
        <button 
        onClick={() =>{
                console.log("Upvote clicked");
                alert("Upvoted!");
            } } 
            className ="bg-green-500 text-white px-6 py-2 rounded mt-25">
            Like
            </button> 
             
    );
}

