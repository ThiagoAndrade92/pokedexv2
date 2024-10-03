fetch('https://pokeapi.co/api/v2/pokemon?limit=' + quantidade)
    .then(response => response.json())
    .then(todosPokemon => {
        // console.log(todosPokemon)
        var pokemon = [];

        todosPokemon.results.forEach(val => {
            fetch(val.url)
                .then(res => res.json())
                .then(pokeInfo => {
                    // console.log(pokeInfo)
                   pokeInfo.abilities.forEach(val => {
                    fetch('https://pokeapi.co/api/v2/ability/65/')
                    .then(res => res.json())
                    .then(teste => {
                        console.log(teste)
                    })
                   })
                   



                })
        })
    })