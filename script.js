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
                    "solucoesPosiveis": countRamosArvore === 3 ? (i === stepTipoArvore ? solucaoMedia[0].split(", ") : i === (stepTipoArvore + 1) ? solucaoMedia[1].split(", ") : solucaoMedia[2].split(", ")) : (countRamosArvore === 2 ? (i === stepTipoArvore ? solucaoMedia[0].split(", ") : solucaoMedia[1].split(", ")): solucaoMedia[0].split(", ")),
                    "usaPluginDesinfeccao": plugin
                },
                "Não": {
                    "proximo": idArvore + i + (tipoArvore === 1 ? 3 : (tipoArvore === 2 || tipoArvore === 3 || tipoArvore === 4 ? 2 : 1)),
                    "solucoesPosiveis": countRamosArvore === 3 ? (i === stepTipoArvore ? solucaoMedia[0].split(", ") : i === (stepTipoArvore + 1) ? solucaoMedia[1].split(", ") : solucaoMedia[2].split(", ")) : (countRamosArvore === 2 ? (i === stepTipoArvore ? solucaoMedia[0].split(", ") : solucaoMedia[1].split(", ")): solucaoMedia[0].split(", ")),
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
                    "solucoesPosiveis": countRamosArvore === 3 ? (i === stepTipoArvore ? solucaoMedia[0].split(", ") : i === (stepTipoArvore + 1) ? solucaoMedia[1].split(", ") : solucaoMedia[2].split(", ")) : (countRamosArvore === 2 ? (i === stepTipoArvore ? solucaoMedia[0].split(", ") : solucaoMedia[1].split(", ")): solucaoMedia[0].split(", ")),
                    "usaPluginDesinfeccao": plugin
                },
                "Não": {
                    "proximo": idArvore + i + (tipoArvore === 1 ? 3 : (tipoArvore === 2 || tipoArvore === 3 || tipoArvore === 4 ? 2 : 1)),
                    "solucoesPosiveis": countRamosArvore === 3 ? (i === stepTipoArvore ? solucaoMedia[0].split(", ") : i === (stepTipoArvore + 1) ? solucaoMedia[1].split(", ") : solucaoMedia[2].split(", ")) : (countRamosArvore === 2 ? (i === stepTipoArvore ? solucaoMedia[0].split(", ") : solucaoMedia[1].split(", ")): solucaoMedia[0].split(", ")),
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
                    "solucoesPosiveis": countRamosArvore === 3 ? (i === stepTipoArvore ? solucaoFinal.sim[0].split(", ") : i === (stepTipoArvore + 1) ? solucaoFinal.sim[1].split(", ") : solucaoFinal.sim[2].split(", ")) : (countRamosArvore === 2 ? (i === stepTipoArvore ? solucaoFinal.sim[0].split(", ") : solucaoFinal.sim[1].split(", ")): solucaoFinal.sim[0].split(", ")),
                    "usaPluginDesinfeccao": plugin
                },
                "Não": {
                    "proximo": null,
                    "solucoesPosiveis": countRamosArvore === 3 ? (i === stepTipoArvore ? solucaoFinal.nao[0].split(", ") : i === (stepTipoArvore + 1) ? solucaoFinal.nao[1].split(", ") : solucaoFinal.nao[2].split(", ")) : (countRamosArvore === 2 ? (i === stepTipoArvore ? solucaoFinal.nao[0].split(", ") : solucaoFinal.nao[1].split(", ")): solucaoFinal.nao[0].split(", ")),
                    "usaPluginDesinfeccao": plugin
                }
            }
        });
    }

    return JSON.stringify(arvore, null, 4);
}

const tree = 3
let arvoreDecisao = {
    tipoArvore: 7,
    idArvore: 0,
    solucaoInicial: ["", "", "LPF, LAN+LF+EA, LFA, LFA+LM"],
    solucaoMedia: ["LPF, LAN+LF+EA, LFA, LFA+LM"],
    solucaoFinal: {
        sim: [""],
        nao: ["LPF, LAN+LF+EA, LFA, LFA+LM"]
    },
    plugin: false
};

