const formatPhone = (phone) => {
  const raw = phone.replace(/\D+/g, "");

  if (raw.startsWith("1"))
    return raw.replace(/^(\d)(\d{3})(\d{3})(\d{4})$/, "+$1 ($2) $3-$4");
  else if (raw.startsWith("44"))
    return raw.replace(/^(\d{2})(\d{4})(\d{6})$/, "+$1 $2 $3");
  else if (raw.startsWith("34"))
    return raw.replace(/^(\d{2})(\d{3})(\d{3})(\d{3})$/, "+$1 $2 $3 $4");

  // Padrão 55
  return raw.replace(/^(\d{2})(\d{2})(\d{4})(\d{4})$/, "+$1 ($2) $3-$4");
};

export default formatPhone;
