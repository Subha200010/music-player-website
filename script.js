console.log("Playing music");
//initialize variables
let songIndex=0;
let audioElement=new Audio('1.mp3.mp3');
let masterPlay=document.getElementById('masterPlay');
let mybar =document.getElementById('mybar');
let volumebar=document.getElementById('volumebar');
let playingsongname=document.getElementById('playingsongname');
let songItems =Array.from(document.getElementsByClassName('songItem'));
let songs=[
    {songName: "chal wahan jaate hain",filePath:"1.mp3.mp3", coverPath:"cover1.jpg"},
    {songName: "Ankho me teri",filePath:"2.mp3.mp3", coverPath:"cover2.jpg"},
    {songName: "Chalte-Chalte-Yunhi",filePath:"3.mp3.mp3", coverPath:"cover3.jpg"},
    {songName: "Jaanam-Dekh-Lo-Mit-Gayi",filePath:"4.mp3.mp3", coverPath:"cover4.jpg"},
    {songName: "Tere-Naam",filePath:"5.mp3.mp3", coverPath:"cover5.jpg"},
    {songName: "Tera Chehra",filePath:"6.mp3.mp3", coverPath:"cover6.jpg"},
]
songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;

})
 

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        
    }
})   

// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
   //uodate durations 
let min1=Math.floor(audioElement.duration/60);
let sec1= Math.floor(audioElement.duration % 60);
if(sec1 <10){
    sec1=`0${sec1}`;
}
     dura2.innerText=`${min1}:${sec1}`;

     let min2=Math.floor(audioElement.currentTime/60);
let sec2= Math.floor(audioElement.currentTime % 60);
if(sec2 <10){
    sec2=`0${sec2}`;
}
      dura1.innerText=`${min2}:${sec2}`;


// Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    mybar.value = progress;
})

mybar.addEventListener('change', ()=>{
    audioElement.currentTime = mybar.value * audioElement.duration/100;
})
volumebar.addEventListener('change', ()=>{

    audioElement.volume=volumebar.value/100;
})



const makeAllPlays = ()=>{
  
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
       element.classList.remove('fa-circle-pause');
       element.classList.add('fa-circle-play');
       
    }) 
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
       // console.log(e);
       makeAllPlays();
        songIndex= parseInt(e.target.id);
       // console.log(e.target.id);
       e.target.classList.remove('fa-circle-play');
       e.target.classList.add('fa-circle-pause');
        audioElement.src = `${songIndex+1}.mp3.mp3`;
        
        console.log(audioElement.src);
        playingsongname.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play'); 
        masterPlay.classList.add('fa-circle-pause');
        audioElement.addEventListener('ended',()=>{
            masterPlay.classList.remove('fa-circle-pause');
            masterPlay.classList.add('fa-circle-play'); 
        })
    })
})


document.getElementById('next').addEventListener('click', ()=>{
   
    if(songIndex>=5){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `${songIndex+1}.mp3.mp3`;
    playingsongname.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');

})

document.getElementById('previous').addEventListener('click', ()=>{
   
   // console.log(songIndex);
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `${songIndex+1}.mp3.mp3`;
    playingsongname.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})
