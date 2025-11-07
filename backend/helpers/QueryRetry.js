export async function QueryRetry(sqlFunction, retries = 4, delay = 500) {
  for (let i = 0; i < retries; i++) {
    try {
      return await sqlFunction();
    } catch (err) {
      console.error(`DB query failed attempt ${i + 1}:`, err.message);
      if (i === retries - 1) throw err;
      await new Promise((r) => setTimeout(r, delay));
    }
  }
}
