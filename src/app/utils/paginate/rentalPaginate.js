const rental = ({ _id, nome, cnpj, atividades, endereco }) => ({
  _id,
  nome,
  cnpj,
  atividades,
  endereco
});

const paginate = ({ docs, limit, totalDocs, pagingCounter, totalPages }) => ({
  Locadoras: docs.map(rental),
  limit,
  total: totalDocs,
  offset: pagingCounter,
  offsets: totalPages
});

module.exports = paginate;
