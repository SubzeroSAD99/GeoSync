const formatCurrency = (value) => {
  if (!value) return null;

  const number =
    typeof value === "string" ? parseFloat(value.replace(",", ".")) : value;

  return number.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

const formatDate = (dateIso) => {
  const date = new Date(dateIso);

  return date.toLocaleString("pt-BR");
};

const parseDate = (str) => {
  if (!str) return null;
  const [dd, mm, yyyy] = str.split("/");
  return new Date(`${yyyy}-${mm}-${dd}T00:00:00`);
};

const formatPhone = (phone) => {
  const raw = phone?.replace(/\D+/g, "");

  if (raw?.startsWith("1"))
    return raw?.replace(/^(\d)(\d{3})(\d{3})(\d{4})$/, "+$1 ($2) $3-$4");
  else if (raw?.startsWith("44"))
    return raw?.replace(/^(\d{2})(\d{4})(\d{6})$/, "+$1 $2 $3");
  else if (raw?.startsWith("34"))
    return raw?.replace(/^(\d{2})(\d{3})(\d{3})(\d{3})$/, "+$1 $2 $3 $4");

  // Padrão 55
  return raw?.replace(/^(\d{2})(\d{2})(\d{4})(\d{4})$/, "+$1 ($2) $3-$4");
};

const parseCurrency = (value) => {
  const cleaned = value
    ?.replace(/[^0-9\-,]+/g, "")
    .replace(/\./g, "")
    .replace(",", ".");
  const num = Number.parseFloat(cleaned);
  if (Number.isNaN(num)) return null;

  return String(num).length > 13 ? null : num;
};

const toTitleCase = (str) => {
  return str.toLowerCase().replace(
    /\p{L}+/gu,
    (
      word // \p{L} = qualquer letra (Unicode)
    ) => (word.length > 2 ? word[0].toUpperCase() + word.slice(1) : word)
  );
};
export {
  formatCurrency,
  formatDate,
  formatPhone,
  parseDate,
  parseCurrency,
  toTitleCase,
};
