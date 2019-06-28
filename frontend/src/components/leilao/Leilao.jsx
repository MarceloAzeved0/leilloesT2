import React, { Component } from 'react';
import axios from 'axios';
import { getList } from '../../persistence/Leilao.js';
import { validaLance } from '../../business/Leilao.js';

import Main from '../template/Main';

const baseUrl = 'http://localhost:3001/loans';

const headerProps = {
  title: 'Leilões',
  subtitle: 'Dê um lance em um leilão aberto ou abra seu próprio leilão!'
}

const initialState = {
  lance: 0,
  user: {
    id: 1,
    name: 'Gabriel Brunichaki',
    email: 'gabriel.brunichaki@acad.pucrs.br'
  },
  loan: {
    name: '',
    description: '',
    minPrice: 0,
    winner: {
      id: 0,
      name: '',
      email: '',
      price: 0
    },
    creator: {
      id: 2,
      name: 'Marcelo Bernardy',
      email: 'marcelo.bernardy@acad.pucrs.br'
    }
  },
  list: []
}

export default class Leilao extends Component {
  state = { ...initialState };

  componentWillMount() {
    getList().then(data => this.setState({ list: data }));
  }

  darLance(lance) {
    if(validaLance(this.state.loan, lance)) {
      alert('Lance válido!');
    } else {
      alert('Lance inválido!');
    }
  }

  clear() {
    this.setState({ loan: initialState.loan });
  }
  

  save() {
    const loan = this.state.loan;
    const method = loan.id ? 'put' : 'post';
    const url = loan.id ? `${baseUrl}/${loan.id}` : baseUrl;

    axios[method](url, loan)
      .then(resp => {
        const list = this.getUpdatedList(resp.data);
        this.setState({ loan: initialState.loan, list });
      })
  }

  getUpdatedList(loan) {
    const list = this.state.list.filter(l => l.id !== loan.id);
    list.unshift(loan);
    return list;
  }

  updateField(event) {
    const loan = { ...this.state.loan };
    loan[event.target.name] = event.target.value;
    this.setState({ loan });
  }

  renderForm() {
    return (
      <div className="form">
        <div className="row">
          <div className="col-12 col-md-4">
            <div className="form-group">
              <label>Nome</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={this.state.loan.name}
                onChange={e => this.updateField(e)}
                placeholder="Digite o nome do produto"
              />
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="form-group">
              <label>Descrição</label>
              <input
                type="text"
                className="form-control"
                name="description"
                value={this.state.loan.description}
                onChange={e => this.updateField(e)}
                placeholder="Digite a descrição do produto"
              />
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="form-group">
              <label>Preço Mínimo</label>
              <input
                type="text"
                className="form-control"
                name="minPrice"
                value={this.state.loan.minPrice}
                onChange={e => this.updateField(e)}
                placeholder="Preço mínimo do produto"
              />
            </div>
          </div>
        </div>

        <hr />

        <div className="row">
          <div className="col-12 d-flex justify-content-end">
            <button className="btn btn-primary" onClick={e => this.save(e)}>Salvar</button>
            <button className="btn btn-secondary ml-2" onClick={e => this.clear(e)}>Cancelar</button>
          </div>
        </div>
      </div>
    );
  }

  load(loan) {
    this.setState({ loan });
  }

  remove(loan) {
    axios.delete(`${baseUrl}/${loan.id}`)
      .then(resp => {
        const list = this.state.list.filter(l => l.id !== loan.id);
        this.setState({ list });
      });
  }

  renderTable() {
    return (
      <table className="table mt-4">
        <thead>
          <tr>
            <th>Nº</th>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Preço Mínimo</th>
            <th>Dê Seu Lance</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {this.renderRows()}
        </tbody>
      </table>
    );
  }

  renderRows() {
    return this.state.list.map(loan => {
      return (
        <tr key={loan.id}>
          <td>{loan.id}</td>
          <td>{loan.name}</td>
          <td>{loan.description}</td>
          <td>{loan.minPrice}</td>
          <td><input type="text" name="inputLance" onClick={e => this.setState({ lance: e.target.value})} /></td>
          <td>
            <button className="btn btn-primary" onClick={e => this.darLance(this.state.lance)}>Dar Lance</button>
            <button className="btn btn-success ml-2">Encerrar</button>
            <button className="btn btn-warning ml-2" onClick={e => this.load(loan)}>Editar</button>
            <button className="btn btn-danger ml-2" onClick={e => this.remove(loan)}>Excluir</button>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <Main {...headerProps}>
        {this.renderForm()}
        {this.renderTable()}
      </Main>
    );
  }
}