# dAppPasswordGenerator
<a id="readme-top"></a>

<!-- PROJECT LOGO -->
## About
<p>
    This is decentralized application (dapp) for generating random passwords powered by <a href="https://docs.cartesi.io/cartesi-rollups/1.3/">cartesi</a> rollups technology.
</p>


## Getting Started

Below you'll find instructions on how to setup this DApp locally.

### Prerequisites

Here are some packages needed to successfully run this application on your PC:

* [NodeJS](https://nodejs.org/en), [npm](https://docs.npmjs.com/cli/v10/configuring-npm/install), [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#debian-stable) 

* [Docker](https://docs.docker.com/get-docker/) 

* [Cartesi-CLI](https://docs.cartesi.io/cartesi-rollups/1.3/development/migration/#install-cartesi-cli)
  ```sh
  npm install -g @cartesi/cli
  ```

For Windows, its recommended to have Ubuntu WSL installed then installing docker on the Linux sub system. This article provide step by step guide on how to successfully install docker on Ubuntu WSL 2 [here](https://dev.to/bartr/install-docker-on-windows-subsystem-for-linux-v2-ubuntu-5dl7)

### Installation

1. Clone this repo
   ```sh
   git clone https://github.com/Alausa2001/dAppPasswordGenerator
   ```
2. Install NPM packages
   ```sh
   yarn  install
   ```
3. Build and run the dapp via `cartesi-cli`
   ```sh
   cartesi build 
   ```
   and
   ```sh
   cartesi run 
   ```
