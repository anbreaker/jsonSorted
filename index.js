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
  const errorMsg = document.getElementById('error-msg');

  try {
    const obj = JSON.parse(inputJSON);
    const objSorted = sortJSON(obj);
    const jsonSorted = JSON.stringify(objSorted, null, 2);

    if (jsonSorted) {
      console.log(jsonSorted);
      pre.classList.remove('hidden');

      pre.textContent = jsonSorted;
    }
  } catch (error) {
    errorMsg.classList.remove('hidden');
    pre.classList.add('hidden');
  }
};
