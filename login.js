import parseHtmlToDom from "./parseHtmlToDom.js";

const doLogin = async ({ username, password, cookie }) => {
  console.log(`Logging in...`);
  try {
    const response = await fetch("https://www.dugout-online.com/", {
      method: "POST",
      headers: {
        Cookie: cookie,
        "User-Agent": "Mozilla/5.0",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        do_user: username,
        do_pass: password,
        attemptLogin: 1,
      }),
    });

    if (!response.ok) {
      throw new Error(`POST request failed: ${response.statusText}`);
    }
    const loginDom = parseHtmlToDom(await response.text());

    if (
      loginDom.querySelector("div.header_username").textContent === username
    ) {
      console.log(`Login successful.`);
    } else {
      console.error(`Login failed.`);
    }
    return loginDom || null;
  } catch (error) {
    console.error(`POST request failed: ${error.message}`);
    throw error;
  }
};

export default doLogin;
