import logoNota from "../imagens/logo-farmacia-alpha-cupom.png"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from "react-router-dom";


export default function FormCaixa() {

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [items, setItems] = useState([]);
  const [qtd, setQtd] = useState(1);

  const [searchTermCliente, setSearchTermCliente] = useState('');
  const [searchResultsClientes, setSearchResultsClientes] = useState([]);
  const [idCliente, setIdCliente] = useState('');
  const [nomeCliente, setNomeCliente] = useState('');

  const [formaPag, setFormaPag] = useState([]);
  const [formaPagSelect, setFormaPagSelect] = useState("");


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

  useEffect(() => {
    listarFormaPag();
  }, [])

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


  const handleSearchChangeCliente = async (e) => {
    setSearchTermCliente(e.target.value);

    if (e.target.value.length >= 3) {
      try {
        const response = await axios.get(`http://localhost:5000/clientes?nome_like=${e.target.value}`);
        setSearchResultsClientes(response.data);
      } catch (error) {
        console.error('Erro ao buscar clientes:', error);
      }
    }
  };

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

  const handleClienteSelecionado = (id, nome) => {

    const novoId = id;
    const novoNome = nome;
    setIdCliente(novoId);
    setNomeCliente(novoNome);

    console.log(novoId, novoNome);
  }

  const addItemToSale = (item) => {
    const existingItemIndex = items.findIndex((i) => i.id === item.id);

    if (existingItemIndex !== -1) {
      const updatedItems = [...items];
      updatedItems[existingItemIndex].quantity += Number(qtd);
      setItems(updatedItems);
    } else {
      const newItem = {
        id: item.id,
        medicamento: item.medicamento,
        preco: Number(item.preco),
        quantity: qtd,
      };
      setItems((prevItems) => [...prevItems, newItem]);
    }

    setQtd(1);

  };

  const removeItemFromSale = (itemId) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: Math.max(item.quantity - 1, 0) } : item
      )
    );
    setItems((prevItems) => prevItems.filter((item) => item.quantity > 0));
  };

  return (
    <div className="container">
      <div className="row justify-content-center pt-5" style={{ marginTop: "67px" }}>
        <main className="col-8">

          <div className="row mb-5 text-center" >
            <h2 >Lançamento de vendas</h2>
          </div>
          <div className="row mb-5">
            <h4 className="p-0">Selecione um Cliente</h4>
            <input className="form-control form-control-lg"
              type="text"
              placeholder="Digite nome ou CPF..."
              aria-label=".form-control-lg example"
              value={searchTermCliente}
              onChange={handleSearchChangeCliente}
            />

          </div>

          <div className="row g-3 mb-5">
            <div>
              <table className="table">
                <thead>
                  <tr className="text-center">
                    <th scope="col">ID</th>
                    <th scope="col">Nome</th>
                    <th scope="col">CPF</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {searchResultsClientes.map((item) => {
                    return (

                      <tr key={item.id} className="text-center">
                        <th scope="row">{item.id}</th>
                        <td>{item.nome}</td>
                        <td>{item.cpf}</td>
                        <td className="text-end">
                          <button
                            onClick={() => handleClienteSelecionado(item.id, item.nome)}
                            type="button"
                            className="btn btn-primary ms-1">
                            <i className="bi bi-check2-square"></i> Selecionar Cliente
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {searchResultsClientes.length === 0 ? <div>Não existem clientes para serem apresentados.</div> : null}
          </div>

          <div className="row">
            <div className="col-lg-8 p-0">
              <h4>Selecione um Produto</h4>
              <input className="form-control "
                type="text"
                placeholder="Digite nome ou código..."
                aria-label=".form-control-lg example"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <div className="col-lg-4 p-0 ps-lg-2">
              <h4>Qtd.</h4>
              <div className="input-group">

                <input className="form-control"
                  type="number" value={qtd || 1}
                  placeholder="Digite a quantidade"
                  aria-label=".form-control-lg example"
                  onChange={handleQtdChange}
                />

              </div>

            </div>
            <div className="row g-3 mb-5">
              <div>
                <table className="table">
                  <thead>
                    <tr className="text-center">
                      <th scope="col">ID</th>
                      <th scope="col">Medicamento</th>
                      <th scope="col">Preço</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {searchResults.map((item) => {
                      return (

                        <tr key={item.id} className="text-center">
                          <th scope="row">{item.id}</th>
                          <td>{item.medicamento}</td>
                          <td>{formatarValor(item.preco)}</td>
                          <td className="text-end">
                            <button
                              onClick={() => addItemToSale(item)}
                              type="button"
                              className="btn btn-primary ms-1">
                              <i className="bi bi-plus-circle"></i> Adicionar Produto
                            </button>
                          </td>

                        </tr>

                      );

                    })}
                  </tbody>
                </table>
              </div>
              {searchResults.length === 0 ? <div>Não existem medicamentos para serem apresentados.</div> : null}
            </div>
          </div>
        </main>
        <aside className="col-4" style={{ paddingLeft: "2rem" }}>

          <div className="container">

            <div className="row mt-2 mb-2">
              <div id="cupom" style={{ backgroundColor: "#fffab1", height: "600px", padding: "1.5rem", fontFamily: "VT323, monospace", fontSize: "1.3rem", lineHeight: "1.3rem", borderRadius: "10px" }}>
                <div id="cabecalhoCupom" className="text-center mb-3">
                  <img src={logoNota} alt="Farmácia Alpha" width="200px" />
                  <br />
                  R. Nossa Sra, 309 - Recife - PE <br />
                  CNPJ 01123131/100000
                </div>
                {items.map((item) => (
                  <div id="itens" >
                    <div key={item.id} className='container'>
                      <div className='row mb-2'>
                        <span className='row'>{item.medicamento}</span>
                        <span className='col-3 p-2'>{item.quantity} UN </span>
                        <span className='col-4 p-2'>x {formatarValor(item.preco)}</span>
                        <span className='col-4 p-2'>{formatarValor(item.quantity * item.preco)}</span>
                        <div className='col-1'>
                          <button className="btn btn-danger btn-sm" onClick={() => removeItemFromSale(item.id)}><i className="bi bi-trash3-fill"></i></button>
                        </div>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            </div>

            <div className="row text-center" style={{ color: "red", fontWeight: "bold", fontSize: "1.5rem" }}>
              <div className="col-sm-6">VALOR TOTAL</div>
              <div id="valorTotal" className="col-sm-6">{formatarValor(items.reduce((acc, item) => acc + item.quantity * item.preco, 0))}</div>
            </div>


            <div className="row text-center mt-3">
              {items.length === 0 ? (


                <button type="button" className="btn btn-success" disabled><i className="bi bi-check2-circle"></i> Finalizar</button>

              ) : (

                <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal"><i className="bi bi-check2-circle"></i> Finalizar</button>

              )}
            </div>
          </div>
        </aside>
      </div>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Finalizar compra</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div>Cliente: <b>{nomeCliente}</b></div>
              <div>Valor total:  <b>{formatarValor(items.reduce((acc, item) => acc + item.quantity * item.preco, 0))}</b></div><br/>
              <fieldset className="col-md-6">
                <label htmlFor="tipo" className="form-label">
                  Forma de pagamento
                </label>
                <select
                  id="tipo"
                  className="form-select"
                  aria-label="Selecione o tipo do medicamento"
                  required
                  onChange={event => setFormaPagSelect(event.target.value)}
                >
                  <option ></option>
                  {formaPag.map((tipo) => (

                    <option value={tipo.id} key={tipo.id}> {tipo.descricao} </option>
                  ))}
                </select>
              </fieldset>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Fechar</button>
              <button type="button" className="btn btn-success">Finalizar Pagamento</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}