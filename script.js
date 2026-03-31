// 1. Seleção dos elementos
const cards = document.querySelectorAll('.card');
const btnInscricao = document.getElementById('btn-inscricao');
const btnSobre = document.getElementById('btn-sobre');
const backButtons = document.querySelectorAll('.back-btn');
const inputCPF = document.getElementById('input-cpf');
const inputTelefone = document.getElementById('input-telefone');
const form = document.getElementById('form-cadastro');

// 2. O teu link do PagSeguro (Link Direto)
const LINK_PAGSEGURO = "https://pag.ae/81DT4Yt9o"; 

// --- NAVEGAÇÃO ENTRE TELAS ---
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

// --- MÁSCARAS DE INPUT (CPF E TELEFONE) ---
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

// --- LÓGICA DE ENVIO E REDIRECIONAMENTO (MÉTODO WINDOW.OPEN) ---
form.addEventListener('submit', function(event) {
    // Impede o envio padrão do formulário
    event.preventDefault();

    // Validação de comprimento para garantir que as máscaras estão completas
    if (inputCPF.value.length < 14 || inputTelefone.value.length < 14) {
        alert("Por favor, preencha o CPF e o Telefone corretamente.");
        return;
    }

    console.log("A abrir checkout em nova aba...");

    // Tenta abrir o link numa nova aba/janela
    const win = window.open(LINK_PAGSEGURO, '_blank');

    // Se o navegador bloquear o pop-up (comum em alguns PCs), usa o redirecionamento na mesma aba
    if (!win || win.closed || typeof win.closed == 'undefined') { 
        window.location.href = LINK_PAGSEGURO;
    }
});