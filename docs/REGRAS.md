# Reinos de Fogo — Regras de desenvolvimento

Status: vigente. Diretor: proprietário do projeto. Repositório: higorgatti/drag-es-.

## Responsabilidades e aprovação
- O assistente implementa, revisa, organiza, documenta e executa verificações automatizadas quando disponíveis.
- O diretor realiza exclusivamente os testes manuais em dispositivo e decide o aceite.
- Nenhum teste automatizado equivale a aceite. Somente a confirmação explícita "Aprovado" autoriza integrar uma tarefa validada à versão oficial.
- Relatar o que foi efetivamente executado; nunca afirmar que testou no Safari sem teste real.
- Alterações significativas devem ter tarefa, objetivo, escopo, critérios de aceite e commit.
- Não alterar Tronos do Egeu nem outros repositórios.

## Fluxo de trabalho
1. Registrar tarefa RF-NNNN em docs/tarefas.
2. Fazer implementação isolada em branch dev/rf-NNNN-<resumo>.
3. Manter a main estável; não publicar mudanças de jogo nela antes do aceite.
4. Revisar diffs e executar testes automáticos viáveis; registrar limitações.
5. Disponibilizar versão de teste separada sem modificar produção, quando houver infraestrutura.
6. Entregar relatório: tarefa, arquivos, commit, verificações, limitações, ambiente e instruções para teste do diretor.
7. Após "Aprovado", integrar na main e confirmar deploy. Não inferir aceite de mensagens vagas.

## Código e arquitetura
- Separar inicialização, loop de jogo, entidades, combate, progressão, UI e configurações em módulos com responsabilidade clara.
- Não adicionar funcionalidades sem necessidade, código morto, logs temporários, cópias, arquivos de teste soltos ou dependências desnecessárias.
- Evitar duplicação e números mágicos; usar nomes descritivos e constantes centralizadas.
- Manter recursos e código próprios, sem copiar arte ou propriedade intelectual de outros jogos.
- Não incluir tokens, chaves ou dados sensíveis no repositório público.
- Preservar compatibilidade touch, orientação retrato, telas pequenas e carregamento via HTTPS.
- Não alterar sistema não relacionado para corrigir defeito localizado.
- Para remoções, identificar referências e efeitos antes de apagar; preservar histórico pelo Git.

## Testes e publicação
- Testes manuais, visuais, jogabilidade e aceite são exclusivamente do diretor no iPhone.
- O assistente pode executar verificações automatizadas e inspeções estáticas.
- Erros conhecidos e limitações devem constar no relatório.
- O GitHub Pages da main é tratado como publicação oficial; branch de desenvolvimento não deve substituir o site oficial sem autorização.
- Nunca afirmar que uma versão está disponível no Safari sem confirmar a publicação.

## Direção do produto
- Arcade vertical mobile original de dragões e reinos.
- Controle com um dedo, disparo automático, inimigos em ondas, cristais, melhorias, chefe.
- Priorizar resposta imediata, feedback visual, progressão clara e jogabilidade justa; evitar mecânicas deliberadamente manipulativas.
