const api = async () => {
  const response = await fetch(" http://localhost:8000/products");
  const data = await response.json();

  const set = new Set();
  const uniqueLabels = new Set(); // To keep track of unique labels
  data.map((product) => {
    const label = product.brand;

    // Check if the label is unique
    if (!uniqueLabels.has(label)) {
      uniqueLabels.add(label);

      // Add the unique object to the set
      set.add({
        value: "New Arrivals",
        label: label,
        checked: false,
      });
    }
  });

  console.log(set);
};

api();
