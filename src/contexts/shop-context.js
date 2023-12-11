
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Vendas = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [items, setItems] = useState([]);
  const [qtd, setQtd] = useState(1);

  const [searchResultsCliente, setSearchResultsCliente] = useState([]);
  const [searchTermCliente, setSearchTermCliente] = useState('');
  const [nomeCliente, setNomeCliente] = useState('');
  const [idCliente, setIdCliente] = useState(0);

  const [formaPag, setFormaPag] = useState([]); //dados que vem do BD
  const [formaPagSelect, setFormaPagSelect] = useState("");

  // const [dadosCompra, setDadosCompra] = useState({
  //   formaPagamento: formaPagSelect,
  //   parcelas: 1, // Defina um valor padrão ou ajuste conforme necessário
  //   funcionario: 1, // Você pode precisar obter essa informação de alguma forma
  //   cliente: idCliente,
  //   itensCompra: items,
  // });


  const finalizarCompra = async () => {
    try {

      const itensCompra = items.map(({ id, quantidade, precoUnitario }) => ({ id, quantidade, precoUnitario }));

      const dadosCompra = {
        formaPagamento: Number(formaPagSelect),
        parcelas: 1, // ou o valor que desejar
        funcionario: 1, // ou o valor que desejar
        cliente: idCliente,
        itensCompra: itensCompra
      };

      // Envie os dados para a API
      await axios.post("http://localhost:5000/compras", dadosCompra);

      // Limpe os itens do carrinho e outros estados necessários
      setItems([]);
      setNomeCliente("");
      setIdCliente("");
      setFormaPagSelect("");

      // Resetar a busca de clientes
      setSearchTermCliente("");
      setSearchResultsCliente([]);

      // Resetar a busca de produtos
      setSearchTerm("");
      setSearchResults([]);

      // Feche o modal
      // Adicione lógica aqui se necessário
      console.log(dadosCompra);

    } catch (error) {
      console.error('Erro ao finalizar a compra:', error);
    }
  };

  const listarFormaPag = async () => {

    try {

      const response = await axios.get("http://localhost:5000/formaPagamento/");

      console.log(response);
      const data = response.data;

      setFormaPag(data);
      console.log(data);

    } catch (error) {
      console.log(error);
    }

  }

  const handleSearchClienteChange = async (e) => {
    setSearchTermCliente(e.target.value);

    if (e.target.value.length >= 3) {
      try {
        const response = await axios.get(`http://localhost:5000/clientes?nome_like=${e.target.value}`);
        setSearchResultsCliente(response.data);
      } catch (error) {
        console.error('Erro ao buscar clientes:', error);
      }
    }
  };


  const handleClienteSelecionado = (id, nome) => {

    const novoId = id;
    const novoNome = nome;
    setIdCliente(novoId);
    setNomeCliente(novoNome);

    console.log(novoId, novoNome);
  }


  const handleSearchChange = async (e) => {
    setSearchTerm(e.target.value);

    if (e.target.value.length >= 3) {
      try {
        const response = await axios.get(`http://localhost:5000/medicamentos?medicamento_like=${e.target.value}`);
        setSearchResults(response.data);
      } catch (error) {
        console.error('Erro ao buscar medicamentos:', error);
      }
    }
  };

  const handleQtdChange = (e) => {
    setQtd(Number(e.target.value));
  };




  const addItemToSale = (item) => {
    const existingItemIndex = items.findIndex((i) => i.id === item.id);

    if (existingItemIndex !== -1) {
      const updatedItems = [...items];
      updatedItems[existingItemIndex].quantidade += Number(qtd);
      setItems(updatedItems);
    } else {
      const newItem = {
        id: item.id,
        medicamento: item.medicamento,
        precoUnitario: Number(item.preco),
        quantidade: qtd,
      };
      setItems((prevItems) => [...prevItems, newItem]);
    }

    setQtd(1);

  };

  const removeItemFromSale = (itemId) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantidade: Math.max(item.quantidade - 1, 0) } : item
      )
    );
    setItems((prevItems) => prevItems.filter((item) => item.quantidade > 0));
  };

  const formatarValor = (valor, moeda = 'BRL', estilo = 'currency') => {
    // 'moeda' representa o código da moeda (por exemplo, 'BRL' para Real brasileiro)
    // 'estilo' pode ser 'currency', 'decimal' ou 'percent', dependendo do formato desejado

    const opcoes = {
      style: estilo,
      currency: moeda,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    };

    return valor.toLocaleString('pt-BR', opcoes);
  };

  useEffect(() => {
    listarFormaPag();
  }, [])


  return (
    <div>

      <div className='container mb-5'>
        <label>Pesquisar Clientes:</label>
        <input type="text" value={searchTermCliente} onChange={handleSearchClienteChange} />
        <div>
          {searchResultsCliente.map((result) => (
            <div key={result.id}>
              <span>{result.id} | </span>
              <span>{result.nome}</span>
              <button onClick={() => handleClienteSelecionado(result.id, result.nome)}>Selecionar</button>
            </div>
          ))}
        </div>
      </div>

      <div className='container'>
        <label>Pesquisar Medicamentos:</label>
        <input type="text" value={searchTerm} onChange={handleSearchChange} />
        <label>Qtd: </label>
        <input value={qtd || 0} type="number" onChange={handleQtdChange} />
        <div>
          {searchResults.map((result) => (
            <div key={result.id}>
              <span>{result.medicamento} | </span>
              <span>{formatarValor(result.preco)}</span>
              <button onClick={() => addItemToSale(result)}>Adicionar</button>
            </div>
          ))}
        </div>
      </div>

      <div className='container'>
        <h2>Itens:</h2>
        {items.map((item) => (
          <div key={item.id}>
            <div className='row justify-content-around mb-2'>
              <span className='col-3'>{item.medicamento} | </span>
              <span className='col-3'>{formatarValor(item.precoUnitario)} | </span>
              <span className='col-3'>{item.quantidade}</span>
              <div className='col-3'>
                <button className="btn btn-danger" onClick={() => removeItemFromSale(item.id)}><i className="bi bi-trash3-fill"></i></button>
              </div>
            </div>


          </div>
        ))}
      </div>

      <div id="valorTotal" className='container'>
        <h2>Valor Total: {formatarValor(items.reduce((acc, item) => acc + item.quantidade * item.precoUnitario, 0))}</h2>
      </div>
      <div className='container'>
        {!idCliente || items.length === 0 ? (
          <button type="button" className="btn btn-primary" disabled>
            Launch demo modal
          </button>
        ) : (
          <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Launch demo modal
          </button>
        )}
      </div>


      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Finalizar compra</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div>Cliente: {nomeCliente}</div>
              <div>Valor total:  {formatarValor(items.reduce((acc, item) => acc + item.quantidade * item.precoUnitario, 0))}</div>
              <fieldset className="col-md-4">
                <label htmlFor="tipo" className="form-label">
                  Forma de pagamento
                </label>
                <select
                  id="tipo"
                  className="form-select"
                  defaultValue={3}
                  aria-label="Selecione o tipo do medicamento"
                  required
                  onChange={event => setFormaPagSelect(event.target.value)}
                >
                  <option disabled></option>
                  {formaPag.map((tipo) => (
                    <option value={tipo.id} key={tipo.id}> {tipo.descricao} </option>
                  ))}
                </select>
              </fieldset>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={finalizarCompra}>Save changes</button>
            </div>
          </div>
        </div>
      </div>

    </div>



  );
};

export default Vendas;