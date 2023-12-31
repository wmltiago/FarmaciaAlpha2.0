import { useState, useEffect } from "react";
import { useDadosFarmacia } from "../contexts/useDadosFarmacia";
export default function FormCadastraFarmacia({
  logradouro,
  localidade,
  bairro,
  uf,
  lat,
  lng,
}) {
  //Desestruturacao para utilizar as variaveis do useDadosFarmacia (context)
  const { cepInformado, setCepInformado } = useDadosFarmacia();
  //Variavel local para armazenar provisoriamente os dados dos inputs e depois enviar para lista completa das farmacias
  const [farmacia, setFarmacia] = useState({});
  //Crio um array para receber os dados ja existentes do localStorage
  let listaFarmacias = JSON.parse(localStorage.getItem("ListaFarmacias"));
  //Como os dados do cep sao recebidos por meio de props e nao so pelo onchange, utilizo o useffect para atualizar o valor de farmacia toda vez que o cepInformado for alterado
  useEffect(() => {
    setFarmacia({
      ...farmacia,
      id: Math.random(),
      logradouro: logradouro,
      bairro: bairro,
      cidade: localidade,
      estado: uf,
      latitude: lat,
      longitude: lng,
    });
  }, [cepInformado, bairro, localidade, logradouro, uf, lat, lng]);
  //Funcao que armazena no array a nova farmacia criada e envia para o localstorage
  function armazenaFarmacia() {
    setFarmacia({
      ...farmacia,
      id: Math.random(),
    });
    listaFarmacias.push(farmacia);
    localStorage.setItem("ListaFarmacias", JSON.stringify(listaFarmacias));
    document.getElementById("reset").click();
    alert(`Uma nova Farmácia foi cadastrado com sucesso!`);
  }

  return (
    //Formulario criado com bootstrap e feito modificacoes para responsividade, em cada input existe um onchange que envia valor para var farmacia
    <div
      className="container"
      onLoad={() => document.getElementById("reset").click()}
    >
      <div className="row justify-content-center">
        <form
          autoComplete="off"
          className="row g-3 mt-5 ps-4 pe-4 pt-5"
          onSubmit={(e) => {
            e.preventDefault();
            armazenaFarmacia();
          }}
        >
          <h4>Cadastro de nova Farmácia:</h4>
          <fieldset className="col-md-6 col-lg-4">
            <label htmlFor="inputRazaoSocial" className="form-label">
              Razão Social
            </label>
            <input
              value={farmacia.razao || ''}
              type="text"
              className="form-control"
              id="inputRazaoSocial"
              placeholder="Informe a razão social"
              required
              onChange={(e) =>
                setFarmacia({ ...farmacia, razao: e.target.value })
              }
            />
          </fieldset>
          <fieldset className="col-md-6 col-lg-4">
            <label htmlFor="inputCNPJ" className="form-label">
              CNPJ
            </label>
            <input
            value={farmacia.cnpj || ''}
              type="text"
              className="form-control"
              id="inputCNPJ"
              placeholder="00.000.000/0000-00"
              required
              minLength={14}
              onChange={(e) =>
                setFarmacia({ ...farmacia, cnpj: e.target.value })
              }
            />
          </fieldset>
          <fieldset className="col-md-6 col-lg-4">
            <label htmlFor="inputNomeFantasia" className="form-label">
              Nome Fantasia
            </label>
            <input
            value={farmacia.nome || ''}
              type="text"
              className="form-control"
              id="inputNomeFantasia"
              placeholder="Informe o nome fantasia"
              required
              onChange={(e) =>
                setFarmacia({ ...farmacia, nome: e.target.value })
              }
            />
          </fieldset>
          <fieldset className="col-md-6 col-lg-4">
            <label htmlFor="inputEmail" className="form-label">
              E-mail
            </label>
            <input
            value={farmacia.email || ''}
              type="email"
              className="form-control"
              id="inputEmail"
              placeholder="email@email.com"
              required
              onChange={(e) =>
                setFarmacia({ ...farmacia, email: e.target.value })
              }
            />
          </fieldset>
          <fieldset className="col-md-6 col-lg-4">
            <label htmlFor="inputTelefone" className="form-label">
              Telefone
            </label>
            <input
            value={farmacia.telefone || ''}
              type="number"
              className="form-control"
              id="inputTelefone"
              placeholder="(99) 9999-9999"
              onChange={(e) =>
                setFarmacia({ ...farmacia, telefone: e.target.value })
              }
            />
          </fieldset>
          <fieldset className="col-md-6 col-lg-4">
            <label htmlFor="inputCelular" className="form-label">
              Celular
            </label>
            <input
            value={farmacia.celular || ''}
              type="number"
              className="form-control"
              id="inputCelular"
              placeholder="(99) 9.9999-9999"
              required
              onChange={(e) =>
                setFarmacia({ ...farmacia, celular: e.target.value })
              }
            />
          </fieldset>
          <fieldset className="col-md-2 col-lg-3">
            <label htmlFor="inputCEP" className="form-label">
              CEP
            </label>
            <input
              type="number"
              className="form-control"
              id="inputCEP"
              placeholder="Apenas números {8}"
              pattern="^(?=.*[0-9])[0-9]{8}$"
              required
              onChange={(e) => setCepInformado(e.target.value)}
            />
          </fieldset>
          <fieldset className="col-md-8 col-lg-6">
            <label htmlFor="inputTelefone" className="form-label">
              Logradouro
            </label>
            <input
              value={farmacia.logradouro || ''}
              type="phone"
              className="form-control"
              id="inputTelefone"
              placeholder="Rua/Avenida . . ."
              required
              onChange={(e) =>
                setFarmacia({ ...farmacia, logradouro: e.target.value })
              }
            />
          </fieldset>
          <fieldset className="col-md-2 col-lg-3">
            <label htmlFor="inputCelular" className="form-label">
              Número
            </label>
            <input
            value={farmacia.numero || ''}
              type="phone"
              className="form-control"
              id="inputCelular"
              placeholder="0000"
              required
              onChange={(e) =>
                setFarmacia({ ...farmacia, numero: e.target.value })
              }
            />
          </fieldset>
          <fieldset className="col-md-6 col-lg-4">
            <label htmlFor="inputBairro" className="form-label">
              Bairro
            </label>
            <input
              value={farmacia.bairro || ''}
              type="text"
              className="form-control"
              id="inputBairro"
              placeholder="Informe o bairro"
              required
              onChange={(e) =>
                setFarmacia({ ...farmacia, bairro: e.target.value })
              }
            />
          </fieldset>
          <fieldset className="col-md-6 col-lg-4">
            <label htmlFor="inputCidade" className="form-label">
              Cidade
            </label>
            <input
              value={farmacia.cidade || ''}
              type="text"
              className="form-control"
              id="inputCidade"
              placeholder="Informe a cidade"
              required
              onChange={(e) =>
                setFarmacia({ ...farmacia, cidade: e.target.value })
              }
            />
          </fieldset>
          <fieldset className="col-md-6 col-lg-4">
            <label htmlFor="inputEstado" className="form-label">
              Estado
            </label>
            <input
              value={farmacia.estado || ''}
              type="text"
              className="form-control"
              id="inputEstado"
              placeholder="Informe o estado"
              required
              onChange={(e) =>
                setFarmacia({ ...farmacia, estado: e.target.value })
              }
            />
          </fieldset>
          <fieldset className="col-md-6">
            <label htmlFor="inputComplemento" className="form-label">
              Complemento
            </label>
            <input
            value={farmacia.complemento || ''}
              type="text"
              className="form-control"
              id="inputComplemento"
              placeholder="Perto do estabelecimento . . . "
              onChange={(e) =>
                setFarmacia({ ...farmacia, complemento: e.target.value })
              }
            />
          </fieldset>
          <fieldset className="col-md-6 col-lg-3">
            <label htmlFor="inputLatitude" className="form-label">
              Latitude
            </label>
            <input
              value={farmacia.latitude || ''}
              type="text"
              className="form-control"
              id="inputLatitude"
              placeholder="Informe a latitude"
              required
              onChange={(e) =>
                setFarmacia({ ...farmacia, latitude: e.target.value })
              }
            />
          </fieldset>
          <fieldset className="col-md-6 col-lg-3">
            <label htmlFor="inputLongitude" className="form-label">
              Longitude
            </label>
            <input
              value={farmacia.longitude || ''}
              type="text"
              className="form-control"
              id="inputLongitude"
              placeholder="Informe a longitude"
              required
              onChange={(e) =>
                setFarmacia({ ...farmacia, longitude: e.target.value })
              }
            />
          </fieldset>
          <div className="d-grid gap-1 d-md-flex justify-content-md-end">
            <input
              id="reset"
              value="Limpar"
              type="reset"
              className="btn btn-secondary me-md-1"
              onClick={() => {
                setFarmacia({
                  logradouro: "",
                  bairro: "",
                  cidade: "",
                  estado: "",
                  latitude: "",
                  longitude: "",
                });
              }}
            />
            <input
              value="Cadastrar"
              type="submit"
              className="btn btn-success"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
