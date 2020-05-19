![](https://downtown-stimulus.surge.sh/shot.png)

### 🚧 Work in Progress

An attempt at simple quadratic funding using crypto (NEAR) for downtown businesses affected by covid-19; while learning some [rust](https://www.rust-lang.org) ;).

### Idea

The dapp has 3 users:

- Major donors, philanthropists, local governments etc willing to offer stimulus
- Business owners seeking funding
- Individual donors willing to donate to their local favorite businesses

The dapps utilizes quadratic funding, [first described by Vitalik](https://vitalik.ca/general/2019/12/07/quadratic.html), to realize fairer disbursement of a large sum of aid to a select set of businesses (affected by covid-19). Quadratic funding lets the public vote (by also donating) on the allocation of these funds where, the payout for each of these businesses is proportional to the square of the sum of the square roots of the individual public contributions.

For example, here is a breakdown of the allocation of \$100k pledged by a donor to a group of 3 businesses in a funding round:

| Business | Funding from public             | Total Public Funding | Matched | Total Public + Matched | Total   |
| -------- | ------------------------------- | -------------------- | ------- | ---------------------- | ------- |
| A        | 2,200, 800, 400                 | 3,400                | 9,060   | 12,460                 | 30,156  |
| B        | 10,000                          | 10,000               | 10,000  | 20,000                 | 48,405  |
| C        | 100, 300, 50, 100, 300, 70, 300 | 1,220                | 7,638   | 8,858                  | 21,438  |
|          |                                 |                      |         | Total                  | 100,000 |

We can see that business C did get the best allocation ratio due to having more interest from the public in terms of the number of contributors.
[Gitcoin](https://gitcoin.co/grants/) uses a [similar matching](https://ethgasstation.info/blog/quadratic-funding-in-a-nutshell/) to allocate funds provided by Ethereum Foundation and ConsenSys to sponsor awesome open source projects.

### Tools

The dapp is a Near Platform dapp that allows users to vote on these businesses using their Near Token. The demo can be accessed at https://downtown-stimulus.surge.sh.

- [React](https://reactjs.org/) - frontend
- [Near Protocol](https://near.org/) - dapp backend

### Todos

- [ ] Create funding round
- [ ] Allow philanthropists to fund the round
- [ ] Allow business application
- [x] Allow funding a business
- [ ] Implement donation and CLR matching
- [ ] Donation social media share
- [ ] Funding window closure and payout to businesses

### Icebox

- [ ] Switch to Gitcoin's CLR matching to prevent sybil attacks 🤔

### Resources

- [Spec](https://docs.google.com/document/d/1KQsdEImDiK12bmMhNV_AXLkJyv3PWZ5nODTRL5_R-Gw)
- [Gitcoin Downtown Stimulus Bounty](https://gitcoin.co/issue/gitcoinco/downtownstimulus/1/4358)
- [Quadratic funding in a nutshell](https://ethgasstation.info/blog/quadratic-funding-in-a-nutshell/)
- [Simulator](https://docs.google.com/spreadsheets/d/1zHYlMdEXuUYZeWWsVwA21EIMC7B-k2OBY7HFqDudCvk)
- [Gitcoin/near-protocol](https://gitcoin.co/issue/nearprotocol/ready-layer-one-hackathon/1/4262) bounty
- [Gitcoin/downtown-stimulus](https://gitcoin.co/issue/gitcoinco/downtownstimulus/1/4358) bounty
- [Vitalik.ca/quadratic](https://vitalik.ca/general/2019/12/07/quadratic.html)
- [Vitalik: Quadratic Funding](https://www.youtube.com/watch?v=ssr0CHg6YSE)
- [Sybil and Collusion Resistance](https://www.youtube.com/watch?v=XY77Hrfxlpg)
- [Quadratic Funding in Local Communities](https://www.youtube.com/watch?v=F868Yox_lSs)
