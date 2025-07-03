# Changelog

## 0.1.0-alpha.1 (2025-07-03)

Full Changelog: [v0.0.1-alpha.0...v0.1.0-alpha.1](https://github.com/h4ndzdatm0ld/tstmcp/compare/v0.0.1-alpha.0...v0.1.0-alpha.1)

### Features

* **client:** add support for endpoint-specific base URLs ([870725a](https://github.com/h4ndzdatm0ld/tstmcp/commit/870725a9e9c28d892af7391346e7064921a25fb9))
* **mcp:** implement support for binary responses ([5ba4bbe](https://github.com/h4ndzdatm0ld/tstmcp/commit/5ba4bbe5bca76876ec874cba815433a8ddc14e32))


### Bug Fixes

* **client:** explicitly copy fetch in withOptions ([125a5f8](https://github.com/h4ndzdatm0ld/tstmcp/commit/125a5f8b93601796ba44282c284d539f1bd17e33))
* **client:** get fetchOptions type more reliably ([61adff9](https://github.com/h4ndzdatm0ld/tstmcp/commit/61adff998bac2488bf5880011ba1e3f6b0dc46e3))
* compat with more runtimes ([e4be302](https://github.com/h4ndzdatm0ld/tstmcp/commit/e4be302d00955c7a5615d72d1fdffa494f6b698c))
* **mcp:** explicitly include zod and zod-to-json-schema in package.json ([fc2429a](https://github.com/h4ndzdatm0ld/tstmcp/commit/fc2429ae2b50294aa42ffc59c204e5eba5ea4222))
* **mcp:** fix cursor schema transformation issue with recursive references ([5d758f2](https://github.com/h4ndzdatm0ld/tstmcp/commit/5d758f24aa3e235efa50e14279bd295239e8ded8))
* **mcp:** include description in dynamic tool search ([51dddea](https://github.com/h4ndzdatm0ld/tstmcp/commit/51dddea769725b20e1cef54bfa3248f5ae54c864))
* publish script — handle NPM errors correctly ([db4d461](https://github.com/h4ndzdatm0ld/tstmcp/commit/db4d461a932bb993a7a2a3e82fc975550902031a))


### Chores

* add docs to RequestOptions type ([8d2ca89](https://github.com/h4ndzdatm0ld/tstmcp/commit/8d2ca8901c4be2532f61fd86d666c656e41f4133))
* adjust eslint.config.mjs ignore pattern ([e58ecdb](https://github.com/h4ndzdatm0ld/tstmcp/commit/e58ecdbd826edd2f6527399e190f67495f5984ba))
* avoid type error in certain environments ([099e410](https://github.com/h4ndzdatm0ld/tstmcp/commit/099e410597468e2bb9deb94ff3a69cb3bf649047))
* change publish docs url ([b91d611](https://github.com/h4ndzdatm0ld/tstmcp/commit/b91d61135c229e851ed5c5f0574883ecb017f190))
* **ci:** enable for pull requests ([61024de](https://github.com/h4ndzdatm0ld/tstmcp/commit/61024de9c76d054205c0d381afc4ee9e556f8933))
* **ci:** only run for pushes and fork pull requests ([a9f9cac](https://github.com/h4ndzdatm0ld/tstmcp/commit/a9f9cac70d6e1b50feff3cbe5f64837ce9316ab4))
* **client:** improve path param validation ([a05a299](https://github.com/h4ndzdatm0ld/tstmcp/commit/a05a29938c9e5945441b79dd8619aea19da04535))
* **client:** refactor imports ([e1ea489](https://github.com/h4ndzdatm0ld/tstmcp/commit/e1ea4892ed1ec8492a2f075154fbbcd9e73a3a46))
* configure new SDK language ([cd0213b](https://github.com/h4ndzdatm0ld/tstmcp/commit/cd0213b7b0bafeac1a95274bd22240fefea05c83))
* **deps:** bump eslint-plugin-prettier ([de152ac](https://github.com/h4ndzdatm0ld/tstmcp/commit/de152ac6a30d5ee2aad83430c68da735590e3656))
* **docs:** use top-level-await in example snippets ([372555e](https://github.com/h4ndzdatm0ld/tstmcp/commit/372555e367ae5dec26d459cb761d4dd0c1622821))
* improve publish-npm script --latest tag logic ([cee010d](https://github.com/h4ndzdatm0ld/tstmcp/commit/cee010d189ab7169241e01759270c1a62d87b620))
* **internal:** add pure annotations, make base APIResource abstract ([64ec811](https://github.com/h4ndzdatm0ld/tstmcp/commit/64ec811a8fbb914ace3b36d78f6facc0ef8b68ea))
* **internal:** codegen related update ([64f2f72](https://github.com/h4ndzdatm0ld/tstmcp/commit/64f2f723930d3b2296b2ebea2544da0da4240318))
* **internal:** codegen related update ([47a72c2](https://github.com/h4ndzdatm0ld/tstmcp/commit/47a72c247e782016021b32bac38db26b14450911))
* **internal:** codegen related update ([d3a15e0](https://github.com/h4ndzdatm0ld/tstmcp/commit/d3a15e03f3f0a518f1e6d0ea22b6cb6a1c6fda2f))
* **internal:** codegen related update ([2191898](https://github.com/h4ndzdatm0ld/tstmcp/commit/2191898f0a7466555c0c316b857fb9bf33d3e62d))
* **internal:** codegen related update ([eff95e4](https://github.com/h4ndzdatm0ld/tstmcp/commit/eff95e419ea49bb3e19393de8cb110da1c3884f9))
* **internal:** codegen related update ([22152da](https://github.com/h4ndzdatm0ld/tstmcp/commit/22152da37c96966b1279f2bb6ecbeac9778d196d))
* **internal:** fix readablestream types in node 20 ([a1b4467](https://github.com/h4ndzdatm0ld/tstmcp/commit/a1b4467c03ee3c84372872c12f31c50aa0ac97c7))
* **internal:** update jest config ([49c2556](https://github.com/h4ndzdatm0ld/tstmcp/commit/49c25566d991088cb2bcf0bccbd8f21e8edd5b9b))
* **mcp:** provides high-level initMcpServer function and exports known clients ([3fb71ea](https://github.com/h4ndzdatm0ld/tstmcp/commit/3fb71eae6f579628fddb766512832969f093668f))
* **package:** remove engines ([27ca556](https://github.com/h4ndzdatm0ld/tstmcp/commit/27ca556f9fb6de121cba1f00361dab221cb0b631))
* **readme:** update badges ([8b5e223](https://github.com/h4ndzdatm0ld/tstmcp/commit/8b5e223b20cc167d9404dfcf1a7180e55734a43a))
* **readme:** use better example snippet for undocumented params ([a2f7e07](https://github.com/h4ndzdatm0ld/tstmcp/commit/a2f7e0734b08d588690bc8ab65e5315807b82fab))
* **tests:** use node 22 for CI tests ([ac0e74b](https://github.com/h4ndzdatm0ld/tstmcp/commit/ac0e74b9d776a09ba463ce733bddd97170251633))
* update SDK settings ([4730bd3](https://github.com/h4ndzdatm0ld/tstmcp/commit/4730bd3f96922aff42aceb2a460a1c329eb00479))
