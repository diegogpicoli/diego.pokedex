const url = 'https://pokeapi.co/api/v2/pokemon/'
const todos = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0'
const botao = document.querySelector('#aleatorio')
const botaoNome = document.querySelector('#envia-nome')
const aviso = document.querySelector('#aviso')
const valorNome = document.querySelector('#nome')

const buscaNomes = async () => {
    const listaPokemon = []
    const site = await fetch(todos)
    const objeto = await site.json()

    objeto.results.forEach((pokemon) => {
        listaPokemon.push(pokemon.name)
    })
    return listaPokemon
}


function append(data) {
  const main = document.querySelector('#main');

  const div = document.createElement('div');
  div.className = 'status'
  const divNome = document.createElement('div');
  divNome.className = 'nome'
  const divImage = document.createElement('div');
  divImage.className = 'imagem'
  const img = document.createElement('img');
  img.className = 'img'

  divNome.innerHTML = data.name.toUpperCase();
  img.src = data.sprites.front_default;
  divImage.appendChild(img);

  div.appendChild(divNome);
  div.appendChild(divImage);
  main.innerHTML = ''
  main.appendChild(div);
}

const buscador = buscaNomes().then((elemento) => elemento[0])

const exibePokemon = async () => {
    const sitePadrao = await fetch('https://pokeapi.co/api/v2/pokemon/pikachu')
    const objetoPadrao = await sitePadrao.json()
    append(objetoPadrao)
    botao.addEventListener('click', async () => {
      aviso.innerHTML = ''
      const numero = Math.floor(Math.random() * 1154)
      const buscador = buscaNomes().then((elemento) => elemento[numero])
      const aleatorio = `https://pokeapi.co/api/v2/pokemon/${ await buscador}`
      const site = await fetch(aleatorio)
      const objeto = await site.json()    
        append(objeto)
    })
    botaoNome.addEventListener('click', async () => {
      const valor = document.querySelector('#nome').value.toLowerCase()
      const buscador = buscaNomes().then((elemento) => elemento)
      if (( await buscador).includes(valor)){
        aviso.innerHTML = ''
        const aleatorio = `https://pokeapi.co/api/v2/pokemon/${valor}`
        const site = await fetch(aleatorio)
        const objeto = await site.json()    
        append(objeto)
      } else {
        const avisando = document.createElement('p')
        window.alert('Nome do Pokemon invalido, por favor digite o nome correto!')
        aviso.appendChild(avisando)
      }
    })


}

// const fun = async () => {
//     const teste = await fetch(url)
//     const testes = teste.json()

//     console.log(testes)
// }

window.onload = () => exibePokemon();