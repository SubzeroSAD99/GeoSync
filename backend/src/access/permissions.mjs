const fullPerms = [
  {
    actions: ["create", "read", "update", "delete", "viewSchedule", "schedule"],
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

  {
    actions: ["create", "read", "update", "delete"],
    resource: "file",
  },
];

const permissions = {
  "GE. ADMINISTRATIVO": fullPerms,
  "AUX. ADMINISTRATIVO": fullPerms,
  SOCIO: fullPerms,

  CADISTA: [
    { actions: ["read", "update"], resource: "service" },
    {
      actions: ["create", "read"],
      resource: "file",
    },
  ],

  TOPOGRAFO: [{ actions: ["viewSchedule", "read"], resource: "service" }],
  "AUX. TOPOGRAFO": [
    { actions: ["viewSchedule", "read"], resource: "service" },
  ],
};

export default permissions;
