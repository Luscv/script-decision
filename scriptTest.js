function gerarArvore(tipoArvore, idArvore, solucaoMedia, solucaoFinal, usaPluginDesinfeccao = false) {
    const arvore = [];
    let currentId = idArvore;
    
    // Primeira pergunta (sempre presente)
    arvore.push({
        id: currentId,
        texto: "Existem requisitos específicos para a remoção de nitrogênio amoniacal?",
        opcoes: {
            "N amoniacal/NTK <= 20mg/L": {
                proximo: tipoArvore === 5 || tipoArvore === 6 || tipoArvore === 7 ? null : currentId + 1,
                solucoesPosiveis: tipoArvore === 6 || tipoArvore === 7 ? [] : solucaoMedia[0].split(', '),
                usaPluginDesinfeccao
            },
            "N total <= 20mg/L": {
                proximo: tipoArvore === 2 || tipoArvore === 5 || tipoArvore === 7 ? null : currentId + (tipoArvore === 1 || tipoArvore === 3 || tipoArvore === 4 ? 2 : 0),
                solucoesPosiveis: tipoArvore === 2 || tipoArvore === 5 || tipoArvore === 7 ? [] : solucaoMedia[1].split(', '),
                usaPluginDesinfeccao
            },
            "Sem restrição": {
                proximo: tipoArvore === 3 || tipoArvore === 5 || tipoArvore === 6 ? null : currentId + (tipoArvore === 1 || tipoArvore === 2 || tipoArvore === 4 ? 3 : 0),
                solucoesPosiveis: tipoArvore === 3 || tipoArvore === 5 || tipoArvore === 6 ? [] : solucaoMedia[2].split(', '),
                usaPluginDesinfeccao
            }
        }
    });

    // Incrementa ID para as perguntas subsequentes
    currentId++;

    // Pergunta 2: "Há interesse em água de reúso?"
    if (tipoArvore !== 6 && tipoArvore !== 7) {
        arvore.push({
            id: currentId,
            texto: "Há interesse em água de reúso?",
            opcoes: {
                "Sim": {
                    proximo: currentId + 1,
                    solucoesPosiveis: solucaoMedia[0].split(', '),
                    usaPluginDesinfeccao
                },
                "Não": {
                    proximo: currentId + 1,
                    solucoesPosiveis: solucaoMedia[0].split(', '),
                    usaPluginDesinfeccao
                }
            }
        });
        currentId++;
    }

    // Pergunta 3: "Há interesse em aproveitamento do lodo gerado no tratamento?"
    if (tipoArvore !== 5 && tipoArvore !== 7) {
        arvore.push({
            id: currentId,
            texto: "Há interesse em aproveitamento do lodo gerado no tratamento?",
            opcoes: {
                "Sim": {
                    proximo: currentId + 1,
                    solucoesPosiveis: solucaoMedia[1].split(', '),
                    usaPluginDesinfeccao
                },
                "Não": {
                    proximo: currentId + 1,
                    solucoesPosiveis: solucaoMedia[1].split(', '),
                    usaPluginDesinfeccao
                }
            }
        });
        currentId++;
    }

    // Pergunta 4: "Há interesse em aproveitamento do biogás?"
    arvore.push({
        id: currentId,
        texto: "Há interesse em aproveitamento do biogás?",
        opcoes: {
            "Sim": {
                proximo: null,
                solucoesPosiveis: solucaoFinal.sim[tipoArvore - 1].split(', '),
                usaPluginDesinfeccao
            },
            "Não": {
                proximo: null,
                solucoesPosiveis: solucaoFinal.nao[tipoArvore - 1].split(', '),
                usaPluginDesinfeccao
            }
        }
    });

    return arvore;
}

// Exemplo de uso:
const arvore = gerarArvore(2, 1044, ["LA, LA-AP, LA-EB, MBR, MBBR, IFAS, LGA", "LA-EB, MBR, MBBR, IFAS (com remoção de N), LGA", "LFA, LMC+LS, LA, LA-AP, LA-EB, MBR, MBBR, IFAS, LGA"], {
    sim: ["LA, LA-AP", "", " LA, LA-AP"],
    nao: ["LA, LA-AP, LA-EB, MBR, MBBR, IFAS, LGA", "LA-EB, MBR, MBBR, IFAS, LGA", "LFA, LMC+LS, LA, LA-AP, LA-EB, MBR, MBBR, IFAS, LGA"]
}, false);

console.log(JSON.stringify(arvore, null, 2));
