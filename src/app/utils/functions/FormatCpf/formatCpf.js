function formatCPF(payload) {
  const cpf = payload.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  const people = Object.assign(payload, { cpf });
  return people;
}

module.exports = formatCPF;
