// Função para exibir ou esconder avisos
const showNotification = {
    showWarnings: (field) => {
        const warningMessage = `O campo ${field} precisa ser preenchido.`;
        console.log(warningMessage);
        const warningElement = document.querySelector(`#warning-${field}`);
            warningElement.textContent = warningMessage;
            warningElement.style.display = 'block';
       
    },
    hideWarning: (field) => {
        const warningElement = document.querySelector(`#warning-${field}`);
            warningElement.textContent = '';
            warningElement.style.display = 'none';
    }
};

// Função de validação dos campos
const validatesFields = () => {
    const email = document.querySelector("#email");
    const password = document.querySelector('#password');
    let isValid = true;

    if (email.value.trim() === '') {
        showNotification.showWarnings("email");
        isValid = false;
    } else {
        showNotification.hideWarning("email");
    }

    if (password.value.trim() === '') {
        showNotification.showWarnings("password");
        isValid = false;
    } else {
        showNotification.hideWarning("password");
    }

    return isValid;
};

// Evento de clique no botão de envio
document.querySelector('#btn-submit').addEventListener('click', async (e) => {
    e.preventDefault();
    console.log("Clicou no botão de envio.");

    if (validatesFields()) {
        // Se os campos forem válidos, envia o formulário via fetch
        const email = document.querySelector("#email").value.trim();
        const password = document.querySelector('#password').value.trim();
        const errorMessage = document.getElementById('error-message');

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                const result = await response.json();
                window.location.href = result.redirect;
            } else {
                const result = await response.json();
                errorMessage.innerText = result.message;
                errorMessage.style.display = 'block';
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            errorMessage.innerText = 'Erro no servidor. Tente novamente mais tarde.';
            errorMessage.style.display = 'block';
        }
    }
});

// Adicionando event listeners para limpar avisos ao alterar os campos
document.querySelector("#email").addEventListener('input', () => {
    if (document.querySelector("#email").value.trim() === '') {
        showNotification.showWarnings("email");
    } else {
        showNotification.hideWarning("email");
    }
});

document.querySelector("#password").addEventListener('input', () => {
    if (document.querySelector("#password").value.trim() === '') {
        showNotification.showWarnings("password");
    } else {
        showNotification.hideWarning("password");
    }
});
