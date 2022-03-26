import { FetchWrapper } from "./fetch-wrapper.js";

// import snackbar from "snackbar";
// import "snackbar/dist/snackbar.min.css";

import Chart from "../node_modules/chart.js/auto";

const fName = document.querySelector("#foodChoice");
const carbGrams = document.querySelector("#carbs");
const protGrams = document.querySelector("#protein");
const fatGrams = document.querySelector("#fat");
const weight = document.querySelector("#weight");
const addBut = document.querySelector("#addBut");
const ctx = document.getElementById("myChart");
const finalDiv = document.getElementById("finalDiv");

// const clearBut = document.querySelector("#clearBut");
const foodArray = [{ foodName: "", foodWeight: 0, protein: 0, carbs: 0, fat: 0, energy: 0 }];
const documents = [];

class Food {
  constructor(foodName, foodWeight, protein, carbs, fat, energy) {
    this.foodName = foodName;
    this.foodWeight = foodWeight;
    this.carbs = carbs;
    this.protein = protein;
    this.fat = fat;
    this.energy = energy;
    // this.food = [foodName, foodWeight, protein, carbs, fat, energy];
    // console.log((this.food = [foodName, foodWeight, Number(protein), Number(carbs), Number(fat), energy]));
    // return (this.food = [foodName, foodWeight, Number(protein), Number(carbs), Number(fat), energy]);
  }
}

// Energy (kcal/100 g EP) = protein (g/100 g EP) x 4 + fat (g/100 g EP) x 9 +
// available carbohydrates (g/100 g EP) x 4 + dietary fibre (g/100 g EP) x 2 +
// alcohol (g/100 g EP) x 7

