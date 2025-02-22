###############################
# STEP 1: build rust executable
###############################
FROM rust:bullseye AS rustbuilder

# Create appuser
RUN adduser --no-create-home --disabled-password appuser

# Set workdir
WORKDIR /app

# Copy local dependencies
COPY . .

# Build the app using a dummy main in order to cache dependencies
RUN mv /app/mithril-signer /app/mithril-signer.1 && mkdir -p /app/mithril-signer/src
COPY mithril-signer/Cargo.toml /app/mithril-signer/
RUN echo "fn  main () {}" > /app/mithril-signer/src/main.rs
RUN cargo build --release -p mithril-signer --manifest-path /app/mithril-signer/Cargo.toml

# Rollback the rest of the files into the container
RUN rm -rf /app/mithril-signer && mv /app/mithril-signer.1 /app/mithril-signer
COPY ./mithril-signer/src/main.rs /app/mithril-signer/src/


# Build the binary
RUN cargo build --release -p mithril-signer
RUN /app/target/release/mithril-signer --version

###############################
# STEP 2: build a small image
###############################
FROM debian:11-slim

# Args
ARG CARDANO_BIN_URL=https://github.com/input-output-hk/cardano-node/releases/download/8.1.1/cardano-node-8.1.1-linux.tar.gz

# Upgrade
RUN apt-get update -y && apt-get install -y libssl-dev ca-certificates wget sqlite3 && rm -rf /var/lib/apt/lists/*

# Import the user and group files from the builder
COPY --from=rustbuilder /etc/passwd /etc/passwd

# Copy the executable
COPY --from=rustbuilder /app/target/release/mithril-signer /app/bin/mithril-signer

# Copy the config files
COPY --from=rustbuilder /app/mithril-signer/config /app/config

#Workdir
WORKDIR /app/
RUN chown -R appuser /app/

# Install cardano-cli
RUN wget -nv -O cardano-bin.tar.gz $CARDANO_BIN_URL
RUN tar xzf cardano-bin.tar.gz ./cardano-cli && mv cardano-cli /app/bin
RUN /app/bin/cardano-cli --version
RUN rm -f cardano-bin.tar.gz

# Use an unprivileged user
USER appuser

# Run the executable
ENTRYPOINT ["/app/bin/mithril-signer", "-vvv"]
