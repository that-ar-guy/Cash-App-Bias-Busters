# Bias Detection and Visualization Tool

[![Netlify Status](https://api.netlify.com/api/v1/badges/9d9acd0b-6a91-4ec6-9320-88890ccc00eb/deploy-status)](https://app.netlify.com/sites/cash-app-bias-busters/deploys)

As part of the Technology Leadership Initiative, we developed a bias detection and visualization tool in partnership with Cash App. This tool is designed as a dashboard that enables Cash App machine learning (ML) engineers to:

- Import their transaction data and transaction approval models.
- Select core demographic categories like gender, age, and race.

## Index

1. [Title](#bias-detection-and-visualization-tool)
2. [Short Description](#short-description)
3. [Motivation](#motivation)
4. [How to Run](#how-to-runuser)
5. [Features](#features)
6. [Technical Implementation Details](#technical-implementation-details)
7. [Acknowledgements/Credits](#acknowledgementscredits)
8. [License](#license)

## Motivation

With the increasing integration of AI systems in sensitive applications like financial transactions, ensuring fairness and mitigating biases is crucial. This project addresses the need for tools that allow ML practitioners to identify and visualize potential biases in their models, thus enabling informed decisions to improve fairness in AI.

Our backend analyzes the bias in the selected demographic categories using the Fairlearn library. The results are visualized in intuitive, easy-to-understand graphs created using Chart.js on the frontend.

## Features

- **Login/Sign-up and Account Management**: Secure user authentication and account management to ensure data privacy and personalized access.

- <b>Bias Analysis:</b> Detect bias in transaction approval models for selected demographic categories using the Fairlearn library.
- <b>Interactive Dashboard:</b> User-friendly interface to import data and select demographic groups.
- **User Data Storage**: All user-uploaded data is securely stored in a MySQL database hosted on Aiven.

- <b>Visualizations:</b> Generate intuitive graphs and charts using Chart.js for detailed insights.
- <b>Model Comparison:</b> Easily compare fairness metrics across different models.

## How to run/use

If you want to use the project, simply visit the publicly hosted website: [https://cash-app-bias-busters.netlify.app/](https://cash-app-bias-busters.netlify.app/)
.

If you'd like to run it locally instead, follow these steps:

### Backend:

```
pip install -r requirements.txt
cd backend
python3 -m app.controllers.app
```

### Frontend

```
cd frontend
npm run dev
```

## Technical Implementation Details

- <b>Backend:</b> Built using <b>Python</b> with the <b>Flask</b> framework, the backend handles data processing and bias detection. Hosted on <b>Render</b>.
- <b>Frontend:</b> Built using <b>React</b> and Vite, the frontend is responsible for the interactive dashboard and visualizations. Hosted on <b>Netlify</b>.
- <b>Database:</b> We use <b>MySQL</b> to store all the data uploaded by users. The database is hosted on Aiven.
- <b>Fairlearn:</b> This Python library is used for detecting and assessing fairness in ML models.
- <b>Chart.js:</b> Used to render dynamic and interactive graphs and charts to visualize bias metrics.

## Acknowledgements/Credits

1. This project makes use of the Fairlearn library for bias detection and fairness assessments.

```
@misc{weerts2023fairlearn,
      title={Fairlearn: Assessing and Improving Fairness of AI Systems},
      author={Hilde Weerts and Miroslav Dudík and Richard Edgar and Adrin Jalali and Roman Lutz and Michael Madaio},
      journal={Journal of Machine Learning Research},
      year={2023},
      volume={24},
      number={257},
      pages={1--8},
      url={http://jmlr.org/papers/v24/23-0389.html}
}
```

2. Special thanks to [https://cash.app/](Cash App) for their collaboration and support in this initiative.

## License

This project is licensed under the MIT License. You are free to use, modify, and distribute this project as per the license terms.

### MIT License

MIT License Copyright (c) [2024] [Bias Busters]

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
