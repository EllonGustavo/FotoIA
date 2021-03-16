import React, { useState } from 'react'
import { ReactComponent as Robot } from '../src/images/robot.svg'
import './App.css'
import Carregando from '../src/images/loading.gif'

function App() {
  const [pessoas, setPessoas] = useState([])
  const [carregando, setCarregando] = useState(false)
  const [idade, setIdade] = useState('')
  const [etinia, setEtinia] = useState('')

  function ListaPessoas(props) {
    const pessoas = props.pessoas
    const listagemPessoas = pessoas.map((pessoa) =>
      <img key={pessoa.id} src={pessoa.urls[4][512]}
        title='Pessoa gerada via IA' alt="pessoas gerada via IA" />
    )
    return (
      <>{listagemPessoas}</>
    )
  }

  async function obtemFoto() {
    setCarregando(true)
    let chaveAPI = process.env.REACT_APP_APIKEY
    const filtraEtinia = etinia.length > 0 ? `&ethnicity=${etinia}` : ''
    const filtraIdade = idade.length > 0 ? `&age${idade}` : ''

    let url = `https://api.generated.photos/api/v1/faces?api_key=${chaveAPI}${filtraEtinia}${filtraIdade}&order_by=random`

    await fetch(url)
      .then(response => response.json())
      .then(data => {
        setPessoas(data.faces)
      })
      .catch(function (error) {
        console.error('Houve um erro na requisição ' + error.message)
      })
    setCarregando(false)
  }

  return (
    <div className="app">
      <h1>Gerador de interface com ia</h1>
      <Robot />
      {carregando && <img src={Carregando} title='Aguarde...' alt='Aguarde' />}
      <div className='linha'>
        <ListaPessoas pessoas={pessoas} />
      </div>
      <div className='linha'>
        <label>idade:</label>
        <select onChange={event => setIdade(event.target.value)}>
          <option value=''> todas</option>
          <option value='infant'>infantil</option>
          <option value='child'>criança</option>
          <option value='young-adult'>jovem</option>
          <option value='adult'>adulto(a)</option>
          <option value='eldery'>idoso(a)</option>
        </select>

        <label>etinia:</label>
        <select onChange={event => setEtinia(event.target.value)}>
          <option value=''> todas</option>
          <option value='white'>branca</option>
          <option value='latino'>latina</option>
          <option value='asian'>asiatica</option>
          <option value='black'>negra</option>
        </select>
      </div>
      <div className='linha'>
        <button type='button' onClick={obtemFoto}>
          Obtem Foto
        </button>

        {pessoas.length > 0 &&
          <button type='button' onClick={() => setPessoas([])}>
            Limpar Imagens
        </button>
        }
      </div>
    </div>
  )
}

export default App;