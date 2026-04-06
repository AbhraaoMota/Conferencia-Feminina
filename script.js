// 1. Seleção dos elementos (Nossos ajudantes)
const cards = document.querySelectorAll('.card');
const btnInscricao = document.getElementById('btn-inscricao');
const btnSobre = document.getElementById('btn-sobre');
const backButtons = document.querySelectorAll('.back-btn');
const inputCPF = document.getElementById('input-cpf');
const inputTelefone = document.getElementById('input-telefone');
const form = document.getElementById('form-cadastro');

// 2. O link do seu PagSeguro (Aonde ela vai depois de salvar os dados)
const LINK_PAGSEGURO = "https://pag.ae/81DT4Yt9o"; 

// --- NAVEGAÇÃO ENTRE AS TELINHAS ---
function showPage(pageId) {
    cards.forEach(card => {
        card.classList.remove('active');
        if (card.id === pageId) {
            card.classList.add('active');
        }
    });
}

btnInscricao.addEventListener('click', () => showPage('cadastro'));
btnSobre.addEventListener('click', () => showPage('sobre'));

backButtons.forEach(button => {
    button.addEventListener('click', () => showPage('home'));
});

// --- MÁSCARAS MÁGICAS (CPF E TELEFONE) ---
inputCPF.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 11) value = value.slice(0, 11);
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    e.target.value = value;
});

inputTelefone.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 11) value = value.slice(0, 11);
    value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
    value = value.replace(/(\d{5})(\d)/, "$1-$2");
    e.target.value = value;
});

// --- O MOMENTO DE SALVAR E PAGAR ---
form.addEventListener('submit', async function(event) {
    // 1. Paramos o envio automático para a gente conferir tudo primeiro
    event.preventDefault();

    // 2. Conferimos se o CPF e Telefone estão do tamanho certo
    if (inputCPF.value.length < 14 || inputTelefone.value.length < 14) {
        alert("Ops! Por favor, preencha o CPF e o Telefone direitinho.");
        return;
    }

    // 3. Pegamos as informações das caixinhas
    const dadosParaSalvar = {
        nome: document.querySelector('input[placeholder="Nome Completo:"]').value,
        cpf: inputCPF.value,
        telefone: inputTelefone.value,
        congregacao: document.getElementById('input-congregacao').value,
        outra_igreja: document.querySelector('input[placeholder="Sou de outra Igreja:"]').value
    };

    try {
        console.log("Enviando dados para a nossa garagem mágica...");

        // 4. Mandamos os dados para o servidor (o server.js que você criou)
        const resposta = await fetch('http://localhost:3000/inscrever', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dadosParaSalvar)
        });

        if (resposta.ok) {
            // 5. Se o servidor disser "OK", aí sim abrimos o pagamento!
            console.log("Dados salvos! Indo para o PagSeguro...");
            window.location.href = LINK_PAGSEGURO;
        } else {
            alert("Tivemos um probleminha para salvar. Tente de novo!");
        }

    } catch (error) {
        // Se o servidor estiver desligado, cai aqui
        console.error("Erro ao conectar com o servidor:", error);
        alert("Parece que o seu 'tradutor' (servidor) não está ligado. Verifique se o server.js está rodando!");
    }
});