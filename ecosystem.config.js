module.exports = {
  apps: [
    {
      name: "frontend",
      script: "npm run dev",
      cwd: "./frontend",
      watch: true,
    },
    {
      name: "backend",
      script: "npm run dev",
      cwd: "./backend",
      watch: true,
    },
  ],
};
