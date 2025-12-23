# 🍹 Spiral Cocktails

Take home assignment built using **Next.js 16**, **Material UI (MUI)**, and **React Query**.

Live Demo: [https://thirsty-cocktails.vercel.app/](https://thirsty-cocktails.vercel.app/)

## 🚀 Tech Stack

* **Framework:** [Next.js](https://nextjs.org/)
* **Version:** Node v24 | Next.js 16 | React 19
* **API State Management:** [TanStack Query v5](https://tanstack.com/query/latest)
* **Styling & UI:** [Material UI (MUI)](https://mui.com/) which uses Emotion under the covers and comes with a lot of prebuilt components
* **Pie Chart:** [Material UI Charts](https://mui.com/x/react-charts/)
* **Testing:** [Jest](https://jestjs.io/) & [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

---

## 🛠️ Getting Started

### Prerequisites

* **Node.js:** v24.x or higher

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/jen-fong/thirsty-cocktails.git
    cd thirsty-cocktails
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 🧪 Testing

Jest and React Testing Library were used for unit and integration tests. I did not write tests for everything, just a few util functions, simple components, and a larger component to show how I usually test. The utils and simple components were unit tested. An integration test was done for the larger component to test it as a whole.

### Run all tests
```bash
npm run test
```

## ⚙️ Implementation Details
There was a lot of different data returned for the ingredients. I tried my best to get all the ones that could be converted to oz.

### Measurements
* **Supported Conversions:** The parser handles fractions (e.g., `1 1/2`), decimals (`0.5`), and ranges (`3-4 oz`). It standardizes units like `ml`, `cl`, `tsp`, `tbsp`, `cups`, and `shots` into **Ounces (oz)**.
* **Edge Cases & Limitations:** 
    * **Range Handling:** For ingredient ranges (e.g., `3-4 oz`), the logic defaults to the lower value for simplicity.
    * **Liters (L):** While most common bar units are supported, some variations such as l (for Liters), could not be extracted easily since it's one letter.
    * **Non-standard Units:** `splash`, `wedge`, `dash`, or `top up` are were ignored for the pie chart. These cannot be accurately converted to a fixed fluid ounce value.

### Technical Architecture
* **Debounced Search:** To minimize searching on every keystroke and improve performance, the search is debounced.
* **Data Fetching:** Used **React Query** to handle api states easily
* **Testing Strategy:** I added unit tests for some util functions and simple components but used integration tests for the larger page components.
* **File Structure:** Colocation of components where they are used while shared components, utils, etc are in a top level folder.
* **Client Side Rendering:** While I could have used Next.js server side rendering for the individual drink page, I kept all of it client side rendered to make it simple.

## 💡 Design
* Used a max width on the screens since it didn't look so good when it takes up full width to match mobile designs better
* Used pastel colors for the charts
* Used Material UI for the search bar and the button icons but it offers a lot of useful components and it uses emotion under the covers
