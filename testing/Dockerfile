FROM ubuntu:20.04

RUN apt update && apt upgrade -y && DEBIAN_FRONTEND=noninteractive apt install -y \
  gdebi \
  python3 \
  python3-pip \
  # build-essential \
  # libssl-dev \
  # libffi-dev \
  # python3-dev \
  wget \
  xvfb 
  # libxi6 \
  # libgconf-2-4

RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
RUN gdebi --non-interactive google-chrome-stable_current_amd64.deb

RUN groupadd -g 1000 user && adduser --disabled-password --gecos "" --gid 1000 -u 1000 user

WORKDIR /app/code
COPY requirements.txt .
RUN pip install -r requirements.txt

USER user
