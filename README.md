# Code Challenge

A frontend project to demonstrate energy data in Singapore.  
Project tech stack: Angular + Leaflet + echarts 

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Limitations](#limitations)

## Installation

### Prerequisites
 - Node version should be newer than v20
 - Replace the GOOGLE_MAP_TOKEN in `/src/environments/environment.ts` with your map token.


### Installation Steps

```bash
git clone https://github.com/WeiTingDong/code-challenge.git
cd code-challenge
yarn install
```

## Usage

```bash
ng serve
```

## Features

- Overview and detail information for selected location

<img src="/.github/imgs/overview.png" alt="overview" />

- Mobile friendly

<img src="/.github/imgs/mobile-1.png" alt="mobile view 1" />
<img src="/.github/imgs/mobile-2.png" alt="mobile view 2" />

- Autocompletion for search field (limited in Singapore)

<img src="/.github/imgs/search.png" alt="autocomplete for search" />

- Mini map in detail panel
- i18n: Support both English and Chinese. Chinese content is translated by GPT.

## Limitations:
1. Only support search for Singapore cities, because https://api.data.gov.sg/v1/environment/2-hour-weather-forecast only returns Singapore cities.
2. Only search button 🔍 in the search panel can be clicked. Other buttons in the search panel cannot be clicked.
3. Only tested in MacBook Pro (Retina, 13-inch, Early 2015) and my own external screen. Adjustments may be required for other screen sizes.