const addFood = (event) => {
  event.preventDefault();
  let foodName = fName.value;
  let foodWeight = Number(weight.value);
  let kw = foodWeight / 100;
  let protein = Math.round(kw * Number(protGrams.value));
  let fat = Math.round(kw * Number(fatGrams.value));
  let carbs = Math.round(kw * Number(carbGrams.value));
  let energy = Number((protein * 4 + fat * 9 + carbs * 4).toFixed());
  // let energy = Number(((foodWeight / 100) * (protein * 4 + fat * 9 + carbs * 4)).toFixed());

  let newFood = new Food(foodName, foodWeight, protein, carbs, fat, energy);
  //   let newFood = new Food();
  foodArray.push(newFood);

  let carbsG = foodArray.reduce((prev, cur) => {
    // return Number(prev) + Number(cur.carbs);
    return prev + cur.carbs;
  }, 0);
  let proteinG = foodArray.reduce((prev, cur) => {
    // return Number(prev) + Number(cur.carbs);
    return prev + cur.protein;
  }, 0);
  let fatG = foodArray.reduce((prev, cur) => {
    // return Number(prev) + Number(cur.carbs);
    return prev + cur.fat;
  }, 0);
  let energyG = foodArray.reduce((prev, cur) => {
    // return Number(prev) + Number(cur.carbs);
    return prev + cur.energy;
  }, 0);
  let foodWeightG = foodArray.reduce((prev, cur) => {
    // return Number(prev) + Number(cur.carbs);
    return prev + cur.foodWeight;
  }, 0);

  // console.log(foodArray);
  // console.log(carbs);
  // const li = document.createElement("li");

  document.getElementById("totalCalCard").innerHTML = `:    ${energyG} kcal.`;
  document.getElementById("totalWeighCard").innerHTML = `:    ${foodWeightG} g.`;

  // li.textContent = text;
  // ul.appendChild(li);

  // const addFoodForm = document.createElement("div");
  // addFoodForm.classList.add("foodForm");
  // const newContent = document.createTextNode(
  //   `${foodName} Weight: ${foodWeight} g. Energy: ${energy} kcal. Protein: ${protein}g. Carbs: ${carbs}g. Fat: ${fat} g.`
  // );
  // addFoodForm.appendChild(newContent);
  // document.body.insertBefore(addFoodForm, finalDiv);

  const addFoodForm = document.createElement("div");
  addFoodForm.classList.add("foodForm");
  const h2Div = document.createElement("h2");
  h2Div.textContent = `${foodName}`;
  addFoodForm.appendChild(h2Div);
  const p1InDiv = document.createElement("p");
  p1InDiv.textContent = ` ${foodWeight} g.`;
  addFoodForm.appendChild(p1InDiv);
  const p2InDiv = document.createElement("p");
  p2InDiv.textContent = `${energy} kCal.`;
  addFoodForm.appendChild(p2InDiv);
  const ul = document.createElement("ul");
  ul.classList.add("ulFood");
  addFoodForm.appendChild(ul);

  const liProt = document.createElement("li");
  liProt.classList.add("protLi");
  ul.appendChild(liProt);
  const spanProt = document.createElement("span");
  spanProt.textContent = ` protein ${protein}g. `;
  liProt.appendChild(spanProt);

  const liFat = document.createElement("li");
  liFat.classList.add("fatLi");
  ul.appendChild(liFat);
  const spanFat = document.createElement("span");
  spanFat.textContent = ` fat ${fat}g.  `;
  liFat.appendChild(spanFat);

  const liCarb = document.createElement("li");
  liCarb.classList.add("carbLi");
  ul.appendChild(liCarb);
  const spanCarb = document.createElement("span");
  spanCarb.textContent = ` carbs ${carbs} g.  `;
  liCarb.appendChild(spanCarb);
  // liCarb.textContent = ` carbs ${carbs} g.  `;

  document.getElementById("foodCart").insertBefore(addFoodForm, finalDiv);

  let body = {
    fields: {
      fat: {
        integerValue: fat,
      },
      protein: {
        integerValue: protein,
      },
      carbs: {
        integerValue: carbs,
      },
      foodname: {
        stringValue: fName.value,
      },
    },
  };

  // console.log(body);

  const API = new FetchWrapper("https://firestore.googleapis.com/v1/projects/programmingjs-90a13/databases/(default)/documents/");

  API.post("umts2001", body).then((data) => {
    // console.log(data);
  });

  API.get("umts2001").then((data) => {
    // console.log(data);
  });

  //   if (window.myChart != null) {
  //     window.destroy();
  //   }
  if (window.myChart instanceof Chart) {
    window.myChart.destroy();
    // carbs.value = "";
    // protein.value = "";
    // fat.value = "";
    // weight.value = "";
  }

  window.myChart = new Chart(ctx, {
    //   const myChart = new Chart(ctx, {
    type: "bar",
    data: {
      //   labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange", "Purple", "Magenda"],
      labels: ["Protein", "Fat", "Carbs"],
      datasets: [
        {
          // label: `Macronutriens in gramms. Total: ${energyG} kCal `,
          // data: [13, 19, 3, 5, 2, 3, 6, 8],
          label: `Macronutriens in gramms.`,
          data: [proteinG, fatG, carbsG],
          backgroundColor: [
            // "rgba(255, 99, 132, 0.2)",
            // "rgba(54, 162, 235, 0.2)",
            // "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            // "rgba(255, 99, 132, 1)",
            // "rgba(54, 162, 235, 1)",
            // "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 2,
        },
      ],
    },
    options: {
      // responsive: true,
      // maintainAspectRatio: false,
      // aspectRatio: 1,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
};

const resetFields = () => {
  carbs.value = "";
  protein.value = "";
  fat.value = "";
  weight.value = "";
};

// const clearAllData = () => {
//   const API = new FetchWrapper("https://firestore.googleapis.com/v1/projects/programmingjs-90a13/databases/(default)/documents/");

//   API.delete("umts2001", documents.forEach()).then((data) => {
//     console.log(data);
//   });
// };

addBut.addEventListener("click", addFood);
addBut.addEventListener("click", resetFields);
// addBut.addEventListener("click", destroy());

// clearBut.addEventListener("click", clearAllData);
