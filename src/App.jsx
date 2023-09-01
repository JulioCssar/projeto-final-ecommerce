import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [updatedProductName, setUpdatedProductName] = useState('');
  const [updatedProductPrice, setUpdatedProductPrice] = useState('');

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

  const editProduct = (productId) => {
    // Pesquisa o Produto pelo ID
    const productToEdit = products.find((product) => product.id === productId);

    if (productToEdit) {
      // definir produto em detalhes
      setEditingProduct(productId);
      setUpdatedProductName(productToEdit.name);
      setUpdatedProductPrice(productToEdit.price);
    }
  };

  const saveProduct = (productId) => {
    // Encontre o produto no estado
    const productIndex = products.findIndex((product) => product.id === productId);

    if (productIndex !== -1) {
      // Criar uma cópia do estado do produtos
      const updatedProducts = [...products];

      // Atualiza os detalhes do produto
      updatedProducts[productIndex].name = updatedProductName;
      updatedProducts[productIndex].price = updatedProductPrice;

      // Atualiza o estado de produtos
      setProducts(updatedProducts);

      // Limpa o estado de edição
      setEditingProduct(null);
    }
  };

  const cancelEdit = () => {
    // Limpa o estado de edição
    setEditingProduct(null);
  };

  const deleteProduct = (productId) => {
    // Filtra os produtos para remover o produto com o ID especificado
    const updatedProducts = products.filter((product) => product.id !== productId);

    // Atualiza o estado de produtos
    setProducts(updatedProducts);
  };

  return (
    <div className="App">
      <div className="topBar">
        <h1>Confira</h1>
        <input
          id="input"
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
            {editingProduct === product.id ? (
              <div>
                <input
                  type="text"
                  value={updatedProductName}
                  onChange={(e) => setUpdatedProductName(e.target.value)}
                />
                <input
                  type="number"
                  value={updatedProductPrice}
                  onChange={(e) => setUpdatedProductPrice(e.target.value)}
                />
                <button className="saveButton" onClick={() => saveProduct(product.id)}>Salvar</button>
                <button className="cancelButton" onClick={cancelEdit}>Cancelar</button>
              </div>
            ) : (
              <>
                <h3 className="titulo">{product.name}</h3>
                <p className="texto">R$ {product.price}</p>
                <button className="editButton" onClick={() => editProduct(product.id)}>Editar</button>
                <button className="deleteButton" onClick={() => deleteProduct(product.id)}>Excluir</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;






// Os comentários são para servir como uma "documentação" simples