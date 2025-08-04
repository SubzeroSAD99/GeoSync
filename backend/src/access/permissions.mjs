const fullPerms = [
  {
    actions: ["create", "read", "update", "delete", "schedule"],
    resource: "service",
  },

  {
    actions: ["create", "read", "update", "delete"],
    resource: "management",
  },

  {
    actions: ["create", "read", "update", "delete"],
    resource: "financial",
  },
];

const permissions = {
  "GE. ADMINISTRATIVO": fullPerms,
  "AUX. ADMINISTRATIVO": fullPerms,
  SOCIO: fullPerms,

  CADISTA: [{ actions: ["read", "update"], resource: "service" }],

  TOPOGRAFO: [{ actions: ["read", "update", "delete"], resource: "service" }],
  "AUX. TOPOGRAFO": [
    { actions: ["read", "update", "delete"], resource: "service" },
  ],
};

export default permissions;
