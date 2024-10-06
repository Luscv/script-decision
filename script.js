function construirArvoreDecisao({ tipoArvore, idArvore, solucaoInicial, solucaoMedia, solucaoFinal, plugin }) {
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
            "proximo": tipoArvore === 1 || tipoArvore === 2 || tipoArvore === 3 || tipoArvore === 5 ? idArvore + 1 : null,
            "solucoesPosiveis": tipoArvore === 1 || tipoArvore === 2 || tipoArvore === 3 || tipoArvore === 5 ? solucaoInicial[0].split(", ") : [],
            "usaPluginDesinfeccao": plugin
        },
        "N total <= 20mg/L": {
            "proximo": tipoArvore === 1 || tipoArvore === 3 ? idArvore + 2 : (tipoArvore === 4 || tipoArvore === 6 ? idArvore + 1 : null),
            "solucoesPosiveis": tipoArvore === 1 || tipoArvore === 3 || tipoArvore === 4 || tipoArvore === 6 ? solucaoInicial[1].split(", ") : [],
            "usaPluginDesinfeccao": plugin
        },
        "Sem restrição": {
            "proximo": tipoArvore === 1 ? idArvore + 3 : (tipoArvore === 2 || tipoArvore === 4 ? idArvore + 2 : (tipoArvore === 7 ? idArvore + 1 : null)),
            "solucoesPosiveis": tipoArvore === 1 || tipoArvore === 2 || tipoArvore === 4 || tipoArvore === 7 ? solucaoInicial[2].split(", ") : [],
            "usaPluginDesinfeccao": plugin
        }
    };

    arvore[0].opcoes = ramos;

    const countRamosArvore = tipoArvore === 1 ? 3 : (tipoArvore >= 2 && tipoArvore <= 4 ? 2 : 1)
    const countTipoArvore = tipoArvore === 1 ? 2 : (tipoArvore >= 2 && tipoArvore <= 4 ? 1 : 0)
    let stepTipoArvore = 1

    // Pergunta 2: "Há interesse em água de reúso?"
    for (let i = stepTipoArvore; i <= (stepTipoArvore + countTipoArvore); i++) {
        arvore.push({
            "id": idArvore + i,
            "texto": "Há interesse em água de reúso?",
            "opcoes": {
                "Sim": {
                    "proximo": idArvore + i + (tipoArvore === 1 ? 3 : (tipoArvore === 2 || tipoArvore === 3 || tipoArvore === 4 ? 2 : 1)),
                    "solucoesPosiveis": countRamosArvore === 3 ? (i === stepTipoArvore ? solucaoMedia[0].split(", ") : i === (stepTipoArvore + 1) ? solucaoMedia[1].split(", ") : solucaoMedia[2].split(", ")) : (countRamosArvore === 2 ? (i === stepTipoArvore ? solucaoMedia[0].split(", ") : solucaoMedia[1].split(", ")): solucaoMedia[0]),
                    "usaPluginDesinfeccao": plugin
                },
                "Não": {
                    "proximo": idArvore + i + (tipoArvore === 1 ? 3 : (tipoArvore === 2 || tipoArvore === 3 || tipoArvore === 4 ? 2 : 1)),
                    "solucoesPosiveis": countRamosArvore === 3 ? (i === stepTipoArvore ? solucaoMedia[0].split(", ") : i === (stepTipoArvore + 1) ? solucaoMedia[1].split(", ") : solucaoMedia[2].split(", ")) : (countRamosArvore === 2 ? (i === stepTipoArvore ? solucaoMedia[0].split(", ") : solucaoMedia[1].split(", ")): solucaoMedia[0]),
                    "usaPluginDesinfeccao": plugin
                }
            }
        });
    }

    stepTipoArvore = tipoArvore === 1 ? 4 : (tipoArvore >= 2 && tipoArvore <= 4 ? 3 : 2)


    // Pergunta 3: "Há interesse em aproveitamento do lodo gerado no tratamento?"
    for (let i = stepTipoArvore; i <= (stepTipoArvore + countTipoArvore); i++) {
        arvore.push({
            "id": idArvore + i,
            "texto": "Há interesse em aproveitamento do lodo gerado no tratamento?",
            "opcoes": {
                "Sim": {
                    "proximo": idArvore + i + (tipoArvore === 1 ? 3 : (tipoArvore === 2 || tipoArvore === 3 || tipoArvore === 4 ? 2 : 1)),
                    "solucoesPosiveis": countRamosArvore === 3 ? (i === stepTipoArvore ? solucaoMedia[0].split(", ") : i === (stepTipoArvore + 1) ? solucaoMedia[1].split(", ") : solucaoMedia[2].split(", ")) : (countRamosArvore === 2 ? (i === stepTipoArvore ? solucaoMedia[0].split(", ") : solucaoMedia[1].split(", ")): solucaoMedia[0]),
                    "usaPluginDesinfeccao": plugin
                },
                "Não": {
                    "proximo": idArvore + i + (tipoArvore === 1 ? 3 : (tipoArvore === 2 || tipoArvore === 3 || tipoArvore === 4 ? 2 : 1)),
                    "solucoesPosiveis": countRamosArvore === 3 ? (i === stepTipoArvore ? solucaoMedia[0].split(", ") : i === (stepTipoArvore + 1) ? solucaoMedia[1].split(", ") : solucaoMedia[2].split(", ")) : (countRamosArvore === 2 ? (i === stepTipoArvore ? solucaoMedia[0].split(", ") : solucaoMedia[1].split(", ")): solucaoMedia[0]),
                    "usaPluginDesinfeccao": plugin
                }
            }
        });
    }

    stepTipoArvore = tipoArvore === 1 ? 7 : (tipoArvore >= 2 && tipoArvore <= 4 ? 5 : 3)

    // Pergunta 4: "Há interesse em aproveitamento do biogás?"
    for (let i = stepTipoArvore; i <= (stepTipoArvore + countTipoArvore); i++) {
        arvore.push({
            "id": idArvore + i,
            "texto": "Há interesse em aproveitamento do biogás?",
            "opcoes": {
                "Sim": {
                    "proximo": null,
                    "solucoesPosiveis": countRamosArvore === 3 ? (i === stepTipoArvore ? solucaoFinal.sim[0].split(", ") : i === (stepTipoArvore + 1) ? solucaoFinal.sim[1].split(", ") : solucaoFinal.sim[2].split(", ")) : (countRamosArvore === 2 ? (i === stepTipoArvore ? solucaoFinal.sim[0].split(", ") : solucaoFinal.sim[1].split(", ")): solucaoFinal.sim[0]),
                    "usaPluginDesinfeccao": plugin
                },
                "Não": {
                    "proximo": null,
                    "solucoesPosiveis": countRamosArvore === 3 ? (i === stepTipoArvore ? solucaoFinal.nao[0].split(", ") : i === (stepTipoArvore + 1) ? solucaoFinal.nao[1].split(", ") : solucaoFinal.nao[2].split(", ")) : (countRamosArvore === 2 ? (i === stepTipoArvore ? solucaoFinal.nao[0].split(", ") : solucaoFinal.nao[1].split(", ")): solucaoFinal.nao[0]),
                    "usaPluginDesinfeccao": plugin
                }
            }
        });
    }

    return JSON.stringify(arvore, null, 4);
}

// Teste com o exemplo fornecido
const arvoreDecisao = {
    tipoArvore: 2,
    idArvore: 1411,
    solucaoInicial: ["UASB+FBP (baixa taxa)", "", "UASB, UASB+FBP"],
    solucaoMedia: ["UASB+FBP (baixa taxa)", "UASB, UASB+FBP"],
    solucaoFinal: {
        sim: ["UASB+FBP", "UASB, UASB+FBP"],
        nao: ["UASB+FBP", "UASB, UASB+FBP"]
    },
    plugin: false
};

/*
RASCUNHO


UASB+FBP, UASB+BAS, UASB+LA

LFA, LCM+LS, UASB, UASB+FBP, UASB+BAS, UASB+LA, UASB+FAD

 LFA, LCM+LS, UASB, 
UASB+FBP, UASB+BAS, 
UASB+LA, UASB+FAD

"id": 
*/

console.log(construirArvoreDecisao(arvoreDecisao));