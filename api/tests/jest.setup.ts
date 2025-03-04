import "@app/routes/init";

// ENVS
process.env.DATABASE_URL =
  "postgresql://root:admin@host.docker.internal:5432/perfecttvdb?schema=public";
