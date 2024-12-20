console.log('Hello World!');

// Data loading from open API 
const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.categories))
        .catch(error => console.log(error))
}

const removeActiveClass = () => {
    const buttons = document.getElementsByClassName('category-btn');
    for (const button of buttons) {
        button.classList.remove('btn-error');
    }
}



const CategoryWiseVideos = (id) => {
    // alert(id);
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then(res => res.json())
        .then(data => {
            removeActiveClass();
            const activeBtn = document.getElementById(`btn-${id}`);
            activeBtn.classList.add('btn-error');
            displayVideos(data.category)
        })
        .catch(error => console.log(error))
}

// category wise video display function 
const displayCategories = (data) => {
    const categories = document.getElementById('new-nav');
    // console.log(data[0].category);
    data.forEach(item => {
        const categoryContainer = document.createElement('div');
        categoryContainer.innerHTML = `
            <button id="btn-${item.category_id}" onclick="CategoryWiseVideos(${item.category_id})" class="btn category-btn">${item.category}</button>
        `
        // fetch data according to category

        // adding button to the container 
        categories.append(categoryContainer);

    });
}

// video loading from open API
const loadVideos = (searchText = "") => {
    fetch(
        `https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`
      )
        .then(res => res.json())
        .then(data => displayVideos(data.videos))
        .catch(error => console.log(error))
}
// search function 
document.getElementById("search-input").addEventListener("keyup", (e) => {
    loadVideos(e.target.value);
  });
// video display function 
const displayVideos = (data) => {
    const videoContainer = document.getElementById('video');
    console.log(data);
    videoContainer.innerHTML = '';
    if (data.length == 0) {
        videoContainer.classList.remove('grid');
        videoContainer.innerHTML = `
        <div class="flex flex-col items-center gap-4">
            <img class="pt-16" src="/assets/Icon.png" alt="No video found" />
            <h1 class="text-2xl text-center text-red-500">No video found</h1>
        </div>
        `;
        return;
    }
    else{
        videoContainer.classList.add('grid');
    }
    data.forEach(video => {
        const videoDiv = document.createElement('div');
        videoDiv.classList = 'card card-compact';
        videoDiv.innerHTML = `
        <figure class="h-[200px] relative">
            <img class="h-full w-full object-cover"  src="${video.thumbnail}" alt="Thumbnail" />
            ${video.others.posted_date?.length == 0 ? '' : `<span class="absolute right-2 bottom-2 bg-black text-white p-1">${video.others.posted_date}</span>`}
            
        </figure>
        <div class="flex flex-col justify-between">
        <div class="flex gap-2 py-2">
            <div>
                <img class="w-10 h-10 rounded-full object-cover " src="${video.authors[0].profile_picture}" alt="pp" />
            </div>
            <div>
                <h2 class="card-title"> ${video.title}</h2>
                <p class="flex items-center gap-2 font-semibold"> <span>${video.authors[0].profile_name}</span> 
                <span>${video.authors[0].verified == true ? '<img class="w-5" src="https://img.icons8.com/?size=100&id=lalayI2ulYNt&format=png&color=000000" />' : ''} </span> </p>
                <p class="text-gray-500">${video.others.views} views</p>
            </div>
        </div>
        <Button onclick="loadDetails('${
          video.video_id
        }')" class="btn btn-sm btn-primary place-self-end">Watch Now</Button>
        </div>
        `;
        videoContainer.append(videoDiv);
    })
}

const loadDetails = async (videoId) => {
    console.log(videoId);
    const uri = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
    const res = await fetch(uri);
    const data = await res.json();
    displayDetails(data.video);
  };
  const displayDetails = (video) => {
    console.log(video);
    const detailContainer = document.getElementById("modal-content");
  
    detailContainer.innerHTML = `
     <img src=${video.thumbnail} />
     <p>${video.description}</p>
    `;
  
    // way-1
    // document.getElementById("showModalData").click();
    //way-2
    document.getElementById("customModal").showModal();
  };



loadCategories();
loadVideos();
