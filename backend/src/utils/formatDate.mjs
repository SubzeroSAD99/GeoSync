const formatDate = (dateIso) => {
  const date = new Date(dateIso);

  return date.toLocaleString("pt-BR");
};

export default formatDate;
