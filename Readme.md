<!-- Project GammaWatch: https://github.com/FuryCode-bit/GammaWatch -->
<a name="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]
[![Stargazers][stars-shield]][stars-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/FuryCode-bit/GammaWatch">
    <img src="readme/fe.png" alt="Logo" height="80">
  </a>

  <h3 align="center">GammaWatch</h3>

  <p align="center"> Monitoring Radiation in the Portuguese Environment
    <br />
    <a href="https://github.com/FuryCode-bit/GammaWatch"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <!-- <a href="https://github.com/FuryCode-bit/GammaWatch">View Demo</a> -->
    ·
    <a href="https://github.com/FuryCode-bit/GammaWatch/issues">Report Bug</a>
    <!-- ·
    <a href="https://github.com/FuryCode-bit/GammaWatch/issues">Request Feature</a> -->
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

### Objectives and goals

**Objectives**: Prepare students to understand, design, and develop computer solutions based on databases.

**Goals**: Develop data models; produce relational schema; develop multi-user applications on client/server databases.

### Context
The RADNET Portugal network (https://radnet.apambiente.pt/) emerged as the national response to the Chernobyl accident. This nuclear accident occurred on April 26, 1986, in Ukraine, releasing radioactive material into the atmosphere that affected several European countries. RADNET is part of the European network for monitoring radioactivity and continuously monitors environmental radioactivity. It also serves as an alert system in case of nuclear accidents or radiological emergencies. There are radiological risks that can affect Portugal, such as those from uranium mine residues in Urgeiriça, the Portuguese Nuclear Reactor at the Technological and Nuclear Campus (CTN) of the Instituto Superior Técnico (https://tecnico.ulisboa.pt/pt/sobre-o-tecnico/campi/tecnologico-e-nuclear/), risks of incidents involving ships with nuclear propulsion in national ports or transit, radioactive waste, or nuclear weapons. Additionally, there are higher risks from Spanish nuclear power plants with seven active reactors in five facilities.

Several accidents have occurred in the past, including one with the release of radioactivity into the Tejo River at the Almaraz nuclear power plant. Although it should have been closed due to reaching the end of its useful life, it was recently extended for another 20 years with the subsequent conversion of the site into a nuclear waste landfill. Attempts have been made in the past to create a nuclear landfill near the national border in the north near the Bragança district, in the Douro, and now in the Tejo River near the Almaraz power plant. All these risks constitute a latent danger of pollution, which can affect the quality of life, health, and the national economy for many generations if a severe accident occurs. Radiation exposure is measured in Sv (Sievert). In Table 1, we show a relationship between exposure and the produced effects. Regarding risks, the International Atomic Energy Agency (IAEA) classifies risks into three main types: accidents, incidents, and deviations, according to the information in Fig. 1. Portuguese RADNET surveillance stations are strategically located near the border and in major population and industrial centers. The station locations are as follows: Abrantes, Beja, Bragança, Castelo Branco, Coimbra, Elvas, Évora, Faro, Fratel (submerged station in the Tejo River near the border), Funchal, Junqueira, Juromenha (station near the Guadiana River), Lisbon, Meimoa (on the border 100 km from the Almaraz nuclear power plant with two active reactors), Penhas Douradas, Pocinho (submerged station in the Douro River near the border), Ponta Delgada, Portalegre, Porto, Sines, and a station at the Talavera La Real airbase in Badajoz (Spain).

### Goals
The goal is to implement an information system similar to the Portuguese RADNET, consisting of a database and an application that allows interaction with the developed system. For this purpose, each network station has or can have various types of radiation sensors in the air, water, and soil. Stations can be permanent (fixed) or mobile and capable of detecting radiation in various ranges. For each station, its location and characteristics should be indicated. Specifically, the installation date, type and quantity of sensors, and frequency of readings. The most commonly used unit of measurement to classify radiation levels is the Sievert (Sv), and in practice, the mSv is used as a unit of measurement corresponding to 0.001 Sv. Each sensor has a maximum and minimum sensitivity limit. Therefore, in some stations, there are sensors with different sensitivity levels to cover various radiation spectra. All stations record radiation levels in Sievert (Sv) at different frequencies: hourly, per minute, per second, and also have daily, monthly, and annual reference values. It is necessary for the database to display real-time readings at various points on the network, allow access to historical data, and be able to activate and manage alerts if values exceed predefined and/or reference values. Alert levels should be associated with a range of radiation values. Each fixed station is equipped with at least two Geiger-Müller sensors/detectors, one for low radiation levels (from 10 nSv/h to 2 mSv/h) and another for high values (from 0.1 mSv/h to 10 Sv/h). Readings from mobile stations and portable equipment that can be used in specific locations for various periods also need to be recorded. For example, taking readings in the Urgeiriça mines for 3 weeks. Based on detected values, it should be possible to generate alerts. For example, if a station detects a value 10% above the annual average, an alarm should be triggered, and the situation reported to the Portuguese Environmental Agency and the National Civil Protection Authority. If the detected value has a direct impact on health, the alert should include direct warnings to the population, such as sirens, loudspeakers, SMS, phone calls, TV, radio, internet, email. An acceptable range of values should also be created based on existing and available information for downloading from RADNET network stations.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* [![React][React.js]][React-url]
* [![Bootstrap][Bootstrap.com]][Bootstrap-url]
* [![Flask][flask]][Flask-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

Before starting the application, it's necessary to:

1. Obtain the data needed for display from the official [**Radnet website**](https://radnet.apambiente.pt/) and save the resulting CSV file as **Valores.csv**.

2. Get a free API Key from [Api-Ninjas](https://api-ninjas.com/)

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/FuryCode-bit/GammaWatch.git
   ```

2. Enter your API in `config.py` and generate the data
   ```python
   API_KEY = 'YOUR_API_KEY'
   ```
   ```sh
   cd backend
   python3 getData.py
   ```


3. Import database script to your sql server
   ```sh
   cd backend/database/script.sql
   ```

4. Insert the all procedures, triggers and the data generated earlier
   ```sh
   cd backend/database/insertData.sql
   ```

5. Install NPM packages
      ```sh
   cd frontend
   npm install
   ```

6. Install Python packages
      ```sh
   cd backend
   pip3 install -r requirements.txt
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- Issues -->
## Issues

See the [open issues](https://github.com/FuryCode-bit/GammaWatch/issues) for a full list of proposed features (and known issues).

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->

[contributors-shield]: https://img.shields.io/github/contributors/FuryCode-bit/GammaWatch.svg?style=for-the-badge
[contributors-url]: https://github.com/FuryCode-bit/GammaWatch/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/FuryCode-bit/GammaWatch.svg?style=for-the-badge
[forks-url]: https://github.com/FuryCode-bit/GammaWatch/network/members
[stars-shield]: https://img.shields.io/github/stars/FuryCode-bit/GammaWatch.svg?style=for-the-badge
[stars-url]: https://github.com/FuryCode-bit/GammaWatch/stargazers
[issues-shield]: https://img.shields.io/github/issues/FuryCode-bit/GammaWatch.svg?style=for-the-badge
[issues-url]: https://github.com/FuryCode-bit/GammaWatch/issues
[license-shield]: https://img.shields.io/github/license/FuryCode-bit/GammaWatch.svg?style=for-the-badge
[license-url]: https://github.com/FuryCode-bit/GammaWatch/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/bernardeswebdev
[product-screenshot]: readme/estacao.png
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[flask]: https://img.shields.io/badge/flask-0769AD?style=for-the-badge&logo=flask&logoColor=white
[Flask-url]: https://flask.palletsprojects.com/en/3.0.x/
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 
