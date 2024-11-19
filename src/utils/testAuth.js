const createTestToken = () => {

  const payload = {
    sub: "12345",
    email: "testuser@example.com",
    name: "Test User",
    role: "breeder",
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 60 * 60, // токен на 1 час
  };


  const encodedPayload = btoa(JSON.stringify(payload));

  
  const testToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${encodedPayload}.fake-signature`;

  return {
    user: {
      id: payload.sub,
      email: payload.email,
      name: payload.name,
      role: payload.role,
    },
    token: testToken,
  };
};


export const setTestUser = () => {
  const testData = createTestToken();
  localStorage.setItem("user", JSON.stringify(testData));
  return testData;
};
