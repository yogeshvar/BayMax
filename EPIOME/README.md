# EPIOME for BayMax

Before you start, Please read the [EPIOME](https://arxiv.org/pdf/2009.08441) and check out the EPIOME repository [here](https://github.com/behavioral-data/Empathy-Mental-Health)

Quick Start will be given in the EPIOME repository. But this repository will give setup scripts that will help you to run EPIOME.

## Data Preparation

Use the `praw.py` to scrape the data from Reddit. Bring your own Reddit API Key and Secret.

Once you have the data, please use the csv and annonate the data for EPIOME i.e find the rationales for the response post.

## Setup

As mentioned in the EPIOME repository, you need to install the requirements.

```bash
pip install -r requirements.txt
```

## Preprocess

For preprocess data, you can use the `preprocess.sh` script which can be found under the `setup-scripts` directory.

```bash
bash preprocess.sh <option>
```

## Train

For training, you can use the `train.sh` script which can be found under the `setup-scripts` directory.

```bash
bash train.sh <option>
```

<option> can be 'reddit' or 'twitter' whatever data you have, please update the script accordingly.
