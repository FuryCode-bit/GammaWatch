# Projeto Base de Dados 2023/2024

## Objetivos e Competências

**Objetivos**: preparar os estudantes para entender, projetar e desenvolver soluções informáticas sobre bases de 
dados. 

**Competências**: desenvolver modelos de dados; produzir esquema relacional; desenvolver aplicações 
multiutilizador sobre bases de dados cliente/servidor. 

## Contexto
A rede RADNET Portugal (https://radnet.apambiente.pt/ ) surgiu como a resposta nacional ao acidente de 
Chernobyl. Este acidente nuclear ocorreu a 26 de abril de 1986 na Ucrânia e libertou material radioativo para a atmosfera que afetou vários países europeus. A RADNET faz parte da rede europeia de monitorização da 
radioatividade e efetua em contínuo a monitorização da radioatividade ambiente. funciona também como 
sistema de alerta em caso de acidente nuclear ou emergência radiológica. Existem riscos radiológicos que podem afetar Portugal. Por exemplo, derivados das escórias das minas de urânio na Urgeiriça, do Reator Nuclear Português no Campus Tecnológico e Nuclear (CTN) do Instituto Superior Técnico (https://tecnico.ulisboa.pt/pt/sobre-o-tecnico/campi/tecnologico-e-nuclear/), riscos de incidentes em navios ancorados em portos nacionais ou em transito que tenham propulsão nuclear, lixo radioativo ou armas nucleares, mas também, riscos mais elevados derivados das centrais nucleares espanholas onde há 7 reatores nucleares ativos em 5 centrais. 

No passado já ocorreram diversos acidentes, um dos quais com libertação de radioatividade para o Tejo na 
central nuclear de Almaraz. Esta devia já ter sido encerrada por ter atingido o seu fim de vida útil, mas este foi recentemente aumentado para mais 20 anos e a posterior conversão do local num aterro de resíduos 
nucleares. No passado já houve tentativas de criar um aterro nuclear junto à fronteira nacional no norte perto fronteira do distrito de Bragança, no Douro e agora no Tejo junto à central de Almaraz, todos estes riscos constituem um perigo latente de poluição, que pode afetar a qualidade de vida, saúde e a economia nacional durante muitas gerações caso ocorra algum acidente grave. A exposição a radiação é medida em Sv (Sievert). Na tabela 1 mostramos uma relação entre a exposição e os efeitos produzidos. Relativamente aos riscos, a Agência Internacional da Energia Atómica (IAEA International Atomic Energy Agency) classifica os riscos em três tipos principais: acidentes, incidentes e desvios de acordo com a informação na Fig. 1 As estações de vigilância portuguesas da rede RADNET estão implantadas estrategicamente junto à fronteira e nos principais núcleos populacionais e industriais. A localização das estações é a seguinte: Abrantes, Beja, Bragança, Castelo Branco, Coimbra, Elvas, Évora, Faro, Fratel (estação submersa no Tejo junto à fronteira), Funchal, Junqueira, Juromenha (estação junto ao Guadiana), Lisboa, Meimoa (na fronteira a 100 km da central nuclear de Almaraz com dois reatores ativos), Penhas Douradas, Pocinho (estação submersa no Douro junto à fronteira), Ponta Delgada, Portalegre, Porto e Sines e uma estação na base aérea de Talavera La Real em Badajoz (Espanha).

## Descrição do trabalho
Pretende-se implementar um sistema de informação semelhante ao da RADNET portuguesa composto por 
uma base de dados e uma aplicação que permita interagir com o sistema desenvolvido. Para esse fim cada 
estação da rede possui ou pode possuir vários tipos de sensores de radiação no ar, na água e no solo. As 
estações podem ser permanentes (fixas) ou móveis e serem capazes de detetar radiação em várias gamas. 
Para cada estação deve ser indicada a sua localização e características. Nomeadamente, a data da instalação, o tipo e quantidade de sensores que possui e frequência de leituras. A unidade de medida mais utilizada para 
classificar o nível de radiação é o Sievert (Sv), na prática é usado o mSv como unidade de medida que 
corresponde a 0,001 Sv. Cada sensor tem um limite máximo e mínimo de sensibilidade. Pelo que, em algumas 
estações há sensores com diferentes graus de sensibilidade para procurar cobrir vários espectros de radiação. 
Todas as estações registam o nível de radiação em Sievert (Sv) com frequências distintas: à hora, ao minuto, 
ao segundo e possuem também valores de referência diários, mensais e anuais. É necessário que a base de 
dados mostre em tempo real as leituras nos diversos pontos da rede, permita também o acesso a dados 
históricos e que possa ativar e gerir alertas no caso dos valores ultrapassassem valores pré-definidos e ou de referência. Os níveis de alerta devem estar associados a uma gama de valores de radiação.
Cada estação fixa está equipada com pelo menos dois sensores/detetores Geiger-Müller, um para baixos 
níveis de radiação (de 10 nSv/h a 2 mSv/h) e outro para valores elevados (de 0,1 mSv/h a 10 Sv/h). É necessário registar também leituras com de estações móveis e de equipamentos portáteis que podem ser utilizadas em locais específicos durante vários períodos. Por exemplo, efetuar leituras nas minas da Urgeiriça durante 3 semanas. Com base nos valores detetados deve ser possível gerar alertas. Por exemplo, se for detetado numa estação um valor 10% acima do valor médio anual, deve ser acionado um alarme e participada a situação à Agência Portuguesa do Ambiente e à Autoridade Nacional de Proteção Civil, se o valor detetado tem impacto direto na saúde o alerta deve incluir avisos diretos à população, por exemplo sirenes, altifalantes, SMS, chamadas telefónicas, TV, rádio, internet, email. Deve também ser criada uma escala de valores admissíveis baseado na informação já existente e disponível 
para download das estações da rede RADNET.

