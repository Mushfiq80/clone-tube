console.log('Hello World!');

// Data loading from open API 
const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.categories))
        .catch(error => console.log(error))
}


const displayCategories = (data) => {
    const categories = document.getElementById('new-nav');
    // console.log(data[0].category);
    data.forEach(category => {
        const categoryBtn = document.createElement('button');
        categoryBtn.classList.add('btn', 'p-2');
        categoryBtn.innerText = category.category;
        categories.appendChild(categoryBtn);
    });
}

// video loading from open API
const loadVideos = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
        .then(res => res.json())
        .then(data => displayVideos(data.videos))
        .catch(error => console.log(error))
}

// video display function 
const displayVideos = (data) => {
    const videoContainer = document.getElementById('video');
    data.forEach(video => {
        const videoDiv = document.createElement('div');
        videoDiv.classList = 'card card-compact';
        videoDiv.innerHTML = `
        <figure>
            <img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" alt="Shoes" />
        </figure>
        <div class="card-body">
            <h2 class="card-title">Shoes!</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-end">
                <button class="btn btn-primary">Buy Now</button>
            </div>
        </div>
        `;
        videoContainer.append(videoDiv);
    })
}


loadCategories();
loadVideos();
