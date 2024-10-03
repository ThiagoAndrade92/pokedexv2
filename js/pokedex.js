document.addEventListener('DOMContentLoaded', () => {
    const boxPokemons = document.querySelector('.box-pokemons');
    const barraDeProcura = document.querySelector('#barra_de_procura');
    const sugestoes = document.querySelector('#sugestoes');

    let listaDePokemons = [];
    // Carregar a lista de Pokémons ao iniciar a página
    const carregarListaDePokemons = async () => {
        try {
            let resposta = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000');
            let data = await resposta.json();
            listaDePokemons = data.results.map(pokemon => {
                let id = pokemon.url.split('/').slice(-2, -1)[0];
                return {
                    name: pokemon.name,
                    id: id
                };
            });
        } catch (error) {
            console.error('Erro ao carregar a lista de Pokémons:', error);
        }
    };

    barraDeProcura.addEventListener('input', (event) => {
        const query = event.target.value.toLowerCase().trim();
        if (query) {
            mostrarSugestoes(query);
        } else {
            sugestoes.innerHTML = '';
            fetchPokemonByIdOrName(1); // Exibe o primeiro Pokémon se a barra de pesquisa estiver vazia
        }
    });

    const mostrarSugestoes = (query) => {
        const sugestoesFiltradas = listaDePokemons.filter(pokemon => 
            pokemon.name.startsWith(query) || pokemon.id.startsWith(query)
        );
        sugestoes.innerHTML = sugestoesFiltradas.map(pokemon => `<li>${pokemon.name}</li>`).join('');
    };
    
    

    sugestoes.addEventListener('click', (event) => {
        if (event.target.tagName === 'LI') {
            barraDeProcura.value = event.target.textContent;
            sugestoes.innerHTML = '';
            fetchPokemonByIdOrName(event.target.textContent);
        }
    });

    const fetchPokemonByIdOrName = async (query) => {
        let url = `https://pokeapi.co/api/v2/pokemon/${query}`;
        try {
            let resposta = await fetch(url);
            if (!resposta.ok) throw new Error('Pokémon não encontrado');
            let data = await resposta.json();
            criarCartao(data);
        } catch (error) {
            console.error(error);
            boxPokemons.innerHTML = '<p>Pokémon não encontrado</p>';
        }
    }

    const criarCartao = (poke) => {
        // Formatar o ID do Pokémon com zeros à esquerda para exibição
        let formatarId = poke.id.toString().padStart(5, '0');

        let logoElemento2 = poke.types[1] ? `<img src="${elementoImg(poke.types[1].type.name)}" class="logo-elemento2">` : '';

        let sprite = poke.sprites.versions['generation-v']['black-white'].animated.front_default || poke.sprites.front_default;

        boxPokemons.innerHTML = `
        <div class="pokemon-info ${poke.types[0].type.name}">
            <div class="id"><strong>#</strong> ${formatarId} </div>
            <div class="logo-elementos">
                <img src="${elementoImg(poke.types[0].type.name)}" class="logo-elemento1">
                ${logoElemento2}
            </div>
            <div class="circulo"><img src="${sprite}" class="img" id="img"></div>
            <div class="infos">
                <div class="nome-pokemon"> <strong>${poke.name}</strong></div>
                <div class="tipo">Tipo: ${traduzirTipo(poke.types[0].type.name)}</div>
                <div class="peso">Peso: ${(poke.weight / 10).toFixed(1)}kg</div>
            </div>
        </div>
        `;
    }

    // Carregar a lista de Pokémons ao iniciar a página
    carregarListaDePokemons();

    // Buscar o primeiro Pokémon ao carregar a página
    fetchPokemonByIdOrName(1);

    function traduzirTipo(tipo) {
        var dicionarioTipos = {
            "normal": "Normal",
            "fighting": "Lutador",
            "flying": "Voador",
            "poison": "Veneno",
            "ground": "Terrestre",
            "rock": "Pedra",
            "bug": "Inseto",
            "ghost": "Fantasma",
            "steel": "Aço",
            "fire": "Fogo",
            "water": "Água",
            "grass": "Grama",
            "electric": "Elétrico",
            "psychic": "Psíquico",
            "ice": "Gelo",
            "dragon": "Dragão",
            "dark": "Sombrio",
            "fairy": "Fada"
        };
        return dicionarioTipos[tipo] || tipo;
    }

    function elementoImg(img) {
        var elementos = {
            "normal": "./imagens/normal.png",
            "fighting": "./imagens/lutador.png",
            "flying": "./imagens/voador.png",
            "poison": "./imagens/veneno.png",
            "ground": "./imagens/terrestre.png",
            "rock": "./imagens/pedra.png",
            "bug": "./imagens/inseto.png",
            "ghost": "./imagens/fantasma.png",
            "steel": "./imagens/aço.png",
            "fire": "./imagens/fogo.png",
            "water": "./imagens/agua.png",
            "grass": "./imagens/grama.png",
            "electric": "./imagens/eletro.png",
            "psychic": "./imagens/psiquico.png",
            "ice": "./imagens/gelo.png",
            "dragon": "./imagens/dragao.png",
            "dark": "./imagens/sombrio.png",
            "fairy": "./imagens/fada.png"
        };
        return elementos[img] || img;
    }
});
