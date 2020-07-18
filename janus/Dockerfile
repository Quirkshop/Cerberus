############################################################
# Dockerfile - Janus Gateway on Debian Jessie
# https://github.com/krull/docker-janus
############################################################

# set base image debian jessie
FROM debian:stretch-slim

# file maintainer author
MAINTAINER Amin Arria <arria.amin@gmail.com>

WORKDIR /root

ENV LD_LIBRARY_PATH /usr/local/lib

RUN echo $LD_LIBRARY_PATH

RUN export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/usr/local/lib

# RUN export PKG_CONFIG_PATH=/usr/local/lib/pkgconfig

RUN apt update


# Install needed utils
RUN apt install -y git make wget

# Install all dependencies#
# RUN apt install -y \
#       libsrtp2-dev libmicrohttpd-dev libjansson-dev \
#       libssl-dev libsofia-sip-ua-dev libglib2.0-dev \
#       libopus-dev libogg-dev libcurl4-openssl-dev liblua5.3-dev \
#       libconfig-dev pkg-config gengetopt libtool automake \
#       libnice-dev libwebsockets-dev  libsrtp2-dev gtk-doc-tools libglib2.0-dev
RUN apt install -y libgtk2.0-dev libmicrohttpd-dev libjansson-dev \
    libssl-dev libsrtp-dev libsofia-sip-ua-dev \
    libopus-dev libogg-dev libcurl4-openssl-dev liblua5.3-dev \
    libconfig-dev libnice-dev libwebsockets-dev pkg-config gengetopt libtool automake 

# RUN git clone https://gitlab.freedesktop.org/libnice/libnice \
#     && cd libnice \
#     && ./autogen.sh \
#     && ./configure --prefix=/usr/local \
#     && make && make install

# RUN export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/usr/local/lib

RUN wget https://github.com/cisco/libsrtp/archive/v2.2.0.tar.gz \
    && tar xfv v2.2.0.tar.gz \
    && cd libsrtp-2.2.0 \
    && ./configure --prefix=/usr/local --enable-openssl \
    && make shared_library && make install

RUN git clone https://github.com/sctplab/usrsctp \
    && cd usrsctp \
    && ./bootstrap \
    && ./configure --prefix=/usr/local \
    && make \
    && make install

# RUN git clone https://libwebsockets.org/repo/libwebsockets \
#     && cd libwebsockets \
# # If you want the stable version of libwebsockets, uncomment the next line
# # git checkout v2.4-stable
#     && mkdir build \
#     && cd build \
# # See https://github.com/meetecho/janus-gateway/issues/732 re: LWS_MAX_SMP
#     && cmake -DLWS_MAX_SMP=1 -DCMAKE_INSTALL_PREFIX:PATH=/usr -DCMAKE_C_FLAGS="-fpic" .. \
#     && make && sudo make install

RUN echo $LD_LIBRARY_PATH

# Compile Janus
RUN git clone https://github.com/meetecho/janus-gateway.git && cd janus-gateway && sh autogen.sh && ./configure --prefix=/opt/janus --disable-rabbitmq --disable-mqtt && make && make install && make configs



RUN apt install -y coturn \
    && turnadmin -a -u bob -p 1234 -r usa \
    && turnserver -o

CMD ["/opt/janus/bin/janus"]
