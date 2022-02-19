const car = ({ _id, modelo, cor, ano, acessorios, quantidadePassageiros }) => ({
  _id,
  modelo,
  cor,
  ano,
  acessorios,
  quantidadePassageiros
});

const paginate = ({ docs, limit, totalDocs, pagingCounter, totalPages }) => ({
  Veiculo: docs.map(car),
  limit,
  total: totalDocs,
  offset: pagingCounter,
  offsets: totalPages
});

module.exports = paginate;
