const sortJSON = (json) => {
  const keys = Object.keys(json).sort(); // get the keys and sort them alphabetically
  const newObj = {};

  keys.forEach((key) => {
    if (typeof json[key] === 'object' && !Array.isArray(json[key])) {
      // if the property is a nested object, we call the function recursively
      newObj[key] = sortJSON(json[key]);
    } else {
      newObj[key] = json[key];
    }
  });

  return newObj;
};

/**
 * { "b":"b", "a":"a" } --> Valid
 * { "b":"b", "a":"a", } --> inValid
 */
const sortedJSON = () => {
  const inputJSON = document.getElementById('input-json').value;
  const pre = document.getElementById('result');
  const buttonCopy = document.getElementById('button-copy');
  const errorMsg = document.getElementById('error-msg');

  errorMsg.classList.add('hidden');

  try {
    const obj = JSON.parse(inputJSON);
    const objSorted = sortJSON(obj);
    const jsonSorted = JSON.stringify(objSorted, null, 2);

    if (jsonSorted) {
      pre.classList.remove('hidden');
      buttonCopy.classList.remove('hidden');

      pre.textContent = jsonSorted;
    }
  } catch (error) {
    buttonCopy.classList.add('hidden');
    errorMsg.classList.remove('hidden');
    pre.classList.add('hidden');
  }
};

const copyText = async () => {
  const copyMsg = document.getElementById('copy-msg');
  // Selects the contents of the pre
  const textToCopy = document.getElementById('result').innerText;

  // Creates a temporary textarea item to copy the selected text
  const temporaryElement = document.createElement('textarea');
  temporaryElement.value = textToCopy;

  // Adds the temporary element to the document
  document.body.appendChild(temporaryElement);

  // Selects the contents of the temporary element
  temporaryElement.select();

  // Copies the contents of the temporary item to the user's clipboard
  navigator.clipboard
    .writeText(textToCopy)
    .then(() => {
      // Shows a success message to the user
      copyMsg.classList.remove('hidden');

      setTimeout(() => {
        copyMsg.classList.add('hidden');
      }, 1000);
    })
    .catch((error) => {
      copyMsg.classList.add('hidden');
      console.error('Error when copying text: ', error);
    });

  //Removes the temporary element from the document
  document.body.removeChild(temporaryElement);
};
