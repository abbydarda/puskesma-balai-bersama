export default () => ({
  app: {
    port: process.env.APP_PORT,
    url: process.env.APP_URL,
  },
  db: {
    url: process.env.DB_URI,
    synchronize: process.env.DB_SYNCHRONIZE,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    exp: process.env.JWT_EXP,
  },
});
