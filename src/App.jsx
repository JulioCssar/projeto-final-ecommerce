import { useEffect, useState } from 'react'
import axios from 'axios'

import "./App.css"

function App() {
  const [count, setCount] = useState(0)
  const [subTitulo, setSubTitulo] = useState("")

  const [produtos, setProdutos] = useState([])

  async function handleGetProducts() {
    const { data } = await axios.get("https://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline") //Api usada 
    setProdutos(data)
  }

  useEffect(() => { //Save products
    handleGetProducts()
  }, [])

  return (  //Retorno
    <>
      <div className='topBar'>
{/*         <img id='logo' src="assets/logo/logo.png" alt="Logo"/> A logo não carregou no Deploy do Vercel, apenas na minha maquina  */}
      </div>
      <div className="container">
        {
          produtos.map((item) => (
            <div className="card">
              <img src={item.image_link} alt={item.name} width={100} />
              <span className="titulo">{item.name}</span>
              <span className="texto">R$ {item.price}</span>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default App
