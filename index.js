import data from "./data.json" assert { type: "json" };
const chartContainer = document.querySelector(".chartContainer");

const dayNames = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
const colors = {
  normal: { inActive: "#EC755D", active: "#FF9B87" },
  highlight: { inActive: "#76B5BC", active: "#B4DFE5" },
};

const Visualize = () => {
  const today = GetCurrentDay();
  data.forEach((e) => {
    const color = e.day == today ? colors.highlight : colors.normal;
    const chartElement = CreateElement("div", "chartElement");
    const spentText = CreateElement("div", "spentText", `$${e.amount}`);
    const candle = CreateElement("div", "candle");
    const dayText = CreateElement("p", "dayText", e.day);

    ShowElement(spentText, false);
    SetCandleStyle(candle, color, e.amount);
    SetCandleHoverFX(candle, color, spentText);

    chartElement.appendChild(spentText);
    chartElement.appendChild(candle);
    chartElement.appendChild(dayText);
    chartContainer.appendChild(chartElement);
  });
};

const CreateElement = (elementType, elementName, content) => {
  const e = document.createElement(elementType);
  e.className = elementName;
  if (content) e.innerText = content;
  return e;
};

const ShowElement = (e, isVisible) => {
  e.style.display = isVisible ? "block" : "none";
};

const SetCandleStyle = (candle, color, height) => {
  candle.style.backgroundColor = color.inActive;
  candle.style.borderRadius = "5px";
  candle.style.height = `${height * 3}px`;
};

const SetCandleHoverFX = (candle, color, spentText) => {
  candle.onmouseover = () => {
    candle.style.backgroundColor = color.active;
    ShowElement(spentText, true);
  };

  candle.onmouseleave = () => {
    candle.style.backgroundColor = color.inActive;
    ShowElement(spentText, false);
  };
};

const GetCurrentDay = () => {
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);
  return dayNames[today.getDay()];
};

Visualize();
