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

WORKDIR /app/code
COPY requirements.txt .
RUN pip install -r requirements.txt

ARG USERID=1000
ARG GROUPID=1000
RUN groupadd -g $GROUPID jenkins && adduser --disabled-password --gecos "" --gid $GROUPID -u $USERID jenkins
USER jenkins