switch (tree){
    case 1: 
        arvoreDecisao = {
            tipoArvore: 7,
            idArvore: 0,
            solucaoInicial: ["", "", "LPF, LAN+LF+EA"],
            solucaoMedia: ["LPF, LAN+LF+EA"],
            solucaoFinal: {
                sim: [""],
                nao: ["LPF, LAN+LF+EA"]
            },
            plugin: false
        };
        break
    case 2:
        arvoreDecisao = {
            tipoArvore: 7,
            idArvore: 0,
            solucaoInicial: ["", "", "LPF, LAN+LF+EA, LFA, LFA+LM, LMC+LS"],
            solucaoMedia: ["LPF, LAN+LF+EA, LFA, LFA+LM, LMC+LS"],
            solucaoFinal: {
                sim: [""],
                nao: ["LPF, LAN+LF+EA, LFA, LFA+LM, LMC+LS"]
            },
            plugin: false
        };
        break
    case 3:
        arvoreDecisao = {
            tipoArvore: 2,
            idArvore: 2068,
            solucaoInicial: ["HUM-VD, UASB+FBP", "", "LPF, LAN+LF, LAN+LF+EA, HUM-VD, UASB, UASB+LP, UASB+HUM-FH, UASB+ES, UASB+FBP"],
            solucaoMedia: ["HUM-VD, UASB+FBP", "LPF, LAN+LF, LAN+LF+EA, HUM-VD, UASB, UASB+LP, UASB+HUM-FH, UASB+ES, UASB+FBP"],
            solucaoFinal: {
                sim: ["UASB+FBP ", "UASB, UASB+LP, UASB+HUM-FH, UASB+ES, UASB+FBP"],
                nao: ["HUM-VD, UASB+FBP ", "LPF, LAN+LF, LAN+LF+EA, HUM-VD, UASB, UASB+LP, UASB+HUM-FH, UASB+ES, UASB+FBP"]
            },
            plugin: false
        };
        break
    case 4:
        arvoreDecisao = {
            tipoArvore: 2,
            idArvore: 0,
            solucaoInicial: ["HUM-VD, UASB+FBP, UASB+BAS, UASB+LA", "", "LPF, LAN+LF, LAN+LF+EA, LFA, LFA+LM, LMC+LS, HUM-VD, UASB, UASB+LP, UASB+HUM-FH, UASB+ES, UASB+FBP, UASB+BAS, UASB+LA, UASB+FAD"],
            solucaoMedia: ["HUM-VD, UASB+FBP, UASB+BAS, UASB+LA", "LPF, LAN+LF, LAN+LF+EA, LFA, LFA+LM, LMC+LS, HUM-VD, UASB, UASB+LP, UASB+HUM-FH, UASB+ES, UASB+FBP, UASB+BAS, UASB+LA, UASB+FAD"],
            solucaoFinal: {
                sim: ["UASB+FBP, UASB+BAS, UASB+LA", "UASB, UASB+LP, UASB+HUM-FH, UASB+ES, UASB+FBP, UASB+BAS, UASB+LA, UASB+FAD"],
                nao: ["HUM-VD, UASB+FBP, UASB+BAS, UASB+LA", "LPF, LAN+LF, LAN+LF+EA, LFA, LFA+LM, LMC+LS, HUM-VD, UASB, UASB+LP, UASB+HUM-FH, UASB+ES, UASB+FBP, UASB+BAS, UASB+LA, UASB+FAD"]
            },
            plugin: false
        };
        break
    case 5:
        arvoreDecisao = {
            tipoArvore: 2,
            idArvore: 0,
            solucaoInicial: ["HUM-VD, UASB+FBP, UASB+LA", "", "LPF, LAN+LF, LAN+LF+EA, HUM-VD, UASB, UASB+LP, UASB+HUM-FH, UASB+ES, UASB+FBP, UASB+LA"],
            solucaoMedia: ["HUM-VD, UASB+FBP, UASB+LA", "LPF, LAN+LF, LAN+LF+EA, HUM-VD, UASB, UASB+LP, UASB+HUM-FH, UASB+ES, UASB+FBP, UASB+LA"],
            solucaoFinal: {
                sim: ["UASB+FBP, UASB+LA", "UASB, UASB+LP, UASB+HUM-FH, UASB+ES, UASB+FBP, UASB+LA"],
                nao: ["HUM-VD, UASB+FBP, UASB+LA", "LPF, LAN+LF, LAN+LF+EA, HUM-VD, UASB, UASB+LP, UASB+HUM-FH, UASB+ES, UASB+FBP, UASB+LA"]
            },
            plugin: false
        };
        break
    case 6:
        arvoreDecisao = {
            tipoArvore: 2,
            idArvore: 0,
            solucaoInicial: ["HUM-VD", "", "LPF, LAN+LF, LAN+LF+EA, HUM-VD"],
            solucaoMedia: ["HUM-VD", "LPF, LAN+LF, LAN+LF+EA, HUM-VD"],
            solucaoFinal: {
                sim: ["", ""],
                nao: ["HUM-VD", "LPF, LAN+LF, LAN+LF+EA, HUM-VD"]
            },
            plugin: false
        };
        break
    case 7:
        arvoreDecisao = {
            tipoArvore: 1,
            idArvore: 0,
            solucaoInicial: ["HUM-VD, UASB+FBP, UASB+BAS, UASB+LA, LA, LA-AP, LA-EB, MBR, MBBR, IFAS, LGA", "LA-EB, MBR, MBBR, IFAS, LGA", "LPF, LAN+LF, LAN+LF+EA, LFA, LFA+LM, LMC+LS, HUM-VD, UASB, UASB+LP, UASB+HUM-FH, UASB+ES, UASB+FBP, UASB+BAS, UASB+LA, UASB+FAD, LA, LA-AP, LA-EB, MBR, MBBR, IFAS, LGA"],
            solucaoMedia: ["HUM-VD, UASB+FBP, UASB+BAS, UASB+LA, LA, LA-AP, LA-EB, MBR, MBBR, IFAS, LGA", "LA-EB, MBR, MBBR, IFAS, LGA", "LPF, LAN+LF, LAN+LF+EA, LFA, LFA+LM, LMC+LS, HUM-VD, UASB, UASB+LP, UASB+HUM-FH, UASB+ES, UASB+FBP, UASB+BAS, UASB+LA, UASB+FAD, LA, LA-AP, LA-EB, MBR, MBBR, IFAS, LGA"],
            solucaoFinal: {
                sim: ["UASB+FBP, UASB+BAS, UASB+LA, LA, LA-AP", "", "UASB, UASB+LP, UASB+HUM-FH, UASB+ES, UASB+FBP, UASB+BAS, UASB+LA, UASB+FAD, LA, LA-AP"],
                nao: ["HUM-VD, UASB+FBP, UASB+BAS, UASB+LA, LA, LA-AP, LA-EB, MBR, MBBR, IFAS, LGA", " LA-EB, MBR, MBBR, IFAS, LGA", "LPF, LAN+LF, LAN+LF+EA, LFA, LFA+LM, LMC+LS, HUM-VD, UASB, UASB+LP, UASB+HUM-FH, UASB+ES, UASB+FBP, UASB+BAS, UASB+LA, UASB+FAD, LA, LA-AP, LA-EB, MBR, MBBR, IFAS, LGA"]
            },
            plugin: false
        };
        break
    case 8:
        arvoreDecisao = {
            tipoArvore: 1,
            idArvore: 0,
            solucaoInicial: ["LA, LA-AP, LA-EB, MBR, MBBR, IFAS, LGA", "LA-EB, MBR, MBBR, IFAS, LGA", "LPF, LAN+LF+EA, LFA, LFA+LM, LMC+LS, LA, LA-AP, LA-EB, MBR, MBBR, IFAS, LGA"],
            solucaoMedia: ["LA, LA-AP, LA-EB, MBR, MBBR, IFAS, LGA", "LA-EB, MBR, MBBR, IFAS, LGA", "LPF, LAN+LF+EA, LFA, LFA+LM, LMC+LS, LA, LA-AP, LA-EB, MBR, MBBR, IFAS, LGA"],
            solucaoFinal: {
                sim: ["LA, LA-AP", "", "LA, LA-AP"],
                nao: ["LA, LA-AP, LA-EB, MBR, MBBR, IFAS, LGA", "LA-EB, MBR, MBBR, IFAS, LGA", "LPF, LAN+LF+EA, LFA, LFA+LM, LMC+LS, LA, LA-AP, LA-EB, MBR, MBBR, IFAS, LGA"]
            },
            plugin: false
        };
        break

}

