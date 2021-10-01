# Decentralhacks 2021 :computer:

<p align="center">
  <h2 align="center">Team Pegasas</h3>
</p>


<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#technologies-used">Technologies Used</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#payment-gateway">Payment Gateway</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project
Nowadays many business small or big has started accepting UPI Payments , in future as crypto starts to be more accepted we might see businesses & e-commerce websites start accepting Crypto as a form of payment on any purchase.

Created an application which is more accessible for a beginner to integrate Crypto payments with a few lines of code and grow their business. For any online marketplace like E-commerce websites can take different forms of payments to make it much more accessible to their customers. Even with zero knowledge of blockchain or cryptocurrency, one can start accepting payments simply by creating an account on Pegasas web application without any KYC. 


## Technologies Used

Here are the major framwords which were used in the project
* [Brownie](https://eth-brownie.readthedocs.io/en/stable/)
* [Onramper](https://onramper.com/)
* [Nodejs](https://nodejs.org/en/)
* [NPM package Manager](https://www.npmjs.com/)
* [Mongo DB](https://www.mongodb.com/)

<!-- GETTING STARTED -->
## Getting Started

The following sections helps in installing the project and the prerequisties required for the same.
The prerequisites and the installation guide are as follow:-

### Prerequisites

The local machine should have **Node js** and **MongoDB** installed
* npm
  ```sh
  npm install npm@latest -g
  ```
* mongodb

Make sure you are using Chrome browser with **Metamask** installed.

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/gitanshwadhwa28/POS-API.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Make a `.env` file and inside the file enter your</br><p></p> 
       Mongoose cluster path `DB_CONNECT = "YOUR PATH"`. </br>
       Port number for your localhost `PORT = "Port Number"`. </br>
       Infura endpoint for your project `ENDPOINT = "Infura endpoint"`. </br>
       Verification string for JSON web tokens `VERIFY_TOKEN = "-"`. </br>
       Secret session string `SESSION_SECRET = "-"`.

### Payment Gateway

```
app.post("/pay", (req, res) => {

    const data = {
        address: '0xd13fB0D9D7b18e90ca0bEE6E0f30CB0A002F644b',
        amount: 1
    };
    const url = "https://pos-api-dh.herokuapp.com/pay";
    request.post({
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        uri: url,
        form: data,
    }, function (error, httpRes, body) {
        if (error) {
            console.log("Error", error);
            res.status(400).json(
                {
                    status: false,
                    message: error
                }
            );
        }
        if (httpRes.statusCode === 200) {
            res.send(body);
        } else if (httpRes.statusCode >= 300 && httpRes.statusCode <= 400) {
            res.redirect(httpRes.headers.location.toString());
            console.log("error 300 and 400");
        }
    })
})
```
<!-- USAGE -->
<!-- ## Usage -->


