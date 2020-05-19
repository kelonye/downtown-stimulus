#!/bin/sh
o=$o

build: fmt
	@cargo build --target wasm32-unknown-unknown --release
	@cp ./target/wasm32-unknown-unknown/release/downtown_stimulus.wasm ./res

test:
	@cargo test --package downtown-stimulus -- --nocapture

pre:
	@rustup target add wasm32-unknown-unknown

fmt:
	@cargo fmt

deploy: build
	@near deploy --accountId=downtown-stimulus --wasmFile ./res/downtown_stimulus.wasm

recreate-account:
	@near delete downtown-stimulus vb.testnet
	@near create_account downtown-stimulus --masterAccount vb.testnet
	@$(MAKE) deploy

register-business:
	@near call downtown-stimulus register_business --accountId downtown-stimulus '$(shell cat ./tmp/$(o).json)'

donate:
	@near call downtown-stimulus donate --accountId vb.testnet '{"business_id": $o}' --amount 1

.PHONY: build \
	test \
	pre \
	fmt \
	deploy \
	register-business
