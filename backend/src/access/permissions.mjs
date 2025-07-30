const permissions = {
  ADMINISTRADOR: [
    {
      actions: ["create", "read", "update", "delete", "schedule"],
      resource: "service",
    },
    {
      actions: ["create", "read", "update", "delete"],
      resource: "management",
    },
  ],

  CADISTA: [{ actions: ["read", "update"], resource: "service" }],

  TOPOGRAFO: [{ actions: ["read", "update", "delete"], resource: "service" }],
};

export default permissions;
