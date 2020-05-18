run:
	@cargo build --target wasm32-unknown-unknown --release
	@cp ./target/wasm32-unknown-unknown/release/downtown_stimulus.wasm ./res

test:
	@cargo test --package downtown-stimulus -- --nocapture

pre:
	@rustup target add wasm32-unknown-unknown

deploy:
	@near deploy --accountId=downtown-stimulus --wasmFile ./res/downtown_stimulus.wasm

.PHONY: run \
	test \
	pre \
	deploy
