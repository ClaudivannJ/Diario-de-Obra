document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('nav ul li');
    const sections = document.querySelectorAll('section');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
            sections.forEach(section => section.classList.remove('active'));
            const targetId = item.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
            }
        });
    });

    fetch('/api/obras')
        .then(response => response.json())
        .then(data => {
            renderWorks(data);
        })
        .catch(error => console.error('Error fetching works:', error));
});

function renderWorks(works) {
    const worksContainer = document.querySelector('.works');
    worksContainer.innerHTML = '';

    works.forEach(work => {
        const workCard = document.createElement('div');
        workCard.className = 'works-card';

        let imgSrc = '/assets/fachada.png';
        if (work.capa) {
            imgSrc = `data:image/jpeg;base64,${work.capa}`;
        }

        workCard.innerHTML = `
            <div class="img">
                <img id="img-works" src="${imgSrc}" alt="">
            </div>
            <div class="info">
                <div class="galery-info">
                    <span><img src="" alt="">(10)</span>
                    <span><img src="" alt="">(40)</span>
                </div>
                <h3>${work.nome_da_obra}</h3>
                <span class="status">
                    ${work.status_da_obra}
                </span>
                <button onclick="openGallery(${work.id})"><img width="20px" src="/assets/gallery.png" alt=""></button>
            </div>
        `;

        worksContainer.appendChild(workCard);
    });
}

function openGallery(workId) {
    fetch(`/api/obras/${workId}/imagens`)
        .then(response => response.json())
        .then(images => {
            const galleryContainer = document.querySelector('.gallery');
            galleryContainer.innerHTML = '';

            images.forEach(image => {
                const imgElement = document.createElement('img');
                imgElement.src = `data:image/jpeg;base64,${image.imagem}`;
                galleryContainer.appendChild(imgElement);
            });
        })
        .catch(error => console.error('Error fetching images:', error));
}
