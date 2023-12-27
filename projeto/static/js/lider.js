
const tbody = document.getElementById('tbody');
const formLider = document.getElementById('formLider');
const inputRadio = document.getElementsByName('radioButton');
let popup = document.getElementById('popup'),
    blur = document.getElementById('blur'),
    popForm = document.getElementById('wrapper'),
    input = document.getElementById("search"),
    table = document.getElementById("table-sortable"),
    rows = table.getElementsByTagName("tr"),
    btnSalvar = document.getElementById('btn-save');
const btnDeletar = document.getElementById('btnDeletar');


// Popup botão cancelar
function openPopup(id) {
    idDelete = id
    popup.classList.add('open-popup');
    blur.classList.add('active');
}

function closePopup() {
    popup.classList.remove('open-popup');
    blur.classList.remove('active');
}

// Popup formulário
function openForm(button, id) {
    const buttonID = button.id
    let url;

    if (buttonID === "editar") {
        url = `/criar_editar_lider/${id}/`;
    } else {
        url = "/criar_editar_lider/";
    }

    window.location.href = url;
    blur.classList.add('active');
}


function closeForm() {
    popForm.classList.remove('open-wrapper');
    blur.classList.remove('active');
    window.location.reload();
}

// Filtro de pesquisa
function filterTable() {
    const filter = input.value.toLowerCase()
    if (filter != "") {
        for (i = 1; i < rows.length; i++) {
            let cells = rows[i].getElementsByTagName("td"),
                j,
                rowContainsFilter = false;

            for (j = 0; j < cells.length; j++) {
                if (cells[j]) {
                    let cellValue = cells[j].innerHTML.toLowerCase();

                    if (cellValue.includes(filter) && !cellValue.includes("<button")) {
                        rowContainsFilter = true;
                        break
                    }
                }
            }
            if (!rowContainsFilter) {
                rows[i].style.display = "none";
            } else {
                rows[i].style.display = "";
            }
        }
    } else {
        for (let index = 0; index < rows.length; index++) {
            rows[index].style.display = "";
        }
    }
}

// / Ordenar crescente e decrescente
/**
 * Tabela HTML em ordem crescente ou decrescente
 *
 * @param {HTMLTableElement} table Qual tabela será ordenada
 * @param {number} column O index da coluna que será ordenada
 * @param {boolean} asc Determina a ordem em crescente ou decrescente
 */

function sortTableByColumn(table, column, asc = true) {
    const dirModifier = asc ? 1 : -1;
    const tBody = table.tBodies[0];
    const rows_table = Array.from(tBody.querySelectorAll('tr'));
    // Ordenada cada linha
    const sortedRows = rows_table.sort((a, b) => {
        const aColText = a.querySelector(`td:nth-child(${column + 1})`).textContent.trim();
        const bColText = b.querySelector(`td:nth-child(${column + 1})`).textContent.trim();

        if (column == 0) {
            const aColValue = parseInt(aColText);
            const bColValue = parseInt(bColText);
            return aColValue > bColValue ? (1 * dirModifier) : (-1 * dirModifier);
        }
        else {
            return aColText > bColText ? (1 * dirModifier) : (-1 * dirModifier);
        }
    })

    // Remove todos os TRs existentes da tabela
    while (tBody.firstChild) {
        tBody.removeChild(tBody.firstChild);
    }

    // Adiciona novamente as linhas recém-ordenadas
    tBody.append(...sortedRows);

    // Guarda a ordenação atual da coluna
    table.querySelectorAll('th').forEach(th => th.classList.remove('th-sort-asc', 'th-sort-desc'));
    table.querySelector(`th:nth-child(${column + 1})`).classList.toggle('th-sort-asc', asc);
    table.querySelector(`th:nth-child(${column + 1})`).classList.toggle('th-sort-desc', !asc);
}

document.querySelectorAll('.table-sortable th').forEach(headerCell => {
    headerCell.addEventListener('click', () => {
        const tableElement = headerCell.parentElement.parentElement.parentElement;
        const headerIndex = Array.prototype.indexOf.call(headerCell.parentElement.children, headerCell);
        const currentIsAscending = headerCell.classList.contains('th-sort-asc');

        sortTableByColumn(tableElement, headerIndex, !currentIsAscending);
    })
})



function filtrarPorAtivo(data, idSelecionado) {
    switch (idSelecionado) {
        case 'ativo':
            return data.filter(leader => leader.ativo === 1);
        case 'inativo':
            return data.filter(leader => leader.ativo === 0);
        default:
            return data;
    }
}
// TODO: arrumar tempo de atualização da página para mostrar a notificação
// Notificação de alerta DELETADO
function alertaDeletadoSucesso() {
    $('.alert-del').addClass("show");
    $('.alert-del').removeClass("hide");
    $('.alert-del').addClass("showAlert");
    setTimeout(function () {
        $('.alert-del').removeClass("show");
        $('.alert-del').addClass("hide");
        $('.alert-del').removeClass("showAlert");
        window.location.reload()
    }, 3000);
};

$('.close-btn-del').click(function () {
    $('.alert-del').removeClass("show");
    $('.alert-del').addClass("hide");
});

// Notificação de alerta CADASTRADO OU EDITADO
function alertaSucesso() {
    $('.alert-reg').addClass("show");
    $('.alert-reg').removeClass("hide");
    $('.alert-reg').addClass("showAlert");
    setTimeout(function () {
        $('.alert-reg').removeClass("show");
        $('.alert-reg').addClass("hide");
        closeForm()
    }, 3000);
};


$('.close-btn-del').click(function () {
    $('.alert-reg').removeClass("show");
    $('.alert-reg').removeClass("showAlert");
    $('.alert-reg').addClass("hide");
});

