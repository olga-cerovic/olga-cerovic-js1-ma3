const apiKey = "257c1f9545d84abcb9d214389ded7716";

const url = `https://api.rawg.io/api/games?dates=2019-01-01,2019-12-31&ordering=-rating&key=${apiKey}`;

async function makeApiCall() {
  try {
    const response = await fetch(url);
    const result = await response.json();
    return result.results;
  } catch (error) {
    console.log(error);
    return [];
  }
}

const displayResult = async () => {
  const apiResult = await makeApiCall();

  console.log(apiResult);

  let listElements = "";

  for (i = 0; i < 8; i++) {
    const valueObject = apiResult[i];
    const liValue = `<li><p>Name: ${valueObject.name}</p> <p>Rating: ${valueObject.rating}</p> <p>Number of tags: ${valueObject.tags.length}</p></li>`;
    console.log(liValue);
    listElements += liValue;
  }

  return `<ul>${listElements}</ul>`;
};

async function insertHtml() {
  const listContainer = document.querySelector("#list");

  listContainer.innerHTML = "Loading...";

  const resultDisplay = await displayResult();

  listContainer.innerHTML = resultDisplay;
}

insertHtml();
