#!/bin/sh
o=$o
account=downtown-stimulus-downtown-stimulus

build: fmt
	@cargo build --target wasm32-unknown-unknown --release

test:
	@cargo test --package downtown-stimulus -- --nocapture

pre:
	@rustup target add wasm32-unknown-unknown

fmt:
	@cargo fmt

deploy: build
	@near deploy --accountId=$(account) --wasmFile ./target/wasm32-unknown-unknown/release/downtown_stimulus.wasm

recreate-account:
	near delete $(account) vb.testnet
	near create-account $(account) --masterAccount vb.testnet
	$(MAKE) deploy

register-business:
	@near call $(account) register_business --accountId $(account) '$(shell cat ./tmp/$(o).json)'

donate:
	@near call $(account) donate --accountId vb.testnet '{"business_id": $o}' --amount 1

.PHONY: build \
	test \
	pre \
	fmt \
	deploy \
	register-business
