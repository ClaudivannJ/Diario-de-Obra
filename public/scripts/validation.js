

// function validations() {
//     const email = document.querySelector("#email");
//     const password = document.querySelector('#password');

//     const showNotification = {
//         showWarnings: (field, message) => {
//             message = `O campo ${field} precisa ser preenchido.`;
//             console.log(message);
//             const warningElement = document.querySelector(`.warning-${field}`);
//             warningElement.textContent = message;
//             warningElement.style.display = 'block';
//         },
//         hideWarning: (field) => {
//             const warningElement = document.querySelector(`.warning-${field}`);
//             warningElement.textContent = '';
//             warningElement.style.display = 'none';
//         }
//     };

//     const validatesFields = () => {
//         let isValid = true;

//         if (email.value === '') {
//             showNotification.showWarnings("email");
//             isValid = false;
//         } else {
//             showNotification.hideWarning("email");
//         }

//         if (password.value === '') {
//             showNotification.showWarnings("password");
//             isValid = false;
//         } else {
//             showNotification.hideWarning("password");
//         }

//         return isValid;
//     };


   
// }

// document.querySelector('#btn-submit').addEventListener('click', (e) => {
//     e.preventDefault();
//     console.log("Clicou no botão de envio.");
//     validations();
// });


// // Adding event listeners to handle the case where the user clears the fields after filling them
// document.querySelector("#email").addEventListener('input', () => {
//     if (document.querySelector("#email").value === '') {
//         showNotification.showWarnings("email");
//     } else {
//         showNotification.hideWarning("email");
//     }
// });

// document.querySelector("#password").addEventListener('input', () => {
//     if (document.querySelector("#password").value === '') {
//         showNotification.showWarnings("password");
//     } else {
//         showNotification.hideWarning("password");
//     }
// });


document.getElementById('login-form').addEventListener('submit', async function(e){
    e.preventDefault();

    const email = document.querySelector("#email");
    const password = document.querySelector('#password');

    try{
        const response = await fetch('http://localhost:3000/login', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        });
   
        if(response.ok){
            const result = await response.json();
            console.log(result.redirect)
            window.location.href = result.redirect
        }else{
            const result = await response.json();
            errorMessage.innerText = result.message;
            errorMessage.style.display = 'block'; // Mostra a mensagem de erro
        }
    }catch{
        console.error('Erro ao fazer login:', error);
        const errorMessage = document.getElementById('error-message');
        errorMessage.innerText = 'Erro no servidor. Tente novamente mais tarde.';
        errorMessage.style.display = 'block'; // Mostra a mensagem de erro
    }
})