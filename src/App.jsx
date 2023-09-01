import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    axios.get('https://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline')
      .then((response) => {
        setProducts(response.data);
        setFilteredProducts(response.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar produtos:', error);
      });
  }, []);

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm, products]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="App">
      <div className="topBar">
        {/* <img id="logo" src="src/assets/img/logo.png" alt="Logo" /> */}
        <h1>Confira</h1>
        <input id='input'
          type="text"
          placeholder="Pesquisar produtos"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className="container">
        {filteredProducts.map((product) => (
          <div key={product.id} className="card">
            <img src={product.image_link} alt={product.name} />
            <h3 className="titulo">{product.name}</h3>
            <p className="texto">R$ {product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

