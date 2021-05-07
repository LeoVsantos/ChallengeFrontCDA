import React from 'react';
import ReactDOM from 'react-dom';
import { v4 } from 'uuid';
import { createServer, Model, Response } from 'miragejs';
import App from './App';

interface DataProps {
  nome: string;
  descricao: string; 
  multa?: number; 
  tempoPrisao: number; 
  status: number;
}

createServer({
  models: {
    users: Model,
    penalcodes: Model,
  },

  seeds(server) {
    server.db.loadData({
      users: [
        {
          id: 1,
          nome: "Boltz",
          senha: "senhaboltz"
        },
        {
          id: 2,
          nome: "Mexecano",
          senha: "senhamexecano"
        },
        {
          id: 3,
          nome: "Tico",
          senha: "senhatico"
        },
        {
          id: 4,
          nome: "Teco",
          senha: "senhateco"
        }
      ],
      penalcodes: [
        {
          id: 1,
          nome: "Desacato",
          descricao: "Desacato, desobediência ou desrespeito perante um tribunal ou oficiais da policia na forma de comportamento que se opõe ou desafia a autoridade, a justiça e a dignidade do tribunal. Um réu só pode ser cobrado uma vez por desacato",
          dataCriacao: "2021-04-29T01:26:35.700Z",
          multa: 501.2,
          tempoPrisao: 30,
          status: 1
        },
        {
          id: 2,
          nome: "Dinheiro Ilícito",
          descricao: "Estar em posse de dinheiro não declarado ou de natureza ilícita sem procedência. Agrava-se penalmente em 1 mês a cada R$1.000.",
          dataCriacao: "2021-04-29T01:26:35.700Z",
          multa: 1000,
          tempoPrisao: 10,
          status: 1
        },
        {
          id: 3,
          nome: "Falsa Identidade",
          descricao: "Se passar por um advogado certificado ou funcionário do governo (incluindo policiais, membros do Departamento de Justiça, etc.)",
          dataCriacao: "2021-04-29T01:26:35.700Z",
          multa: 0,
          tempoPrisao: 90,
          status: 2
        }
      ]
    })
  },

  routes() {
    this.namespace = 'api';

    this.get('/legislation', () => {
      const { models } = this.schema.all('penalcodes');
      return new Response(200, { some: 'header' }, models);
    })

    this.put('/legislation/:id', (schema, request) => {
      const { id } = request.params;
      const { nome, descricao, multa, tempoPrisao, status } = JSON.parse(request.requestBody);
      const data: DataProps = {
        nome, 
        descricao,
        tempoPrisao,
        status,
        multa: !multa ? 0.00 : multa,
      }

      const update = schema.db.penalcodes.update(id, data);

      return new Response(200, { some: 'header' }, update);
    })

    this.get('/legislation/:id', (schema, request) => {
      const { id } = request.params;
      const isValidData = schema.db.penalcodes.find(id);
      return new Response(200, { some: 'header' }, isValidData);
    })

    this.post('/legislation', (schema, request) => {
      const { nome, descricao, multa, tempoPrisao, status } = JSON.parse(request.requestBody);
      const newLegislation = schema.db.penalcodes.insert({
        id: v4(), 
        nome,
        descricao,
        dataCriacao: new Date(),
        multa,
        tempoPrisao,
        status
      });

      return new Response(201, { some: 'header' }, newLegislation);
    })

    this.delete('/legislation/:id', (schema, request) => {
      schema.db.penalcodes.remove(request.params.id)
      return new Response(204, { some: 'header' });
    })

    this.post('/sessions', (schema, request) => {
      const { nome, senha } = JSON.parse(request.requestBody)
      if(!nome && !senha){
        return {error: 'Parametros invalidos.'}
      }

      const isValidData = schema.db.users.findBy({ nome, senha });

      if(isValidData) {
        const data = {
          user: {
            id: isValidData.id,
            name: nome
          },
          token: v4()
        }
        return new Response(200, { some: 'header' }, data);
      } else {
        return new Response(403, { some: 'header' }, { errors: [ 'Username/Password is mismatch'] });
      }
    })
  }
})


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
