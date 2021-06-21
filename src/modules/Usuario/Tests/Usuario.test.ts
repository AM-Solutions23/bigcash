describe("usuario-routes", () => {
  it("GET /all - success", async () => {
    const { body } = await request(app).get("/states"); //use the request function that we can use the app// save the response to body variable
    expect(body).toEqual([
      {
        state: "MI",
        capital: "Lansing",
        governor: "Gretchen Whitmer",
      },
      {
        state: "GA",
        capital: "Atlanta",
        governor: "Brian Kemp",
      },
    ]);
    firstState = body[0];
  });
})