// Teste com o exemplo fornecido
// const arvoreDecisao = {
//     tipoArvore: 2,
//     idArvore: 1755,
//     solucaoInicial: ["HUM-VD, UASB+FBP, UASB+BAS, UASB+LA", "", "LPF, LAN+LF, LAN+LF+EA, LFA, LFA+LM, LMC+LS, HUM-VD, UASB, UASB+LP, UASB+HUM-FH, UASB+ES, UASB+FBP, UASB+BAS, UASB+LA, UASB+FAD"],
//     solucaoMedia: ["HUM-VD, UASB+FBP, UASB+BAS, UASB+LA", "LPF, LAN+LF, LAN+LF+EA, LFA, LFA+LM, LMC+LS, HUM-VD, UASB, UASB+LP, UASB+HUM-FH, UASB+ES, UASB+FBP, UASB+BAS, UASB+LA, UASB+FAD"],
//     solucaoFinal: {
//         sim: ["UASB+FBP, UASB+BAS, UASB+LA", "UASB, UASB+LP, UASB+HUM-FH, UASB+ES, UASB+FBP, UASB+BAS, UASB+LA, UASB+FAD"],
//         nao: ["HUM-VD, UASB+FBP, UASB+BAS, UASB+LA", "LPF, LAN+LF, LAN+LF+EA, LFA, LFA+LM, LMC+LS, HUM-VD, UASB, UASB+LP, UASB+HUM-FH, UASB+ES, UASB+FBP, UASB+BAS, UASB+LA, UASB+FAD"]
//     },
//     plugin: false
// };

