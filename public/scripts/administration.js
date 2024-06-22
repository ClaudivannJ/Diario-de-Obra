document.addEventListener('DOMContentLoaded', function () {
    const navItems = document.querySelectorAll('nav ul li');
    const sections = {
        works: document.querySelector('.works-section'),
        register: document.querySelector('.register-works'),
        relatorio: document.querySelector('.report-section')
    };



    navItems.forEach(item => {
        item.addEventListener('click', function () {
            const targetId = item.getAttribute('data-target');
            renderSection(targetId);
            if (targetId === 'works') {
                getWorks();
            } else if (targetId === 'register') {
                renderForm('register');
            }
            navItems.forEach(navItem => navItem.classList.remove('active'));
            item.classList.add('active');
        });
    });

    renderSection('works');
    getWorks();
});

function renderSection(targetId) {
    document.querySelectorAll('main section').forEach(section => {
        section.classList.remove('active');
    });

    const section = document.querySelector(`#${targetId}`);
    if (section) {
        section.classList.add('active');
    }
}

function getWorks() {
    fetch('/api/obras')
        .then(response => response.json())
        .then(data => {
            renderWorks(data);
        })
        .catch(error => console.log('Erro ao tentar buscar obras:', error));
}

function renderWorks(works) {
    const worksContainer = document.querySelector('.works');
    worksContainer.innerHTML = '';

    works.forEach(work => {
        const workCard = document.createElement('div');
        workCard.className = 'works-card';
        workCard.dataset.id = work.id;

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
                <span class="status">${work.status_da_obra}</span>
                <button onclick="openGallery(${work.id})"><img width="20px" src="/assets/gallery.png" alt=""></button>
                <button onclick="editWork(${work.id})"><img width="20px" src="/assets/edit.png" alt="Edit"></button>
                <button onclick="deleteWork(${work.id})"><img width="20px" src="/assets/delete.png" alt="Delete"></button>
            </div>
        `;

        worksContainer.appendChild(workCard);
    });
}

function renderForm(mode, work = {}) {
    const registerSection = document.querySelector('.register-works');
    registerSection.innerHTML = `
        <form id="workForm" method="post" enctype="multipart/form-data">
            <input type="hidden" name="id" value="${work.id || ''}">
            <div class="work-info">
                <span><p>Informações da Obra</p></span>
                <label for="name-works">Nome Da Obra</label>
                <input type="text" name="name" id="name-works" placeholder="Ex: Minha Casa, Minha Vida" value="${work.nome_da_obra || ''}">
                <label for="status">Status da Obra</label>
                <select name="status" id="status">
                    <option value="Em Andamento" ${work.status_da_obra === 'Em Andamento' ? 'selected' : ''}>Iniciada</option>
                    <option value="Concluído" ${work.status_da_obra === 'Concluído' ? 'selected' : ''}>Concluída</option>
                </select>
                <label for="date-start">Data Início:</label>
                <input type="date" name="date-start" id="date-start" value="${work.data_inicio || ''}">
                <label for="date-end">Data Prevista Para o Fim da Obra:</label>
                <input type="date" name="date-end" id="date-end" value="${work.data_fim || ''}">
                <label for="file-img">Capa</label>
                <input type="file" name="file-img" id="file-img" accept="image/*">
            </div>
            <div class="info-client">
                <span><p>Informações do Cliente</p></span>
                <label for="nameClient">Nome Completo do Cliente</label>
                <input type="text" name="nameClient" id="nameClient" placeholder="Ex: José Emilio" value="${work.nome_cliente || ''}">
                <label for="numberPhoneClient">Telefone do Cliente</label>
                <input type="phone" name="numberPhoneClient" id="numberPhoneClient" placeholder="Digite o número com DDD" value="${work.telefone_cliente || ''}">
            </div>
            <button id="register-button">${mode === 'edit' ? 'Salvar' : 'Cadastrar'}</button>
        </form>
    `;

    const workForm = document.getElementById('workForm');
    workForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const workId = document.querySelector('[name="id"]').value;
        const mode = workId ? 'edit' : 'create';
        handleFormSubmit(mode, workId);
    });
}

function handleFormSubmit(mode, workId) {
    const formData = new FormData(document.getElementById('workForm'));
    const method = mode === 'edit' ? 'PUT' : 'POST';
    const url = mode === 'edit' ? `/api/edit/obra/${workId}` : '/api/register/obra';

    fetch(url, {
        method: method,
        body: formData,
    })
        .then(response => {
            console.log('Response:', response);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            if (mode === 'edit') {
                renderSection('works');
                getWorks();
            }
        })
        .catch(error => console.error('Error:', error));
}

function  editWork(workId) {
    fetch(`/api/obras/${workId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(work => {

            renderForm('edit', work);
            renderSection('register');
        })
        .catch(error => console.error('Error fetching work details:', error));
}

function deleteWork(workId) {
    fetch(`/api/obras/${workId}`, {
        method: 'DELETE',
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Deleted:', data);
            getWorks();
        })
        .catch(error => console.error('Error deleting work:', error));
}

function openGallery(workId) {
    fetch(`/api/obras/${workId}/imagens`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
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
