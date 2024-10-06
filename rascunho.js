function construirArvoreDecisao({ tipoArvore, idArvore, solucaoMedia, solucaoFinal }) {
    // Primeira pergunta (raiz da árvore)
    const arvore = [
        {
            "id": idArvore,
            "texto": "Existem requisitos específicos para a remoção de nitrogênio amoniacal?",
            "opcoes": {}
        }
    ];

    // Definir as soluções possíveis para cada ramo da árvore, dependendo do tipo
    const ramos = {
        "N amoniacal/NTK <= 20mg/L": {
            "proximo": tipoArvore === 1 || tipoArvore === 2 || tipoArvore === 3 || tipoArvore === 5 ? (idArvore + 1) : null,
            "solucoesPosiveis": tipoArvore === 1 || tipoArvore === 2 || tipoArvore === 3 || tipoArvore === 5 ? solucaoMedia[0].split(", ") : [],
            "usaPluginDesinfeccao": false
        },
        "N total <= 20mg/L": {
            "proximo": tipoArvore === 1 || tipoArvore === 3 ? idArvore + 2 : (tipoArvore === 4 || tipoArvore === 6 ? idArvore + 1 : null),
            "solucoesPosiveis": tipoArvore === 1 || tipoArvore === 3 || tipoArvore === 4 || tipoArvore === 6 ? solucaoMedia[1].split(", ") : [],
            "usaPluginDesinfeccao": false
        },
        "Sem restrição": {
            "proximo": tipoArvore === 1 || tipoArvore === 2 || tipoArvore === 4 || tipoArvore === 7 ? (idArvore + 1) : null,
            "solucoesPosiveis": tipoArvore === 1 || tipoArvore === 2 || tipoArvore === 4 || tipoArvore === 7 ? solucaoMedia[2].split(", ") : [],
            "usaPluginDesinfeccao": false
        }
    };

    arvore[0].opcoes = ramos;

    // Pergunta 2: "Há interesse em água de reúso?"
    for (let i = 1; i <= (tipoArvore === 1 ? 3 : (tipoArvore === 5 || 6 || 7 ? 2 : 1)); i++) {
        arvore.push({
            "id": idArvore + i,
            "texto": "Há interesse em água de reúso?",
            "opcoes": {
                "Sim": {
                    "proximo": idArvore + i + 3,
                    "solucoesPosiveis": i === 1 ? solucaoMedia[0].split(", ") : i === 2 ? solucaoMedia[1].split(", ") : solucaoMedia[2].split(", "),
                    "usaPluginDesinfeccao": false
                },
                "Não": {
                    "proximo": idArvore + i + 3,
                    "solucoesPosiveis": i === 1 ? solucaoMedia[0].split(", ") : i === 2 ? solucaoMedia[1].split(", ") : solucaoMedia[2].split(", "),
                    "usaPluginDesinfeccao": false
                }
            }
        });
    }

    // Pergunta 3: "Há interesse em aproveitamento do lodo gerado no tratamento?"
    for (let i = 4; i <= 6; i++) {
        arvore.push({
            "id": idArvore + i,
            "texto": "Há interesse em aproveitamento do lodo gerado no tratamento?",
            "opcoes": {
                "Sim": {
                    "proximo": idArvore + i + 3,
                    "solucoesPosiveis": i === 4 ? solucaoMedia[0].split(", ") : i === 5 ? solucaoMedia[1].split(", ") : solucaoMedia[2].split(", "),
                    "usaPluginDesinfeccao": false
                },
                "Não": {
                    "proximo": idArvore + i + 3,
                    "solucoesPosiveis": i === 4 ? solucaoMedia[0].split(", ") : i === 5 ? solucaoMedia[1].split(", ") : solucaoMedia[2].split(", "),
                    "usaPluginDesinfeccao": false
                }
            }
        });
    }

    // Pergunta 4: "Há interesse em aproveitamento do biogás?"
    for (let i = 7; i <= 9; i++) {
        arvore.push({
            "id": idArvore + i,
            "texto": "Há interesse em aproveitamento do biogás?",
            "opcoes": {
                "Sim": {
                    "proximo": null,
                    "solucoesPosiveis": i === 7 ? solucaoFinal.sim[0].split(", ") : i === 8 ? solucaoFinal.sim[1].split(", ") : solucaoFinal.sim[2].split(", "),
                    "usaPluginDesinfeccao": false
                },
                "Não": {
                    "proximo": null,
                    "solucoesPosiveis": i === 7 ? solucaoFinal.nao[0].split(", ") : i === 8 ? solucaoFinal.nao[1].split(", ") : solucaoFinal.nao[2].split(", "),
                    "usaPluginDesinfeccao": false
                }
            }
        });
    }

    return JSON.stringify(arvore, null, 4);
}

// Teste com o exemplo fornecido
const arvoreDecisao = {
    tipoArvore: 2,
    idArvore: 1044,
    solucaoMedia: ["UASB+FBP (baixa taxa)", "", "LFA, UASB, UASB+FBP"],
    solucaoFinal: {
        sim: ["UASB+FBP", "", "UASB, UASB+FBP"],
        nao: ["UASB+FBP", "", "LFA, UASB, UASB+FBP"]
    }
};

console.log(construirArvoreDecisao(arvoreDecisao));




/*
1 ramoEsq = tipoArvore === 1(ID's: +1, +4, +7), 2(ID's: +1, +3, +5), 3(ID's: +1, +3, +5), 5(ID's: +1, +2, +3) 
1 ramoCentro = tipoArvore === 4(ID's: +1, +3, +5), 6(ID's: +1, +2, +3)
1 ramoDir = tipoArvore === 7(ID's: +1, +2, +3)

2 ramoCentro = tipoArvore === 1(ID's: +2, +5, +8), 3(ID's: +2, +4, +6)
2 ramoDir = tipoArvore === 2(ID's: +2, +4, +6), 4(ID's: +2, +4, +6)

3 ramoDir = tipoArvore === 1(ID's: +3, +6, +9)
*/