/*
RASCUNHO

HUM-VD, UASB+FBP 


"id": 

1
const arvoreDecisao = {
    tipoArvore: 7,
    idArvore: 1553,
    solucaoInicial: ["", "", "LPF, LAN+LF+EA"],
    solucaoMedia: ["LPF, LAN+LF+EA"],
    solucaoFinal: {
        sim: [""],
        nao: ["LPF, LAN+LF+EA"]
    },
    plugin: true
};
2
const arvoreDecisao = {
    tipoArvore: 7,
    idArvore: 1702,
    solucaoInicial: ["", "", "LPF, LAN+LF+EA, LFA, LFA+LM, LMC+LS"],
    solucaoMedia: ["LPF, LAN+LF+EA, LFA, LFA+LM, LMC+LS"],
    solucaoFinal: {
        sim: [""],
        nao: ["LPF, LAN+LF+EA, LFA, LFA+LM, LMC+LS"]
    },
    plugin: true
};

3
const arvoreDecisao = {
    tipoArvore: 2,
    idArvore: 1505,
    solucaoInicial: ["HUM-VD, UASB+FBP", "", "LPF, LAN+LF, LAN+LF+EA, HUM-VD, UASB, UASB+LP, UASB+HUM-FH, UASB+ES, UASB+FBP"],
    solucaoMedia: ["HUM-VD, UASB+FBP", "LPF, LAN+LF, LAN+LF+EA, HUM-VD, UASB, UASB+LP, UASB+HUM-FH, UASB+ES, UASB+FBP"],
    solucaoFinal: {
        sim: ["UASB+FBP ", "UASB, UASB+LP, UASB+HUM-FH, UASB+ES, UASB+FBP"],
        nao: ["HUM-VD, UASB+FBP ", "LPF, LAN+LF, LAN+LF+EA, HUM-VD, UASB, UASB+LP, UASB+HUM-FH, UASB+ES, UASB+FBP"]
    },
    plugin: true
};
4
const arvoreDecisao = {
    tipoArvore: 2,
    idArvore: 1720,
    solucaoInicial: ["HUM-VD, UASB+FBP, UASB+BAS, UASB+LA", "", "LPF, LAN+LF, LAN+LF+EA, LFA, LFA+LM, LMC+LS, HUM-VD, UASB, UASB+LP, UASB+HUM-FH, UASB+ES, UASB+FBP, UASB+BAS, UASB+LA, UASB+FAD"],
    solucaoMedia: ["HUM-VD, UASB+FBP, UASB+BAS, UASB+LA", "LPF, LAN+LF, LAN+LF+EA, LFA, LFA+LM, LMC+LS, HUM-VD, UASB, UASB+LP, UASB+HUM-FH, UASB+ES, UASB+FBP, UASB+BAS, UASB+LA, UASB+FAD"],
    solucaoFinal: {
        sim: ["UASB+FBP, UASB+BAS, UASB+LA", "UASB, UASB+LP, UASB+HUM-FH, UASB+ES, UASB+FBP, UASB+BAS, UASB+LA, UASB+FAD"],
        nao: ["HUM-VD, UASB+FBP, UASB+BAS, UASB+LA", "LPF, LAN+LF, LAN+LF+EA, LFA, LFA+LM, LMC+LS, HUM-VD, UASB, UASB+LP, UASB+HUM-FH, UASB+ES, UASB+FBP, UASB+BAS, UASB+LA, UASB+FAD"]
    },
    plugin: true
};


+UASB-LA
5
const arvoreDecisao = {
    tipoArvore: 2,
    idArvore: 1526,
    solucaoInicial: ["HUM-VD, UASB+FBP, UASB+LA", "", "LPF, LAN+LF, LAN+LF+EA, HUM-VD, UASB, UASB+LP, UASB+HUM-FH, UASB+ES, UASB+FBP, UASB+LA"],
    solucaoMedia: ["HUM-VD, UASB+FBP, UASB+LA", "LPF, LAN+LF, LAN+LF+EA, HUM-VD, UASB, UASB+LP, UASB+HUM-FH, UASB+ES, UASB+FBP, UASB+LA"],
    solucaoFinal: {
        sim: ["UASB+FBP, UASB+LA", "UASB, UASB+LP, UASB+HUM-FH, UASB+ES, UASB+FBP, UASB+LA"],
        nao: ["HUM-VD, UASB+FBP, UASB+LA", "LPF, LAN+LF, LAN+LF+EA, HUM-VD, UASB, UASB+LP, UASB+HUM-FH, UASB+ES, UASB+FBP, UASB+LA"]
    },
    plugin: true
};
6
const arvoreDecisao = {
    tipoArvore: 2,
    idArvore: 1639,
    solucaoInicial: ["HUM-VD", "", "LPF, LAN+LF, LAN+LF+EA, HUM-VD"],
    solucaoMedia: ["HUM-VD", "LPF, LAN+LF, LAN+LF+EA, HUM-VD"],
    solucaoFinal: {
        sim: ["", ""],
        nao: ["HUM-VD", "LPF, LAN+LF, LAN+LF+EA, HUM-VD"]
    },
    plugin: true
};

7
const arvoreDecisao = {
    tipoArvore: 1,
    idArvore: 1533,
    solucaoInicial: ["HUM-VD, UASB+FBP, UASB+BAS, UASB+LA, LA, LA-AP, LA-EB, MBR, MBBR, IFAS, LGA", "LA-EB, MBR, MBBR, IFAS, LGA", "LPF, LAN+LF, LAN+LF+EA, LFA, LFA+LM, LMC+LS, HUM-VD, UASB, UASB+LP, UASB+HUM-FH, UASB+ES, UASB+FBP, UASB+BAS, UASB+LA, UASB+FAD, LA, LA-AP, LA-EB, MBR, MBBR, IFAS, LGA"],
    solucaoMedia: ["HUM-VD, UASB+FBP, UASB+BAS, UASB+LA, LA, LA-AP, LA-EB, MBR, MBBR, IFAS, LGA", "LA-EB, MBR, MBBR, IFAS, LGA", "LPF, LAN+LF, LAN+LF+EA, LFA, LFA+LM, LMC+LS, HUM-VD, UASB, UASB+LP, UASB+HUM-FH, UASB+ES, UASB+FBP, UASB+BAS, UASB+LA, UASB+FAD, LA, LA-AP, LA-EB, MBR, MBBR, IFAS, LGA"],
    solucaoFinal: {
        sim: ["UASB+FBP, UASB+BAS, UASB+LA, LA, LA-AP", "", "UASB, UASB+LP, UASB+HUM-FH, UASB+ES, UASB+FBP, UASB+BAS, UASB+LA, UASB+FAD, LA, LA-AP"],
        nao: ["HUM-VD, UASB+FBP, UASB+BAS, UASB+LA, LA, LA-AP, LA-EB, MBR, MBBR, IFAS, LGA", " LA-EB, MBR, MBBR, IFAS, LGA", "LPF, LAN+LF, LAN+LF+EA, LFA, LFA+LM, LMC+LS, HUM-VD, UASB, UASB+LP, UASB+HUM-FH, UASB+ES, UASB+FBP, UASB+BAS, UASB+LA, UASB+FAD, LA, LA-AP, LA-EB, MBR, MBBR, IFAS, LGA"]
    },
    plugin: true
};
8
const arvoreDecisao = {
    tipoArvore: 1,
    idArvore: 1567,
    solucaoInicial: ["LA, LA-AP, LA-EB, MBR, MBBR, IFAS, LGA", "LA-EB, MBR, MBBR, IFAS, LGA", "LPF, LAN+LF+EA, LFA, LFA+LM, LMC+LS, LA, LA-AP, LA-EB, MBR, MBBR, IFAS, LGA"],
    solucaoMedia: ["LA, LA-AP, LA-EB, MBR, MBBR, IFAS, LGA", "LA-EB, MBR, MBBR, IFAS, LGA", "LPF, LAN+LF+EA, LFA, LFA+LM, LMC+LS, LA, LA-AP, LA-EB, MBR, MBBR, IFAS, LGA"],
    solucaoFinal: {
        sim: ["LA, LA-AP", "", "LA, LA-AP"],
        nao: ["LA, LA-AP, LA-EB, MBR, MBBR, IFAS, LGA", "LA-EB, MBR, MBBR, IFAS, LGA", "LPF, LAN+LF+EA, LFA, LFA+LM, LMC+LS, LA, LA-AP, LA-EB, MBR, MBBR, IFAS, LGA"]
    },
    plugin: true
};

*/

console.log(construirArvoreDecisao(arvoreDecisao));