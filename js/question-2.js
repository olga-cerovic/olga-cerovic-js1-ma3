/*
Make a call to the Rawg API.

Go to https://rawg.io/apidocs and get an API key which you’ll use as part 
of the endpoint you’re making an API call to. You can use https://noroff.no 
for the URL and Noroff Assignment for the description.

You'll be given an API Key you can add as a "key" parameter in your fetch request.

Make a call to the following API endpoint replacing INSERTAPIKEYHERE with the key given 
to you from the Rawg API.
https://api.rawg.io/api/games?dates=2019-01-01,2019-12-31&ordering=-rating&key=INSERTAPIKEYHERE

Loop through the results and display the following properties in HTML, but only for the first 
eight results:
name
rating
number of tags (not the tag details, just the amount of tags)
The styling for this assignment is not important but loading indicator should be displayed while the API call is in progress.

Be sure to handle any potential errors in the code.

You can use either regular promise or async/await syntax to make the call.

Be sure to arrange all file types appropriately, consult the repos from the lessons for examples.
*/

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
