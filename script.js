const key = document.getElementsByClassName('material-symbols-outlined')[0]
const password = document.getElementById('password')
const email = document.getElementById('email')
const error = document.getElementById('error')
const textError = document.getElementById('textError')
 key.addEventListener('click', toggleClass)

 function toggleClass(){
    if(key.innerText === 'key_off'){
        key.innerText = 'key'
        password.setAttribute('type', 'text')
    }else{
        password.setAttribute('type', 'password') 
        key.innerText = 'key_off'
    }
 }


const form = document.getElementById('form');
form.addEventListener('submit', sendForm)

function sendForm(e){

    const closeError = () => {
        setTimeout(()=>{
            error.style.display = 'none'
        }, 2500)
    }

    e.preventDefault()
     if(email.value === '' || password.value === ''){
        error.style.display = 'block'
        textError.innerText = 'Preencha todos os campos!'
        closeError()
     }else if(password.value.length < 6){
        error.style.display = 'block'
        textError.innerText = 'A senha deve conter pelo menos 6 caracteres!'
        closeError()
     }  else{
        error.style.display = 'block'
        textError.innerText = 'Login concluído!'
        closeError()
     }
}