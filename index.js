const loadCategory = async() =>{
    // fetch category data
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await res.json();
    const categories = data.data;
    // show all he category buttons
    const categoryContainer = document.getElementById('category-container');
    categories.forEach(category => {
        const div = document.createElement('div');
        div.innerHTML =`
        <button onclick="loadVideos('${category.category_id}')" class=" px-6 py-3 bg-[#cccccc] rounded">${category.category}</button>`
        categoryContainer.appendChild(div);
        
    });
}

const loadVideos = async(id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data = await res.json();
    const videos = data.data;
    console.log(videos);
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = "";
    const mainContainer = document.getElementById('main-container');
    // show cards
    if(videos.length === 0){
        console.log('no data');
        mainContainer.classList.remove('hidden');
        
    }
   else{
    videos.forEach(video =>{
        mainContainer.classList.add('hidden');
        const div = document.createElement('div');
        const timeString = video?.others?.posted_date;
        const time = parseFloat(timeString);
       
            const hours = time / 3600;
            const hr = Math.floor(hours);
            const minutes = (hours - hr) * 60;
            const mins = Math.floor(minutes);
    
        
        
        div.innerHTML =`
        <div class="card h-96">
        <figure class="h-full relative">
        
        <img class="w-full h-full rounded" src=${video.thumbnail} alt="Shoes" />
        <h1 class="absolute bottom-2 right-2 text-white text-xs p-2 bg-black/50 rounded">
        ${hr? hr : ""}  ${hr? 'hours' : ""} ${mins? mins : ""} ${mins? "mins ago" : ""}</h1>
        
        </figure>
        <div class="card-body px-2">
         <div class="flex items-center gap-2">
            <div class="avatar">
            <div class="w-10 rounded-full">
              <img src=${video?.authors[0]?.profile_picture} />
            </div>
          </div>
          <div> <h2 class="card-title">${video.title}</h2></div>
         </div>
          <div class="flex">
            <div class= "pl-12 pr-2"><p class="text-sm text-[#4d4d4d]">${video?.authors[0]?.profile_name}</p></div>
            <div id="verified">
            
            </div>
            ${video?.authors[0]?.verified? '<i class="fa-solid fa-circle-check" style="color: #2268ef;"></i>' : ""}
          </div>
          <p class= "px-12 text-sm text-[#4d4d4d]">${video?.others?.views} views</p>
         
        </div>
      </div>`
      cardContainer.appendChild(div);
    })
   }
}

loadCategory();
loadVideos('1000')