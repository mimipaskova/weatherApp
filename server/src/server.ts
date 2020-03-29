import app from ".";

const PORT = process.env.PORT || "3001";

export const server = app.listen(PORT, () => {
  console.log(
    `\n\n\n🚀  Node Server running at http://localhost:${PORT}.\n\n\n`
  );
});
